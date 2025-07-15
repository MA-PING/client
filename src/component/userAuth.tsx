'use client';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserData, setAccessToken, setUserInfo} from '@/redux/userSlice';
import {RootState} from '@/redux/store';
import {getUserInfo} from "@/utils/userInfo";
import {getJWTRefresh} from "@/utils/apiRefresh";
import {saveAccessToken, saveAPIKey, serverLogout} from "@/app/actions";

interface AuthInitializerProps {
    accessToken?: string | undefined
}

export default function AuthInitializer({accessToken}: AuthInitializerProps) {
    const dispatch = useDispatch();
    const accessTokenInRedux = useSelector((state: RootState) => state.userInfo);
    useEffect(() => {
        const handleAuthError = async (message: string, error?: unknown) => {
            console.error(message, error);
            // 인증 실패 시 사용자 데이터를 지우고 로그아웃 처리 후 페이지 새로고침
            dispatch(clearUserData());
            await serverLogout();
            window.location.reload();
        };
        const updateAuthInfo = async (currentAccessToken: string, expiresIn: number) => {
            // 액세스 토큰 쿠키 설정
            await saveAccessToken(currentAccessToken)
            // Redux에 액세스 토큰 및 만료 시간 저장
            dispatch(setAccessToken({ accessToken: currentAccessToken, tokenExpiresAt: expiresIn }));

            await updateUserInfo(currentAccessToken);

        };
        const updateUserInfo = async (currentAccessToken: string) => {
            const currentUserInfo = await getUserInfo(currentAccessToken);
            if (currentUserInfo) {
                dispatch(setUserInfo({
                    userId: currentUserInfo.userId,
                    userName: currentUserInfo.userName,
                    email: currentUserInfo.email,
                    userApiInfo: currentUserInfo.userApiInfo
                }));

                // API 키가 있다면 암호화하여 쿠키에 저장
                if (currentUserInfo.userApiInfo) {
                    const encryptedApiKey = btoa(currentUserInfo.userApiInfo.trim());
                    await saveAPIKey(encryptedApiKey, 'apiKey');
                }
                console.log("사용자 정보 및 액세스 토큰 Redux 저장 및 쿠키 업데이트 완료.");
            } else {
                // 사용자 정보를 가져오지 못했을 경우
                await handleAuthError("새 액세스 토큰으로 사용자 정보를 가져오지 못했습니다. 다시 로그인해야 합니다.");
            }
        }
        const refreshAndSetAuth = async (currentAccessToken: string) => {
            try {
                const jwt = await getJWTRefresh(currentAccessToken);
                if (jwt && jwt.accessToken && jwt.expiresIn) {
                    await updateAuthInfo(jwt.accessToken, jwt.expiresIn);
                } else {
                    await handleAuthError("토큰 재발급 실패. 다시 로그인해야 합니다.");
                }
            } catch (error) {
                await handleAuthError("토큰 재발급 중 오류 발생:", error);
            }
        };

        const initializeAuth = async () => {
            const currentTime = Date.now(); // 현재 유닉스 시간
            const refreshThreshold = 5 * 60 * 1000; // 토큰 만료 5분 전
            if (!accessToken) {
                console.log("리프레시 토큰이 없습니다. 로그인 필요.");
                return;
            }
            if (!accessTokenInRedux.accessToken || !accessTokenInRedux.tokenExpiresAt || (accessTokenInRedux.tokenExpiresAt * 1000 - currentTime < refreshThreshold)) {
                try {
                    await refreshAndSetAuth(accessToken);
                } catch (error) {
                    await handleAuthError("인증 초기화 중 오류 발생:", error);
                }
            }else if(!accessTokenInRedux.userName) {
                await updateUserInfo(accessTokenInRedux.accessToken);
            }else{
                console.log("Redux의 액세스 토큰이 아직 유효합니다.");
            }
        };
        initializeAuth();
    }, [dispatch, accessToken, accessTokenInRedux.accessToken, accessTokenInRedux.tokenExpiresAt, accessTokenInRedux.userName]);
    return null;
}