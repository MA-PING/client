import type {Metadata, Viewport} from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Head from "next/head";

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
        images: [
            {
                url: '/icons/logo-maping.png',
                alt: '로고',
            },
        ],
    },
    twitter: {
        images: [
            {
                url: '/icons/logo-maping.png',
                alt: '로고',
            },
        ],
    },
};

// export const viewport: Viewport = {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 1,
//     userScalable: false,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <Head>
        <meta charSet="UTF-8"/>
        <title>MA-PING : 나에게 딱 맞는 메이플 길라잡이</title>
      </Head>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
