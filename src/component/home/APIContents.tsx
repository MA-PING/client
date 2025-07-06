'use client'
import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/APIContents.module.css';
import {useState} from "react";
import {getApiCheck} from "@/utils/apiCheck";
import {setCookie} from "cookies-next";
import BannerModal from "@/component/bannerModal";
import {characterMainList} from "@/interfaces/character";
interface ApiBody {
    apiKey: string;
}
const APIContents: NextPage = () => {
    // const router = useRouter();

    // API 키 입력 필드의 값을 저장하는 상태 변수
    const [inputValue, setInputValue] = useState<string>('');
    const [showMiniCharacter, setShowMiniCharacter] = useState<boolean>(false);
    const [characterData, setCharacterData] = useState<characterMainList | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputButtonClick = async () => {
        if (!inputValue.trim()) {
            return;
        }
        if (!inputValue.startsWith('test_') && !inputValue.startsWith('live_')) {
            return;
        }


        const body: ApiBody = {
            apiKey: inputValue.trim(),
        };

        const response = await getApiCheck(body);

        if (response && response.data) { // API 응답이 성공적이고 데이터가 존재하면
            console.log("API 체크 성공:", response);

            try {
                // API 키를 Base64로 인코딩하여 암호화
                const encryptedApiKey = btoa(inputValue.trim());

                // 암호화된 API 키를 쿠키에 저장
                setCookie('ApiKey', encryptedApiKey, { maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

                const mainCharacter = response?.data.find((c: characterMainList) => c.main_character);
                if (mainCharacter) {
                    setCharacterData(mainCharacter);
                    setShowMiniCharacter(true); // MiniCharacter 표시
                } else {
                    setShowMiniCharacter(false);
                    setCharacterData(null);
                }

            } catch (cookieError) {
                console.error("쿠키 저장 또는 리다이렉트 중 오류 발생:", cookieError);
            }

        }
    };
    const [showModal, setShowModal] = useState(false)
    const clickModal = () => setShowModal(!showModal)
    return (
        <div className={styles.apiContents}>
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
                        <Image
                            className={styles.characterBgImage}
                            src="/images/characterBackground.avif"
                            alt="캐릭터 배경 이미지"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <Image className={styles.characterImage} width={240} height={240} alt="대표 캐릭터" src={characterData?.character_image || "/images/no-character.png"} />
                    <div className={styles.apiKeyInfo}>
                        {!showMiniCharacter && characterData === null ?
                            <div className={styles.NostatusIndicator}>
                                <Image width={16} height={16} alt="실패 아이콘" src="/icons/circle_danger.svg" />
                                <span>API Key 열결 필요 : N/A</span>
                            </div>:
                            <div className={styles.statusIndicator}>
                                <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg" />
                            <span>API Key 연결됨 : {characterData?.character_name}</span>
                        </div>
                        }
                        <button className={styles.changeButton} aria-label="API 키 변경">
                            <Image width={20} height={20} alt="변경" src="/icons/change.svg" />
                        </button>
                    </div>
                    {/*<button className={styles.ctaButton}>내 캐릭터 정보 확인하기</button>*/}
                    <div className={styles.container}>
                        <div className={styles.wrapInput}>
                            <div className={styles.textInput}>
                                <div className={styles.textInput1}>
                                    <input
                                        className={styles.div1}
                                        type="text"
                                        placeholder="API Key를 입력해주세요"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className={styles.wrapBtn}>
                                <button className={styles.button1} onClick={handleInputButtonClick}>
                                    <div className={styles.button2}>입력하기</div>
                                </button>
                                <button className={styles.button3} onClick={clickModal}>
                                    <div className={styles.button2}>API Key 가이드</div>
                                </button>
                            </div>
                        </div>
                    </div>
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
                        {!showMiniCharacter && characterData === null ?
                            <div className={styles.NoaiApiKeyStatus}>
                                <Image width={16} height={16} alt="실패 아이콘" src="/icons/circle_danger.svg" />
                                <span>API Key 열결 필요 : N/A</span>
                            </div>:
                            <div className={styles.aiApiKeyStatus}>
                                <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg" />
                                <span>API Key 연결됨 : {characterData?.character_name}</span>
                            </div>
                        }
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
            {showModal &&
                <BannerModal onClose={clickModal}/>
            }
        </div>
    );
};

export default APIContents;