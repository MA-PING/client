import { cookies } from "next/headers";
import {getInitialCharacterData} from "@/app/list/page";
import {ApisResponse, Character} from "@/interfaces/character";

export async function getApiKey(): Promise<{
    initialApiResponse: ApisResponse | null;
    initialDetailCharacter: Character | null
}> {
    const cookieStore = await cookies();
    const ApiKey = cookieStore.get('ApiKey')?.value;
    const LoginApiKey = cookieStore.get('apiKey')?.value;

    if (LoginApiKey) {
        return getInitialCharacterData(LoginApiKey, 'apiKey');
    } else if (ApiKey) {
        return getInitialCharacterData(ApiKey, 'ApiKey');
    } else {
        return {
            initialApiResponse: null,
            initialDetailCharacter: null
        };
    }
}