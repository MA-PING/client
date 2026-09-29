'use client'

import type {NextPage} from 'next';
import Image from "next/image";
import {useRouter} from 'next/navigation';
import {useState, useEffect, useRef, useCallback} from "react";
import styles from '@/styles/Search.module.css';
import Portal from "@/component/Portal";
import {serverImageMap} from "@/interfaces/serverImageMap";
import {CharacterInfo} from "@/interfaces/character"
import {getAutocomplete} from "@/utils/autocomplete";
import {addFavorite, getFavorites, removeFavorite} from "@/utils/favoriteApi";

interface SearchProps {
    header: boolean
}

const Search: NextPage<SearchProps> = ({header}) => {
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<CharacterInfo[]>([]);

    const [suggestions, setSuggestions] = useState<CharacterInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [favoriteNames, setFavoriteNames] = useState<Set<string>>(new Set());

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
                setHighlightedIndex(-1); // 모달 닫힐 때 하이라이트 초기화
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

    // 즐겨찾기 목록 로딩 (비로그인 시 조용히 무시)
    useEffect(() => {
        getFavorites().then((favorites) => {
            setFavoriteNames(new Set(favorites.map((f) => f.characterName)));
        });
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
            setIsLoading(false); // 입력이 없으면 로딩 상태 해제
            setHighlightedIndex(-1); // 입력이 없으면 하이라이트 초기화
            return;
        }

        setIsLoading(true);
        setHighlightedIndex(-1);
        const debounceTimer = setTimeout(async () => {
            const autocompleteResults = await getAutocomplete(inputValue);
            setSuggestions(autocompleteResults || []);
            setIsLoading(false);
        }, 300); // 300ms 디바운스

        // cleanup 함수: 이전 타이머를 취소하여 마지막 입력에만 반응하도록 함
        return () => clearTimeout(debounceTimer);
    }, [inputValue]);


    // localStorage 저장 - useCallback으로 감쌈
    const addCharacterToRecent = useCallback((character: CharacterInfo) => {
        // 함수형 업데이트를 사용하여 최신 recentSearches 상태를 참조
        setRecentSearches(prevRecentSearches => {
            const newRecent = [
                character,
                ...prevRecentSearches.filter(c => c.characterName !== character.characterName)
            ].slice(0, 10);

            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('recentSearches', JSON.stringify({recent: newRecent}));
                } catch (error) {
                    console.error("Failed to save state to localStorage", error);
                }
            }
            return newRecent;
        });
    }, []);

    // 모달 캐릭터 선택 (키보드 및 마우스 공용)
    const handleSelectCharacter = useCallback((character: CharacterInfo) => {
        setInputValue(character.characterName); // 선택한 캐릭터 이름으로 input 값 변경
        addCharacterToRecent(character);
        router.push(`/c/${encodeURIComponent(character.characterName)}`);
        setIsModalOpen(false); // 모달 닫기
        setHighlightedIndex(-1); // 하이라이트 초기화
    }, [addCharacterToRecent, router]); // addCharacterToRecent가 useCallback으로 감싸져 안정적임

    // 즐겨찾기 토글 (낙관적 업데이트 후 실패 시 롤백)
    const handleToggleFavorite = useCallback(async (characterName: string) => {
        const wasFavorite = favoriteNames.has(characterName);
        setFavoriteNames(prev => {
            const next = new Set(prev);
            if (wasFavorite) next.delete(characterName); else next.add(characterName);
            return next;
        });
        try {
            if (wasFavorite) {
                await removeFavorite(characterName);
            } else {
                await addFavorite(characterName);
            }
        } catch (error) {
            console.error('즐겨찾기 처리 중 오류 발생:', error);
            setFavoriteNames(prev => {
                const next = new Set(prev);
                if (wasFavorite) next.add(characterName); else next.delete(characterName);
                return next;
            });
        }
    }, [favoriteNames]);

    // localStorage 삭제
    const handleDeleteRecent = useCallback((characterNameToDelete: string) => {
        setRecentSearches(prevRecentSearches => {
            const newRecentSearches = prevRecentSearches.filter(
                (char) => char.characterName !== characterNameToDelete
            );
            if (typeof window !== 'undefined') {
                try {
                    const newState = {recent: newRecentSearches};
                    localStorage.setItem('recentSearches', JSON.stringify(newState));
                } catch (error) {
                    console.error("Failed to save state to localStorage", error);
                }
            }
            return newRecentSearches;
        });
    }, []);

    const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nickname = inputValue.trim();
        if (nickname === '') return;

        // 하이라이트된 항목이 있다면 해당 항목을 선택
        if (highlightedIndex !== -1) {
            const currentList = inputValue.trim().length > 0 ? suggestions.slice(0, 3) : recentSearches.slice(0, 3);
            if (currentList[highlightedIndex]) {
                handleSelectCharacter(currentList[highlightedIndex]);
                return; // 선택 후 함수 종료
            }
        }

        // 하이라이트된 항목이 없거나 유효하지 않은 경우 기존 로직 수행
        const topSuggestion = suggestions.length > 0 && suggestions[0].characterName.toLowerCase() === nickname.toLowerCase() ? suggestions[0] : null;

        if (topSuggestion) {
            addCharacterToRecent(topSuggestion);
        }

        router.push(`/c/${encodeURIComponent(nickname)}`);
        setIsModalOpen(false);
        setHighlightedIndex(-1); // 하이라이트 초기화
    }, [inputValue, highlightedIndex, suggestions, recentSearches, handleSelectCharacter, addCharacterToRecent, router]); // 의존성 추가

    // 키보드 이벤트 핸들러
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const currentList = inputValue.trim().length > 0 ? suggestions.slice(0, 3) : recentSearches.slice(0, 3);
        const listLength = currentList.length;

        if (listLength === 0) return; // 목록이 없으면 아무것도 하지 않음

        if (e.key === 'ArrowDown') {
            e.preventDefault(); // 기본 스크롤 동작 방지
            setHighlightedIndex(prevIndex => (prevIndex + 1) % listLength);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // 기본 스크롤 동작 방지
            setHighlightedIndex(prevIndex => (prevIndex - 1 + listLength) % listLength);
        } else if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            if (highlightedIndex !== -1 && currentList[highlightedIndex]) {
                handleSelectCharacter(currentList[highlightedIndex]);
            } else {
                // 하이라이트된 항목이 없으면 폼 제출 (검색 실행)
                handleFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // 타입 캐스팅
            }
        } else if (e.key === 'Escape') {
            setIsModalOpen(false);
            setHighlightedIndex(-1);
        }
    }, [inputValue, suggestions, recentSearches, highlightedIndex, handleSelectCharacter, handleFormSubmit]); // 의존성 추가

    const searchBarHeader = `${header ? styles.searchBarHeader : styles.searchBar}`;
    const isActive = inputValue.trim() !== '' || isModalOpen;
    const searchBarClassName = `${searchBarHeader} ${isActive ? styles.searchBarActive : ''}`;

    const renderCharacterItem = (char: CharacterInfo, isRecent: boolean, index: number) => (
        <div key={char.characterName}
             className={`${header ? styles.searchAtomicHeader : styles.searchAtomic} ${highlightedIndex === index ? styles.highlightedItem : ''}`}
        >
            <div className={styles.wrapCharacterInfo} onMouseDown={() => handleSelectCharacter(char)}>
                <Image className={styles.characterProfileIcon} width={48} height={48} alt={char.characterName}
                       src={char.image || '/default-image.png'} unoptimized/>
                <div className={styles.wrapInfo}>
                    <div className={styles.info}>
                        <Image className={styles.icon} width={18} height={18} alt={char.world}
                               src={serverImageMap[char.world]}/>
                        <div className={styles.div}>{char.characterName}</div>
                    </div>
                    <div className={styles.lv280}>LV. {char.level} | {char.className}</div>
                </div>
            </div>
            {isRecent && (
                <div className={styles.wrapIcon}>
                    <button type="button" className={styles.button}
                            title={favoriteNames.has(char.characterName) ? "즐겨찾기 해제" : "즐겨찾기"}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(char.characterName);
                            }}>
                        <div className={styles.icon1}>
                            <Image fill alt="즐겨찾기"
                                   src={favoriteNames.has(char.characterName) ? "/icons/heart_on.svg" : "/icons/heart_off.svg"}/>
                        </div>
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
                               onChange={(e) => setInputValue(e.target.value)}
                               onFocus={() => {
                                   setIsModalOpen(true);
                                   setHighlightedIndex(-1); // 포커스 시 하이라이트 초기화
                               }}
                               onKeyDown={handleKeyDown} // 키보드 이벤트 핸들러 추가
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
                                {!isLoading && suggestions.length > 0 ?
                                    suggestions.slice(0, 3).map((char, index) => renderCharacterItem(char, false, index))
                                    : !isLoading && ( // suggestions.length === 0 일 때만 이 부분을 렌더링
                                    <div className={styles.modalContent}>
                                        <div className={styles.imageWrapper}>
                                            <Image className={styles.mapingIcon} fill sizes="100vw"
                                                   alt="Mapping Illustration" src="/icons/noSearch.svg"/>
                                        </div>
                                        <div className={styles.textWrapper}><p>이 캐릭터는 서버에 등록되지 않았어요.</p><p>다시 한 번
                                            확인해주세요.</p></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            recentSearches.length > 0 ? (
                                <div className={styles.wrapRecent}>
                                    {recentSearches.slice(0, 3).map((char, index) => renderCharacterItem(char, true, index))}
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