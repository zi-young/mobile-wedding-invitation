import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from 'next/font/google'
import "./globals.css"
import SecurityProvider from "@/components/SecurityProvider"

// Noto Sans KR 폰트 설정
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
  preload: true,
})

export const metadata: Metadata = {
  title: "우만경 🩷 박희영 결혼합니다 ",
  description: "2025년 11월 08일 토요일 오후 02시 30분",
  generator: "v0.dev",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable}`}>
      <head>
        {/* 핸드폰 확대 기능 비활성화 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* 스크린샷 캡처 방지 */}
        <meta name="robots" content="noindex, nofollow" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 스크린샷 캡처 방지 */
            * {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-touch-callout: none;
              -webkit-tap-highlight-color: transparent;
            }
            
            /* 텍스트 선택 방지 */
            body {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            
            /* 입력 필드는 텍스트 선택 허용 */
            input, textarea, select {
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              user-select: text;
            }
            
            /* iOS Safari에서 확대 방지 */
            @media screen and (max-width: 768px) {
              body {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  )
}
