'use server';

import { ApiResponse, Character } from '@/interfaces/character';

export async function getCharacter(name: string): Promise<ApiResponse | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/character?characterName=' + name, {
            next: {
                revalidate: 1000, // 1000초마다 데이터 갱신
                tags: [`character:${name}`], // 특정 캐릭터 데이터에 대한 태그
            },
        });
        if (!response.ok) {
            console.warn(`캐릭터 정보를 가져오지 못했습니다: ${name}, 상태 코드: ${response.status}`);
            return null;
        }

        const data: ApiResponse = await response.json();
        const characterData = data.data;

        if (!characterData) {
            console.warn(`'${name}' 캐릭터 데이터의 'data' 필드가 비어있습니다.`);
            return null;
        }

        // 받아온 데이터의 각 속성이 null인지 검증
        for (const key in characterData) {
            if (Object.prototype.hasOwnProperty.call(characterData, key)) {
                if (characterData[key as keyof Character] === null) {
                    console.log(`'${name}' 캐릭터 데이터 검증 실패: '${key}' 속성 값이 null입니다.`);
                    // 만약 null 값 발견 시 특정 동작 (예: 데이터 새로고침)이 필요하다면 여기에 추가
                    // await refreshCharacterData(characterData.basic.character_name);
                    return null; // null 값이 있으면 함수를 중단하고 null 반환
                }
            }
        }

        // 최종적으로 데이터와 data 필드가 모두 유효한지 확인
        if (!data || !data.data) {
            console.warn(`'${name}' 캐릭터 데이터가 유효하지 않습니다: data 또는 data.data가 없음`);
            return null;
        }

        return data;
    } catch (error) {
        console.error(`캐릭터 정보 가져오기 오류 (${name}):`, error);
        return null;
    }
}