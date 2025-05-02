import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/search/union.module.css';
import type { Union, UnionRaider } from "@/interfaces/character";
import {useState} from "react";
import UnionInnerStat from "@/component/search/unionInnerStat";


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
                <UnionInnerStat/>
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
            <div className={styles.div11}>
                <div className={styles.wrap1}>
                    <Image className={styles.imgCharacterIcon} width={68} height={68} alt="" src="/icons/empty.svg"/>
                    <div className={styles.title}>
                        <div className={styles.div12}>{union.union_grade}</div>
                        <div className={styles.lv6278}>LV. {union.union_level}</div>
                    </div>
                </div>
                <div className={styles.div13}>
                    <div className={styles.tabSmallHorizontal}>
                        <div className={styles.tab}>
                            <div className={styles.tabAtomic5}>
                                <div className={styles.label}>공격대원 효과</div>
                            </div>
                            <div className={styles.tabAtomic6}>
                                <div className={styles.label1}>공격대 점령 효과</div>
                            </div>
                        </div>
                    </div>
                    {}
                </div>
            </div>
        </div>);
};

export default Union;
