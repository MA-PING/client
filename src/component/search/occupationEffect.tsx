import type { NextPage } from 'next';
import styles from '@/styles/search/occupationEffect.module.css';


const SSS:NextPage = () => {
    return (
        <div className={styles.sss}>
            <div className={styles.container}>
                <div className={styles.div}>점령 효과</div>
            </div>
            <div className={styles.container1}>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>DEX 5 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>STR 75 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>공격력 15 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>방어율 무시 40% 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>버프 지속시간 22% 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>보스 몬스터 공격 시 데미지 40% 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>크리티컬 데미지 20.00% 증가</div>
                </div>
                <div className={styles.wrapInfo}>
                    <div className={styles.dex5}>크리티컬 확률 5% 증가</div>
                </div>
            </div>
        </div>);
};

export default SSS;
