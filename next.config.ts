import type { NextConfig } from "next";
const nextConfig: NextConfig = {
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

