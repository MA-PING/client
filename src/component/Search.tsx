'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from '@/styles/Search.module.css';
import {useState} from "react";


const Search:NextPage = () => {
    const [inputValue, setInputValue] = useState('');

    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            router.push(`/character/${encodeURIComponent(inputValue)}`);
        }
    };

    const searchClassName = `${styles.search} ${
        inputValue.trim() !== '' ? styles.searchActive : ''
    }`;

    return (
        <div className={styles.statusnoRecordSizelarge}>
            <div className={searchClassName}>
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
