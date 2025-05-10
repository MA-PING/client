import type {NextPage} from 'next';
import styles from '@/styles/search/occupationEffect.module.css';
import {UnionRaiderPreset} from "@/interfaces/character";


interface SSSProps {
    unionRaider: UnionRaiderPreset | null
}

const SSS: NextPage<SSSProps> = ({unionRaider}) => {
    if(unionRaider === null){
        return (
            <div className={styles.sss}>
                <div className={styles.container}>
                    <div className={styles.div}>점령 효과</div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.dex5}>점령 효과가 없습니다.</div>
                    </div>
                </div>
            </div>
        );
    }
    if(unionRaider.union_occupied_stat === null){
        return (
            <div className={styles.sss}>
                <div className={styles.container}>
                    <div className={styles.div}>점령 효과</div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.wrapInfo}>
                        <div className={styles.dex5}>점령 효과가 없습니다.</div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.sss}>
            <div className={styles.container}>
                <div className={styles.div}>점령 효과</div>
            </div>
            <div className={styles.container1}>
                {unionRaider.union_occupied_stat.map((stat, index) => (
                    <div key={index} className={styles.wrapInfo}>
                        <div className={styles.dex5}>{stat}</div>
                    </div>
                ))}
            </div>
        </div>);
};

export default SSS;
