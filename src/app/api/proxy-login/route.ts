import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const backendResponse = await fetch("https://api.ma-ping.com/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const contentType = backendResponse.headers.get("content-type") || "";

        // ✅ Set-Cookie 전달 처리
        const setCookie = backendResponse.headers.get("set-cookie");

        let res: NextResponse;

        if (contentType.includes("application/json")) {
            const data = await backendResponse.json();
            res = NextResponse.json(data, { status: backendResponse.status });
        } else {
            const text = await backendResponse.text();
            res = NextResponse.json({ message: text }, { status: backendResponse.status });
        }

        // ✅ 백엔드에서 받은 Set-Cookie가 있다면 프론트에도 전달
        if (setCookie) {
            res.headers.set("set-cookie", setCookie);
        }

        return res;
    } catch (error) {
        console.error("프록시 로그인 에러:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
