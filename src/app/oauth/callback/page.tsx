"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/userSlice";
import { fetchMe } from "@/utils/authApi";

// 백엔드 OAuth2SuccessHandler(maping.oauth2.redirect-uri)가 쿠키를 심은 뒤 이 경로로 리다이렉트한다.
export default function OAuthCallback() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const user = await fetchMe();
            if (user) {
                dispatch(setUserInfo({ userId: user.id, userName: user.nickname, email: user.email }));
            }
            window.location.replace("/");
        })();
    }, [dispatch]);

    return <div>로그인 처리중...</div>;
}
