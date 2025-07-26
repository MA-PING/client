// components/MobileSearch.tsx
"use client"

import type { NextPage } from 'next';
import Image from "next/image";
import styles from '@/styles/search/mobileSearch.module.css'; // 기존 모바일 검색 스타일

// MUI 컴포넌트 임포트
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CharacterInfo} from "@/interfaces/character";
import {useRouter} from "next/navigation";
import {getAutocomplete} from "@/utils/autocomplete";
import {serverImageMap} from "@/interfaces/serverImageMap"; // React, useState 임포트

// Transition 컴포넌트 정의 (MUI Dialog에 필요)
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface MobileSearchProps {
    open: boolean;
    onClose: () => void;
}

const MobileSearch: NextPage<MobileSearchProps> = ({ open, onClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [recentSearches, setRecentSearches] = useState<CharacterInfo[]>([]);
    const [suggestions, setSuggestions] = useState<CharacterInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const router = useRouter();
    const searchBarRef = useRef<HTMLFormElement>(null);
    const isActive = inputValue.trim() !== '';
    const searchBarClassName = `${isActive ? styles.searchBarActive : ''}`;
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

    // localStorage 저장
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
    // 모달 캐릭터 선택 (키보드 및 마우스 공용)
    const handleSelectCharacter = useCallback((character: CharacterInfo) => {
        setInputValue(character.characterName); // 선택한 캐릭터 이름으로 input 값 변경
        addCharacterToRecent(character);
        router.push(`/c/${encodeURIComponent(character.characterName)}`);
        setHighlightedIndex(-1); // 하이라이트 초기화
    }, [addCharacterToRecent, router]);

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
        setHighlightedIndex(-1); // 하이라이트 초기화
    }, [inputValue, highlightedIndex, suggestions, recentSearches, handleSelectCharacter, addCharacterToRecent, router]);

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
            setHighlightedIndex(-1);
        }
    }, [inputValue, suggestions, recentSearches, highlightedIndex, handleSelectCharacter, handleFormSubmit]);

    const renderCharacterItem = (char: CharacterInfo, isRecent: boolean, index: number) => (
        <div className={`${styles.searchAtomic} ${highlightedIndex === index ? styles.highlightedItem : ''}`} key={index} >
            <div className={styles.wrapCharacterInfo} onMouseDown={() => handleSelectCharacter(char)}>
                <Image className={styles.characterProfileIcon} width={36} height={36} sizes="100vw" alt={char.characterName} src={char.image || '/default-image.png'} unoptimized/>
                <div className={styles.wrapInfo}>
                    <div className={styles.info}>
                        <Image className={styles.icon2} width={16} height={16} sizes="100vw" alt={char.world} src={serverImageMap[char.world]} />
                        <div className={styles.div3}>{char.characterName}</div>
                    </div>
                    <div className={styles.lv280}>LV. {char.level} | {char.className}</div>
                </div>
            </div>
            {isRecent &&
                <div className={styles.wrapIcon}>
                    <button className={styles.button}>
                        <div className={styles.icon1}>
                            <Image className={styles.unionIcon} fill alt="즐겨찾기" src="/icons/heart.svg" />
                        </div>
                    </button>
                    <button className={styles.button1} title="삭제" onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDeleteRecent(char.characterName);
                    }}>
                        <div className={styles.icon1}>
                            <Image fill alt="삭제" src="/icons/cancel.svg"/>
                        </div>
                    </button>
                </div>
            }
        </div>
    );
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            sx={{
                // 다이얼로그의 Paper (내부 컨테이너)에 직접 스타일 적용
                '& .MuiDialog-paper': {
                    backgroundColor: '#fff', // 배경색을 흰색으로 설정 (모바일 검색 컴포넌트의 .o 스타일과 일치)
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch', // 하위 요소가 가로 전체를 차지하도록
                    padding: 0, // 기본 패딩 제거
                }
            }}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar className={styles.headerMobiletablet}>
                    <div className={styles.wrapBtn}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                                padding: 0,
                                width: 32,
                                height: 32,
                            }}
                        >
                            <Image className={styles.icon} width={18} height={18} alt="닫기 아이콘" src="/icons/cancel.svg"/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {/* halo와 form을 searchContainer 안으로 옮겨 형제 관계로 만듭니다. */}
            <div className={styles.searchContainer} >
                {isActive && <div className={styles.halo}/>}
                <form className={`${styles.searchMobile} ${searchBarClassName}`} onSubmit={handleFormSubmit} ref={searchBarRef}>
                    <div className={styles.icon}>
                        <Image fill sizes="100vw" alt="search icon"
                               src="/icons/Group 1.svg"/>
                    </div>
                    <input className={styles.inputField} type="text" placeholder="내용을 입력해주세요" value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onFocus={() => {
                               setHighlightedIndex(-1); // 포커스 시 하이라이트 초기화
                           }}
                           onKeyDown={handleKeyDown}
                           autoComplete="off"
                           autoFocus/>
                </form>
            </div>
            <div className={styles.content}>
                {inputValue.trim().length > 0 ? (
                    (<>
                        {isLoading && <div className={styles.modalContent}><p>불러오는 중...</p></div>}
                        {!isLoading && suggestions.length > 0 ?
                            suggestions.slice(0, 3).map((char, index) => renderCharacterItem(char, false, index))
                            : !isLoading && (
                            <div className={styles.modalContent}>
                                <div className={styles.imageWrapper}>
                                    <Image className={styles.mapingIcon} fill sizes="100vw"
                                           alt="Mapping Illustration" src="/icons/noSearch.svg"/>
                                </div>
                                <div className={styles.textWrapper}><p>이 캐릭터는 서버에 등록되지 않았어요.</p><p>다시 한 번
                                    확인해주세요.</p>
                                </div>
                            </div>
                        )}
                    </>)
                ): ( recentSearches.length > 0 ? (
                        <>
                            {recentSearches.slice(0, 3).map((char, index) => renderCharacterItem(char, true, index))}
                        </>
                    ):(<div className={styles.modalContent}>
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
        </Dialog>
    );
};

export default MobileSearch;