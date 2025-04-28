import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterInfo.module.css';


interface CharacterInfoProps {
    characterName: string
}


const CharacterInfo: NextPage<CharacterInfoProps> = ({characterName}) => {
    return (
        <div className={styles.div}>
            <div className={styles.title}>
                <div className={styles.div1}>캐릭터 정보</div>
            </div>
            <div className={styles.wrap}>
                <div className={styles.updateInfo}>
                    <div className={styles.wrapText}>
                        <div className={styles.div2}>마지막 업데이트 날짜</div>
                        <div className={styles.div3}>2025.01.01</div>
                    </div>
                    <div className={styles.button}>
                        <div className={styles.button1}>정보 갱신</div>
                    </div>
                </div>
                <div className={styles.character}>
                    <div className={styles.wrapCharacterInfo}>
                        <Image className={styles.characterProfileIcon} width={149} height={149} alt=""
                               src="/images/character-profile.png"/>
                        <div className={styles.container}>
                            <div className={styles.wrapPrimaryInfo}>
                                <Image className={styles.serverPngIcon} width={20} height={20} alt=""
                                       src="/images/server-png.png"/>
                                <div className={styles.button1}>{decodeURIComponent(characterName)}</div>
                            </div>
                            <div className={styles.wrapSubInfo}>
                                <div className={styles.lv280}>LV. 280 | 아크메이지(썬,콜)</div>
                                <div className={styles.div5}>길드: 지존</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.button2}>
                        <div className={styles.icon}>
                            <Image className={styles.unionIcon} width={17} height={15} alt="" src="/icons/heart.svg"/>
                        </div>
                    </div>
                </div>
                <div className={styles.character1}/>
                <div className={styles.character1}/>
                <div className={styles.character1}/>
            </div>
        </div>);
};

export default CharacterInfo;
