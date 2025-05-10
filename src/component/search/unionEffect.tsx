import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/union.module.css';
import {Union, UnionRaiderPreset} from "@/interfaces/character";
import {useState} from "react";
import CrewEffect from "@/component/search/crewEffect";
import SSS from "@/component/search/occupationEffect";

interface UnionEffectProps {
    union: Union,
    unionRaider: UnionRaiderPreset | null
}

const UnionEffect: NextPage<UnionEffectProps> = ({union, unionRaider}) => {
    const [activeUnionTab, setActiveUnionTab] = useState<number>(0);

    const handleUnionTabClick = (tabName: number) => {
        setActiveUnionTab(tabName);
    };
    console.log(unionRaider)
    return (
        <div className={styles.div11}>
            <div className={styles.wrap1}>
                <Image className={styles.imgCharacterIcon} width={68} height={68} alt=""
                       src={"/icons/union/" + union.union_grade + ".webp"}/>
                <div className={styles.title}>
                    <div className={styles.div12}>{union.union_grade}</div>
                    <div className={styles.lv6278}>LV. {union.union_level}</div>
                </div>
            </div>
            <div className={styles.div13}>
                <div className={styles.tabSmallHorizontal}>
                    <div className={styles.tab}>
                        <button className={activeUnionTab === 0 ? styles.tabAtomic5 : styles.tabAtomic6}
                                onClick={() => handleUnionTabClick(0)}
                        >
                            <div className={styles.label}>공격대원 효과</div>
                        </button>
                        <button className={activeUnionTab === 1 ? styles.tabAtomic5 : styles.tabAtomic6}
                                onClick={() => handleUnionTabClick(1)}
                        >
                            <div className={styles.label1}>공격대 점령 효과</div>
                        </button>
                    </div>
                </div>
                {activeUnionTab === 3 && <CrewEffect/>}
                {activeUnionTab === 1 && <SSS unionRaider={unionRaider}/>}
            </div>
        </div>
    )
}

export default UnionEffect;