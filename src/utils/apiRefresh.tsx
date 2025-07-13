'use server';

import {JWTInfo, JWTResponse, NoResponse} from '@/interfaces/character';


export async function getJWTRefresh(token: string): Promise<JWTInfo | null> {
    try {
        const body = {
            accessToken: token,
        };
        const response = await fetch('https://api.ma-ping.com/api/v1/auth/reissue', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.warn(`토큰을 가져오지 못했습니다, 상태 코드: ${response.status}`);
            const data: NoResponse = await response.json();
            console.warn(`토큰을 가져오지 못했습니다, 메시지: ${data.error}`);
            return null;
        }

        const data: JWTResponse = await response.json();
        const characterData = data.data;

        if (!characterData) {
            console.warn(`토큰 데이터의 'data' 필드가 비어있습니다.`);
            return null;
        }


        // 최종적으로 데이터와 data 필드가 모두 유효한지 확인
        if (!data || !data.data) {
            console.warn(`토큰 데이터가 유효하지 않습니다: data 또는 data.data가 없음`);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(`토큰 가져오기 오류:`, error);
        return null;
    }
}