'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserData, setUserInfo } from '@/redux/userSlice';
import { AuthUser, fetchMe, reissue } from '@/utils/authApi';

interface AuthInitializerProps {
    initialUser: AuthUser | null;
}

// 인증은 백엔드가 내려주는 httpOnly 쿠키(ACCESS_TOKEN/REFRESH_TOKEN)로 유지된다.
// 여기서는 SSR로 받아온 사용자 정보를 Redux에 반영하고, 만료 시(/api/users/me 401)
// 리프레시 쿠키로 한 번 재발급을 시도한 뒤 결과를 반영하는 역할만 한다.
export default function AuthInitializer({ initialUser }: AuthInitializerProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        const hydrate = (user: AuthUser) => {
            dispatch(setUserInfo({ userId: user.id, userName: user.nickname, email: user.email }));
        };

        const initializeAuth = async () => {
            if (initialUser) {
                hydrate(initialUser);
                return;
            }

            const reissued = await reissue();
            if (!reissued) {
                dispatch(clearUserData());
                return;
            }

            const user = await fetchMe();
            if (user) {
                hydrate(user);
            } else {
                dispatch(clearUserData());
            }
        };

        initializeAuth();
    }, [dispatch, initialUser]);

    return null;
}
