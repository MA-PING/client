'use client'
import type {NextPage} from 'next';
import Image from "next/image";
import styles from '../../styles/home/APIContents.module.css';
import { useEffect, useState} from "react";
import {getApiCheck} from "@/utils/apiCheck";
import BannerModal from "@/component/bannerModal";
import {characterMainList} from "@/interfaces/character";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {saveAPIKey} from "@/app/actions";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogContent, DialogContentText} from "@mui/material";
import {getCharacterList} from "@/utils/characterList";
import {serverImageMap} from "@/interfaces/serverImageMap";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";


interface ApiBody {
    apiKey: string;
}
interface AiAdvice {
    skill: string | null;
    union: string | null;
    level: string | null;
}
interface Props {
    initialCharacterList: characterMainList[] | null;
    initialMainCharacter: characterMainList | null;
    initialCharacterAdvice: AiAdvice | null;
    getAdviceFunction: (ocid: string) => Promise<AiAdvice | null>;
}

const APIContents: NextPage<Props> = ({initialCharacterList,
                                      initialMainCharacter,
                                      initialCharacterAdvice,
                                      getAdviceFunction,
                                      } ) => {
    // const router = useRouter();
    const [isLogin, setLogin] = useState(false);
    console.log(isLogin) // todo: api 있을경우
    // API 키 입력 필드의 값을 저장하는 상태 변수
    const [inputValue, setInputValue] = useState<string>('');
    const [showMiniCharacter, setShowMiniCharacter] = useState<boolean>(false);
    const [characterData, setCharacterData] = useState<characterMainList | null>(initialMainCharacter);
    const [open, setOpen] = useState(false);
    const [characterList, setCharacterList] = useState<characterMainList[] | null>(initialCharacterList);
    const [skill, setSkill] = useState<string | null>(initialCharacterAdvice?.skill || null);
    const [union, setUnion] = useState<string | null>(initialCharacterAdvice?.union || null);
    const [level, setLevel] = useState<string | null>(initialCharacterAdvice?.level || null);

    const handleClickOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setList = (list: characterMainList[]) => {
        setCharacterList(list)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const userInfoRedux = useSelector((state: RootState) => state.userInfo);
    const setCharacterAdvice = async (c: characterMainList) => {
        setCharacterData(c);
        setSkill(c.character_name); //Todo 내용 정하기
        setUnion(c.character_name); //Todo 내용 정하기
        setLevel(c.character_name); //Todo 내용 정하기
        handleClose();
        const newAdvice = await getAdviceFunction(c.ocid);
        if (newAdvice) {
            setSkill(newAdvice.skill);
            setUnion(newAdvice.union);
            setLevel(newAdvice.level);
        }
    };
    useEffect(() => {
        if (userInfoRedux.userApiInfo && userInfoRedux.accessToken) {
            const token = userInfoRedux.accessToken;
            const fetchCharacterData = async () => {
                try {
                    const list = await getCharacterList(token);

                    if (list) {
                        const sortedCharacterList = list.sort((a, b) => {
                            if (a.main_character && !b.main_character) {
                                return -1;
                            }
                            if (!a.main_character && b.main_character) {
                                return 1;
                            }
                            return 0;
                        });
                        setList(sortedCharacterList);
                        const mainCharacter = list.find((c: characterMainList) => c.main_character);

                        if (mainCharacter) {
                            setCharacterData(mainCharacter);
                            setShowMiniCharacter(true);

                        } else {
                            setShowMiniCharacter(false);
                            setCharacterData(null);
                        }
                    }
                    setLogin(true);
                } catch (error) {
                    console.error("캐릭터 데이터를 가져오는 중 오류 발생:", error);
                    setLogin(false);
                }
            };

            fetchCharacterData();
        } else {
            setLogin(false);
        }
    }, [userInfoRedux.userApiInfo, userInfoRedux.accessToken]);
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
                const encryptedApiKey = btoa(inputValue.trim());

                await saveAPIKey(encryptedApiKey, 'ApiKey');

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
                    <h2 className={styles.welcomeTitle}>어서오세요 {userInfoRedux.userName}님!</h2>
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
                            style={{objectFit: 'cover'}}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <Image className={styles.characterImage} width={240} height={240} alt="대표 캐릭터"
                           src={characterData?.character_image || "/images/no-character.png"}/>
                    <div className={styles.apiKeyInfo}>
                        {!showMiniCharacter && characterData === null ?
                            <div className={styles.NostatusIndicator}>
                                <Image width={16} height={16} alt="실패 아이콘" src="/icons/circle_danger.svg"/>
                                <span>API Key 열결 필요 : N/A</span>
                            </div> :
                            <div className={styles.statusIndicator}>
                                <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg"/>
                                <span>API Key 연결됨 : {characterData?.character_name}</span>
                            </div>
                        }
                        <button className={styles.changeButton} aria-label="API 키 변경" onClick={handleClickOpen}>
                            <Image width={20} height={20} alt="변경" src="/icons/change.svg"/>
                        </button>
                    </div>
                    {/*<button className={styles.ctaButton}>내 캐릭터 정보 확인하기</button>*/}
                    {userInfoRedux.userApiInfo === null &&
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
                        </div>}
                </div>
            </div>

            {/* AI 도우미 섹션 */}
            <div className={styles.aiAssistantSection}>
                <h3 className={styles.sectionTitle}>메이 AI 도우미</h3>
                <div className={styles.aiContent}>
                    {/* AI 캐릭터 상태 */}
                    <div className={styles.aiCharacterStatus}>
                        <div className={styles.aiCharacterImageWrapper}>
                            <Image className={styles.aiCharacterImage} width={160} height={160} alt="AI 도우미 캐릭터"
                                   src={characterData?.character_image || "/images/no-character.png"}/>
                        </div>
                        {!showMiniCharacter && characterData === null ?
                            <div className={styles.NoaiApiKeyStatus}>
                                <Image width={16} height={16} alt="실패 아이콘" src="/icons/circle_danger.svg"/>
                                <span>API Key 열결 필요 : N/A</span>
                            </div> :
                            <div className={styles.aiApiKeyStatus}>
                                <Image width={16} height={16} alt="성공 아이콘" src="/icons/circle_succes.svg"/>
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
                                    <Image width={20} height={20} alt="경고" src="/icons/siren.svg"/>
                                    <h4>링크스킬</h4>
                                </div>
                                {skill !== null ?
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            li: ({...props}) => (
                                                <li {...props} className={styles.li}/>
                                            ),
                                        }}
                                    >
                                        {skill}
                                    </ReactMarkdown> :
                                    <p>API Key가 입력되지 않았어요</p>
                                }
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg"/>
                            </button>
                        </div>
                        {/* 분석 아이템 2: 유니온 */}
                        <div className={styles.analysisItem}>
                            <div className={styles.analysisText}>
                                <div className={styles.analysisTitle}>
                                    <Image width={20} height={20} alt="경고" src="/icons/siren.svg"/>
                                    <h4>유니온</h4>
                                </div>
                                {union !== null ?
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            li: ({...props}) => (
                                                <li {...props} className={styles.li}/>
                                            ),
                                        }}
                                    >
                                        {union}
                                    </ReactMarkdown> :
                                    <p>API Key가 입력되지 않았어요</p>
                                }
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg"/>
                            </button>
                        </div>
                        {/* 분석 아이템 3: 레벨링 */}
                        <div className={styles.analysisItem}>
                            <div className={styles.analysisText}>
                                <div className={styles.analysisTitle}>
                                    <Image width={20} height={20} alt="경고" src="/icons/siren.svg"/>
                                    <h4>레벨링</h4>
                                </div>
                                {level !== null ?
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            li: ({...props}) => (
                                                <li {...props} className={styles.li}/>
                                            ),
                                        }}
                                    >
                                        {level}
                                    </ReactMarkdown> :
                                    <p>API Key가 입력되지 않았어요</p>
                                }
                            </div>
                            <button className={styles.detailsButton}>
                                <span>더 알아보기</span>
                                <Image width={16} height={16} alt="화살표" src="/icons/next.svg"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal &&
                <BannerModal onClose={clickModal}/>
            }
            <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
                <DialogTitle>캐릭터 변경</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        맞춤형 길라잡이가 필요한 캐릭터를 선택해주세요
                    </DialogContentText>
                    <div className={styles.containerModal}>
                        {characterList ?
                            characterList.map(c =>
                                <div className={styles.div2} key={c.character_name}
                                     onClick={() => setCharacterAdvice(c)}>
                                    <Image className={styles.characterPngIcon} width={112} height={112} sizes="100vw"
                                           alt="" src={c.character_image}/>
                                    <div className={styles.container1}>
                                        <div className={styles.wrapPrimaryInfo}>
                                            <Image className={styles.serverPngIcon} width={18} height={18} sizes="100vw"
                                                   alt="" src={serverImageMap[c.world_name]}/>
                                            <div className={styles.div3}>{c.character_name}</div>
                                        </div>
                                        <div className={styles.wrapSubInfo}>
                                            <div
                                                className={styles.lv280}>LV. {c.character_level} | {c.character_class}</div>
                                            <div
                                                className={styles.div4}>{c.character_guild_name ? `길드: ` + c.character_guild_name : ''}</div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            <p>캐릭터가 없습니다.</p>
                        }

                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default APIContents;