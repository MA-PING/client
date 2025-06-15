"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/header.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";
import { useMediaQuery } from 'react-responsive'
import {useEffect, useState} from "react";
import Search from "@/component/Search";


const Header:NextPage = () => {
    const pathname = usePathname()
    // 컴포넌트가 클라이언트에 마운트되었는지 추적하는 상태
    const [isClient, setIsClient] = useState(false);

    // 미디어 쿼리 훅
    // isClient가 true가 된 후 정확한 값을 반환하게 됩니다.
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1281px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 901px)' }); // 태블릿 및 데스크탑 포함
    const isMobile = useMediaQuery({ query: '(max-width: 1280px)' }); // 모바일 (900px 이하 태블릿 포함)

    useEffect(() => {
        // 이 useEffect는 클라이언트에서 초기 렌더링 후 한 번만 실행됩니다.
        setIsClient(true);
    }, []); // 빈 의존성 배열은 마운트 시 1회 실행을 의미합니다.
    return (
        <div className={styles.header}>
            <div className={styles.logoMaping}>
                <Link href="/" className={styles.logo}>
                    <Image className={styles.logoMapingIcon} width={30} height={22} alt="메인 페이지로 바로 가기" src="/icons/Maping.svg" />
                    <Image className={styles.logoIcon} width={130} height={20} alt="메인 페이지로 바로 가기" src="/icons/Logo.svg" />
                </Link>
            </div>
            {isClient && isTablet &&
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
                    {isDesktopOrLaptop &&
                        <div className={styles.search}>
                            <Search/>
                        </div>

                    }
                </div>
            }

            <div className={styles.button}>
                {isClient && isMobile &&
                    <Image className={styles.icon} width={18} height={18} alt="" src="/icons/search.svg" />
                }
                <Image className={styles.icon} width={40} height={40} alt="" src="/icons/profile.png" />
            </div>
        </div>);
};

export default Header;
