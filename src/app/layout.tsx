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
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <title>MA-PING : 나에게 딱 맞는 메이플 길라잡이</title>
          <meta property="og:title" content={`MA-PING`} />
          <meta
              property="og:description"
              content={`나에게 딱 맞는 메이플 길라잡이`}
          />
        <meta name="twitter:title" content={`MA-PING`} />
        <meta
            name="twitter:description"
            content={`나에게 딱 맞는 메이플 길라잡이`}
        />
      </Head>
      <body className={`${pretendard.variable} font-pretendard`}>
        {children}
      </body>
    </html>
  );
}
