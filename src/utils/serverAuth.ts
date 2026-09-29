'use server';

import { cookies } from 'next/headers';
import { AuthUser } from '@/utils/authApi';
import { backendFetch } from '@/utils/serverApi';

export async function getCurrentUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    if (!cookieStore.get('ACCESS_TOKEN')) return null;

    try {
        const res = await backendFetch('/api/users/me');
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        return null;
    }
}
