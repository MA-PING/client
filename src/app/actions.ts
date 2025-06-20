'use server'; // 이 파일의 함수들은 서버에서만 실행됨을 명시

import { revalidateTag } from 'next/cache';

// 특정 캐릭터 이름 태그를 가진 캐시를 무효화하는 함수
export async function refreshCharacterData(characterName: string) {
    const name = encodeURIComponent(characterName);
    const tag = `character:${name}`;
    revalidateTag(tag);
    console.log(`Revalidating cache for tag: ${tag}`);
}