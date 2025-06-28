import CharacterInfo from "@/component/search/characterInfo";
import styles from "../../styles/search/character.module.css"
import Details from "@/component/search/characterDetails";
import NoSearch from "@/component/search/noSearch";
import type {NextPage} from "next";
import {getCharacter} from "@/utils/characterApi";

interface CharacterProps {
    name: string
}

const Character: NextPage<CharacterProps> = async ({name}) => {

    const response = await getCharacter(name);
    if (response == null) {
        return (
            <>
                <NoSearch />
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
