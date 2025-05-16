import CharacterInfo from "@/component/search/characterInfo";
import styles from "../../styles/search/character.module.css"
import Details from "@/component/search/characterDetails";

import {ApiResponse} from '@/interfaces/character';
import NoSearch from "@/component/search/noSearch";
import type {NextPage} from "next";

async function getCharacter(name: string): Promise<ApiResponse | null> {
    try {

        const response = await fetch('https://api.ma-ping.com/api/v1/character?characterName=' + name, {
            next: {
                revalidate: 300000, // 5분
            },
        });

        if (!response.ok) {
            return null;
        }


        const data: ApiResponse = await response.json();
        if (!data || !data.data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('캐릭터 정보 가져오기 오류:', error);
        return null;
    }
}

interface CharacterProps {
    name: string
}

const Character: NextPage<CharacterProps> = async ({name}) => {
    const response = await getCharacter(name);
    if (response == null)
        return (
            <div>
                <NoSearch/>
            </div>
        );

    return (
        <div>
            <div className={styles.div}>
                <CharacterInfo response={response}/>
                <Details character={response.data}/>
            </div>
        </div>)

}
export default Character;
