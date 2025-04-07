import type { Metadata } from "next";
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
  description: "MA-PING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta charSet="UTF-8"/>
        <title>MA-PING : 나에게 딱 맞는 메이플 길라잡이</title>
        <meta property="og:title" content={`MA-PING1`}/>
        <meta property="og:type" content="website"/>
        <meta
            property="og:description"
            content={`나에게 딱 맞는 메이플 길라잡이2`}
        />
        <meta property="og:url" content="https://ma-ping.com/"/>
        <meta property="og:image" content="/icons/logo-maping.png"/>
        <meta name="twitter:title" content={`MA-PING3`}/>
        <meta
            name="twitter:description"
            content={`나에게 딱 맞는 메이플 길라잡이4`}
        />
    </Head>
    <body className={`${pretendard.variable} font-pretendard`}>
    {children}
      </body>
    </html>
  );
}
