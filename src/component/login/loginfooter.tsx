import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/login/loginfooter.module.css';


const Footer:NextPage = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.div}>개인정보처리방침</div>
                    <Image className={styles.infoChild} width={1} height={8} alt="" src="/icons/Vector 1.svg" />
                    <div className={styles.div1}>이용약관</div>
                </div>
            </div>
        </div>);
};

export default Footer;
