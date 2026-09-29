import { authFetch, parseErrorMessage } from '@/utils/authApi';

class UserApiError extends Error {}

export async function registerApiKey(apiKey: string): Promise<void> {
    const res = await authFetch('/api/users/me/api-key', {
        method: 'POST',
        body: JSON.stringify({ apiKey }),
    });
    if (!res.ok) throw new UserApiError(await parseErrorMessage(res, 'API 키 등록에 실패했습니다.'));
}

export async function deleteApiKey(): Promise<void> {
    const res = await authFetch('/api/users/me/api-key', { method: 'DELETE' });
    if (!res.ok) throw new UserApiError(await parseErrorMessage(res, 'API 키 삭제에 실패했습니다.'));
}

export async function updateNickname(nickname: string): Promise<void> {
    const res = await authFetch('/api/users/me/nickname', {
        method: 'POST',
        body: JSON.stringify({ nickname }),
    });
    if (!res.ok) throw new UserApiError(await parseErrorMessage(res, '닉네임 변경에 실패했습니다.'));
}

export async function updateMainCharacter(characterName: string): Promise<void> {
    const res = await authFetch('/api/users/me/main-character', {
        method: 'POST',
        body: JSON.stringify({ characterName }),
    });
    if (!res.ok) throw new UserApiError(await parseErrorMessage(res, '본캐 설정에 실패했습니다.'));
}

export async function deleteAccount(currentPassword?: string): Promise<void> {
    const res = await authFetch('/api/users/me', {
        method: 'DELETE',
        body: currentPassword ? JSON.stringify({ currentPassword }) : undefined,
    });
    if (!res.ok) throw new UserApiError(await parseErrorMessage(res, '회원 탈퇴에 실패했습니다.'));
}
