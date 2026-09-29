'use server';

import { NoticeSummary } from '@/utils/aiApi';
import { backendFetch } from '@/utils/serverApi';

// ponytail: 백엔드가 /api/ai/** 를 인증 필수로 두고 있어 비로그인 사용자는 빈 배열을 받는다.
// 공지를 공개로 열려면 SecurityConfig에 permitAll을 추가해야 한다.
export async function getNoticeSummaries(limit = 3): Promise<NoticeSummary[]> {
    try {
        const res = await backendFetch(`/api/ai/notices?limit=${limit}`);
        if (!res.ok) {
            console.warn(`공지 요약을 가져오지 못했습니다, 상태 코드: ${res.status}`);
            return [];
        }
        return res.json();
    } catch (error) {
        console.error('공지 요약 가져오기 오류:', error);
        return [];
    }
}
