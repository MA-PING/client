import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/header.module.css';
import Link from "next/link";


const Header:NextPage = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logoMaping}>
                <div className={styles.logo}>
                    <Image className={styles.logoIcon}  width={195} height={31} alt="" src="/icons/logo-maping.png" />
                </div>
            </div>
            <div className={styles.button}>
                <Image className={styles.icon} width={40} height={40} alt="" src="/icons/profile.png" />
            </div>
            <div className={styles.container}>
                <div className={styles.wrapItem}>
                    <Link href="/" className={styles.item}>
                        <div className={styles.div}>홈</div>
                    </Link>
                    <Link href="my-character" className={styles.item1}>
                        <div className={styles.div1}>내 캐릭터 정보</div>
                    </Link>
                    <Link href="simulator" className={styles.item2}>
                        <div className={styles.div1}>시뮬레이터</div>
                    </Link>
                    <Link href="ranking" className={styles.item2}>
                        <div className={styles.div1}>랭커정보</div>
                    </Link>
                </div>
                <div className={styles.search}>
                    <Image className={styles.icon1} width={16} height={16} alt="" src="/icons/Group 1.svg" />
                    <div className={styles.div4}>내용을 입력해주세요</div>
                </div>
            </div>
        </div>);
};

export default Header;
