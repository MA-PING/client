import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/APIContents.module.css';

const APIContents: NextPage = () => {
    return (
        <section className={styles.apiContents}>
            {/* 상단 환영 메시지 및 캐릭터 정보 섹션 */}
            <div className={styles.heroSection}>
                <div className={styles.title}>
                    <h2 className={styles.welcomeTitle}>{`어서오세요 KingKoo님! `}</h2>
                    <div className={styles.aiMessage}>
                        <p>{`메이 AI가 당신을 기다리면서 본캐 분석을 마쳤어요😎 `}</p>
                        <p>{`딱 맞는 육성 팁이 준비되어 있으니 지금 바로 확인해 보세요!`}</p>
                    </div>
                </div>

                {/* 캐릭터 정보 카드 */}
                <div className={styles.characterCard}>
                    <div className={styles.characterImageWrapper}>
                        <Image className={styles.characterBgImage} layout="fill" objectFit="cover" alt="캐릭터 배경" src="/images/characterBackground.avif" />
                    </div>
                    <Image className={styles.characterImage} width={240} height={240} alt="대표 캐릭터" src="/images/no-character.png" />
                    <div className={styles.apiKeyInfo}>
                        <div className={styles.statusIndicator}>
                            <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg" />
                            <span>API Key 연결됨 : 고오스케키</span>
                        </div>
                        <button className={styles.changeButton} aria-label="API 키 변경">
                            <Image width={20} height={20} alt="변경" src="/icons/change.svg" />
                        </button>
                    </div>
                    <button className={styles.ctaButton}>내 캐릭터 정보 확인하기</button>
                </div>
            </div>

            {/* AI 도우미 섹션 */}
            <div className={styles.aiAssistantSection}>
                <h3 className={styles.sectionTitle}>메이 AI 도우미</h3>
                <div className={styles.aiContent}>
                    {/* AI 캐릭터 상태 */}
                    <div className={styles.aiCharacterStatus}>
                        <div className={styles.aiCharacterImageWrapper}>
                            <Image className={styles.aiCharacterImage} width={160} height={160} alt="AI 도우미 캐릭터" src="/images/character-api-connected.png" />
                        </div>
                        <div className={styles.aiApiKeyStatus}>
                            <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg" />
                            <span>API Key 연결됨 : 고오스케키</span>
                        </div>
                    </div>

                    {/* AI 분석 내용 */}
                    <div className={styles.aiAnalysis}>
                        {/* 분석 아이템 1: 링크스킬 */}
                        <div className={styles.analysisItem}>
                            <div className={styles.analysisText}>
                                <div className={styles.analysisTitle}>
                                    <Image width={20} height={20} alt="경고" src="/icons/x.svg" />
                                    <h4>링크스킬</h4>
                                </div>
                                <p>링크스킬 레벨 총합이 전체 유저 평균보다 12레벨 낮아요! 부캐를 키워서 보강해보세요.</p>
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg" />
                            </button>
                        </div>
                        {/* 분석 아이템 2: 유니온 */}
                        <div className={styles.analysisItem}>
                            <div className={styles.analysisText}>
                                <div className={styles.analysisTitle}>
                                    <Image width={20} height={20} alt="경고" src="/icons/x.svg" />
                                    <h4>유니온</h4>
                                </div>
                                <p>유니온 레벨이 동레벨대 유저 평균보다 35% 낮아요! 부캐를 더 육성해서 레벨을 높여보세요.</p>
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg" />
                            </button>
                        </div>
                        {/* 분석 아이템 3: 레벨링 */}
                        <div className={styles.analysisItem}>
                            <div className={styles.analysisText}>
                                <div className={styles.analysisTitle}>
                                    <Image width={20} height={20} alt="경고" src="/icons/x.svg" />
                                    <h4>레벨링</h4>
                                </div>
                                <p>최근 경험치 상승률이 예전보다 10% 줄었어요. 새로운 사냥터로 이동하는건 어떠세요?</p>
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default APIContents;