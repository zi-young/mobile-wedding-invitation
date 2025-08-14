// app/[pageId]/WeddingInvitationContent.tsx
"use client" // 이 컴포넌트는 클라이언트 컴포넌트입니다.

import { useState, useEffect } from "react"
import { motion } from "framer-motion" // motion 컴포넌트를 사용하고 있다면 필요합니다.

// 필요한 다른 UI 컴포넌트들을 임포트합니다.
// 이 컴포넌트들은 @/components 경로에서 가져오므로, 파일 경로가 정확한지 확인해 주세요.
import MainHeader from "@/components/MainHeader"
import InvitationSection from "@/components/InvitationSection"
import CalendarSection from "@/components/CalendarSection"
import GallerySection from "@/components/GallerySection"
import LocationSection from "@/components/LocationSection"
import AccountSection from "@/components/AccountSection" // 조건부 렌더링될 컴포넌트
import RSVPSection from "@/components/RSVPSection"
import ShareSection from "@/components/ShareSection"
import Footer from "@/components/Footer"

// 이 컴포넌트는 부모(서버) 컴포넌트인 page.tsx로부터
// `currentPageIdentifier` 값을 props로 받습니다.
export default function WeddingInvitationContent({ currentPageIdentifier }: { currentPageIdentifier: string | string[] | undefined }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 컴포넌트가 마운트되면 로딩 상태를 true로 설정하여 스피너를 숨깁니다.
    // 이는 페이지의 초기 로딩 상태를 관리하기 위함입니다.
    setIsLoaded(true)
  }, [])

  // 컴포넌트 로딩이 완료되지 않았을 때 (isLoaded가 false일 때)
  // 표시할 로딩 스피너입니다.
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-2 rounded-full animate-spin border-primary border-t-transparent"></div>
      </div>
    )
  }

  // 전달받은 `currentPageIdentifier` 값에 따라 `AccountSection`을 렌더링할지 결정합니다.
  // 예를 들어, URL이 `/1`이면 `currentPageIdentifier`는 "1"이 되고, `AccountSection`이 보입니다.
  // URL이 `/2`이면 "2"가 되어 `AccountSection`이 보이지 않습니다.
  const shouldRenderAccountSection = currentPageIdentifier === "1"

  return (
    <div className="min-h-screen font-sans bg-background">
      {/* 웹사이트의 최대 너비를 425px로 제한하여 모바일 환경에 최적화된 레이아웃을 만듭니다. */}
      {/* mx-auto는 가운데 정렬, relative와 overflow-hidden은 레이아웃 관리를 위한 것입니다. */}
      <div className="max-w-[425px] mx-auto relative overflow-hidden bg-background">
        <MainHeader />
        <InvitationSection />
        <GallerySection />
        <CalendarSection />
        <LocationSection />
        {/* `shouldRenderAccountSection` 값에 따라 AccountSection 컴포넌트를 조건부로 렌더링합니다. */}
        {shouldRenderAccountSection && <AccountSection />}
        <RSVPSection />
        <ShareSection />
        <Footer />
      </div>
    </div>
  )
}
