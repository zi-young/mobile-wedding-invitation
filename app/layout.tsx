import type React from "react"
import { Noto_Sans_KR } from 'next/font/google'
import "./globals.css"
import SecurityProvider from "@/components/SecurityProvider"
import Head from "next/head"

// Noto Sans KR 폰트 설정
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
  preload: true,
})

// 기존 metadata는 그대로 사용 가능
export const metadata = {
  title: "우만경 🩷 박희영 결혼합니다 ",
  description: "2025년 11월 08일 토요일 오후 02시 30분",
  generator: "v0.dev",
}

// ✅ viewport는 별도로 export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable}`}>
      <head>
        <Head>
          {/* 확대 방지 */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          {/* 캡처 방지 */}
          <style>{`
            body {
              -webkit-user-select: none; /* 텍스트 선택 방지 */
              -webkit-touch-callout: none; /* 터치 메뉴 방지 */
              user-select: none;
            }
          `}</style>
        </Head>
      </head>
      <body className="font-sans antialiased">
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  )
}
