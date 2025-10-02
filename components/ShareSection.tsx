"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function ShareSection() {
  const [kakaoLoaded, setKakaoLoaded] = useState(false)

  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script")
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js"
      script.async = true
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
        }
        setKakaoLoaded(true)
      }
      document.body.appendChild(script)
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
      }
      setKakaoLoaded(true)
    }
  }, [])

  const shareToKakao = () => {
    if (!kakaoLoaded || !window.Kakao) {
      alert("카카오 SDK가 아직 준비되지 않았습니다.")
      return
    }

    const siteUrl = "https://hm-invite.netlify.app"

    // 현재 경로 그대로 반영
    const currentPath = window.location.pathname
    const versionUrl = `${siteUrl}${currentPath}`

    // 캐시 방지용 timestamp
    const imageUrl = `${siteUrl}/kakao_img.jpg?t=${new Date().getTime()}`

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "우만경 🩷 박희영",
        description: "2025년 11월 08일, 더포레스트웨딩",
        imageUrl,
        link: {
          mobileWebUrl: versionUrl,
          webUrl: versionUrl,
        },
      },
      buttons: [
        {
          title: "초대장 보기",
          link: {
            mobileWebUrl: versionUrl,
            webUrl: versionUrl,
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
          disabled={!kakaoLoaded}
          className="inline-flex items-center px-6 py-3 space-x-2 font-medium transition-colors rounded-lg text-wedding-white bg-wedding-primary hover:bg-wedding-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5" />
          <span>카카오톡으로 초대장 보내기</span>
        </button>
      </motion.div>
    </section>
  )
}
