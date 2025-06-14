'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from '@/styles/Search.module.css';
import {useRef, useState} from "react";
import Portal from "@/component/Portal";


const Search:NextPage = () => {
    const [inputValue, setInputValue] = useState('');
    // [1] 모달의 표시 여부를 관리하는 state 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    // [2] 검색창의 위치와 크기를 얻기 위한 ref 추가
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            router.push(`/character/${encodeURIComponent(inputValue)}`);
        }
    };

    const searchClassName = `${styles.search} ${
        inputValue.trim() !== '' ? styles.searchActive : ''
    }`;

    // [3] 모달을 동적으로 위치시키기 위한 스타일 객체
    const getModalStyle = () => {
        if (!searchRef.current) {
            return { display: 'none' };
        }
        const rect = searchRef.current.getBoundingClientRect();
        return {
            // window.scrollY를 더해 스크롤 위치를 보정합니다.
            top: `${rect.bottom + window.scrollY }px`, // 8px 간격
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
        };
    };

    return (
        <div className={styles.statusnoRecordSizelarge}>
            <div
                ref={searchRef}
                 className={searchClassName}
                 onFocus={() => setIsModalOpen(true)}
                 onBlur={() => setIsModalOpen(false)}
            >
                <div className={styles.icon}>
                    <Image
                        className={styles.iconChild}
                        width={17.6}
                        height={17.6}
                        sizes="100vw"
                        alt="search icon"
                        src="/icons/Group 1.svg"
                    />
                </div>
                <input
                    className={styles.inputField} // CSS 클래스 이름을 명확하게 변경 (styles.div -> styles.inputField)
                    type="text"
                    placeholder="내용을 입력해주세요"
                    value={inputValue} // state와 input 값 동기화
                    onChange={(e) => setInputValue(e.target.value)} // 입력값이 변경될 때마다 state 업데이트
                    onKeyDown={handleKeyDown} // 키를 누를 때마다 함수 실행
                />
            </div>
            {isModalOpen && (
                <Portal>
                    <div style={getModalStyle()} className={styles.resultModal}>
                        <div className={styles.characterNoData}>
                            <div className={styles.characterMaping}>
                                <Image className={styles.mapingIcon} width={119.8} height={88.8} sizes="100vw" alt="" src="/icons/chatbot.svg" />
                            </div>
                            <div className={styles.div1}>
                                <p className={styles.p}>최근에 검색해본 유저가 없어요.</p>
                                <p className={styles.p}>어떤 유저의 정보가 궁금하신가요?</p>
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
            {/*<div className={styles.result}>*/}
            {/*    <div className={styles.characterNoData}>*/}
            {/*        <div className={styles.characterMaping}>*/}
            {/*            <Image className={styles.mapingIcon} width={119.8} height={88.8} sizes="100vw" alt="" src="/icons/Maping.png" />*/}
            {/*        </div>*/}
            {/*        <div className={styles.div1}>*/}
            {/*            <p className={styles.p}>최근에 검색해본 유저가 없어요.</p>*/}
            {/*            <p className={styles.p}>어떤 유저의 정보가 궁금하신가요?</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.halo} />
        </div>);
};

export default Search;
