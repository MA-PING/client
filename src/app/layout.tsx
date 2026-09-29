import type {Metadata, Viewport} from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Footer from "@/component/footer";
import FloatingButton from "@/component/FloatingButton";
import Script from "next/script";
import styles from "./layout.module.css";
import {ReduxProvider} from "@/app/ReduxProvider";
import Header from "@/component/header";
import {getCurrentUser} from "@/utils/serverAuth";
import {recommendResponse} from "@/interfaces/character";
import {getApiUserRecommend} from "@/utils/userRecommend";


const pretendard = localFont({
    src: '../data/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: "MA-PING : 나에게 딱 맞는 메이플 길라잡이",
  description: "MA-PING : 나에게 딱 맞는 메이플 길라잡이 메이핑",
    metadataBase: new URL('https://ma-ping.com'),

    openGraph: {
        url: "https://ma-ping.com",
        type: "website",
        images: [
            {
                url: '/icons/Maping.png',
                alt: '로고',
            },
        ],
    },
    twitter: {
        images: [
            {
                url: '/icons/Maping.png',
                alt: '로고',
            },
        ],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    // width: "1280"
    // maximumScale: 1,
    // userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    const userName = user?.nickname ?? null;

    const userRecommendData = await getApiUserRecommend();
    // ponytail: 캐릭터 조회는 아직 v2 백엔드로 이전되지 않아 레거시 토큰 기반 API를 그대로 둔다.
    // 새 인증에는 JS로 읽을 수 있는 액세스 토큰이 없어 이 값들은 당분간 항상 null이다.
    const characterRecommendData: recommendResponse | null = null;
    const mainCharacterName: string | null = null;
  return (
    // 브라우저 확장이 <html>에 data-* 속성을 주입해 하이드레이션 경고가 발생한다
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} font-pretendard ${styles.body}`}>
          <Script
              id="nexon-analytics"
              strategy="afterInteractive"
              src="https://openapi.nexon.com/js/analytics.js?app_id=226073"
          />
        <ReduxProvider initialUser={user}>
            <Header initialUserName={userName}/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer/>
            <FloatingButton initialUserRecommend={userRecommendData}
                            initialCharacterRecommend={characterRecommendData}
                            initialCharacterName={mainCharacterName}
            />
            <div id="portal-root" />
        </ReduxProvider>
      </body>
    </html>
  );
}
