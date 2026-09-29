'use server'

import BigChatBot from "@/component/chat/bigChatBot";
import {characterMainList, recommendResponse} from "@/interfaces/character";
import {getApiUserRecommend} from "@/utils/userRecommend";
import {getCharacterList} from "@/utils/characterList";
import {getApiCharacterRecommend} from "@/utils/characterRecommend";
import {cookies} from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('ACCESS_TOKEN')?.value;
    let characterRecommendData: recommendResponse | null = null;
    let characterList = null;
    let mainCharacterName: string | null = null;
    const userRecommendData = await getApiUserRecommend();
    if (accessToken != null) {
        characterList = await getCharacterList();
        if (characterList) {
            const CharacterMainList = characterList.find((c: characterMainList) => c.main_character);

            if (CharacterMainList && CharacterMainList.character_name) {
                const character = await getApiCharacterRecommend(CharacterMainList.ocid, accessToken);
                if (character !== null) {
                    mainCharacterName = CharacterMainList.character_name;
                    characterRecommendData = character;
                }
            }
        }
    }
    return (
        <BigChatBot initialUserRecommend={userRecommendData}
                    initialCharacterRecommend={characterRecommendData}
                    initialCharacterName={mainCharacterName}
        />
    );
}