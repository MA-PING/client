'use client'

import type {NextPage} from 'next';
import styles from "@/styles/search/character.module.css";
import TotalStat from "@/component/search/CharacterTotalStat";
import {useEffect, useState} from "react";
import {
    Stat,
    Character,
    Ability,
    HyperStat,
    ItemEquipment,
    AndroidEquipment
} from "@/interfaces/character";
import WrapEquipment from "@/component/search/item";
import Union from "@/component/search/union";
import Artifact from "@/component/search/artifact";
import Symbol from "@/component/search/symbole";
import Skill from "@/component/search/skill";

interface DetailsProps {
    character: Character
}
interface recentCharacter {
    characterName: string;
    world: string;
    className: string;
    image: string;
    level: number;
}
const Details: NextPage<DetailsProps> = ({character}) => {
    useEffect(() => {
        // character 데이터나 basic 정보가 없으면 실행하지 않습니다.
        if (!character || !character.basic) {
            return;
        }

        const newCharacterToSave: recentCharacter = {
            characterName: character.basic.character_name,
            world: character.basic.world_name,
            className: character.basic.character_class,
            image: character.basic.character_image,
            level: character.basic.character_level,
        };

        try {
            const savedStateJSON = localStorage.getItem('recentSearches');
            const recentSearches: recentCharacter[] = savedStateJSON ? JSON.parse(savedStateJSON).recent || [] : [];

            const filteredSearches = recentSearches.filter(
                c => c.characterName !== newCharacterToSave.characterName
            );

            const newRecentSearches = [newCharacterToSave, ...filteredSearches].slice(0, 10); // 최대 5개 유지

            const newState = { recent: newRecentSearches };
            localStorage.setItem('recentSearches', JSON.stringify(newState));

        } catch (error) {
            console.error("Failed to save character to localStorage", error);
        }

    }, [character]);

    const Stat: Stat = character.stat;
    const Ability: Ability = character.ability;
    const HyperStat: HyperStat = character.hyperStat;
    const item: ItemEquipment = character.itemEquipment;
    const union = character.union;
    const unionRaider = character.unionRaider;
    const unionArtifact = character.unionArtifact;
    const symbol = character.symbolEquipment;
    const skill5 = character.skill5;
    const skill6 = character.skill6;
    const linkSkill = character.linkSkill;
    const android: AndroidEquipment = character.androidEquipment;


    const [activeTab, setActiveTab] = useState<string>('stats'); // 'stats', 'equipment', 'union', 'skills'

    // 탭 클릭 시 activeTab 상태를 업데이트하는 함수
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };
    return (
        <div className={styles.detailsDiv}>
            <div className={styles.title1}>
                <div className={styles.div1}>상세정보</div>
            </div>
            <div className={styles.content}>
                <div className={styles.title2}>
                    <div className={styles.tab}>
                        <button
                            className={activeTab === 'stats' ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabClick('stats')}
                        >
                            <div className={activeTab === 'stats' ? styles.label : styles.label1}>캐릭터 스탯</div>
                        </button>
                        <button
                            className={activeTab === 'equipment' ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabClick('equipment')}
                        >
                            <div className={activeTab === 'equipment' ? styles.label : styles.label1}>장비</div>
                        </button>
                        <button
                            className={activeTab === 'union' ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabClick('union')}
                        >
                            <div className={activeTab === 'union' ? styles.label : styles.label1}>유니온 및 아티펙트</div>
                        </button>
                        <button
                            className={activeTab === 'skills' ? styles.tabAtomic : styles.tabAtomic1}
                            onClick={() => handleTabClick('skills')}
                        >
                            <div className={activeTab === 'skills' ? styles.label : styles.label1}>스킬 및 심볼</div>
                        </button>
                    </div>
                </div>
                {activeTab === 'stats' && <TotalStat Stat={Stat}  Ability={Ability} HyperStat={HyperStat}/>}
                {activeTab === 'equipment' && <WrapEquipment item={item} android={android}/>}
                {activeTab === 'union' &&
                    <div className={styles.unionContainer}>
                        <Union union={union} unionRaider={unionRaider}/>
                        <Artifact union={union} unionArtifact={unionArtifact}/>
                    </div>
                }
                {activeTab === 'skills' &&
                    <div className={styles.skillContainer}>
                        <Symbol symbol={symbol}/>
                        <Skill skill5={skill5} skill6={skill6} linkSkill={linkSkill}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Details;