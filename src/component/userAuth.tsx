'use client';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAccessToken, setUserInfo} from '@/redux/userSlice';
import {RootState} from '@/redux/store';
import {setCookie} from 'cookies-next';
import {getUserInfo} from "@/utils/userInfo";
import {userInfo} from "@/interfaces/character";
import {getJWTRefresh} from "@/utils/apiRefresh";

interface AuthInitializerProps {
    accessToken?: string | undefined
}

export default function AuthInitializer({accessToken}: AuthInitializerProps) {
    const dispatch = useDispatch();
    const accessTokenInRedux = useSelector((state: RootState) => state.userInfo.accessToken);
    console.log('redux: '+accessTokenInRedux);

    useEffect(() => {
        const initializeAuth = async () => {
            if (!accessTokenInRedux) {
                if (!accessToken) {
                    console.log("리프레시 토큰이 없습니다. 로그인 필요.");
                    return;
                }

                if (accessToken) {
                    try {
                        let currentAccessToken = accessToken;
                        let currentUserInfo: userInfo | null = null;

                        if (currentAccessToken) {
                            currentUserInfo = await getUserInfo(currentAccessToken);
                            console.log('currentUserInfo: '+currentUserInfo);
                        }
                        if (!currentUserInfo) {
                            console.log("액세스 토큰이 유효하지 않거나 만료되어 재발급을 시도합니다.");
                            const jwt = await getJWTRefresh(currentAccessToken);
                            if (jwt && jwt.accessToken) {
                                currentAccessToken = jwt.accessToken;

                                setCookie('accessToken', currentAccessToken, {
                                    maxAge: 60 * 60,
                                    secure: process.env.NODE_ENV === 'production',
                                    httpOnly: true,
                                    sameSite: 'lax'
                                });

                                currentUserInfo = await getUserInfo(currentAccessToken);
                            } else {
                                console.error("리프레시 토큰 갱신 실패. 다시 로그인해야 합니다.");
                                // TODO: 리프레시 토큰 갱신 실패 시, 쿠키 삭제 및 로그인 페이지로 리다이렉트 처리
                                return;
                            }
                        }
                        if (currentUserInfo) {
                            dispatch(setUserInfo({
                                userId: currentUserInfo.userId,
                                userName: currentUserInfo.userName,
                                email: currentUserInfo.email,
                                userApiInfo: currentUserInfo.userApiInfo
                            }));
                            if (currentUserInfo.userApiInfo) {
                                const encryptedApiKey = btoa(currentUserInfo.userApiInfo.trim());
                                setCookie('apiKey', encryptedApiKey, {
                                    maxAge: 60 * 60 * 24 * 7,
                                    secure: process.env.NODE_ENV === 'production',
                                    httpOnly: true,
                                    sameSite: 'lax'
                                });
                            }
                            dispatch(setAccessToken({accessToken: currentAccessToken, tokenExpiresAt: 0}));
                            console.log("사용자 정보 및 액세스 토큰 Redux 저장 완료.");
                        } else {
                            console.log("모든 시도에도 불구하고 사용자 정보를 가져오지 못했습니다. 로그인 필요.");
                        }
                    } catch (error) {
                        console.error("인증 초기화 중 오류 발생:", error);
                        // TODO: 오류 발생 시, 쿠키 삭제 및 로그인 페이지로 리다이렉트 처리
                    }
                }
            }
        };
        initializeAuth();
    }, [dispatch, accessTokenInRedux]);
    return null;
}