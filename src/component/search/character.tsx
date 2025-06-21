import CharacterInfo from "@/component/search/characterInfo";
import styles from "../../styles/search/character.module.css"
import Details from "@/component/search/characterDetails";
import type {ApiResponse, Character} from '@/interfaces/character';
import NoSearch from "@/component/search/noSearch";
import type {NextPage} from "next";

async function getCharacter(name: string): Promise<ApiResponse | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/character?characterName=' + name, {
            next: {
                revalidate: 1000,
                tags: [`character:${name}`],
            },
        });
        if (!response.ok) return null;
        const data: ApiResponse = await response.json();
        const characterData = data.data;

        for (const key in characterData) {
            // 객체가 실제로 해당 속성을 가지고 있는지 확인 (상속된 속성 제외)
            if (Object.prototype.hasOwnProperty.call(characterData, key)) {
                // 만약 속성의 값이 null이라면
                if (characterData[key as keyof Character] === null) {
                    // 어떤 키가 null인지 서버 콘솔에 로그를 남김
                    console.log(`'${name}' 캐릭터 데이터 검증 실패: '${key}' 속성 값이 null입니다.`);
                    // await refreshCharacterData(characterData.basic.character_name);
                    // 함수를 중단하고 null을 반환
                    return null;
                }
            }
        }
        if (!data || !data.data) return null;
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
    if (response == null) {
        return (
            <>
                <NoSearch/>
            </>
        );
    }
    return (
        <>
            <div className={styles.div}>
                <CharacterInfo response={response}/>
                <Details character={response.data}/>
            </div>
        </>)

}
export default Character;
