import {ApiCheckResponse, characterMainList} from '@/interfaces/character';

export async function getCharacterList(token: string): Promise<characterMainList[] | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/character/onlyList', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            next: {
                revalidate: 1000, // 1000초마다 데이터 갱신
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API 오류:', response.status, errorData);
            return null;
        }

        const data: ApiCheckResponse = await response.json();

        // 원본 로직에 따라 data.data가 null인 경우를 처리합니다.
        if (data.data === null) {
            console.warn('캐릭터 목록에 대해 null 데이터를 반환했습니다:', data.message);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error('캐릭터 목록 가져오기 실패:', error);
        return null;
    }
}