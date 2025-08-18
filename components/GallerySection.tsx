"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, X, ArrowLeft, ArrowRight, ChevronUp } from "lucide-react"

const galleryImages = [
  "/KakaoTalk_20250615_173319252_수정.jpg",
  "/SML07021.jpg",
  "/SML05620.jpg",
  "/SML05276.jpg",
  "/c2ade63340724647bd63a62621766175_합성.jpg",
  "/SML04275_수정.jpg",
  "/SML04195.jpg",
  "/SML04145.jpg",
  "/SML03869.jpg",
  "/SML07080.jpg",
  "/KakaoTalk_20250809_154851039_01.jpg",
  "/FAM09474.jpg",
  "/FAM09364.jpg",
  "/SML07620.jpg",
  "/SML07608.jpg",
  "/SML07464.jpg",
  "/SML07318.jpg",
  "/SML07863.jpg",
  // "/SML07824_수정.jpg",
]

export default function GallerySection() {
  const [showAll, setShowAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // 더보기 클릭 시 6장이 더 나오도록 수정
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 9)

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // 터치 이벤트 처리
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          handlePrevious()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          handleNext()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setSelectedImage(null)
        }
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      // 모달이 열렸을 때 body 스크롤 방지
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // 모달이 닫혔을 때 body 스크롤 복원
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <section className="px-6 py-12 bg-wedding-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        {/* <div className="text-[15px] tracking-[3px] text-wedding-secondary mb-2">GALLERY</div> */}
        <h2 className="text-xl font-medium text-wedding-primary">사진</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="grid grid-cols-3 gap-1 mb-4">
          {visibleImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden border rounded-lg cursor-pointer aspect-square border-wedding-primary/20"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Wedding photo ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center space-x-2 transition-colors text-wedding-secondary hover:text-wedding-primary"
          >
            <span>{showAll ? '닫기' : '더보기'}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute z-10 p-2 text-white transition-colors rounded-full top-4 right-4 hover:text-wedding-light bg-black/50 hover:bg-black/70"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 이전 버튼 */}
          <button
            onClick={handlePrevious}
            className="absolute z-10 p-2 text-white transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 hover:text-wedding-light bg-black/50 hover:bg-black/70"
            aria-label="이전 사진"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            className="absolute z-10 p-2 text-white transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 hover:text-wedding-light bg-black/50 hover:bg-black/70"
            aria-label="다음 사진"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* 이미지 */}
          <img
            src={galleryImages[selectedImage] || "/placeholder.svg"}
            alt={`Wedding photo ${selectedImage + 1}`}
            className="object-contain max-w-full max-h-full rounded-lg"
          />

          {/* 이미지 정보 */}
          <div className="absolute px-4 py-2 text-white transform -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-black/50">
            <span className="text-[15px]">
              {selectedImage + 1} / {galleryImages.length}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
