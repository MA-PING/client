import {chatHistory, ChatHistoryResponse} from "@/interfaces/character";


export async function getChatHistory(token: string): Promise<chatHistory[] | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            next: {
                revalidate: 100, // 100초마다 데이터 갱신
            },
        });

        if (!response.ok) {
            // 서버에서 받은 구체적인 오류 메시지를 로깅하는 것이 좋습니다.
            const errorData = await response.json();
            console.error('챗봇 기록 오류:', response.status, errorData);
            return null;
        }

        const data: ChatHistoryResponse = await response.json();

        // 원본 로직에 따라 data.data가 null인 경우를 처리합니다.
        if (data.data === null) {
            console.warn('챗봇 기록에 대해 null 데이터를 반환했습니다:', data.message);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error('챗봇 기록 가져오기 실패:', error);
        return null;
    }
}