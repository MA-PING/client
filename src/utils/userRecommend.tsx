import { recommendResponse} from '@/interfaces/character';

export async function getApiUserRecommend(): Promise<recommendResponse | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/recommend/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 1000,
            },
        });

        if (!response.ok) {
            // 서버에서 받은 구체적인 오류 메시지를 로깅하는 것이 좋습니다.
            const errorData = await response.json();
            console.error('API 오류:', response.status, errorData);
            return null;
        }

        const data: recommendResponse = await response.json();

        // 원본 로직에 따라 data.data가 null인 경우를 처리합니다.
        if (data.data === null) {
            console.warn('API가 유저 추천 질문에 대해 null 데이터를 반환했습니다:', data.message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('유저 질문 가져오기 실패:', error);
        return null;
    }
}