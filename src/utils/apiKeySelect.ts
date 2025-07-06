import { cookies } from "next/headers";

export async function getApiKey(): Promise<string> {
    const cookieStore = await cookies();
    const ApiKey = cookieStore.get('ApiKey')?.value;
    const LoginApiKey = cookieStore.get('apiKey')?.value;

    if (LoginApiKey) {
        return LoginApiKey;
    } else if (ApiKey) {
        return ApiKey;
    } else {
        return '0';
    }
}