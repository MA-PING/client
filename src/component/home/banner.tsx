import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/banner.module.css';


const Banner:NextPage = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.home}>
                <div className={styles.logocharacter}>
                    <div className={styles.display}>
                        <div className={styles.title}>
                            <div className={styles.div}>나에게 딱 맞는 메이플 길라잡이</div>
                        </div>
                        <Image className={styles.logoMapingIcon} width={260} height={40} alt="" src="/icons/Logo.svg" />
                        <Image className={styles.maskGroupIcon} width={64} height={64} alt="" src="/icons/maple.png" />
                    </div>
                    <div className={styles.character}>
                        <video className={styles.vidIcon} width="384" height="526" autoPlay loop muted>
                            <source src="/images/MAPING.webm" type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className={styles.wrap}>
                    <div className={styles.search}>
                        <Image className={styles.icon} width={24} height={24} alt="" src="icons/Group 1.svg" />
                        <div className={styles.div1}>캐릭터 이름을 검색해 주세요</div>
                    </div>
                    <div className={styles.ai}>
                        <div className={styles.ai1}>메이 AI 추천 질문</div>
                        <div className={styles.wrapRecommend}>
                            <div className={styles.div2}>
                                <div className={styles.inPageNavigationLarge}>
                                    <div className={styles.wrapTitle}>
                                        <Image className={styles.icon} width={24} height={24} alt="" src="/icons/search.svg" />
                                        <div className={styles.title1}>
                                            <div className={styles.div3}>본캐 맞춤 추천 질문</div>
                                            <div className={styles.div4}>오늘 17:28 / 칸데르니아 (본캐) 기준</div>
                                        </div>
                                    </div>
                                    <div className={styles.list}>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>1</div>
                                            </div>
                                            <div className={styles.div6}>230레벨 이후 사냥터 추천</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>2</div>
                                            </div>
                                            <div className={styles.div6}>캐릭터 레벨업이 느려진 이유는 무엇 때문인가요?</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>3</div>
                                            </div>
                                            <div className={styles.div6}>링크 스킬과 유니온이 뭔가요?</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic6}>
                                            <div className={styles.inPageNavigationAtomic7}>
                                                <div className={styles.div}>4</div>
                                            </div>
                                            <div className={styles.div6}>무자본 스킬트리 추천</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic6}>
                                            <div className={styles.inPageNavigationAtomic7}>
                                                <div className={styles.div}>5</div>
                                            </div>
                                            <div className={styles.div6}>소과금으로 효율적인 육성하는 방법</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.div2}>
                                <div className={styles.inPageNavigationLarge}>
                                    <div className={styles.wrapTitle}>
                                        <Image className={styles.icon} width={24} height={24} alt="" src="/icons/search.svg" />
                                        <div className={styles.title1}>
                                            <div className={styles.div3}>유저들이 자주 하는 질문</div>
                                            <div className={styles.div4}>오늘 17:28 기준</div>
                                        </div>
                                    </div>
                                    <div className={styles.list}>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>1</div>
                                            </div>
                                            <div className={styles.div6}>230레벨 이후 사냥터 추천</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>2</div>
                                            </div>
                                            <div className={styles.div6}>캐릭터 레벨업이 느려진 이유는 무엇 때문인가요?</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic}>
                                            <div className={styles.inPageNavigationAtomic1}>
                                                <div className={styles.div5}>3</div>
                                            </div>
                                            <div className={styles.div6}>링크 스킬과 유니온이 뭔가요?</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic6}>
                                            <div className={styles.inPageNavigationAtomic7}>
                                                <div className={styles.div}>4</div>
                                            </div>
                                            <div className={styles.div6}>무자본 스킬트리 추천</div>
                                        </div>
                                        <div className={styles.inPageNavigationAtomic6}>
                                            <div className={styles.inPageNavigationAtomic7}>
                                                <div className={styles.div}>5</div>
                                            </div>
                                            <div className={styles.div6}>소과금으로 효율적인 육성하는 방법</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Banner;
