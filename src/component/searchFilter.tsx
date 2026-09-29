import type {NextPage} from 'next';
import Image from "next/image";
import styles from '@/styles/searchFilter.module.css';
import React, {useEffect, useState} from "react";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {characterMainList} from "@/interfaces/character";
import {getCharacterListClient} from "@/utils/characterListClient";

interface SearchFilterProps {
    onClose: () => void,
    onFilter: (character: string, filter: string) => void;
}

const SearchFilter: NextPage<SearchFilterProps> = ({onClose, onFilter}) => {
    const userInfoRedux = useSelector((state: RootState) => state.userInfo);
    const [isLogin, setLogin] = useState(false);
    const [isFilter, setIsFilter] = useState<string>('필터선택');
    const [isCharacter, setCharacter] = useState<string>('캐릭터 닉네임');
    const [characterMainList, setCharacterMainList] = useState<characterMainList[] | null>(null);
    const reset = () => {
        setIsFilter('필터선택');
        setCharacter('캐릭터 닉네임');
    }
    const searchFilter = () => {
        if(isCharacter !== '캐릭터 닉네임' && isFilter !== '필터선택'){
            onFilter(isCharacter, isFilter);
            onClose();
        }
    }
    useEffect(() => {
        const fetchCharacterList = async () => {
            if (userInfoRedux.userName) {
                setLogin(true);
                const initialApiResponse = await getCharacterListClient();
                if (initialApiResponse) {
                    const sortedCharacterList = initialApiResponse.sort((a, b) => {
                        if (a.main_character && !b.main_character) {
                            return -1;
                        }
                        if (!a.main_character && b.main_character) {
                            return 1;
                        }
                        return 0;
                    });
                    setCharacterMainList(sortedCharacterList);
                }
            } else {
                setLogin(false);
                setCharacterMainList(null);
            }
        };

        fetchCharacterList();
    }, [userInfoRedux.userName]);


    return (
        <div className={isLogin ? styles.searchFilterModal : styles.searchFilterModalNo}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div className={styles.div}>검색필터</div>
                    <div className={styles.wrapText}>
                        <div className={styles.wrapInfo}>
                            <div className={styles.textInput}>
                                <div className={styles.textInput1}>
                                    <div className={styles.div1}>{isCharacter}</div>
                                </div>
                            </div>
                            <div className={styles.div2}>에게 딱 맞는</div>
                            <div className={styles.textInput2}>
                                <div className={styles.textInput1}>
                                    <div className={styles.div1}>{isFilter}</div>
                                </div>
                            </div>
                            <div className={styles.div4}>꿀팁</div>
                        </div>
                        <button className={styles.button} aria-label="찾기" onClick={() => searchFilter()}>
                            <div className={styles.icon}>
                                <Image className={styles.iconChild} width={11.7} height={11.7} sizes="100vw" alt=""
                                       src="/icons/filterSearch.svg"/>
                            </div>
                            <div className={styles.button1}>찾기</div>
                        </button>
                    </div>
                </div>
                <Image className={styles.dividerIcon} width={378} height={1} sizes="100vw" alt=""
                       src="/icons/divider.svg"/>
                <button className={styles.button2} aria-label="필터 초기화" onClick={reset}>
                    <div className={styles.icon}>
                        <Image className={styles.iconChild} width={16} height={16} sizes="100vw" alt="filter_reset"
                               src="/icons/filterRe.svg"/>
                    </div>
                    <div className={styles.button1}>필터 초기화</div>
                </button>
                <div className={styles.filter}>
                    <div className={styles.container}>
                        <div className={styles.characters}>
                            <div className={styles.title1}>
                                <div className={styles.icon}>
                                    <Image className={styles.iconChild} width={16} height={16} sizes="100vw" alt=""
                                           src="/icons/filterCharacter.svg"/>
                                </div>
                                <div className={styles.label}>캐릭터 선택</div>
                            </div>
                            {isLogin ?
                                <div className={styles.wrapCharacters}>
                                    {characterMainList !== null ? (
                                        characterMainList.map((item, index) => {
                                            // 🔍 map 함수 내에서 JSX를 return 해야 합니다.
                                            return (
                                                <div className={styles.filterCharacterAtomic} key={index}
                                                     onClick={() => setCharacter(item.character_name)}>
                                                    <Image className={styles.filterCharacterAtomicChild} width={38}
                                                           height={38}
                                                           sizes="100vw" alt="" src={item.character_image}/>
                                                    <div className={styles.wrapCharacter}>
                                                        {/* 🔍 item.main_character가 boolean이 아니라 문자열 '본캐'/'부캐' 같은 값을 가정합니다. */}
                                                        {/* 실제 값에 따라 '본캐' 또는 '부캐' badge를 렌더링하도록 변경할 수 있습니다. */}
                                                        <div
                                                            className={item.main_character ? styles.badge : styles.badge1}>
                                                            <div
                                                                className={styles.label}>{item.main_character ? '본캐' : '부캐'}</div>
                                                        </div>
                                                        <div className={styles.div6}>{item.character_name}</div>
                                                    </div>
                                                </div>
                                            );
                                        })) : (
                                        <div className={styles.filterCharacterAtomic}>
                                            {/*<Image className={styles.filterCharacterAtomicChild} width={38} height={38}*/}
                                            {/*       sizes="100vw" alt="" src="/icons/Maping.png"/>*/}
                                            <div className={styles.wrapCharacter}>
                                                <div className={styles.div6}>캐릭터 없음</div>
                                            </div>
                                        </div>
                                    )}
                                </div> :
                                <div className={styles.filterCharacterAtomic}>
                                    <Image className={styles.filterCharacterAtomicChild} width={38} height={38}
                                           sizes="100vw" alt="" src="/icons/Maping.png"/>
                                    <div className={styles.wrapCharacter}>
                                        <div className={styles.div6}>API 연결이 필요해요</div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div className={styles.div12}>
                        <div className={styles.container1}>
                            <div className={styles.title1}>
                                <div className={styles.icon}>
                                    <Image className={styles.iconChild} width={16} height={16} sizes="100vw" alt=""
                                           src="/icons/filterMenu.svg"/>
                                </div>
                                <div className={styles.label}>필터 선택</div>
                            </div>
                            <div className={styles.wrapOption}>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('아이템')}>
                                    <div className={styles.div1}>아이템</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('추가옵션')}>
                                    <div className={styles.div1}>추가옵션</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('육성 방향')}>
                                    <div className={styles.div1}>육성 방향</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('재획')}>
                                    <div className={styles.div1}>재획</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('이벤트')}>
                                    <div className={styles.div1}>이벤트</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('잠재옵션')}>
                                    <div className={styles.div1}>잠재옵션</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('스타포스')}>
                                    <div className={styles.div1}>스타포스</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('유니온')}>
                                    <div className={styles.div1}>유니온</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('해방')}>
                                    <div className={styles.div1}>해방</div>
                                </div>
                                <div className={styles.filterOptionAtomic} onClick={() => setIsFilter('어빌리티')}>
                                    <div className={styles.div1}>어빌리티</div>
                                </div>
                            </div>
                        </div>
                        {/*<div className={styles.scroller1}>*/}
                        {/*    <div className={styles.scrollerChild} />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <button className={styles.closeButtonModal} onClick={onClose}>
                <div className={styles.icon4}>
                    <Image className={styles.vector2Stroke} width={20} height={20} sizes="100vw" alt="닫기"
                           src="/icons/cancel.svg"/>
                </div>
            </button>
        </div>
    );
};

export default SearchFilter;