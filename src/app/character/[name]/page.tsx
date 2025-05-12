import Header from "@/component/header";
import CharacterInfo from "@/component/search/characterInfo";
import styles from "../../../styles/search/character.module.css"
import Details from "@/component/search/characterDetails";

import { ApiResponse } from '@/interfaces/character';
import NoSearch from "@/component/search/noSearch";

async function getCharacter(name:string): Promise<ApiResponse | null> {
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


export default async function Home({params,}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params
    const response= await getCharacter(name);
    if (response == null)
        return (
            <div>
                <Header />
                <NoSearch  />
            </div>
        );

    const Character = response.data;
    // console.log("stat", Character.stat);
    // const responseAt: string = response.responseAt;
    // const basic: basic = Character.basic;
    return (
        <div>
            <Header/>
            <div className={styles.div}>
                <CharacterInfo response={response}/>
                <Details character={Character}/>
            </div>
        </div>)
}