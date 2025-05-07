import type {Metadata, Viewport} from "next";
import "./globals.css";
import localFont from 'next/font/local'

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: "MA-PING",
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
      <head>
        <script type="text/javascript" src="https://openapi.nexon.com/js/analytics.js?app_id=139195" async></script>
        <title>MA-PING : 나에게 딱 맞는 메이플 길라잡이</title>
      </head>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
