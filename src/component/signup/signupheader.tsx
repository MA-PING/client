import { FunctionComponent } from 'react';
import styles from '../../styles/signup/signupheader.module.css';
import Link from "next/link";

const HeaderPC: FunctionComponent = () => {
    return (
        <div className={styles.headerPc}>
            <div className={styles.wrapBtn}>
                <Link href="/login" className={styles.button}>
                    <div className={styles.icon}>
                        <img className={styles.vector4Stroke} alt="" src="/icons/arrow_left.svg" />
                    </div>
                </Link>
            </div>
            <div className={styles.logoMaping}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoMaping1}>
                        <img className={styles.mapingIcon} alt="" src="/icons/Maping.svg" />
                    </div>
                    <img className={styles.logoIcon} alt="" src="/icons/Logo.svg" />
                </Link>
            </div>
        </div>
    );
};

export default HeaderPC;
