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
          backgroundImage: "url(/SML05500.jpg)",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

    </div>
  )
}
