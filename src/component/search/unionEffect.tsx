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
const unionIconMap: { [key: string]: string } = {
    // 노비스 유니온 1 ~ 5
    '노비스 유니온 1': '/icons/union/novice-1.webp',
    '노비스 유니온 2': '/icons/union/novice-2.webp',
    '노비스 유니온 3': '/icons/union/novice-3.webp',
    '노비스 유니온 4': '/icons/union/novice-4.webp',
    '노비스 유니온 5': '/icons/union/novice-5.webp',

    // 베테랑 유니온 1 ~ 5
    '베테랑 유니온 1': '/icons/union/veteran-1.webp',
    '베테랑 유니온 2': '/icons/union/veteran-2.webp',
    '베테랑 유니온 3': '/icons/union/veteran-3.webp',
    '베테랑 유니온 4': '/icons/union/veteran-4.webp',
    '베테랑 유니온 5': '/icons/union/veteran-5.webp',

    // 마스터 유니온 1 ~ 5
    '마스터 유니온 1': '/icons/union/master-1.webp',
    '마스터 유니온 2': '/icons/union/master-2.webp',
    '마스터 유니온 3': '/icons/union/master-3.webp',
    '마스터 유니온 4': '/icons/union/master-4.webp',
    '마스터 유니온 5': '/icons/union/master-5.webp',

    // 슈프림 유니온 1 ~ 5
    '슈프림 유니온 1': '/icons/union/supreme-1.webp',
    '슈프림 유니온 2': '/icons/union/supreme-2.webp',
    '슈프림 유니온 3': '/icons/union/supreme-3.webp',
    '슈프림 유니온 4': '/icons/union/supreme-4.webp',
    '슈프림 유니온 5': '/icons/union/supreme-5.webp',

    // 그랜드 마스터 유니온 1 ~ 5
    '그랜드 마스터 유니온 1': '/icons/union/grand-master-1.webp',
    '그랜드 마스터 유니온 2': '/icons/union/grand-master-2.webp',
    '그랜드 마스터 유니온 3': '/icons/union/grand-master-3.webp',
    '그랜드 마스터 유니온 4': '/icons/union/grand-master-4.webp',
    '그랜드 마스터 유니온 5': '/icons/union/grand-master-5.webp',
};
const defaultIcon = '/icons/empty.png';
const UnionEffect: NextPage<UnionEffectProps> = ({union, unionRaider}) => {
    const [activeUnionTab, setActiveUnionTab] = useState<number>(0);

    const handleUnionTabClick = (tabName: number) => {
        setActiveUnionTab(tabName);
    };
    return (
        <div className={styles.div11}>
            <div className={styles.wrap1}>
                <Image className={styles.imgCharacterIcon} width={68} height={68} alt=""
                       src={unionIconMap[union.union_grade] || defaultIcon}/>
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
                {activeUnionTab === 3 && <CrewEffect unionRaider={unionRaider}/>}
                {activeUnionTab === 1 && <SSS unionRaider={unionRaider}/>}
            </div>
        </div>
    )
}

export default UnionEffect;