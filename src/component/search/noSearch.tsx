'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '@/styles/search/noSearch.module.css';
import Search from '@/component/Search';
import { useState } from 'react';
import {getApiCheck} from "@/utils/apiCheck";
import {setCookie} from "cookies-next";
import { useRouter } from 'next/navigation';
import BannerModal from "@/component/bannerModal";

interface ApiBody {
    apiKey: string;
}


const NoSearch: NextPage = () => {
    const router = useRouter();

    // API 키 입력 필드의 값을 저장하는 상태 변수
    const [inputValue, setInputValue] = useState<string>('');
    // 로딩 상태를 관리하는 상태 변수
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // 오류 메시지를 관리하는 상태 변수
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError(null); // 입력이 변경되면 이전 오류를 지웁니다.
    };

    const handleInputButtonClick = async () => {
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

        if (response && response.data) { // API 응답이 성공적이고 데이터가 존재하면
            console.log("API 체크 성공:", response);

            try {
                // API 키를 Base64로 인코딩하여 암호화
                const encryptedApiKey = btoa(inputValue.trim());

                // 암호화된 API 키를 쿠키에 저장
                setCookie('ApiKey', encryptedApiKey, { maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });

                // /list 페이지로 리다이렉트
                router.push('/list');

            } catch (cookieError) {
                console.error("쿠키 저장 또는 리다이렉트 중 오류 발생:", cookieError);
                setError('API 키를 확인해주세요.');
            }

        } else {
            setError('캐릭터 데이터를 가져오는 데 실패했습니다. API 키를 확인해주세요.');
        }
    };
    const [showModal, setShowModal] = useState(false)
    const clickModal = () => setShowModal(!showModal)
    return (
        <div className={styles.apiX}>
            <div className={styles.wrapSearchj}>
                <div className={styles.apiKey}>API Key를 입력하지 않아도 찾으시는 캐릭터를 검색할 수 있어요.</div>
                <Search header={false} />
            </div>
            <div className={styles.divider}>
                <Image className={styles.dividerIcon} width={215} height={1} alt="" src="/icons/divider_item.svg" />
                <div className={styles.div1}>또는</div>
                <Image className={styles.dividerIcon} width={215} height={1} alt="" src="/icons/divider_item.svg" />
            </div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.wrapTitle}>
                        <div className={styles.title}>
                            <div className={styles.icon1}>
                                <Image className={styles.iconItem} width={32} height={32} alt="" src="/icons/blue_mark.svg" />
                            </div>
                            <div className={styles.apiKey1}>API Key 인증 필요</div>
                        </div>
                        <div className={styles.apiContainer}>
                            <p className={styles.api}>내 캐릭터 정보를 보려면 API 인증이 필요해요.</p>
                            <p className={styles.api}>API를 등록하면 다음과 같은 이점이 있어요.</p>
                        </div>
                    </div>
                    <div className={styles.wrapInfo}>
                        <div className={styles.ai}>✅ 내 캐릭터 정보가 자동으로 표시돼요</div>
                        <div className={styles.div3}>✅ 매 번 검색할 필요없이 쉽게 정보를 확인할 수 있어요</div>
                        <div className={styles.ai}>✅ 메이 AI가 본캐에 딱 맞는 육성 팁을 알려줘요</div>
                    </div>
                </div>
                <div className={styles.container1}>
                    <div className={styles.container}>
                        <form className={styles.textInput}>
                            <div className={styles.textInput1}>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    placeholder="API Key를 입력해주세요"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                        </form>
                        {error && <p className={styles.errorMessage}>{error}</p>} {/* 오류 메시지 표시 */}
                        <div className={styles.wrapBtn}>
                            <button className={styles.button} onClick={handleInputButtonClick} disabled={isLoading}>
                                <div className={styles.button1}>{isLoading ? '검색 중...' : '입력하기'}</div>
                            </button>
                            <button className={styles.button2} onClick={clickModal}>
                                <div className={styles.button1}>API Key 가이드</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal &&
                <BannerModal onClose={clickModal}/>
            }
        </div>
    );
};

export default NoSearch;