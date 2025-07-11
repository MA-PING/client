"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SocialCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const isNew = searchParams.get("isNew");
        if (isNew) {
            if (isNew === "true") {
                router.replace("/onboarding");
            } else {
                router.replace("/");
            }
        }
    }, [searchParams, router]);

    return <div>로그인 처리중...</div>;
}
