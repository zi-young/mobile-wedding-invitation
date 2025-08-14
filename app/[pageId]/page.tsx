// app/[pageId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation" // URL 파라미터를 가져오기 위한 훅

// 필요한 컴포넌트들을 임포트합니다.
import MainHeader from "@/components/MainHeader"
import InvitationSection from "@/components/InvitationSection"
import CalendarSection from "@/components/CalendarSection"
import GallerySection from "@/components/GallerySection"
import LocationSection from "@/components/LocationSection"
import AccountSection from "@/components/AccountSection" // 조건부 렌더링될 컴포넌트
import RSVPSection from "@/components/RSVPSection"
import ShareSection from "@/components/ShareSection"
import Footer from "@/components/Footer"

export default function WeddingInvitation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams() // URL 파라미터 객체를 가져옵니다. (예: { pageId: '1' } 또는 { pageId: ['1', '2'] })

  // `params`에서 `pageId`를 안전하게 가져옵니다.
  // `routePageId`는 `string | string[] | undefined` 타입일 수 있습니다.
  const routePageId = params?.pageId;

  // 실제 조건 비교에 사용할 `pageId` 값을 추출합니다.
  // `routePageId`가 배열이면 첫 번째 요소를 사용하고, 그렇지 않으면 `routePageId` 자체를 사용합니다.
  // 만약 `routePageId`가 `undefined`이면 `undefined`를 유지하여 안전성을 높입니다.
  const currentPageIdentifier = Array.isArray(routePageId) ? routePageId[0] : routePageId;

  useEffect(() => {
    // 컴포넌트가 마운트되면 로딩 상태를 true로 설정하여 스피너를 숨깁니다.
    setIsLoaded(true)
  }, [])

  // 컴포넌트 로딩이 완료되지 않았을 때 표시할 로딩 스피너입니다.
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
