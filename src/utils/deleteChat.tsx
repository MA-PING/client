
export async function deleteChatHistory(token: string, uuid: string): Promise<boolean> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/history/'+uuid, {
            method: 'DELETE',
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
            console.error('챗봇 내용 오류:', response.status, errorData);
            return false;
        }else{
            return true;
        }
    } catch (error) {
        console.error('챗봇 내용 가져오기 실패:', error);
        return false;
    }
}