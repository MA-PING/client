
import { Suspense } from 'react';
import Loading from '@/component/search/loading';
import { getApiCharacterList } from "@/utils/apiCharacterList";
import { ApisResponse, Character } from "@/interfaces/character";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CharacterDisplay from "@/component/character/CharacterDisplay";


export async function getInitialCharacterData(encryptedApiKey: string | undefined, key: string): Promise<{ initialApiResponse: ApisResponse | null; initialDetailCharacter: Character | null }> {

    let initialApiResponse: ApisResponse | null = null;
    let initialDetailCharacter: Character | null = null;
    if (!encryptedApiKey) {
        console.warn("API 키가 없습니다. 리다이렉트.");
        redirect('/');
    }
    try {
        const decodedApiKey = Buffer.from(encryptedApiKey, 'base64').toString('utf8');
        initialApiResponse = await getApiCharacterList({ apiKey: decodedApiKey });

        if (!initialApiResponse || !initialApiResponse.data || !initialApiResponse.data.characterInfo || !initialApiResponse.data.characterList) {
            console.warn("API 응답 데이터가 유효하지 않습니다. 쿠키 삭제 후 리다이렉트.");
            const cookieStore = await cookies();
            if (cookieStore.has(key)) { // 'ApiKey' 쿠키가 있는지 확인
                cookieStore.delete(key); // 쿠키가 있을 경우에만 삭제
            }
            redirect('/');
        } else {
            initialDetailCharacter = initialApiResponse.data.characterInfo;
        }
    } catch (error) {
        console.error("API 키 디코딩 또는 초기 API 호출 중 오류 발생:", error);
        const cookieStore = await cookies();
        if (cookieStore.has(key)) { // 'ApiKey' 쿠키가 있는지 확인
            cookieStore.delete(key); // 쿠키가 있을 경우에만 삭제
        }
        redirect('/');
    }

    return { initialApiResponse, initialDetailCharacter };
}

export default async function Home() {
    const cookieStore = await cookies();
    const encryptedApiKey = cookieStore.get('ApiKey')?.value;
    const { initialApiResponse, initialDetailCharacter } = await getInitialCharacterData(encryptedApiKey, 'ApiKey');

    if (!initialApiResponse || !initialDetailCharacter) {
        return (
            <div>
                <Suspense fallback={<Loading />}>
                    <div>초기 캐릭터 정보를 불러오지 못했습니다.</div>
                </Suspense>
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <CharacterDisplay initialApiResponse={initialApiResponse} initialDetailCharacter={initialDetailCharacter} />
            </Suspense>
        </div>
    );
}
