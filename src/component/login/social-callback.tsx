"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SocialCallback() {
    const router = useRouter();

    useEffect(() => {
        const { token, isNew } = router.query;
        if (token) {
            localStorage.setItem("access_token", token as string);
            // 신규 회원이면 회원정보 입력 페이지로, 아니면 메인으로
            if (isNew === "true") {
                router.replace("/onboarding");
            } else {
                router.replace("/");
            }
        }
    }, [router.query]);

    return <div>로그인 처리중...</div>;
}
