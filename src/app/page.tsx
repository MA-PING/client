import PatchNotice from '@/component/home/patchNote';
import APIContents from "@/component/home/APIContents";
import Banner from "@/component/home/banner";
import {getApiUserRecommend} from "@/utils/userRecommend";
import {cookies} from "next/headers";
import {getApiCharacterRecommend} from "@/utils/characterRecommend";
import {getCharacterList} from "@/utils/characterList";
import {characterMainList, recommendResponse} from "@/interfaces/character";
import {getAiAdviceByServer} from "@/utils/AiAdviceByServer";
import {getUserInfo} from "@/utils/userInfo";

interface PatchNote {
    title: string;
    url: string;
    date: string;
    summary: string;
    version: string;
}
interface ApiResponse {
    code: string;
    message: string;
    responseAt: string;
    data: PatchNote[];
    success: boolean;
}
async function getPatchNotes(): Promise<PatchNote[]> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/notice', {
            next: {
                revalidate: 43200, // 12시간 (초)
            },
        });
        const data: ApiResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('패치 노트 가져오기 오류:', error);
        return [];
    }
}

export default async function Home() {
    const patchNotes = await getPatchNotes();
    const userRecommendData = await getApiUserRecommend();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    let userName: string | null = null;
    if (accessToken) {
        const user = await getUserInfo(accessToken);
        if (user && user.userName){
            userName = user.userName;
        }
    }
    let characterRecommendData: recommendResponse | null = null;
    let mainCharacterName: string | null = null;
    let characterAdviceData = null;
    let characterList = null;
    let mainCharacter: characterMainList | null = null;
    if (userName && accessToken != null) {
        characterList = await getCharacterList(accessToken);
        if (characterList) {
            const CharacterMainList = characterList.find((c: characterMainList) => c.main_character);

            if (CharacterMainList && CharacterMainList.character_name) {
                mainCharacter = CharacterMainList;
                const character = await getApiCharacterRecommend(CharacterMainList.ocid, accessToken);
                if (character !== null) {
                    mainCharacterName = CharacterMainList.character_name;
                    characterRecommendData = character;
                }
                // AI 조언 데이터 가져오기
                characterAdviceData = await getAiAdviceByServer(mainCharacter.ocid);
            }
        }
    }
  return(
  <div>
      <Banner initialUserRecommend={userRecommendData}
              initialCharacterRecommend={characterRecommendData}
              initialCharacterName={mainCharacterName}/>
      <APIContents
          initialCharacterList={characterList}
          initialMainCharacter={mainCharacter}
          initialCharacterAdvice={characterAdviceData}
          getAdviceFunction={getAiAdviceByServer}
      />
      <PatchNotice patchNotes={patchNotes}/>
  </div>
    );
}
