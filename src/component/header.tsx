"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/header.module.css'; // 기존 헤더 스타일
import drawerStyles from '../styles/drawer.module.css'; // 새로 추가된: 드로어 전용 스타일
import Link from "next/link";
import {usePathname} from "next/navigation";
import { useMediaQuery } from 'react-responsive'
import {useEffect, useState} from "react";
import Search from "@/component/Search";

// MUI 컴포넌트
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';



const Header:NextPage = () => {
    const pathname = usePathname()
    const [isClient, setIsClient] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1281px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 901px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1280px)' });
    const isMobile900 = useMediaQuery({ query: '(max-width: 901px)' });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setDrawerOpen(open);
        };

    const drawerList = (
        <Box
            // MUI Box는 직접 스타일링을 위한 sx 프롭이나 className을 허용합니다.
            // 제공된 `typetabletmobileLoginno` 클래스를 사용합니다.
            className={drawerStyles.typetabletmobileLoginno}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={drawerStyles.wrapBtn}>
                <Link href="/login" passHref legacyBehavior>
                    <a className={drawerStyles.button}>
                        <Image className={styles.icon} width={8} height={8} alt="로그인 아이콘" src="/icons/login.svg" />
                        <div className={drawerStyles.button1}>로그인</div>
                    </a>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                    <a className={drawerStyles.button2}>
                        <div className={drawerStyles.button1}>회원가입</div>
                    </a>
                </Link>
            </div>
            <div className={drawerStyles.container}>
                <div className={drawerStyles.wrapItem}>
                    <Link href="/" passHref legacyBehavior>
                        <a className={drawerStyles.menuAtomic}>
                            <Image className={styles.icon} width={8} height={8} alt="홈 아이콘" src="/icons/home.svg" />
                            <div className={drawerStyles.div}>홈</div>
                        </a>
                    </Link>
                    <Link href="/my-character" passHref legacyBehavior>
                        <a className={drawerStyles.menuAtomic}>
                            <Image className={styles.icon} width={8} height={8} alt="내 캐릭터 정보 아이콘" src="/icons/characterInfo.svg" />
                            <div className={drawerStyles.div}>내 캐릭터 정보</div>
                        </a>
                    </Link>
                    <Link href="/simulator" passHref legacyBehavior>
                        <a className={drawerStyles.menuAtomic}>
                            <Image className={styles.icon} width={8} height={8} alt="시뮬레이터 정보 아이콘" src="/icons/simulator.svg" />
                            <div className={drawerStyles.div}>시뮬레이터</div>
                        </a>
                    </Link>
                    <Link href="/ranking" passHref legacyBehavior>
                        <a className={drawerStyles.menuAtomic}>
                            <Image className={styles.icon} width={8} height={8} alt="랭커 정보 아이콘" src="/icons/ranking.svg" />
                            <div className={drawerStyles.div}>랭커 정보</div>
                        </a>
                    </Link>
                </div>
                {/* 구분선 */}
                {/*<div className={drawerStyles.divider}></div>*/}
                {/*<div className={drawerStyles.wrapItem}> */}
                {/*    <Link href="/favorites" passHref legacyBehavior>*/}
                {/*        <a className={drawerStyles.menuAtomic}>*/}
                {/*            /!*<BookmarkIcon />*!/*/}
                {/*            <div className={drawerStyles.div}>즐겨찾기</div>*/}
                {/*        </a>*/}
                {/*    </Link>*/}
                {/*    <Link href="/account-settings" passHref legacyBehavior>*/}
                {/*        <a className={drawerStyles.menuAtomic}>*/}
                {/*            /!*<AccountSettingsIcon />*!/*/}
                {/*            <div className={drawerStyles.div}>내 계정 설정</div>*/}
                {/*        </a>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*/!* 구분선 *!/*/}
                {/*<div className={drawerStyles.divider}></div>*/}
                {/*/!* 로그아웃 항목 *!/*/}
                {/*<Link href="/logout" passHref legacyBehavior>*/}
                {/*    <a className={drawerStyles.menuAtomic + ' ' + drawerStyles.menuAtomic6}> /!* menuAtomic6이 특정 로그아웃 스타일을 추가한다면 유지, 아니라면 제거 *!/*/}
                {/*        /!*<LogoutIcon />*!/*/}
                {/*        <div className={drawerStyles.div}>로그아웃</div>*/}
                {/*    </a>*/}
                {/*</Link>*/}
            </div>
        </Box>
    );

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
                            <div className={styles.div1}>홈</div>
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
                            <Search header={true}/>
                        </div>

                    }
                </div>
            }
            <div className={styles.wrapBtn}>
                {isClient && isMobile &&
                    <div className={styles.button}>
                        <Image className={styles.icon} width={18} height={18} alt="" src="/icons/search.svg"/>
                    </div>}
                {isClient && isTablet &&
                    <Link href='/login' className={styles.buttonLongin}>
                        <div className={styles.button1}>로그인</div>
                    </Link>
                }
                {isClient && isMobile900 && (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: 1 }}
                        >
                            {/* 사용자 정의 메뉴 아이콘 이미지를 사용합니다. */}
                            <Image className={styles.icon} width={40} height={40} alt="메뉴 열기" src="/icons/menu.svg" />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            // 선택적으로, Drawer의 paper 컴포넌트 스타일을 지정하기 위해 PaperProps를 추가합니다.
                            PaperProps={{
                                sx: {
                                    // width: drawerStyles.typetabletmobileLoginno.width, // CSS 모듈에서 드로어 너비 설정
                                    // 드로어 크기를 어떻게 하고 싶은지에 따라 이 부분을 조정해야 할 수 있습니다.
                                    // 또는 필요하다면 여기에 `width: '334px'`와 같이 고정 너비를 직접 설정할 수도 있습니다.
                                    width: '334px',
                                    maxHeight: '100vh', // 뷰포트 높이를 넘지 않도록 보장
                                }
                            }}
                        >
                            {drawerList}
                        </Drawer>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;