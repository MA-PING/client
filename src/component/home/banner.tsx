'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '../../styles/home/banner.module.css';
import Search from "@/component/Search";
import {useEffect, useState} from "react";
import BannerModal from "@/component/bannerModal";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {characterMainList, recommendResponse} from "@/interfaces/character";
import {getApiUserRecommend} from "@/utils/userRecommend";
import {getCharacterList} from "@/utils/characterList";
import {getApiCharacterRecommend} from "@/utils/characterRecommend";


const Banner:NextPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [isLogin, setLogin] = useState(false);
    const [characterRecommend, setCharacterRecommend] = useState<recommendResponse | null>(null)
    const [userRecommend, setUserRecommend] = useState<recommendResponse | null>(null)
    const [characterName, setCharacterName] = useState<string | null>(null);
    const userInfoRedux = useSelector((state: RootState) => state.userInfo);
    const today = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        const fetchUserRecommend = async () => {
            const user = await getApiUserRecommend();
            if (user !== null){
                setUserRecommend(user);
            }
        }
        if (userInfoRedux.userApiInfo && userInfoRedux.accessToken) {
            const token = userInfoRedux.accessToken;
            const fetchCharacterData = async () => {
                try {
                    const list = await getCharacterList(token);

                    if (list) {
                        const mainCharacter = list.find((c: characterMainList) => c.main_character);

                        if (mainCharacter && mainCharacter.character_name) {
                            setCharacterName(mainCharacter.character_name);
                            const character = await getApiCharacterRecommend(mainCharacter.ocid, token);
                            if (character !== null){
                                setCharacterRecommend(character);
                            }

                        }
                    }
                    setLogin(true);
                } catch (error) {
                    console.error("캐릭터 데이터를 가져오는 중 오류 발생:", error);
                    setLogin(false);
                }
            };
            fetchUserRecommend();
            fetchCharacterData();
        } else {
            fetchUserRecommend();
            setLogin(false);
        }
    }, [userInfoRedux.accessToken, userInfoRedux.userApiInfo]);
    const clickModal = () => setShowModal(!showModal)
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
                        <video className={styles.vidIcon} width="384" height="526" autoPlay loop muted playsInline>
                            <source src="/images/MAPING.webm" type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className={styles.wrap}>
                    <Search header={false}/>
                    <div className={styles.ai}>
                        <div className={styles.ai1}>메이 AI 추천 질문</div>
                        <div className={styles.wrapRecommend}>
                            {characterRecommend !== null ?
                                <div className={styles.div2}>
                                    <div className={styles.inPageNavigationLarge}>
                                        <div className={styles.wrapTitle}>
                                            <Image className={styles.icon} width={24} height={24} alt="" src="/icons/search.svg" />
                                            <div className={styles.title1}>
                                                <div className={styles.div3}>본캐 맞춤 추천 질문</div>
                                                <div className={styles.div4}>{characterRecommend.responseAt.slice(0, 10) == today ? '오늘':'어제'} {characterRecommend.responseAt.slice(11, 16)} / {characterName} (본캐) 기준</div>
                                            </div>
                                        </div>
                                        <div className={styles.list}>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>1</div>
                                                </div>
                                                <div className={styles.div6}>{characterRecommend.data[0]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>2</div>
                                                </div>
                                                <div className={styles.div6}>{characterRecommend.data[1]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>3</div>
                                                </div>
                                                <div className={styles.div6}>{characterRecommend.data[2]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>4</div>
                                                </div>
                                                <div className={styles.div6}>{characterRecommend.data[3]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>5</div>
                                                </div>
                                                <div className={styles.div6}>{characterRecommend.data[4]}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>:
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
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>4</div>
                                                </div>
                                                <div className={styles.div6}>무자본 스킬트리 추천</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>5</div>
                                                </div>
                                                <div className={styles.div6}>소과금으로 효율적인 육성하는 방법</div>
                                            </div>
                                        </div>
                                    </div>
                                    {!isLogin &&
                                        <div className={styles.dimApi}>
                                            <div className={styles.content}>
                                                <div className={styles.titleApi}>
                                                    <div className={styles.apiKey}>API Key 인증</div>
                                                    <div className={styles.apiKey1}>API Key를 입력하면, 메이 AI가 당신의 캐릭터에 꼭 맞는 육성 팁을
                                                        알려드릴게요.
                                                    </div>
                                                </div>
                                                <button className={styles.button} onClick={clickModal}>
                                                    <div className={styles.button1}>API Key 입력하기</div>
                                                </button>
                                            </div>
                                        </div>}
                                </div>
                            }

                            <div className={styles.div2}>
                                {userRecommend !== null ?
                                    <div className={styles.inPageNavigationLarge}>
                                        <div className={styles.wrapTitle}>
                                            <Image className={styles.icon} width={24} height={24} alt="" src="/icons/search.svg" />
                                            <div className={styles.title1}>
                                                <div className={styles.div3}>유저들이 자주 하는 질문</div>
                                                <div className={styles.div4}>{userRecommend.responseAt.slice(0, 10) == today ? '오늘':'어제'} {userRecommend.responseAt.slice(11, 16)} 기준</div>
                                            </div>
                                        </div>
                                        <div className={styles.list}>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>1</div>
                                                </div>
                                                <div className={styles.div6}>{userRecommend.data[0]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>2</div>
                                                </div>
                                                <div className={styles.div6}>{userRecommend.data[1]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic1}>
                                                    <div className={styles.div5}>3</div>
                                                </div>
                                                <div className={styles.div6}>{userRecommend.data[2]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>4</div>
                                                </div>
                                                <div className={styles.div6}>{userRecommend.data[3]}</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>5</div>
                                                </div>
                                                <div className={styles.div6}>{userRecommend.data[4]}</div>
                                            </div>
                                        </div>
                                    </div>:
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
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>4</div>
                                                </div>
                                                <div className={styles.div6}>무자본 스킬트리 추천</div>
                                            </div>
                                            <div className={styles.inPageNavigationAtomic}>
                                                <div className={styles.inPageNavigationAtomic7}>
                                                    <div className={styles.div10}>5</div>
                                                </div>
                                                <div className={styles.div6}>소과금으로 효율적인 육성하는 방법</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal &&
                <BannerModal onClose={clickModal}/>
            }
        </div>);
};

export default Banner;