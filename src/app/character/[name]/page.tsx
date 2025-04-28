import Header from "@/component/header";
import Footer from "@/component/footer";
import CharacterInfo from "@/component/search/characterInfo";
import CharacterDetails from "@/component/search/characterDetails";
import styles from "../../../styles/search/character.module.css"

interface basic {
    data?: string;
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_level: number;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
    access_flag: string;
    liberation_quest_clear_flag: string;
}

interface Stat {
}

interface HyperStat {
}

interface Ability {
}

interface ItemEquipment {
}

interface SymbolEquipment {
}

interface Skill {
}

interface LinkSkill {
}

interface VMatrix {
}

interface HexaMatrix {
}

interface HexaMatrixStat {
}

interface Union {
}

interface UnionRaider {
}

interface UnionArtifact {
}

interface Character {
    ocid: string;
    basic: basic;
    Stat: Stat;
    HyperStat: HyperStat;
    Ability: Ability;
    ItemEquipment: ItemEquipment;
    SymbolEquipment: SymbolEquipment;
    Skill5: Skill;
    Skill6: Skill;
    LinkSkill: LinkSkill;
    VMatrix: VMatrix;
    HexaMatrix: HexaMatrix;
    HexaMatrixStat: HexaMatrixStat;
    Union: Union;
    UnionRaider: UnionRaider;
    UnionArtifact: UnionArtifact;
}

// interface ApiResponse {
//     code: string;
//     message: string;
//     responseAt: string;
//     data: Character;
//     success: boolean;
// }

// async function getCharacter(name:string): Promise<Character[]> {
//     try {
//
//         const response = await fetch('https://api.ma-ping.com/api/v1/characters/' + name, {
//             next: {
//                 revalidate: 6000,
//             },
//         });
//         const data: ApiResponse = await response.json();
//         console.log(data);
//         return data.data;
//     } catch (error) {
//         console.error('패치 노트 가져오기 오류:', error);
//         return [];
//     }
// }


export default async function Home({params,}: {
    params: Promise<{ name: string }>
}) {
    const { name } = await params
    // const Character= await getCharacter(name);

    return (
        <div>
            <Header/>
            <div className={styles.div}>
                <CharacterInfo characterName={name}/>
                <CharacterDetails/>
            </div>
            <Footer/>
        </div>)
}