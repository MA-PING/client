'use client';

import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/characterInfo.module.css';
import {ApisResponse, characterMainList} from "@/interfaces/character";
import {useState, useTransition} from "react";
import {serverImageMap} from "@/interfaces/serverImageMap";
import {refreshCharacterData} from "@/app/actions";

interface CharacterInfosProps {
    response: ApisResponse,
    onCharacterChange: (characterName: string) => void,
    date: string
}

const CharacterInfos: NextPage<CharacterInfosProps> = ({response, onCharacterChange, date}) => {
    const characterList: characterMainList[] = response.data?.characterList || [];
    const initialMainCharacter = characterList.find(char => char.main_character);
    const [isPending, startTransition] = useTransition();
    const [selectedMainCharacter, setSelectedMainCharacter] = useState<characterMainList | undefined>(initialMainCharacter);

    if (!selectedMainCharacter) {
        return <div className={styles.divApi}>캐릭터 정보를 불러오는 중이거나, 유효한 메인 캐릭터 정보가 없습니다.</div>;
    }

    const subCharacters = characterList.filter(char => char.ocid !== selectedMainCharacter.ocid);

    const handleCharacterChange = (char: characterMainList) => {
        setSelectedMainCharacter(char);
        onCharacterChange(char.character_name);
    };
    const handleRefresh = async () => {
        startTransition(async () => {
            await refreshCharacterData(selectedMainCharacter.character_name);
            handleCharacterChange(selectedMainCharacter);
        });
    };
    return (
        <div className={styles.divApi}>
            <div className={styles.title}>
                <div className={styles.div1}>캐릭터 정보</div>
            </div>
            <div className={styles.wrap}>
                <div className={styles.updateInfo}>
                    <div className={styles.wrapText}>
                        <div className={styles.div2}>마지막 업데이트 날짜</div>
                        <div className={styles.div3}>{date.slice(11, 16)}</div>
                    </div>
                    <button className={styles.button} onClick={handleRefresh} disabled={isPending}>
                        <div className={styles.button1}>
                            {isPending ? '갱신 중...' : '정보 갱신'}
                        </div>
                    </button>
                </div>
                <div className={styles.character}>
                    <div className={styles.wrapCharacterInfo}>
                        <Image className={styles.characterProfileIcon} width={149} height={149} alt="character_image"
                               src={selectedMainCharacter.character_image}/>
                        <div className={styles.container}>
                            <div className={styles.wrapPrimaryInfo}>
                                <Image className={styles.serverPngIcon} width={20} height={20} alt="server_image"
                                       src={serverImageMap[selectedMainCharacter.world_name]}/>
                                <div
                                    className={styles.button1}>{selectedMainCharacter.character_name}</div>
                            </div>
                            <div className={styles.wrapSubInfo}>
                                <div
                                    className={styles.lv280}>LV. {selectedMainCharacter.character_level} | {selectedMainCharacter.character_class}</div>
                                {selectedMainCharacter.character_guild_name !== null ?
                                    <div
                                        className={styles.div5}>길드: {selectedMainCharacter.character_guild_name}</div> :
                                    <div/>
                                }
                            </div>
                        </div>
                    </div>
                    {selectedMainCharacter.main_character ?
                        <div className={styles.badge}>
                            <div className={styles.label}>본캐</div>
                        </div> :
                        <div className={styles.badgeSub}>
                            <div className={styles.label}>부캐</div>
                        </div>
                    }
                </div>
            </div>
            <div>
                {subCharacters.map((subChar) => (
                    <div className={styles.characterApi1} key={subChar.ocid}>
                        <div className={styles.wrapCharacterInfoApi}>
                            <div className={styles.wrap1}>
                                <Image className={styles.characterProfileIconApi1} width={56} height={56}
                                       alt="character_image"
                                       src={subChar.character_image}/>
                                {subChar.main_character ?
                                    <div className={styles.badgeMain}>
                                        <div className={styles.label}>본캐</div>
                                    </div> :
                                    <div className={styles.badge1}>
                                        <div className={styles.label}>부캐</div>
                                    </div>
                                }
                            </div>
                            <div className={styles.containerApi}>
                                <div className={styles.wrapPrimaryInfo}>
                                    <Image className={styles.serverPngIcon} width={20} height={20} alt="server_image"
                                           src={serverImageMap[subChar.world_name]}/>
                                    <div className={styles.button1}>{subChar.character_name}</div>
                                </div>
                                <div className={styles.wrapSubInfo1}>
                                    <div
                                        className={styles.lv2801}>LV. {subChar.character_level} | {subChar.character_class}</div>
                                    {subChar.character_guild_name !== null ?
                                        <div className={styles.label}>길드: {subChar.character_guild_name}</div> :
                                        <div/>
                                    }
                                </div>
                            </div>
                            <div className={styles.wrapBtn}>
                                <button className={styles.buttonApi2} onClick={() => handleCharacterChange(subChar)}>
                                    <div className={styles.iconApi}>
                                        <Image className={styles.serverPngIcon} width={18} height={18} sizes="100vw"
                                               alt="change" src="/icons/change.svg"/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>);
};

export default CharacterInfos;