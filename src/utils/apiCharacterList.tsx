import type { ApisResponse } from '@/interfaces/character';

interface ApiBody {
    apiKey: string;
}

export async function getApiCharacterList(body: ApiBody): Promise<ApisResponse | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/character/apiList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            next: {
                revalidate: 100, // 100초마다 데이터 갱신
            },
        });

        if (!response.ok) {
            // 서버에서 받은 구체적인 오류 메시지를 로깅하는 것이 좋습니다.
            const errorData = await response.json();
            console.error('API 오류:', response.status, errorData);
            return null;
        }

        const data: ApisResponse = await response.json();

        // 원본 로직에 따라 data.data가 null인 경우를 처리합니다.
        if (data.data === null) {
            console.warn('API가 캐릭터 목록에 대해 null 데이터를 반환했습니다:', data.message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('캐릭터 목록 가져오기 실패:', error);
        return null;
    }
}