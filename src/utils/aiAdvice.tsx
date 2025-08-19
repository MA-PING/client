import { response} from '@/interfaces/character';

export async function getAiAdvice(type: string, ocid:string, token: string): Promise<string | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/ai/'+type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({"ocid": ocid}),
            next: {
                revalidate: 6000, // 1000초마다 데이터 갱신
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API 오류:', response.status, errorData);
            return null;
        }

        const data: response = await response.json();

        if (data.data === null) {
            console.warn(type+' 훈수에 대해 null 데이터를 반환했습니다:', data.message);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(type+'훈수 가져오기 실패:', error);
        return null;
    }
}