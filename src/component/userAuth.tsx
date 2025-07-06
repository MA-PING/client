'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setUserInfo } from '@/redux/userSlice';
import { RootState } from '@/redux/store';
import { setCookie} from 'cookies-next';
import {getUserInfo} from "@/utils/userInfo";
import {userInfo} from "@/interfaces/character";

export default function AuthInitializer() {
    const dispatch = useDispatch();
    const accessTokenInRedux = useSelector((state: RootState) => state.userInfo.accessToken);
    console.log(accessTokenInRedux);
    useEffect(() => {
        const initializeAuth = async () => {
            if (!accessTokenInRedux) {
                // const storedAccessToken = getCookie('accessToken') as string | undefined;
                // const storedTokenExpiresAt = getCookie('tokenExpiresAt') as string | undefined;
                const storedAccessToken = localStorage.getItem('accessToken');
                const storedrefreshToken = localStorage.getItem('refreshToken');
                const storedTokenExpiresAt = localStorage.getItem('tokenExpiresAt');
                console.log('storedAccessToken', storedAccessToken);

                let parsedTokenExpiresAt: number | null = null;
                if (typeof storedTokenExpiresAt === 'string') {
                    parsedTokenExpiresAt = parseInt(storedTokenExpiresAt, 10) * 1000;
                }
                const currentTime = Date.now();
                console.log('currentTime', currentTime);
                console.log('parsedTokenExpiresAt', parsedTokenExpiresAt);

                if (parsedTokenExpiresAt && parsedTokenExpiresAt <= currentTime){

                }

                if (storedrefreshToken && parsedTokenExpiresAt) {  // storedAccessToken && parsedTokenExpiresAt && parsedTokenExpiresAt > currentTime
                    dispatch(setAccessToken({ accessToken: storedrefreshToken, tokenExpiresAt: parsedTokenExpiresAt }));
                    console.log("엑세스토큰 redux 저장");
                    try {
                        const userInfoData: userInfo | null = await getUserInfo(storedrefreshToken);
                        if (userInfoData) {
                            dispatch(setUserInfo({
                                userId: userInfoData.userId,
                                userName: userInfoData.userName,
                                email: userInfoData.email,
                                userApiInfo: userInfoData.userApiInfo
                            }));
                            if(userInfoData.userApiInfo){
                                const encryptedApiKey = btoa(userInfoData.userApiInfo.trim());
                                console.log('encryptedApiKey 교체', encryptedApiKey);
                                setCookie('apiKey', encryptedApiKey, { maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
                            }

                            // const userCookieData = {
                            //     userId: userInfoData.userId,
                            //     userName: userInfoData.userName,
                            //     email: userInfoData.email,
                            //     userApiInfo: encryptedApiKey
                            // };
                            // const cookieOptions = {
                            //     expires: new Date(currentTime + (7 * 24 * 60 * 60 * 1000)), // 7일 후 만료
                            //     secure: process.env.NODE_ENV === 'production',
                            //     sameSite: 'lax' as const
                            // };
                            // setCookie('user', JSON.stringify(userCookieData), cookieOptions);
                            console.log("사용자 정보 Redux 저장 완료.");
                        } else {
                            console.log("getUserInfo 로부터 사용자 정보를 가져오지 못했습니다.");
                        }
                    } catch (error) {
                        console.error("사용자 정보 가져오기 중 오류 발생:", error);
                    }
                }else if (storedAccessToken) {
                    console.log('기간 만료');
                }else{
                    console.log("엑세스토큰이 없습니다. 로그인 필요.");
                }
            }
        };
        initializeAuth();
    }, [dispatch, accessTokenInRedux]);
    return null;
}