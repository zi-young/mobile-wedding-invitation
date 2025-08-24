"use client"

import { motion } from "framer-motion"

interface InvitationSectionProps {
  currentPageIdentifier: string
}

export default function InvitationSection({ currentPageIdentifier }: InvitationSectionProps) {
  return (
    <section className="px-6 py-12 bg-wedding-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="text-[15px] tracking-[3px] text-wedding-secondary mb-2">INVITATION</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-8 leading-relaxed text-center text-wedding-primary"
      >
        <div className="my-6 text-[15px] leading-relaxed">
          <p>평생 서로를 아끼며 살겠다는</p>
          <p>두 사람의 약속을 지켜봐 주십시오.</p>
          <p>소중한 분들과 함께 기쁨을 나누고 싶습니다.</p>
        </div>
        <p className="mb-6 text-lg font-semibold text-wedding-secondary">2025년 11월 08일 토요일</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="space-y-2 text-[15px] text-center text-wedding-primary"
      >
        <div className="flex items-center justify-center space-x-2">
          <span>우학준</span>
          <span className="text-wedding-secondary">·</span>
          <span>김진애의 장남</span>
          <span className="font-medium text-wedding-secondary">우만경</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span>박형철</span>
          <span className="text-wedding-secondary">·</span>
          <span>
            {currentPageIdentifier === "3" ? "박지에의 차녀" : "다이쿠지에코의 차녀"}
          </span>
          <span className="font-medium text-wedding-secondary">박희영</span>
        </div>
      </motion.div>
      
    </section>
  )
}
