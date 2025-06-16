'use client'

import type {NextPage} from 'next';
import Image from "next/image";
import {useRouter} from 'next/navigation';
import {useState, useEffect, useRef} from "react";
import styles from '@/styles/Search.module.css';
import Portal from "@/component/Portal";

// --- 타입 정의 (기존과 동일) ---
interface ApiResponse {
    code: string;
    message: string;
    responseAt: string;
    data: Character[];
    success: boolean;
}

interface Character {
    characterName: string;
    world: string;
    className: string;
    image: string;
    level: number;
}

async function getAutocomplete(name: string): Promise<Character[] | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/autocomplete?characterName=' + name, {
            next: {
                revalidate: 10,
            },
        });
        if (!response.ok) {
            return null;
        }
        const data: ApiResponse = await response.json();

        if (data.data === null) {
            return null;
        }
        return data.data;
    } catch (error) {
        console.error('자동완성 가져오기 오류:', error);
        return null;
    }
}


interface SearchProps {
    header: boolean
}

const Search: NextPage<SearchProps> = ({header}) => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<Character[]>([]);

    const [suggestions, setSuggestions] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchBarRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalStyle, setModalStyle] = useState({});

    // 모달 위치 계산
    useEffect(() => {
        const updateModalPosition = () => {
            if (searchBarRef.current) {
                const rect = searchBarRef.current.getBoundingClientRect();
                setModalStyle({
                    position: 'absolute',
                    top: `${rect.bottom + window.scrollY + 2}px`,
                    left: `${rect.left + window.scrollX}px`,
                    width: `${rect.width}px`
                });
            }
        };
        if (isModalOpen) {
            updateModalPosition();
            window.addEventListener('resize', updateModalPosition);
            window.addEventListener('scroll', updateModalPosition, true);
        }
        return () => {
            window.removeEventListener('resize', updateModalPosition);
            window.removeEventListener('scroll', updateModalPosition, true);
        };
    }, [isModalOpen]);

    // 모달 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (searchBarRef.current && !searchBarRef.current.contains(target) && modalRef.current && !modalRef.current.contains(target)) {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    // localStorage 로딩
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedStateJSON = localStorage.getItem('recentSearches');
                if (savedStateJSON) {
                    const savedState = JSON.parse(savedStateJSON);
                    if (savedState && Array.isArray(savedState.recent)) {
                        setRecentSearches(savedState.recent);
                    }
                }
            } catch (error) {
                console.error("Failed to parse state from localStorage", error);
            }
        }
    }, []);

    // 다른 탭/창에서의 localStorage 변경을 감지하는 useEffect
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'recentSearches') {
                try {
                    if (event.newValue) {
                        const savedState = JSON.parse(event.newValue);
                        if (savedState && Array.isArray(savedState.recent)) {
                            setRecentSearches(savedState.recent);
                        }
                    } else {
                        // localStorage 항목이 삭제된 경우
                        setRecentSearches([]);
                    }
                } catch (error) {
                    console.error("Failed to update state from storage event", error);
                }
            }
        };

        // storage 이벤트 리스너 추가
        window.addEventListener('storage', handleStorageChange);

        // cleanup 함수: 컴포넌트가 사라질 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // 자동 완성
    useEffect(() => {
        if (inputValue.trim().length === 0) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        const debounceTimer = setTimeout(async () => {
            const autocompleteResults = await getAutocomplete(inputValue);
            setSuggestions(autocompleteResults || []);
            setIsLoading(false);
        }, 300); // 300ms 디바운스

        // cleanup 함수: 이전 타이머를 취소하여 마지막 입력에만 반응하도록 함
        return () => clearTimeout(debounceTimer);
    }, [inputValue]);


    // localStorage 저장
    const addCharacterToRecent = (character: Character) => {
        const newRecent = [
            character,
            ...recentSearches.filter(c => c.characterName !== character.characterName)
        ].slice(0, 10); // 최대 5개까지 저장

        setRecentSearches(newRecent);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('recentSearches', JSON.stringify({recent: newRecent}));
            } catch (error) {
                console.error("Failed to save state to localStorage", error);
            }
        }
    };

    // 모달 캐릭터 선택
    const handleSelectCharacter = (character: Character) => {
        setInputValue(character.characterName); // 선택한 캐릭터 이름으로 input 값 변경
        addCharacterToRecent(character);
        router.push(`/c/${encodeURIComponent(character.characterName)}`);
        setIsModalOpen(false); // 모달 닫기
    };

    // localStorage 삭제
    const handleDeleteRecent = (characterNameToDelete: string) => {
        const newRecentSearches = recentSearches.filter(
            (char) => char.characterName !== characterNameToDelete
        );
        setRecentSearches(newRecentSearches);
        if (typeof window !== 'undefined') {
            try {
                const newState = {recent: newRecentSearches};
                localStorage.setItem('recentSearches', JSON.stringify(newState));
            } catch (error) {
                console.error("Failed to save state to localStorage", error);
            }
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nickname = inputValue.trim();
        if (nickname === '') return;

        const topSuggestion = suggestions.length > 0 && suggestions[0].characterName.toLowerCase() === nickname.toLowerCase() ? suggestions[0] : null;

        if (topSuggestion) {
            addCharacterToRecent(topSuggestion);
        } else {
            // 자동완성 목록에 없으면, 수동으로 기본 Character 객체를 만들 수 있으나,
            // 이 경우 level, image 등 모든 정보가 없으므로 저장은 선택 사항입니다.
            // 여기서는 저장하지 않고 페이지만 이동합니다.
        }

        router.push(`/c/${encodeURIComponent(nickname)}`);
        setIsModalOpen(false);
    };
    const searchBarHeader = `${header ? styles.searchBarHeader : styles.searchBar}`;
    const isActive = inputValue.trim() !== '' || isModalOpen;
    const searchBarClassName = `${searchBarHeader} ${isActive ? styles.searchBarActive : ''}`;

    const renderCharacterItem = (char: Character, isRecent: boolean) => (
        <div key={char.characterName} className={styles.searchAtomic}>
            <div className={styles.wrapCharacterInfo} onMouseDown={() => handleSelectCharacter(char)}>
                <Image className={styles.characterProfileIcon} width={48} height={48} alt={char.characterName}
                       src={char.image || '/default-image.png'} unoptimized/>
                <div className={styles.wrapInfo}>
                    <div className={styles.info}>
                        <Image className={styles.icon} width={18} height={18} alt={char.world}
                               src={"/icons/server/" + char.world + ".png"}/>
                        <div className={styles.div}>{char.characterName}</div>
                    </div>
                    <div className={styles.lv280}>LV. {char.level} | {char.className}</div>
                </div>
            </div>
            {isRecent && (
                <div className={styles.wrapIcon}>
                    <button type="button" className={styles.button} title="즐겨찾기">
                        <div className={styles.icon1}><Image fill alt="즐겨찾기" src="/icons/heart.svg"/></div>
                    </button>
                    <button type="button" className={styles.button1} title="삭제" onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDeleteRecent(char.characterName);
                    }}>
                        <div className={styles.icon1}><Image fill alt="삭제" src="/icons/cancel.svg"/></div>
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                {isActive && <div className={styles.halo}/>}
                <form className={styles.searchForm} onSubmit={handleFormSubmit}>
                    <div ref={searchBarRef} className={searchBarClassName}>
                        <div className={styles.iconWrapper}><Image fill sizes="100vw" alt="search icon"
                                                                   src="/icons/Group 1.svg"/></div>
                        <input className={styles.inputField} type="text" placeholder="내용을 입력해주세요" value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsModalOpen(true)}
                               autoComplete="off"/>
                    </div>
                </form>
            </div>
            {isModalOpen && (
                <Portal>
                    <div ref={modalRef} style={modalStyle} className={styles.modal}>
                        {inputValue.trim().length > 0 ? (
                            <div className={styles.wrapRecent}>
                                {isLoading && <div className={styles.modalContent}><p>불러오는 중...</p></div>}
                                {!isLoading && suggestions.length > 0 && suggestions.slice(0, 3).map(char => renderCharacterItem(char, false))}
                                {!isLoading && suggestions.length === 0 && (
                                    <div className={styles.modalContent}>
                                        <div className={styles.imageWrapper}>
                                            <Image className={styles.mapingIcon} fill sizes="100vw"
                                                   alt="Mapping Illustration" src="/icons/noSearch.svg"/>
                                        </div>
                                        <div className={styles.textWrapper}><p>이 캐릭터는 메이플스토리에 등록되지 않았어요.</p><p>다시 한 번
                                            확인해주세요.</p></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            recentSearches.length > 0 ? (
                                <div className={styles.wrapRecent}>
                                    {recentSearches.slice(0, 3).map(char => renderCharacterItem(char, true))}
                                </div>
                            ) : (
                                <div className={styles.modalContent}>
                                    <div className={styles.imageWrapper}>
                                        <Image className={styles.mapingIcon} fill sizes="100vw"
                                               alt="Mapping Illustration" src="/icons/Maping.svg"/>
                                    </div>
                                    <div className={styles.textWrapper}><p>최근에 검색해본 유저가 없어요.</p><p>어떤 유저의 정보가
                                        궁금하신가요?</p></div>
                                </div>
                            )
                        )}
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default Search;