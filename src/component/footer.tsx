"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/footer.module.css';
import Link from "next/link";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loginfooter from "@/component/login/loginfooter";
import Signupfooter from "@/component/signup/signupfooter"

const Footer:NextPage = () => {
    const pathname = usePathname();

    const [isClient, setIsClient] = useState(false);

    const isDesktop = useMediaQuery({ query: '(min-width: 901px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' }); // 모바일 (900px 이하 태블릿 포함)

    useEffect(() => {
        // 이 useEffect는 클라이언트에서 초기 렌더링 후 한 번만 실행됩니다.
        setIsClient(true);
    }, []); // 빈 의존성 배열은 마운트 시 1회 실행을 의미합니다.

    if(pathname == '/login') {
        return (
            <Loginfooter/>

        );
    }
    if(pathname == '/signup') {
        return (
    <Signupfooter/>
        );
    }

    if (!isClient) {
        return null; // 또는 로딩 스피너, 또는 기본 비반응형 푸터
    }
    return (
        <div className={styles.footer}>
            {isClient && isDesktop &&
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div className={styles.wrapLogo}>
                            <div className={styles.logoMaping}>
                                <Link href="/" className={styles.logo}>
                                    <Image className={styles.logoMapingIcon} width={30} height={22} alt="메인 페이지로 바로 가기" src="/icons/Maping.svg" />
                                    <Image className={styles.logoIcon} width={130} height={20} alt="메인 페이지로 바로 가기" src="/icons/Logo.svg" />
                                </Link>
                            </div>
                            <div className={styles.div}>나에게 딱 맞는 메이플 길라잡이 메이핑</div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.div1}>개인정보처리방침</div>
                            <Image className={styles.infoChild} width={1} height={10} alt="" src="/icons/Vector 1.svg" />
                            <div className={styles.div2}>이용약관</div>
                        </div>
                        <div className={styles.info1}>
                            <div className={styles.div}>Data based on NEXON Open API</div>
                            <div className={styles.div}>@2025 MA-PING All Rights Reserved</div>
                            <div className={styles.div}>MA-PING is not associated with NEXON Korea and does not provide any warranty.</div>
                        </div>
                    </div>
                    <div className={styles.shortcut}>
                        <div className={styles.content}>
                            <div className={styles.wrapQuickPanel}>
                                <div className={styles.title}>
                                    <div className={styles.faq}>바로가기</div>
                                </div>
                                <div className={styles.quickPanel}>
                                    <div className={styles.faq}>내 캐릭터 정보</div>
                                    <div className={styles.faq}>시뮬레이터</div>
                                    <div className={styles.faq}>랭커정보</div>
                                    <div className={styles.faq}>즐겨찾기</div>
                                    <div className={styles.faq}>내 계정 설정</div>
                                </div>
                            </div>
                            <div className={styles.wrapFaq}>
                                <div className={styles.wrapQuickPanel}>
                                    <div className={styles.title}>
                                        <div className={styles.faq}>FAQ</div>
                                    </div>
                                    <div className={styles.quickPanel1}>
                                        <Image className={styles.snskakaotalkIcon} width={30} height={23} alt="" src="/icons/discord.svg" />
                                        <Image className={styles.snskakaotalkIcon} width={48} height={48} alt="" src="/icons/kakaotalk.svg" />
                                    </div>
                                </div>
                                <div className={styles.div}>
                                    <p className={styles.p}>오류 제보, 건의 사항, 궁금하신 점은</p>
                                    <p className={styles.p}>디스코드나 오픈채팅을 이용해주세요!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isClient && isMobile &&
                <div className={styles.content}>
                    <div className={styles.container}>
                        <div className={styles.wrapLogo}>
                            <div className={styles.logoMapingParent}>
                                <div className={styles.logoMaping}>
                                    <Link href="/" className={styles.logo}>
                                        <Image className={styles.logoMapingIcon} width={25} height={18} alt="메인 페이지로 바로 가기" src="/icons/Maping.svg" />
                                        <Image className={styles.logoIcon} width={117} height={18} alt="메인 페이지로 바로 가기" src="/icons/Logo.svg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.div}>나에게 딱 맞는 메이플 길라잡이 메이핑</div>
                        </div>
                        <div className={styles.wrapQuickPanel}>
                            <div className={styles.title}>
                                <div className={styles.ai}>바로가기</div>
                            </div>
                            <div className={styles.quickPanel}>
                                <div className={styles.ai}>메이 AI 챗봇</div>
                                <div className={styles.ai}>내 캐릭터 정보</div>
                                <div className={styles.ai}>시뮬레이터</div>
                                <div className={styles.ai}>랭커정보</div>
                                <div className={styles.ai}>즐겨찾기</div>
                                <div className={styles.ai}>내 계정 설정</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.shortcut}>
                        <div className={styles.info}>
                            <div className={styles.div7}>개인정보처리방침</div>
                            <Image className={styles.infoChild} width={1} height={10} alt="" src="/icons/Vector 1.svg" />
                            <div className={styles.div8}>이용약관</div>
                        </div>
                        <div className={styles.container1}>
                            <div className={styles.title}>
                                <div className={styles.ai}>FAQ</div>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.quickPanel1}>
                                    <Image className={styles.snskakaotalkIcon} width={40} height={40} alt="" src="/icons/discord.svg" />
                                    <Image className={styles.snskakaotalkIcon} width={40} height={40} alt="" src="/icons/kakaotalk.svg" />
                                </div>
                                <div className={styles.div}>
                                    <p className={styles.p}>오류 제보, 건의 사항, 궁금하신 점은</p>
                                    <p className={styles.p}>디스코드나 오픈채팅을 이용해주세요!</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.info1}>
                            <div className={styles.div}>Data based on NEXON Open API</div>
                            <div className={styles.div}>@2025 MA-PING All Rights Reserved</div>
                            <div className={styles.div}>MA-PING is not associated with NEXON Korea and does not provide any warranty.</div>
                        </div>
                    </div>
                </div>
            }
        </div>);
};
export default Footer;
