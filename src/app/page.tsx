import PatchNotice from '@/component/home/patchNote';
import APIContents from "@/component/home/APIContents";
import Banner from "@/component/home/banner";
import {getApiUserRecommend} from "@/utils/userRecommend";
import {recommendResponse} from "@/interfaces/character";
import {getNoticeSummaries} from "@/utils/serverNotice";

export default async function Home() {
    const patchNotes = await getNoticeSummaries(3);
    const userRecommendData = await getApiUserRecommend();

    // ponytail: 캐릭터 조회는 아직 v2 백엔드로 이전되지 않아 레거시 토큰 기반 API를 그대로 둔다.
    // 새 인증에는 JS로 읽을 수 있는 액세스 토큰이 없어 이 값들은 당분간 항상 null이다.
    const characterRecommendData: recommendResponse | null = null;
    const mainCharacterName: string | null = null;
    const characterList = null;
    const mainCharacter = null;
  return(
  <div>
      <Banner initialUserRecommend={userRecommendData}
              initialCharacterRecommend={characterRecommendData}
              initialCharacterName={mainCharacterName}/>
      <APIContents
          initialCharacterList={characterList}
          initialMainCharacter={mainCharacter}
      />
      <PatchNotice patchNotes={patchNotes}/>
  </div>
    );
}
