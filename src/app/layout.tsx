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
  title: "MA-PING : 나에게 딱 맞는 메이플 길라잡이 메이핑",
  description: "나에게 딱 맞는 메이플 길라잡이 메이핑",
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
        <meta charSet="UTF-8"/>
        <title>MA-PING : 나에게 딱 맞는 메이플 길라잡이</title>
      </Head>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
