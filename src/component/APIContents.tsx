import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../styles/APIContents.module.css';


const APIContents:NextPage = () => {
    return (
        <div className={styles.apiContents}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <div className={styles.kingkoo}>{`어서오세요 KingKoo님! `}</div>
                    <div className={styles.aiContainer}>
            						<span className={styles.aiContainer1}>
              							<p className={styles.ai}>{`메이 AI가 당신을 기다리면서 본캐 분석을 마쳤어요😎 `}</p>
              							<p className={styles.ai}>딱 맞는 육성 팁이 준비되어 있으니 지금 바로 확인해 보세요!</p>
            						</span>
                    </div>
                </div>
                <div className={styles.ctaApi}>
                    <div className={styles.wrapImg}>
                        <Image className={styles.imageIcon} width={790} height={424} alt="" src="/images/characterBackground.png" />
                        <Image className={styles.image156Icon} width={240} height={240} alt="" src="/images/characterImage.png" />
                    </div>
                    <div className={styles.container1}>
                        <div className={styles.button}>
                            <div className={styles.button1}>내 캐릭터 정보 확인하기</div>
                        </div>
                    </div>
                    <div className={styles.wrapChange}>
                        <div className={styles.statusIndicator}>
                            <div className={styles.wrapAlert}>
                                <div className={styles.alert}>
                                    <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/circle_succes.svg" />
                                    <div className={styles.apiKey}>API Key 연결됨</div>
                                </div>
                                <div className={styles.apiKey}>:</div>
                                <div className={styles.apiKey}>고오스케키</div>
                            </div>
                        </div>
                        <div className={styles.button2}>
                            <Image className={styles.icon} width={20} height={20} alt="" src="/icons/icon.svg" />
                        </div>
                    </div>
                </div>
                <div className={styles.wrapChange1}>
                    <div className={styles.statusIndicator}>
                        <div className={styles.wrapAlert}>
                            <div className={styles.alert}>
                                <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/circle_succes.svg" />
                                <div className={styles.apiKey}>API Key 연결됨</div>
                            </div>
                            <div className={styles.apiKey}>:</div>
                            <div className={styles.apiKey}>고오스케키</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.aiApiConnected}>
                <div className={styles.title1}>
                    <div className={styles.kingkoo}>메이 AI 도우미</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.content1}>
                        <div className={styles.characterStatus}>
                            <Image className={styles.characterApiConnectedIcon} width={160} height={160} alt="" src="/images/character-api-connected.png" />
                        </div>
                        <div className={styles.statusIndicator}>
                            <div className={styles.wrapAlert}>
                                <div className={styles.alert}>
                                    <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/circle_succes.svg" />
                                    <div className={styles.apiKey}>API Key 연결됨</div>
                                </div>
                                <div className={styles.apiKey}>:</div>
                                <div className={styles.apiKey}>고오스케키</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ai2}>
                        <div className={styles.content2}>
                            <div className={styles.container2}>
                                <div className={styles.wrapAlert3}>
                                    <div className={styles.alert}>
                                        <Image className={styles.icon} width={20} height={20} alt="" src="/icons/circle_danger.svg" />
                                        <div className={styles.button1}>링크스킬 / 유니온</div>
                                    </div>
                                    <div className={styles.div5}>링크스킬과 유니온이 부족해요! 새로운 부캐릭터를 생성하고 전투력을 보강해보세요.</div>
                                </div>
                                <div className={styles.button3}>
                                    <div className={styles.button1}>더 알아보기</div>
                                    <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/next.svg" />
                                </div>
                            </div>
                            <div className={styles.container2}>
                                <div className={styles.wrapAlert3}>
                                    <div className={styles.alert}>
                                        <Image className={styles.icon} width={20} height={20} alt="" src="/icons/circle_danger.svg" />
                                        <div className={styles.button1}>장비</div>
                                    </div>
                                    <div className={styles.div5}>고오스케키님이 착용중인 장비가 현재 레벨에 비해 낮아요! 새로운 장비를 장만해보는건 어떠세요?</div>
                                </div>
                                <div className={styles.button5}>
                                    <div className={styles.button1}>더 알아보기</div>
                                    <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/next.svg" />
                                </div>
                            </div>
                            <div className={styles.container2}>
                                <div className={styles.wrapAlert3}>
                                    <div className={styles.alert3}>
                                        <div className={styles.alert}>
                                            <Image className={styles.icon} width={20} height={20} alt="" src="/icons/circle_danger.svg" />
                                            <div className={styles.button1}>레벨링</div>
                                        </div>
                                    </div>
                                    <div className={styles.div5}>최근 경험치 상승률이 예전보다 10% 줄었어요. 새로운 사냥터로 이동하는건 어떠세요?</div>
                                </div>
                                <div className={styles.button5}>
                                    <div className={styles.button1}>더 알아보기</div>
                                    <Image className={styles.iconcircleSuccess} width={16} height={16} alt="" src="/icons/next.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default APIContents;
