import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            { source: "/api/auth/:path*", destination: `${BACKEND_URL}/api/auth/:path*` },
            { source: "/api/users/:path*", destination: `${BACKEND_URL}/api/users/:path*` },
            { source: "/api/ai/:path*", destination: `${BACKEND_URL}/api/ai/:path*` },
            { source: "/api/characters/:path*", destination: `${BACKEND_URL}/api/characters/:path*` },
            { source: "/api/favorites/:path*", destination: `${BACKEND_URL}/api/favorites/:path*` },
            { source: "/oauth2/:path*", destination: `${BACKEND_URL}/oauth2/:path*` },
            { source: "/login/oauth2/:path*", destination: `${BACKEND_URL}/login/oauth2/:path*` },
        ];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https', // 이미지 URL의 프로토콜 (http 또는 https)
                hostname: 'open.api.nexon.com', // 오류 메시지에 나온 호스트 이름
                port: '', // 기본 포트(80, 443)는 비워둡니다.
                pathname: '/static/maplestory/**', // 허용할 경로 패턴 (예: '/static/**' 또는 '/**' 전체 허용)
            },
        ]
    },
    compiler: {
        // NODE_ENV가 'production'일 때만 console.* 호출을 제거
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default nextConfig;

