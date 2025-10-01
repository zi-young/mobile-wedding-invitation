"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Car, Train, Bus, Copy, Check } from "lucide-react"

export default function LocationSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [mapLoadError, setMapLoadError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
  const address = "경기도 용인시 수지구 동천로 425-2"

  // 고정 좌표 (직접 확인한 정확한 위도/경도)
  const fixedLat = 37.3429391  // 업데이트된 위도
  const fixedLng = 127.0603774  // 업데이트된 경도

  useEffect(() => {
    let isCancelled = false

    async function loadAndRenderMap() {
      if (!mapContainerRef.current) return

      if (!NAVER_MAP_CLIENT_ID) {
        setMapLoadError("네이버 지도 클라이언트 ID가 설정되지 않았습니다.")
        return
      }

      try {
        await loadNaverMapsScript(NAVER_MAP_CLIENT_ID)

        if (isCancelled || !mapContainerRef.current) return

        const naver = (window as any).naver
        if (!naver?.maps) {
          setMapLoadError("네이버 지도 스크립트를 불러오지 못했습니다.")
          return
        }

        const position = new naver.maps.LatLng(fixedLat, fixedLng)

        const map = new naver.maps.Map(mapContainerRef.current, {
          center: position,
          zoom: 16,
        })

        new naver.maps.Marker({
          position,
          map,
          icon: {
            url: '/229169@2x.png',
            size: new naver.maps.Size(32, 38),
            anchor: new naver.maps.Point(16, 38),
            scaledSize: new naver.maps.Size(32, 38)
          }
        })
      } catch (err) {
        setMapLoadError("네이버 지도 로딩 중 오류가 발생했습니다.")
      }
    }

    loadAndRenderMap()
    return () => {
      isCancelled = true
    }
  }, [NAVER_MAP_CLIENT_ID])

  function loadNaverMapsScript(clientId: string): Promise<void> {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://openapi.map.naver.com/openapi/v3/maps.js"]'
    )
    return new Promise((resolve, reject) => {
      if ((window as any).naver?.maps) {
        resolve()
        return
      }
      if (existing) {
        existing.addEventListener("load", () => resolve())
        existing.addEventListener("error", () => reject(new Error("script error")))
        return
      }
      const script = document.createElement("script")
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("script error"))
      document.head.appendChild(script)
    })
  }

  const openNavigation = (type: string) => {
    const encodedAddress = encodeURIComponent(address)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    switch (type) {
      case "naver":
        window.open(`https://map.naver.com/v5/search/${encodedAddress}`)
        break
      case "kakao":
        if (isMobile) {
          const kakaoAppUrl = `kakaomap://search?q=${encodeURIComponent(address)}`
          const kakaoWebUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`
          window.location.href = kakaoAppUrl
          setTimeout(() => {
            window.location.href = kakaoWebUrl
          }, 3000)
        } else {
          window.open(`https://map.kakao.com/link/search/${encodedAddress}`)
        }
        break
      case "tmap":
        if (isMobile) {
          const tmapAppUrl = `tmap://route?goalx=${fixedLng}&goaly=${fixedLat}&goalname=${encodeURIComponent("더포레스트웨딩")}`
          const iosStoreUrl = "https://apps.apple.com/kr/app/t-map-for-all/id431589174"
          const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.skt.tmap.ku"
          const storeUrl = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? iosStoreUrl : androidStoreUrl

          window.location.href = tmapAppUrl
          setTimeout(() => {
            window.location.href = storeUrl
          }, 2000)
        } else {
          // PC 환경에서 팝업 표시
          alert("티맵은 모바일 환경에서만 사용할 수 있습니다. 모바일 기기에서 확인해주세요.")
        }
        break
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2초 후 복사 상태 초기화
    })
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
        <div className="flex items-center justify-center space-x-2">
          <div className="text-wedding-primary">{address}</div>
          <button
            onClick={copyToClipboard}
            className="p-2 transition-colors rounded-full hover:bg-wedding-light"
          >
            {copied ? (
              <Check className="w-5 h-5 text-wedding-primary" />
            ) : (
              <Copy className="w-5 h-5 text-wedding-secondary" />
            )}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="mb-4 overflow-hidden border rounded-lg border-wedding-primary/20">
          <div ref={mapContainerRef} className="w-full h-72 bg-wedding-primary/5" />
        </div>
        {mapLoadError && (
          <div className="text-[15px] text-center text-red-600">{mapLoadError}</div>
        )}
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
          <p className="mb-3 text-[15px] text-wedding-primary">원하시는 앱을 선택하시면 길안내가 시작됩니다.</p>
          <div className="flex space-x-2">
            <button
              onClick={() => openNavigation("naver")}
              className="flex-1 px-4 py-2 text-[15px] font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              네이버지도
            </button>
            <button
              onClick={() => openNavigation("kakao")}
              className="flex-1 px-4 py-2 text-[15px] font-medium text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
            >
              카카오맵
            </button>
            <button
              onClick={() => openNavigation("tmap")}
              className="flex-1 px-4 py-2 text-[15px] font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              티맵
            </button>
          </div>
        </div>

        {/* Car */}
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Car className="w-5 h-5 mr-2" />
            자가용
          </h3>
          <div className="space-y-1 text-[15px] text-wedding-primary">
            <p>
              네비게이션에서 <strong>'더포레스트웨딩'</strong> 또는 <strong>'가든아트아뜰리에'</strong> 검색
            </p>
          </div>
        </div>

        {/* Public Transportation */}
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Train className="w-5 h-5 mr-2" />
            대중교통
          </h3>
          <div className="space-y-3 text-[15px] text-wedding-primary">
            <div>
              <p className="font-medium">신분당선 동천역 1번출구 앞 17-1번 버스 탑승</p>
              <p>→ '선댄스'정류장 하차 → 오월식당 방향 직진 도보 5분</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="flex items-center mb-3 text-lg font-semibold text-wedding-secondary">
            <Bus className="w-5 h-5 mr-2" />
            셔틀버스
          </h3>
          <div className="pb-4 space-y-3 text-[15px] text-wedding-primary">
            <div>
              <p className="font-medium">신분당선 동천역 1번출구 앞 셔틀버스 탑승</p>
              <p>(더포레스트웨딩 붙어있음)</p>
              <p>(1차 출발 : 13:30 / 2차 출발 : 14:00)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
