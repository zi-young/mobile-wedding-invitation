"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Car, Train } from "lucide-react"

export default function LocationSection() {
  const openNavigation = (type: string) => {
    const address = "경기도 용인시 수지구 동천로 425-2" 
    const encodedAddress = encodeURIComponent(address)

    switch (type) {
      case "naver":
        window.open(`https://map.naver.com/v5/search/${encodedAddress}`)
        break
      case "kakao":
        window.open(`https://map.kakao.com/link/search/${encodedAddress}`)
        break
      case "google":
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`)
        break
    }
  }

  return (
    <section className="px-6 bg-wedding-light">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-xl font-medium text-wedding-primary">오시는 길</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-6 text-center"
      >
        <div className="mb-2 text-lg font-semibold text-wedding-secondary">용인 더 포레스트 웨딩</div>
        <div className="text-wedding-primary">경기도 용인시 수지구 동천로 425-2</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="flex items-center justify-center h-48 mb-4 bg-wedding-primary/10 rounded-lg border border-wedding-primary/20">
          <MapPin className="w-8 h-8 text-wedding-primary" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Navigation */}
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Navigation className="w-5 h-5 mr-2" />
            내비게이션
          </h3>
          <p className="mb-3 text-sm text-wedding-primary">원하시는 앱을 선택하시면 길안내가 시작됩니다.</p>
          <div className="flex space-x-2">
            <button
              onClick={() => openNavigation("naver")}
              className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-wedding-primary rounded-lg hover:bg-wedding-secondary"
            >
              네이버지도
            </button>
            <button
              onClick={() => openNavigation("kakao")}
              className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-wedding-secondary rounded-lg hover:bg-wedding-dark"
            >
              카카오맵
            </button>
            <button
              onClick={() => openNavigation("google")}
              className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-wedding-primary rounded-lg hover:bg-wedding-secondary"
            >
              구글맵
            </button>
          </div>
        </div>

        {/* Car */}
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Car className="w-5 h-5 mr-2" />
            자가용
          </h3>
          <div className="space-y-1 text-sm text-wedding-primary">
            <p>
              <strong>용인 더 포레스트 웨딩</strong> (경기도 용인시 수지구 동천로 425-2)
            </p>
          </div>
        </div>

        {/* Public Transportation */}
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Train className="w-5 h-5 mr-2" />
            대중교통
          </h3>
          <div className="space-y-3 text-sm text-wedding-primary">
            <div>
              <p className="font-medium">신분당선 동천역 1번출구 앞 17-1번 버스 탑승</p>
              <p>→ '선댄스'정류장 하차 → 오월식당 방향 직진 도보 5분</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Train className="w-5 h-5 mr-2" />
            셔틀버스
          </h3>
          <div className="pb-4 space-y-3 text-sm text-wedding-primary">
            <div>
              <p className="font-medium">신분당선 동천역 1번출구 앞 셔틀버스 탑승</p>
              <p>(더포레스트웨딩 붙어있음)</p>
              <p>1차 출발 : 1400 / 2차 출발 :</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
