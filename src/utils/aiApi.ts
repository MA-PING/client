import { authFetch, parseErrorMessage } from '@/utils/authApi';

// 백엔드 com.maping.ai.AdviceTopic 과 1:1 대응한다.
export type AdviceTopic =
    | 'STAT'
    | 'ITEM'
    | 'UNION'
    | 'ARTIFACT'
    | 'SKILL'
    | 'LINK_SKILL'
    | 'SYMBOL'
    | 'LEVEL';

export interface AdviceResponse {
    topic: AdviceTopic;
    advice: string;
}

export interface NoticeSummary {
    title: string;
    url: string;
    date: string;
    gameVersion: string;
    summary: string;
}

export async function requestAdvice(ocid: string, topic: AdviceTopic): Promise<string | null> {
    const res = await authFetch('/api/ai/advice', {
        method: 'POST',
        body: JSON.stringify({ ocid, topic }),
    });
    if (!res.ok) {
        console.error('AI 훈수 요청 실패:', topic, await parseErrorMessage(res, res.statusText));
        return null;
    }
    const data: AdviceResponse = await res.json();
    return data.advice;
}
