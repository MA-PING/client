import type {Metadata, Viewport} from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Footer from "@/component/footer";
import FloatingButton from "@/component/FloatingButton";
import Script from "next/script";
import styles from "./layout.module.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard ${styles.body}`}>
          <Script
              id="nexon-analytics"
              strategy="afterInteractive"
              src="https://openapi.nexon.com/js/analytics.js?app_id=139195"
          />
        <main className={styles.main}>
          {children}
        </main>
        <Footer/>
        <FloatingButton />
        <div id="portal-root" />
      </body>
    </html>
  );
}
