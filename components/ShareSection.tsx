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
          window.Kakao.init("YOUR_APP_KEY") // 🔹 카카오 JavaScript 키 입력
        }
      }
      document.body.appendChild(script)
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("YOUR_APP_KEY") // 🔹 카카오 JavaScript 키 입력
      }
    }
  }, [])

  const shareToKakao = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.")
      return
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "XX 결혼식에 초대합니다 💌",
        description: "2025년 10월 12일, ○○웨딩홀",
        imageUrl: "https://kakao_img.jpg", // 🔹 초대장 사진 URL
        link: {
          mobileWebUrl: "https://your-invitation-site.com",
          webUrl: "https://your-invitation-site.com",
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: "https://your-invitation-site.com",
            webUrl: "https://your-invitation-site.com",
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
