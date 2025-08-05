"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function MainHeader() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[590px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url(/placeholder.svg?height=800&width=425&query=romantic+wedding+couple+portrait)",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 pb-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4"
        >
          <div className="mb-2 text-center">
            <svg className="w-full h-32 fill-current" viewBox="0 0 343 178">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-serif text-4xl italic"
              >
                Love
              </text>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-3 gap-4 text-xs tracking-[4px] uppercase font-light"
        >
          <div className="flex justify-between">
            <span>IN</span>
            <span>46</span>
          </div>
          <div></div>
          <div className="flex justify-between">
            <span>DAYS'</span>
            <span>TIME</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
