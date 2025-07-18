"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/header.module.css'; // 기존 헤더 스타일
import drawerStyles from '../styles/drawer.module.css'; // 새로 추가된: 드로어 전용 스타일
import Link from "next/link";
import {usePathname} from "next/navigation";
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState} from "react";
import Search from "@/component/Search";

// MUI 컴포넌트
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {clearUserData} from "@/redux/userSlice";
import {Popover} from "@mui/material";
import {serverLogout} from "@/app/actions";
import {getLogout} from "@/utils/apiLogout";
import MobileSearch from "@/component/search/mobileSearch";
// import {refreshUserData} from "@/app/actions";

const Header:NextPage = () => {
    const dispatch = useDispatch();
    const pathname = usePathname()
    const [isClient, setIsClient] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [isSearch, setSearch] = useState(false)
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1281px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 901px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1280px)' });
    const isMobile900 = useMediaQuery({ query: '(max-width: 901px)' });
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const search = (bool: boolean) => {
        setSearch(bool)
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const userInfoRedux = useSelector((state: RootState) => state.userInfo);

    useEffect(() => {

        setIsClient(true);

        if (userInfoRedux.userName) {
            setLogin(true);
            // console.log(1)
        }else {
            setLogin(false)
            // console.log(2)
        }

    }, [userInfoRedux.userName]);

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
    const handleLogout = async () => {
        if (userInfoRedux.accessToken){
            await getLogout(userInfoRedux.accessToken);
        }
        setDrawerOpen(false);
        dispatch(clearUserData());
        await serverLogout();
        window.location.reload();
        // router.push('/');
    };

    const drawerList = (
        <Box
            className={drawerStyles.typetabletmobileLoginno}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {!isLogin && (
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
            )}
            {isLogin && (
                <div className={styles.maping}>{userInfoRedux.userName}님 안녕하세요!</div>
            )}
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

                {isLogin && (
                    <>
                        <div className={drawerStyles.divider}></div>
                        <div className={drawerStyles.wrapItem}>
                            <Link href="/" passHref legacyBehavior>
                                <a className={drawerStyles.menuAtomic}>
                                    <Image className={styles.icon} width={8} height={8} alt="즐겨찾기 아이콘" src="/icons/heart_on.svg" />
                                    <div className={drawerStyles.div}>즐겨찾기</div>
                                </a>
                            </Link>
                            <Link href="/" passHref legacyBehavior>
                                <a className={drawerStyles.menuAtomic}>
                                    <Image className={styles.icon} width={8} height={8} alt="계정 설정 아이콘" src="/icons/account.svg" />
                                    <div className={drawerStyles.div}>내 계정 설정</div>
                                </a>
                            </Link>
                        </div>
                        <div className={drawerStyles.divider}></div>
                        <button onClick={handleLogout} className={drawerStyles.menuAtomic}>
                            <Image className={styles.icon} width={8} height={8} alt="로그아웃 아이콘" src="/icons/logout.svg" />
                            <div className={drawerStyles.div}>로그아웃</div>
                        </button>
                    </>
                )}
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
                    <button className={styles.button} onClick={() => search(true)}>
                        <Image className={styles.icon} width={18} height={18} alt="검색 아이콘" src="/icons/search.svg"/>
                    </button>}
                {isClient && isTablet && !isLogin &&
                    <Link href='/login' className={styles.buttonLongin}>
                        <div className={styles.button1}>로그인</div>
                    </Link>
                }
                {isClient && isTablet && isLogin &&
                    <>
                        <button className={styles.button} aria-describedby={id} onClick={handleClick}>
                            <div className={styles.icon}>
                                <Image className={styles.ellipse16Stroke} width={24} height={24} sizes="100vw" alt="유저 아이콘" src="/icons/user.svg" />
                            </div>
                        </button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <div className={styles.typepcLoginyes}>
                                <div className={styles.maping}>{userInfoRedux.userName}님 안녕하세요!</div>
                                <div className={styles.loginContainer}>
                                    <div className={drawerStyles.wrapItem}>
                                        <Link href="/" passHref legacyBehavior>
                                            <a className={drawerStyles.menuAtomic}>
                                                <Image className={styles.icon} width={8} height={8} alt="즐겨찾기 아이콘" src="/icons/heart_on.svg" />
                                                <div className={drawerStyles.div}>즐겨찾기</div>
                                            </a>
                                        </Link>
                                        <Link href="/" passHref legacyBehavior>
                                            <a className={drawerStyles.menuAtomic}>
                                                <Image className={styles.icon} width={8} height={8} alt="계정 설정 아이콘" src="/icons/account.svg" />
                                                <div className={drawerStyles.div}>내 계정 설정</div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={drawerStyles.divider}></div>
                                    <button onClick={handleLogout} className={drawerStyles.menuAtomic}>
                                        <Image className={styles.icon} width={8} height={8} alt="로그아웃 아이콘" src="/icons/logout.svg" />
                                        <div className={drawerStyles.div}>로그아웃</div>
                                    </button>
                                </div>
                            </div>
                        </Popover>
                    </>

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
                            <Image className={styles.icon} width={40} height={40} alt="메뉴 열기" src="/icons/menu.svg" />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
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
            {isSearch && isMobile && <MobileSearch open={isSearch} onClose={() => setSearch(false)}/>}
        </div>
    );
};

export default Header;