'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import styles from '@/styles/Search.module.css';
import Portal from "@/component/Portal";

// 캐릭터 데이터 타입 (기존과 동일)
interface Character {
    nickname: string;
    world: string;
    className: string;
    image: string;
    level: number;
}

const Search: NextPage = () => {
    // state 및 ref 선언 (기존과 동일)
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<Character[]>([]);
    const router = useRouter();
    const searchBarRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalStyle, setModalStyle] = useState({});

    // 모달 위치 계산 및 Click Outside 로직 (기존과 동일)
    useEffect(() => {
        const updateModalPosition = () => { if (searchBarRef.current) { const rect = searchBarRef.current.getBoundingClientRect(); setModalStyle({ position: 'absolute', top: `${rect.bottom + window.scrollY + 4}px`, left: `${rect.left + window.scrollX}px`, width: `${rect.width}px` }); } };
        if (isModalOpen) { updateModalPosition(); window.addEventListener('resize', updateModalPosition); window.addEventListener('scroll', updateModalPosition, true); }
        return () => { window.removeEventListener('resize', updateModalPosition); window.removeEventListener('scroll', updateModalPosition, true); };
    }, [isModalOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (searchBarRef.current && !searchBarRef.current.contains(target) && modalRef.current && !modalRef.current.contains(target)) { setIsModalOpen(false); }
        };
        if (isModalOpen) { document.addEventListener('mousedown', handleClickOutside); }
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [isModalOpen]);

    // localStorage 데이터 로딩
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedStateJSON = localStorage.getItem('recentSearches');
                if (savedStateJSON) { const savedState = JSON.parse(savedStateJSON); if (savedState && Array.isArray(savedState.recent)) { setRecentSearches(savedState.recent); } }
            } catch (error) { console.error("Failed to parse state from localStorage", error); }
        }
    }, []);


    // [추가] 최근 검색어 삭제 함수
    const handleDeleteRecent = (nicknameToDelete: string) => {
        const newRecentSearches = recentSearches.filter(
            (char) => char.nickname !== nicknameToDelete
        );
        setRecentSearches(newRecentSearches);
        if (typeof window !== 'undefined') {
            try { const newState = { recent: newRecentSearches }; localStorage.setItem('recentSearches', JSON.stringify(newState)); } catch (error) { console.error("Failed to save state to localStorage", error); }
        }
    };

    // Form Submit 핸들러 (기존과 동일)
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nickname = inputValue.trim();
        if (nickname !== '') {
            router.push(`/c/${encodeURIComponent(nickname)}`);
        }
    };

    const isActive = inputValue.trim() !== '' || isModalOpen;
    const searchBarClassName = `${styles.searchBar} ${isActive ? styles.searchBarActive : ''}`;

    return (
        <div className={styles.container}>
            {isActive && <div className={styles.halo} />}
            <form className={styles.searchForm} onSubmit={handleFormSubmit}>
                <div ref={searchBarRef} className={searchBarClassName}>
                    <div className={styles.iconWrapper}><Image fill sizes="100vw" alt="search icon" src="/icons/Group 1.svg" /></div>
                    <input className={styles.inputField} type="text" placeholder="내용을 입력해주세요" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsModalOpen(true)} />
                </div>
            </form>

            {isModalOpen && (
                <Portal>
                    <div ref={modalRef} style={modalStyle} className={styles.modal}>
                        {recentSearches.length > 0 ? (
                            <div className={styles.wrapRecent}>
                                {recentSearches.map((char) => (
                                    <div key={char.nickname} className={styles.searchAtomic}>
                                        <div className={styles.wrapCharacterInfo} onMouseDown={() => router.push(`/c/${char.nickname}`)}>
                                            <Image className={styles.characterProfileIcon} width={48} height={48} alt={char.nickname} src={char.image} />
                                            <div className={styles.wrapInfo}>
                                                <div className={styles.info}>
                                                    <Image className={styles.icon} width={18} height={18} alt={char.world} src={"/icons/server/" + char.world + ".png"} />
                                                    <div className={styles.div}>{char.nickname}</div>
                                                </div>
                                                <div className={styles.lv280}>LV. {char.level} | {char.className}</div>
                                            </div>
                                        </div>
                                        <div className={styles.wrapIcon}>
                                            <button type="button" className={styles.button} title="즐겨찾기">
                                                <div className={styles.icon1}><Image fill alt="즐겨찾기" src="/icons/heart.svg" /></div>
                                            </button>
                                            <button type="button" className={styles.button1} title="삭제" onMouseDown={(e) => { e.stopPropagation(); handleDeleteRecent(char.nickname); }}>
                                                <div className={styles.icon1}><Image fill alt="삭제" src="/icons/cancel.svg" /></div>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // 기존 "최근 검색어 없음" UI
                            <div className={styles.modalContent}>
                                <div className={styles.imageWrapper}>
                                    <Image className={styles.mapingIcon} fill sizes="100vw" alt="Mapping Illustration" src="/icons/Maping.png" />
                                </div>
                                <div className={styles.textWrapper}><p>최근에 검색해본 유저가 없어요.</p><p>어떤 유저의 정보가 궁금하신가요?</p></div>
                            </div>
                        )}
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default Search;