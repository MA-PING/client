import Header from "@/component/header";
import NoSearch from "@/component/search/noSearch";
import {Suspense} from "react";
import {cookies} from "next/headers";
import Loading from "@/component/search/loading";
import CharacterDisplay from "@/component/character/CharacterDisplay";
import {getInitialCharacterData} from "@/app/list/page";

export async function getApiKey(): Promise<string> {
    const cookieStore = await cookies();
    const ApiKey = cookieStore.get('ApiKey')?.value;
    const LoginApiKey = cookieStore.get('apiKey')?.value;
    if (LoginApiKey) {
        return LoginApiKey;
    }else if(ApiKey) {
        return ApiKey;
    }else{
        return '0';
    }
}
export default async function Home() {
    const encryptedApiKey = await getApiKey();
    const { initialApiResponse, initialDetailCharacter } = await getInitialCharacterData(encryptedApiKey);

    if (!initialApiResponse || !initialDetailCharacter) {
        return (
            <div>
                <Header />
                <Suspense fallback={<Loading />}>
                    <NoSearch/>
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