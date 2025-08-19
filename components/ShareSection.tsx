"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function ShareSection() {
  useEffect(() => {
    // 카카오 SDK 로드
    if (!window.Kakao) {
      const script = document.createElement("script")
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js"
      script.async = true
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
        }
      }
      document.body.appendChild(script)
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
      }
    }
  }, [])

  const shareToKakao = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.")
      return
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const imageUrl = `${siteUrl}/kakao_img.jpg` // public 폴더 안 이미지

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "우만경 🩷 박희영 결혼합니다.",
        description: "2025년 11월 08일, 더포레스트웨딩",
        imageUrl,
        link: {
          mobileWebUrl: siteUrl,
          webUrl: siteUrl,
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: siteUrl,
            webUrl: siteUrl,
          },
        },
      ],
    })
  }

  return (
    <section className="px-6 py-12 bg-wedding-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button
          onClick={shareToKakao}
          className="inline-flex items-center px-6 py-3 space-x-2 font-medium transition-colors rounded-lg text-wedding-white bg-wedding-primary hover:bg-wedding-secondary"
        >
          <MessageCircle className="w-5 h-5" />
          <span>카카오톡으로 초대장 보내기</span>
        </button>
      </motion.div>
    </section>
  )
}
