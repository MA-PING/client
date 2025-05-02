import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterInfo.module.css';
import {ApiResponse, Character} from "@/interfaces/character";


interface CharacterInfoProps {
    response: ApiResponse
}

const CharacterInfo: NextPage<CharacterInfoProps> = ({response}) => {
    const Character: Character = response.data;

    const characterProfileImage: string = Character.basic.character_image
    const serverImage: string = "/icons/server/" + Character.basic.world_name + ".png"

    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>캐릭터 정보</div>
            </div>
            <div className={styles.wrap}>
                <div className={styles.updateInfo}>
                    <div className={styles.wrapText}>
                        <div className={styles.div2}>마지막 업데이트 날짜</div>
                        <div className={styles.div3}>{response.responseAt}</div>
                    </div>
                    <button className={styles.button}>
                        <div className={styles.button1}>정보 갱신</div>
                    </button>
                </div>
                <div className={styles.character}>
                    <div className={styles.wrapCharacterInfo}>
                        <Image className={styles.characterProfileIcon} width={149} height={149} alt="character_image"
                               src={characterProfileImage}/>
                        <div className={styles.container}>
                            <div className={styles.wrapPrimaryInfo}>
                                <Image className={styles.serverPngIcon} width={20} height={20} alt="server_image"
                                       src={serverImage}/>
                                <div
                                    className={styles.button1}>{Character.basic.character_name}</div>
                            </div>
                            <div className={styles.wrapSubInfo}>
                                <div
                                    className={styles.lv280}>LV. {Character.basic.character_level} | {Character.basic.character_class}</div>
                                {Character.basic.character_guild_name !== null ?
                                    <div className={styles.div5}>길드: {Character.basic.character_guild_name}</div> : <div/>
                                }
                            </div>
                        </div>
                    </div>
                    <button className={styles.button2}>
                        <div className={styles.icon}>
                            <Image className={styles.unionIcon} width={17} height={15} alt="" src="/icons/heart.svg"/>
                        </div>
                    </button>
                </div>
                <div className={styles.character1}/>
                <div className={styles.character1}/>
                <div className={styles.character1}/>
            </div>
        </div>);
};

export default CharacterInfo;
