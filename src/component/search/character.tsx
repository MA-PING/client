import CharacterInfo from "@/component/search/characterInfo";
import styles from "../../styles/search/character.module.css"
import Details from "@/component/search/characterDetails";
import NoSearch from "@/component/search/noSearch";
import type {NextPage} from "next";
import {ApiResponse} from "@/interfaces/character";

interface CharacterProps {
    response: ApiResponse | null,
}

const Character: NextPage<CharacterProps> = async ({response}) => {

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
