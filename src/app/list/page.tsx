// app/page.tsx

import Header from "@/component/header";
import { Suspense } from 'react';
import Loading from '@/component/search/loading';
import { getApiCharacterList } from "@/utils/apiCharacterList";
import { ApisResponse, Character } from "@/interfaces/character";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CharacterDisplay from "@/component/character/CharacterDisplay";

// 이 컴포넌트는 서버 컴포넌트입니다. 상태 관리를 직접 할 수 없습니다.
// 데이터를 클라이언트 컴포넌트(`CharacterInfos`)에서 업데이트해야 하고
// `Details` 컴포넌트의 데이터도 변경해야 하므로, 복잡도가 있습니다.
// 이 경우, `Details` 컴포넌트를 클라이언트 컴포넌트로 만들고,
// `CharacterInfos`에서 변경된 캐릭터 이름을 받아와 `Details` 내부에서
// 새로운 데이터를 가져오도록 하거나, 상위 클라이언트 컴포넌트를 추가해야 합니다.

// ⭐ 가장 적합한 전략: Home 컴포넌트 하위에 'use client' 컴포넌트를 하나 더 둬서
// 해당 컴포넌트가 캐릭터 선택 및 데이터 가져오기 로직을 처리하도록 합니다.

async function getInitialCharacterData(): Promise<{ initialApiResponse: ApisResponse | null; initialDetailCharacter: Character | null }> {
    const cookieStore = await cookies();
    const encryptedApiKey = cookieStore.get('ApiKey')?.value;

    let initialApiResponse: ApisResponse | null = null;
    let initialDetailCharacter: Character | null = null;

    if (encryptedApiKey) {
        try {
            const decodedApiKey = Buffer.from(encryptedApiKey, 'base64').toString('utf8');
            initialApiResponse = await getApiCharacterList({ apiKey: decodedApiKey });

            if (!initialApiResponse || !initialApiResponse.data || !initialApiResponse.data.characterInfo || !initialApiResponse.data.characterList) {
                console.warn("API 응답 데이터가 유효하지 않습니다. 쿠키 삭제 후 리다이렉트.");
                (await cookies()).delete('ApiKey');
                redirect('/');
            } else {
                // 초기 로드 시 메인 캐릭터 정보를 Details에 전달
                initialDetailCharacter = initialApiResponse.data.characterInfo;
            }
        } catch (error) {
            console.error("API 키 디코딩 또는 초기 API 호출 중 오류 발생:", error);
            (await cookies()).delete('ApiKey'); // 오류 시 쿠키 삭제
            redirect('/');
        }
    } else {
        redirect('/');
    }

    return { initialApiResponse, initialDetailCharacter };
}

export default async function Home() {
    const { initialApiResponse, initialDetailCharacter } = await getInitialCharacterData();

    if (!initialApiResponse || !initialDetailCharacter) {
        return (
            <div>
                <Header />
                <Suspense fallback={<Loading />}>
                    <div>초기 캐릭터 정보를 불러오지 못했습니다.</div>
                </Suspense>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Suspense fallback={<Loading />}>
                <CharacterDisplay initialApiResponse={initialApiResponse} initialDetailCharacter={initialDetailCharacter} />
            </Suspense>
        </div>
    );
}
