
'use client';

import { useState, useCallback } from 'react';
import CharacterInfos from "@/component/character/characterInfo";
import styles from "../../styles/search/character.module.css";
import { ApisResponse, Character } from "@/interfaces/character";
import { getCharacter } from "@/utils/characterApi";
import styles1 from "@/styles/search/character.module.css";
import TotalStat from "@/component/search/CharacterTotalStat";
import WrapEquipment from "@/component/search/item";
import Union from "@/component/search/union";
import Artifact from "@/component/search/artifact";
import Skill from "@/component/search/skill";
import Symbol from "@/component/search/symbole";
import Loading from "@/component/search/loading";
interface CharacterDisplayProps {
    initialApiResponse: ApisResponse;
    initialDetailCharacter: Character;
}

export default function CharacterDisplay({ initialApiResponse, initialDetailCharacter }: CharacterDisplayProps) {
    const [date, setDate] = useState(initialApiResponse.responseAt);
    const [currentDetailCharacter, setCurrentDetailCharacter] = useState<Character>(initialDetailCharacter);
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('stats');
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };
    const handleCharacterChangeFromInfo = useCallback(async (characterName: string) => {
        setIsDetailLoading(true);
        setDetailError(null);
        try {
            const response = await getCharacter(characterName);
            if (response && response.data) {
                setCurrentDetailCharacter(response.data);
                setDate(response.responseAt)
            } else {
                setDetailError('선택된 캐릭터의 상세 정보를 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error("캐릭터 상세 정보 가져오기 오류:", error);
            setDetailError('캐릭터 상세 정보 로드 중 오류가 발생했습니다.');
        } finally {
            setIsDetailLoading(false);
        }
    }, []);
    return (
        <div className={styles.div}>
            <CharacterInfos response={initialApiResponse}
                            onCharacterChange={handleCharacterChangeFromInfo}
                            date={date}/>
            <div className={styles1.detailsDiv}>
                <div className={styles1.title1}>
                    <div className={styles1.div1}>상세정보</div>
                </div>
                <div className={styles1.content}>
                    <div className={styles1.title2}>
                        <div className={styles1.tab}>
                            <button
                                className={activeTab === 'stats' ? styles1.tabAtomic : styles1.tabAtomic1}
                                onClick={() => handleTabClick('stats')}
                            >
                                <div className={activeTab === 'stats' ? styles1.label : styles1.label1}>캐릭터 스탯</div>
                            </button>
                            <button
                                className={activeTab === 'equipment' ? styles1.tabAtomic : styles1.tabAtomic1}
                                onClick={() => handleTabClick('equipment')}
                            >
                                <div className={activeTab === 'equipment' ? styles1.label : styles1.label1}>장비</div>
                            </button>
                            <button
                                className={activeTab === 'union' ? styles1.tabAtomic : styles1.tabAtomic1}
                                onClick={() => handleTabClick('union')}
                            >
                                <div className={activeTab === 'union' ? styles1.label : styles1.label1}>유니온 및 아티펙트</div>
                            </button>
                            <button
                                className={activeTab === 'skills' ? styles1.tabAtomic : styles1.tabAtomic1}
                                onClick={() => handleTabClick('skills')}
                            >
                                <div className={activeTab === 'skills' ? styles1.label : styles1.label1}>스킬 및 심볼</div>
                            </button>
                        </div>
                    </div>
                    {isDetailLoading ? (
                        <div className={styles.loading}>
                            <Loading />
                        </div>
                    ) : detailError ? (
                        <div className={styles.errorContainer}>{detailError}</div>
                    ) : (
                        <>
                            {activeTab === 'stats' && <TotalStat Stat={currentDetailCharacter.stat}  Ability={currentDetailCharacter.ability} HyperStat={currentDetailCharacter.hyperStat}/>}
                            {activeTab === 'equipment' && <WrapEquipment item={currentDetailCharacter.itemEquipment} android={currentDetailCharacter.androidEquipment}/>}
                            {activeTab === 'union' &&
                                <div className={styles.unionContainer}>
                                    <Union union={currentDetailCharacter.union} unionRaider={currentDetailCharacter.unionRaider}/>
                                    <Artifact union={currentDetailCharacter.union} unionArtifact={currentDetailCharacter.unionArtifact}/>
                                </div>
                            }
                            {activeTab === 'skills' &&
                                <div className={styles.skillContainer}>
                                    <Symbol symbol={currentDetailCharacter.symbolEquipment}/>
                                    <Skill skill5={currentDetailCharacter.skill5} skill6={currentDetailCharacter.skill6} linkSkill={currentDetailCharacter.linkSkill}/>
                                </div>
                            }
                        </>
                    )}

                </div>
            </div>

        </div>
    );
}