"use client"
import { useState, useEffect } from "react"
import MainHeader from "@/components/MainHeader"
import InvitationSection from "@/components/InvitationSection"
import CalendarSection from "@/components/CalendarSection"
import GallerySection from "@/components/GallerySection"
import LocationSection from "@/components/LocationSection"
import AccountSection from "@/components/AccountSection"
import RSVPSection from "@/components/RSVPSection"
import ShareSection from "@/components/ShareSection"
import Footer from "@/components/Footer"

export default function WeddingInvitationContent({ currentPageIdentifier }: { currentPageIdentifier: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => setIsLoaded(true), [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-2 rounded-full animate-spin border-primary border-t-transparent"></div>
      </div>
    )
  }

  const shouldRenderAccountSection = currentPageIdentifier === "1"

  return (
    <div className="min-h-screen font-sans bg-background">
      <div className="max-w-[425px] mx-auto relative overflow-hidden bg-background">
        <MainHeader />
        <InvitationSection />
        <GallerySection />
        <CalendarSection />
        <LocationSection />
        {shouldRenderAccountSection && <AccountSection />}
        <RSVPSection />
        <ShareSection />
        <Footer />
      </div>
    </div>
  )
}
