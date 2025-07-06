import Header from "@/component/header";
import NoSearch from "@/component/search/noSearch";
import {Suspense} from "react";
import Loading from "@/component/search/loading";
import CharacterDisplay from "@/component/character/CharacterDisplay";
import {getInitialCharacterData} from "@/app/list/page";
import {getApiKey} from "@/utils/apiKeySelect";

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