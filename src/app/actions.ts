'use server'; // 이 파일의 함수들은 서버에서만 실행됨을 명시

import { revalidateTag } from 'next/cache';
import {cookies} from "next/headers";

// 특정 캐릭터 이름 태그를 가진 캐시를 무효화하는 함수
export async function refreshCharacterData(characterName: string) {
    const tag = `character:${characterName}`;
    revalidateTag(tag, { expire: 0 });
    console.log(`Revalidating cache for tag: ${tag}`);
}

export async function refreshUserData(token: string) {
    const tag = `token:${token}`;
    revalidateTag(tag, { expire: 0 });
    console.log(`유저 정보 tag: ${tag}`);
}

export async function saveAPIKey(apiKey: string, cookieName: string) {
    const cookieStore = await cookies();
    // 쿠키 설정
    cookieStore.set(cookieName, apiKey, {
        maxAge: 60 * 60 * 24 * 7, // 7일
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax' as const
    });
}