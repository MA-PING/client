
'use client';

import { useState, useCallback } from 'react';
import CharacterInfos from "@/component/character/characterInfo";
import Details from "@/component/search/characterDetails";
import styles from "../../styles/search/character.module.css";
import { ApisResponse, Character } from "@/interfaces/character";
import { getCharacter } from "@/utils/characterApi";
import DetailsSkeleton from "@/component/character/DetailsSkeleton";

interface CharacterDisplayProps {
    initialApiResponse: ApisResponse;
    initialDetailCharacter: Character;
}

export default function CharacterDisplay({ initialApiResponse, initialDetailCharacter }: CharacterDisplayProps) {

    const [currentDetailCharacter, setCurrentDetailCharacter] = useState<Character>(initialDetailCharacter);
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
    const [detailError, setDetailError] = useState<string | null>(null);

    const handleCharacterChangeFromInfo = useCallback(async (characterName: string) => {
        setIsDetailLoading(true);
        setDetailError(null);
        try {
            const response = await getCharacter(characterName);
            if (response && response.data) {
                setCurrentDetailCharacter(response.data);
            } else {
                setDetailError('선택된 캐릭터의 상세 정보를 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error("캐릭터 상세 정보 가져오기 오류:", error);
            setDetailError('캐릭터 상세 정보 로드 중 오류가 발생했습니다.');
        } finally {
            setIsDetailLoading(false);
        }
    }, []);

    return (
        <div className={styles.div}>
            <CharacterInfos response={initialApiResponse} onCharacterChange={handleCharacterChangeFromInfo} />

            {isDetailLoading ? (
                <DetailsSkeleton />
            ) : detailError ? (
                <div className={styles.errorContainer}>{detailError}</div> // 에러 UI 추가
            ) : (
                // <DetailsSkeleton />
                <Details character={currentDetailCharacter} />
            )}
        </div>
    );
}