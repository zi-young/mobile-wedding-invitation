"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, X } from "lucide-react"

const galleryImages = [
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
  "/placeholder.svg?height=400&width=400",
]

export default function GallerySection() {
  const [showAll, setShowAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 9)

  return (
    <section className="px-6 py-12 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="text-sm tracking-[3px] text-gray-500 mb-2">GALLERY</div>
        <h2 className="text-xl font-medium text-gray-800">웨딩 갤러리</h2>
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
              className="overflow-hidden rounded-lg cursor-pointer aspect-square"
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

        {!showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-800"
            >
              <span>더보기</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute z-10 text-white top-4 right-4 hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={galleryImages[selectedImage] || "/placeholder.svg"}
            alt={`Wedding photo ${selectedImage + 1}`}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      )}
    </section>
  )
}
