import { authFetch, parseErrorMessage } from '@/utils/authApi';

export interface FavoriteCharacter {
    ocid: string;
    characterName: string;
    characterLevel: number;
    worldName: string;
    characterClass: string;
    guildName: string;
    characterImage: string;
}

class FavoriteApiError extends Error {}

export async function getFavorites(): Promise<FavoriteCharacter[]> {
    const res = await authFetch('/api/favorites');
    if (!res.ok) return [];
    return res.json();
}

export async function addFavorite(characterName: string): Promise<void> {
    const res = await authFetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({ characterName }),
    });
    if (!res.ok) throw new FavoriteApiError(await parseErrorMessage(res, '즐겨찾기 추가에 실패했습니다.'));
}

export async function removeFavorite(characterName: string): Promise<void> {
    const res = await authFetch(`/api/favorites?characterName=${encodeURIComponent(characterName)}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new FavoriteApiError(await parseErrorMessage(res, '즐겨찾기 삭제에 실패했습니다.'));
}
