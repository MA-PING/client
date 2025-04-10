


import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/footer.module.css';
import Link from "next/link";

const Footer:NextPage = () => {
    return (
        <div className={styles.footer}>
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
        </div>);
};
export default Footer;
