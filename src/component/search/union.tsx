import type {NextPage} from 'next';
// import Image from "next/image";
import styles from '../../styles/search/union.module.css';
import type { Union, UnionRaider } from "@/interfaces/character";
import {useState} from "react";
import UnionInnerStat from "@/component/search/unionInnerStat";
import UnionEffect from "@/component/search/unionEffect";


interface UnionProps {
    unionRaider: UnionRaider,
    union: Union
}

const Union: NextPage<UnionProps> = ({union, unionRaider}) => {
    const [activeUnionTab, setActiveUnionTab] = useState<number>(unionRaider.use_preset_no);

    const handleUnionTabClick = (tabName: number) => {
        setActiveUnionTab(tabName);
    };

    return (
        <div className={styles.div}>
            <div className={styles.wrap}>
                {activeUnionTab === 1 && <UnionInnerStat unionBlock={unionRaider.union_raider_preset_1?.union_block}/>}
                {activeUnionTab === 2 && <UnionInnerStat unionBlock={unionRaider.union_raider_preset_2?.union_block}/>}
                {activeUnionTab === 3 && <UnionInnerStat unionBlock={unionRaider.union_raider_preset_3?.union_block}/>}
                {activeUnionTab === 4 && <UnionInnerStat unionBlock={unionRaider.union_raider_preset_4?.union_block}/>}
                {activeUnionTab === 5 && <UnionInnerStat unionBlock={unionRaider.union_raider_preset_5?.union_block}/>}
                <div className={styles.tabNum}>
                    <div className={styles.tab}>
                        <button className={activeUnionTab === 1 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleUnionTabClick(1)}
                        >
                            <div className={activeUnionTab === 1 ? styles.label : styles.label1}>1</div>
                        </button>
                        <button className={activeUnionTab === 2 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleUnionTabClick(2)}
                        >
                            <div className={activeUnionTab === 2 ? styles.label : styles.label1}>2</div>
                        </button>
                        <button className={activeUnionTab === 3 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleUnionTabClick(3)}
                        >
                            <div className={activeUnionTab === 3 ? styles.label : styles.label1}>3</div>
                        </button>
                        <button className={activeUnionTab === 4 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleUnionTabClick(4)}
                        >
                            <div className={activeUnionTab === 4 ? styles.label : styles.label1}>4</div>
                        </button>
                        <button className={activeUnionTab === 5 ? styles.tabAtomic : styles.tabAtomic1}
                                onClick={() => handleUnionTabClick(5)}
                        >
                            <div className={activeUnionTab === 5 ? styles.label : styles.label1}>5</div>
                        </button>
                    </div>
                </div>
            </div>
            {activeUnionTab === 1 && <UnionEffect union={union} unionRaider={unionRaider.union_raider_preset_1}/>}
            {activeUnionTab === 2 && <UnionEffect union={union} unionRaider={unionRaider.union_raider_preset_2}/>}
            {activeUnionTab === 3 && <UnionEffect union={union} unionRaider={unionRaider.union_raider_preset_3}/>}
            {activeUnionTab === 4 && <UnionEffect union={union} unionRaider={unionRaider.union_raider_preset_4}/>}
            {activeUnionTab === 5 && <UnionEffect union={union} unionRaider={unionRaider.union_raider_preset_5}/>}
        </div>);
};

export default Union;
