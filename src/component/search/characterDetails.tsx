'use client'

import type {NextPage} from 'next';
import styles from "@/styles/search/character.module.css";
import TotalStat from "@/component/search/CharacterTotalStat";
import {useState} from "react";
import {Stat, Character, Ability, HyperStat, ItemEquipment} from "@/interfaces/character";
import WrapEquipment from "@/component/search/item";
// import Union from "@/component/search/union";
// import Skill from "@/component/search/skill";

interface DetailsProps {
    character: Character
}

const Details: NextPage<DetailsProps> = ({character}) => {
    const Stat: Stat = character.stat;
    const Ability: Ability = character.ability;
    const HyperStat: HyperStat = character.hyperStat;
    const Item: ItemEquipment = character.itemEquipment
    // const itemList: string[] = [];
    // for(const item of Item.item_equipment){
    //     itemList.push(item.item_equipment_slot)
    // }
    const result = Item.item_equipment.filter(item => item.item_equipment_slot == "무기");
    console.log(result)
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
                {activeTab === 'equipment' && <WrapEquipment Item={Item}/>}
                {/*{activeTab === 'union' && <Union />}*/}
                {/*{activeTab === 'skills' && <Skill />}*/}
            </div>
        </div>
    )
}

export default Details;