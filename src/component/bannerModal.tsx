import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/bannerModal.module.css';
import {useRouter} from "next/navigation";
import {useState, useRef, useEffect} from "react"; // useRef, useEffect 추가
import {getApiCheck} from "@/utils/apiCheck";
import {setCookie} from "cookies-next";
import Portal from "@/component/Portal";
import MiniCharacter from "@/component/character/miniCharacter";
import {characterMainList} from "@/interfaces/character";

interface ApiBody {
    apiKey: string;
}

interface BannerModalProps {
    onClose: () => void
}

const BannerModal: NextPage<BannerModalProps> = ({onClose}) => {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCheck, setCheck] = useState<string>('')
    const [showMiniCharacter, setShowMiniCharacter] = useState<boolean>(false);
    const [characterData, setCharacterData] = useState<characterMainList | null>(null);

    const [miniCharacterModalStyle, setMiniCharacterModalStyle] = useState<React.CSSProperties>({});

    const apiKeyInputRef = useRef<HTMLInputElement>(null);
    const checkButtonRef = useRef<HTMLButtonElement>(null);


    const handleCloseMiniCharacter = () => {
        setShowMiniCharacter(false);
        setCharacterData(null); // 캐릭터 데이터도 초기화 (필요시)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError(null);
    };

    const handlePage = (p: number) => {
        setPage(p)
    }

    const inputContainerClassName = error
        ? styles.textInputError
        : inputValue.trim() !== ''
            ? styles.textInputText
            : styles.textInput1;

    const handleInputCheckButtonClick = async () => {
        if (!inputValue.trim()) {
            setError('API 키는 비워둘 수 없습니다.');
            return;
        }
        if (!inputValue.startsWith('test_') && !inputValue.startsWith('live_')) {
            setError('API 키는 "test_" 또는 "live_"로 시작해야 합니다.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const body: ApiBody = {
            apiKey: inputValue.trim(),
        };

        const response = await getApiCheck(body);
        setIsLoading(false);

        if (response && response.data) {
            console.log("API 체크 성공:", response);
            setCheck(inputValue.trim());
            const mainCharacter = response?.data.find((c: characterMainList) => c.main_character);
            if (mainCharacter) {
                setCharacterData(mainCharacter);
                setShowMiniCharacter(true); // MiniCharacter 표시
            } else {
                setError('메인 캐릭터 정보를 찾을 수 없습니다.');
                setShowMiniCharacter(false);
                setCharacterData(null);
            }
        } else {
            setError('정보를 불러올 수 없어요. 다시 입력해주세요.');
        }
    };

    const handleInputClick = async () => {
        if (!inputValue.trim()) {
            setError('API 키는 비워둘 수 없습니다.');
            return;
        }
        if (!inputValue.startsWith('test_') && !inputValue.startsWith('live_')) {
            setError('API 키는 "test_" 또는 "live_"로 시작해야 합니다.');
            return;
        }
        setIsLoading(true);
        setError(null);
        if (isCheck === inputValue.trim()){
            try {
                const encryptedApiKey = btoa(inputValue.trim());
                setCookie('ApiKey', encryptedApiKey, {
                    maxAge: 60 * 60 * 24 * 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });
                router.push('/list');
            } catch (cookieError) {
                console.error("쿠키 저장 또는 리다이렉트 중 오류 발생:", cookieError);
                setError('정보를 불러올 수 없어요. 다시 입력해주세요.');
            }
        }else {
            setError('API 키를 확인해주세요.')
        }
    }

    useEffect(() => {
        const updateMiniCharacterModalPosition = () => {
            const targetElement = checkButtonRef.current;
            const miniCharacterWidth = 220;
            const miniCharacterHeight = 300;
            const marginFromButton = 10;
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                setMiniCharacterModalStyle({
                    position: 'absolute',
                    top: `${rect.top + window.scrollY - miniCharacterHeight - marginFromButton}px`,
                    left: `${rect.left + window.scrollX + (rect.width / 2) - (miniCharacterWidth / 2) - 50}px`,
                    zIndex: 1001,
                });
            }
        };

        if (showMiniCharacter) {
            updateMiniCharacterModalPosition();
            window.addEventListener('resize', updateMiniCharacterModalPosition);
            window.addEventListener('scroll', updateMiniCharacterModalPosition, true);
        }

        return () => {
            window.removeEventListener('resize', updateMiniCharacterModalPosition);
            window.removeEventListener('scroll', updateMiniCharacterModalPosition, true);
        };
    }, [showMiniCharacter, characterData]); // showMiniCharacter가 변경될 때마다 실행

    return (
        <div className={styles.dim}>
            <div className={styles.api}>
                <div className={styles.apiGuide}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <div className={styles.api1}>API 발급 방법</div>
                            <div className={styles.nexonOpenApi}>아래 버튼을 눌러 NEXON OPEN API에 접속해주세요</div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.wrap}>
                                <div className={styles.api01}>
                                    {page === 1 &&
                                        <button className={styles.button}
                                                onClick={() => window.open("https://openapi.nexon.com/ko/my-application/create-app/")}>
                                            <div className={styles.button1}>NEXON Open API
                                                <span className={styles.span}> 바로가기</span>
                                            </div>
                                        </button>}
                                    {page === 2 &&
                                        <Image fill src="/images/api2.png" alt="API 발급 방법1"/>
                                    }
                                    {page === 3 &&
                                        <Image fill src="/images/api3.png" alt="API 발급 방법2"/>
                                    }
                                    {page === 4 &&
                                        <Image fill src="/images/api4.png" alt="API 발급 방법3"/>
                                    }
                                    {page === 5 &&
                                        <Image fill src="/images/api5.png" alt="API 발급 방법4"/>
                                    }
                                </div>
                                <div className={styles.carousel}>
                                    {page !== 1 ?
                                        <button className={styles.carouselArrow1} onClick={() => handlePage(page-1)}>
                                            <Image className={styles.itemIcon} width={18} height={18} sizes="100vw" alt=""
                                                   src="/icons/arrow_left.svg"/>
                                        </button>:
                                        <button className={styles.carouselArrow}>
                                            <Image className={styles.itemIcon} width={18} height={18} sizes="100vw" alt=""
                                                   src="/icons/arrow_left.svg"/>
                                        </button>
                                    }
                                    <div className={styles.carouselDot}>
                                        <div className={page === 1 ? styles.active : styles.inactive}>
                                            <div className={page === 1 ? styles.div : styles.div1}/>
                                        </div>
                                        <div className={page === 2 ? styles.active : styles.inactive}>
                                            <div className={page === 2 ? styles.div : styles.div1}/>
                                        </div>
                                        <div className={page === 3 ? styles.active : styles.inactive}>
                                            <div className={page === 3 ? styles.div : styles.div1}/>
                                        </div>
                                        <div className={page === 4 ? styles.active : styles.inactive}>
                                            <div className={page === 4 ? styles.div : styles.div1}/>
                                        </div>
                                        <div className={page === 5 ? styles.active : styles.inactivee}>
                                            <div className={page === 5 ? styles.div : styles.div1}/>
                                        </div>
                                    </div>
                                    {page !== 5 ?
                                        <button className={styles.carouselArrow1} onClick={() => handlePage(page+1)}>
                                            <Image className={styles.itemIcon} width={18} height={18} sizes="100vw" alt=""
                                                   src="/icons/arrow_right.svg"/>
                                        </button>:
                                        <button className={styles.carouselArrow}>
                                            <Image className={styles.itemIcon} width={18} height={18} sizes="100vw" alt=""
                                                   src="/icons/arrow_right.svg"/>
                                        </button>
                                    }

                                </div>
                            </div>
                            <div className={styles.wrap1}>
                                <div className={styles.wrap2}>
                                    <form className={styles.textInput}>
                                        <div className={inputContainerClassName}>
                                            {/* useRef를 input에 연결 */}
                                            <input
                                                className={styles.div5}
                                                type="text"
                                                placeholder="API Key를 입력해주세요"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                ref={apiKeyInputRef} // 여기에 ref 연결
                                            />
                                        </div>
                                    </form>
                                    {/* useRef를 버튼에 연결 */}
                                    <button className={styles.button2} onClick={handleInputCheckButtonClick}
                                            disabled={isLoading} ref={checkButtonRef}> {/* 여기에 ref 연결 */}
                                        <div className={styles.button3}>확인하기</div>
                                    </button>
                                </div>
                                {error !== null &&
                                    <span className={styles.errorText}>
                                        <div className={styles.icon}>
                                            <Image className={styles.itemIcon} width={16} height={16} sizes="100vw" alt=""
                                                   src="/icons/x.svg"/>
                                        </div>
                                        <div className={styles.error}>{error}</div>
                                    </span>
                                }
                                <div className={styles.wrapBtn}>
                                    {showMiniCharacter && characterData && (
                                        <Portal>
                                            <MiniCharacter character={characterData} onclose={handleCloseMiniCharacter} style={miniCharacterModalStyle}/>
                                        </Portal>
                                    )}

                                    {isCheck === ''  ?
                                        <button className={styles.button4}>
                                            <div className={styles.button3}>입력하기</div>
                                        </button>:
                                        <button className={styles.buttonBlue} onClick={handleInputClick} >
                                            <div className={styles.buttonBlue1}>입력하기</div>
                                        </button>
                                    }
                                    <button className={styles.button6} onClick={onClose}>
                                        <div className={styles.button3}>닫기</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className={styles.button8} onClick={onClose}>
                            <div className={styles.icon}>
                                <Image className={styles.itemIcon} width={20} height={20} sizes="100vw" alt=""
                                       src="/icons/cancel.svg"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>);
};

export default BannerModal;