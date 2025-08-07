"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function ShareSection() {
  const shareToKakao = () => {
    // 실제 구현에서는 Kakao SDK를 사용해야 합니다
    alert("카카오톡 공유 기능은 실제 환경에서 구현됩니다.")
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
          className="inline-flex items-center px-6 py-3 space-x-2 font-medium text-wedding-white transition-colors bg-wedding-primary rounded-lg hover:bg-wedding-secondary"
        >
          <MessageCircle className="w-5 h-5" />
          <span>카카오톡으로 초대장 보내기</span>
        </button>
      </motion.div>
    </section>
  )
}
