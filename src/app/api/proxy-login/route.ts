import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch("https://api.ma-ping.com/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        } else {
            const text = await response.text();
            return NextResponse.json({ message: text }, { status: response.status });
        }
    } catch (error) {
        console.error("프록시 로그인 에러:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
