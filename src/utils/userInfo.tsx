'use server';

import {userInfo, UserInfoResponse} from '@/interfaces/character';


export async function getUserInfo(token: string): Promise<userInfo | null> {
    try {
        const response = await fetch('https://api.ma-ping.com/api/v1/user/info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            next: {
                revalidate: 1000, // 1000초마다 데이터 갱신
                tags: [`token:${token}`],
            },
        });
        if (!response.ok) {
            console.warn(`사용자 정보를 가져오지 못했습니다, 상태 코드: ${response.status}`);
            return null;
        }

        const data: UserInfoResponse = await response.json();
        const characterData = data.data;

        if (!characterData) {
            console.warn(`사용자 데이터의 'data' 필드가 비어있습니다.`);
            return null;
        }


        // 최종적으로 데이터와 data 필드가 모두 유효한지 확인
        if (!data || !data.data) {
            console.warn(`사용자 데이터가 유효하지 않습니다: data 또는 data.data가 없음`);
            return null;
        }

        return data.data;
    } catch (error) {
        console.error(`사용자 정보 가져오기 오류:`, error);
        return null;
    }
}