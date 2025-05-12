import type { NextPage } from 'next';
import Image from "next/image";
import styles from '@/styles/search/sol.module.css';


const Sol:NextPage = () => {
    return (
        <div className={styles.item}>
            <div className={styles.title}>
                <div className={styles.wrap}>
                    <Image className={styles.imgErdaIcon} width={24} height={24} alt="" src="/icons/erda.png" />
                    <div className={styles.div}>솔 에르다</div>
                    <div className={styles.div1}>
                        <span>1,177</span>
                        <span className={styles.span}>/1,177</span>
                    </div>
                </div>
                <div className={styles.div2}>|</div>
                <div className={styles.wrap}>
                    <Image className={styles.imgErdaIcon} width={24} height={24} alt="" src="/icons/erda2.png" />
                    <div className={styles.div}>솔 에르다 조각</div>
                    <div className={styles.div1}>
                        <span>1,177</span>
                        <span className={styles.span}>/1,177</span>
                    </div>
                </div>
            </div>
        </div>);
};

export default Sol;
