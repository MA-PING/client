import { cookies } from 'next/headers';

// SSR(Server Component)에서는 Next 서버가 백엔드를 직접 호출하므로 rewrite 프록시를 타지 않는다.
// 브라우저가 보낸 쿠키를 그대로 전달해야 인증 상태가 유지된다.
export const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080';

export async function backendFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const cookieStore = await cookies();
    return fetch(`${BACKEND_URL}${path}`, {
        ...init,
        headers: { ...init.headers, Cookie: cookieStore.toString() },
        cache: 'no-store',
    });
}
