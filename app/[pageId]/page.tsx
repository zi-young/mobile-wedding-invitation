// app/[pageId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation" 

// 필요한 컴포넌트들을 임포트합니다.
import MainHeader from "@/components/MainHeader"
import InvitationSection from "@/components/InvitationSection"
import CalendarSection from "@/components/CalendarSection"
import GallerySection from "@/components/GallerySection"
import LocationSection from "@/components/LocationSection"
import AccountSection from "@/components/AccountSection" 
import RSVPSection from "@/components/RSVPSection"
import ShareSection from "@/components/ShareSection"
import Footer from "@/components/Footer"

// generateStaticParams 함수를 추가합니다.
// 이 함수는 'output: "export"' 설정 시 필수적입니다.
// Next.js에게 빌드 시 어떤 동적 경로를 미리 생성할지 알려줍니다.
export async function generateStaticParams() {
  // 예를 들어, '1'과 '2' 두 가지 pageId 값에 대해 페이지를 미리 생성하도록 설정합니다.
  // '1' 페이지는 AccountSection이 보이고, '2' 페이지는 AccountSection이 보이지 않습니다.
  const paths = [
    { pageId: '1' },
    { pageId: '2' }, // AccountSection이 없는 버전
    // 필요한 경우 다른 pageId 값도 추가할 수 있습니다.
    // { pageId: 'another-path' },
  ];

  return paths;
}

export default function WeddingInvitation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams() 

  const routePageId = params?.pageId;
  const currentPageIdentifier = Array.isArray(routePageId) ? routePageId[0] : routePageId;

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-2 rounded-full animate-spin border-primary border-t-transparent"></div>
      </div>
    )
  }

  // URL의 pageId가 '1'일 경우에만 AccountSection을 렌더링합니다.
  // 예를 들어, `localhost:3000/1`로 접속하면 AccountSection이 보이고,
  // `localhost:3000/2` 또는 다른 경로로 접속하면 AccountSection이 보이지 않습니다.
  const shouldRenderAccountSection = currentPageIdentifier === "1"

  return (
    <div className="min-h-screen font-sans bg-background">
      {/* 최대 너비 425px로 설정하여 모바일 화면에 최적화된 레이아웃을 만듭니다. */}
      <div className="max-w-[425px] mx-auto relative overflow-hidden bg-background">
        <MainHeader />
        <InvitationSection />
        <GallerySection />
        <CalendarSection />
        <LocationSection />
        {/* AccountSection을 조건부로 렌더링합니다. */}
        {shouldRenderAccountSection && <AccountSection />}
        <RSVPSection />
        <ShareSection />
        <Footer />
      </div>
    </div>
  )
}
