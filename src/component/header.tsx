"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/header.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";


const Header:NextPage = () => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div className={styles.header}>
            <div className={styles.logoMaping}>
                <Link href="/" className={styles.logo}>
                    <Image className={styles.logoMapingIcon} width={30} height={22} alt="메인 페이지로 바로 가기" src="/icons/Maping.svg" />
                    <Image className={styles.logoIcon} width={130} height={20} alt="메인 페이지로 바로 가기" src="/icons/Logo.svg" />
                </Link>
            </div>
            <div className={styles.button}>
                <Image className={styles.icon} width={40} height={40} alt="" src="/icons/profile.png" />
            </div>
            <div className={styles.container}>
                <div className={styles.wrapItem}>
                    <Link href="/" className={pathname === "/" ? styles.item1 : styles.item}>
                        <div className={styles.div}>홈</div>
                    </Link>
                    <Link href="/my-character" className={pathname === "/my-character" ? styles.item1 : styles.item2}>
                        <div className={styles.div1}>내 캐릭터 정보</div>
                    </Link>
                    <Link href="/simulator" className={pathname === "/simulator" ? styles.item1 : styles.item2}>
                        <div className={styles.div1}>시뮬레이터</div>
                    </Link>
                    <Link href= "/ranking" className={pathname === "/ranking" ? styles.item1 : styles.item2}>
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
