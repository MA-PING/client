'use server';

import { ApiResponse, Character } from '@/interfaces/character';
import { BACKEND_URL } from '@/utils/serverApi';

// Next.js가 라우트 파라미터를 이미 디코딩해서 줄 수도, 인코딩된 채로 줄 수도 있어
// 한 번 디코딩해 평문으로 되돌린 뒤 다시 인코딩한다(이중 인코딩 방지).
function normalizeCharacterName(name: string): string {
    try {
        return decodeURIComponent(name);
    } catch {
        return name;
    }
}

export async function getCharacter(name: string): Promise<ApiResponse | null> {
    try {
        const response = await fetch(`${BACKEND_URL}/api/characters?characterName=${encodeURIComponent(normalizeCharacterName(name))}`, {
            next: {
                revalidate: 1000, // 1000초마다 데이터 갱신
                tags: [`character:${name}`], // 특정 캐릭터 데이터에 대한 태그
            },
        });
        if (!response.ok) {
            console.warn(`캐릭터 정보를 가져오지 못했습니다: ${name}, 상태 코드: ${response.status}`);
            return null;
        }

        const characterData: Character = await response.json();

        if (!characterData) {
            console.warn(`'${name}' 캐릭터 데이터가 비어있습니다.`);
            return null;
        }

        // 받아온 데이터의 각 속성이 null인지 검증
        for (const key in characterData) {
            if (Object.prototype.hasOwnProperty.call(characterData, key)) {
                if (characterData[key as keyof Character] === null) {
                    console.log(`'${name}' 캐릭터 데이터 검증 실패: '${key}' 속성 값이 null입니다.`);
                    return null; // null 값이 있으면 함수를 중단하고 null 반환
                }
            }
        }

        return {
            code: 'OK',
            message: '',
            responseAt: new Date().toISOString(),
            data: characterData,
            success: true,
        };
    } catch (error) {
        console.error(`캐릭터 정보 가져오기 오류 (${name}):`, error);
        return null;
    }
}
