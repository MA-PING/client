// 새 백엔드(com.maping)의 쿠키 기반 인증 API 클라이언트.
// 액세스/리프레시 토큰은 httpOnly 쿠키로 관리되므로 여기서는 토큰을 직접 다루지 않는다.

export interface TokenResponse {
    expiresIn: number;
}

export interface AuthUser {
    id: string;
    email: string;
    nickname: string;
}

class AuthApiError extends Error {}

function readCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

// Spring Security의 csrf.spa()는 GET 응답에서 XSRF-TOKEN 쿠키를 내려준다.
// 상태 변경 요청(csrf() 대상)에는 이 값을 X-XSRF-TOKEN 헤더로 함께 보내야 한다.
async function ensureCsrfToken(): Promise<string> {
    const existing = readCookie('XSRF-TOKEN');
    if (existing) return existing;

    await fetch('/api/auth/csrf', { credentials: 'same-origin' });
    return readCookie('XSRF-TOKEN') ?? '';
}

export async function authFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const method = (init.method ?? 'GET').toUpperCase();
    const headers = new Headers(init.headers);

    if (method !== 'GET' && method !== 'HEAD') {
        headers.set('X-XSRF-TOKEN', await ensureCsrfToken());
    }
    if (init.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    return fetch(path, { ...init, headers, credentials: 'same-origin' });
}

export async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
    try {
        const data = await res.json();
        return data?.message ?? fallback;
    } catch {
        return fallback;
    }
}

export async function login(email: string, password: string): Promise<TokenResponse> {
    const res = await authFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new AuthApiError(await parseErrorMessage(res, '로그인에 실패했습니다.'));
    return res.json();
}

export async function register(email: string, nickname: string, password: string): Promise<AuthUser> {
    const res = await authFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, nickname, password }),
    });
    if (!res.ok) throw new AuthApiError(await parseErrorMessage(res, '회원가입에 실패했습니다.'));
    return res.json();
}

export async function logout(): Promise<void> {
    await authFetch('/api/auth/logout', { method: 'POST' });
}

export async function reissue(): Promise<TokenResponse | null> {
    const res = await authFetch('/api/auth/reissue', { method: 'POST' });
    if (!res.ok) return null;
    return res.json();
}

export async function fetchMe(): Promise<AuthUser | null> {
    const res = await fetch('/api/users/me', { credentials: 'same-origin' });
    if (!res.ok) return null;
    return res.json();
}

export async function sendEmailVerification(email: string): Promise<void> {
    const res = await authFetch('/api/auth/send-email-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new AuthApiError(await parseErrorMessage(res, '인증 메일 발송에 실패했습니다.'));
}

export async function checkVerificationCode(email: string, code: string): Promise<void> {
    const res = await authFetch('/api/auth/check-verification-code', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
    });
    if (!res.ok) throw new AuthApiError(await parseErrorMessage(res, '인증번호가 올바르지 않습니다.'));
}

export async function checkNickname(nickname: string): Promise<boolean> {
    const res = await fetch(`/api/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`, {
        credentials: 'same-origin',
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.available);
}

export function socialLoginUrl(provider: 'google' | 'naver'): string {
    return `/oauth2/authorization/${provider}`;
}
