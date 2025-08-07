"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function CalendarSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-11-08T14:30:00")

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const generateCalendar = () => {
    const year = 2025
    const month = 10 // 11월은 0부터 시작하므로 10
    const today = new Date()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDay = firstDay.getDay() // 0: 일요일 ~ 6: 토요일

    const calendar = []
    for (let i = 0; i < startDay; i++) {
      calendar.push(<td key={`empty-${i}`} className="h-8"></td>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const isWeddingDay = day === 8

      calendar.push(
        <td key={day} className="h-8 text-center align-middle">
          <div className="relative flex items-center justify-center h-full">
            {isWeddingDay ? (
              <motion.div 
                className="relative flex items-center justify-center w-8 h-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: 8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* 테두리만 있는 하트 배경 */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart 
                    className="w-8 h-8 text-red-500" 
                    fill="none"
                    strokeWidth={2}
                  />
                </motion.div>
                {/* 날짜 텍스트 */}
                <span className="relative z-10 text-red-500 font-bold text-sm">
                  {day}
                </span>
              </motion.div>
            ) : (
              <motion.span
                className={`flex items-center justify-center w-8 h-8 text-sm rounded-full transition-all duration-200
                  ${isToday 
                    ? "bg-wedding-secondary/20 text-wedding-secondary font-semibold ring-1 ring-wedding-secondary/30" 
                    : "hover:bg-wedding-light hover:scale-110 hover:shadow-sm"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {day}
              </motion.span>
            )}
          </div>
        </td>,
      )
    }

    const weeks = []
    for (let i = 0; i < calendar.length; i += 7) {
      weeks.push(<tr key={`week-${i / 7}`} className="h-8">{calendar.slice(i, i + 7)}</tr>)
    }

    return weeks
  }

  return (
    <section className="px-6 py-12 bg-gradient-to-b from-wedding-white to-wedding-light">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="mb-2 text-3xl font-bold tracking-wide text-wedding-secondary">
          2025.11.08
        </div>
        <div className="text-wedding-primary text-lg font-medium">토요일 오후 02시 30분</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <div className="w-80 h-80 bg-wedding-white shadow-xl rounded-2xl border-2 border-wedding-primary/30 backdrop-blur-sm p-6">
          {/* 달력 헤더 */}
          <motion.div 
            className="mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-wedding-primary mb-2">11월</h3>
            <div className="w-12 h-0.5 bg-wedding-primary mx-auto rounded-full"></div>
          </motion.div>

          <table className="w-full">
            <thead>
              <tr className="h-8">
                <th className="text-sm font-semibold text-red-500 pb-2">일</th>
                <th className="text-sm font-semibold text-wedding-secondary pb-2">월</th>
                <th className="text-sm font-semibold text-wedding-secondary pb-2">화</th>
                <th className="text-sm font-semibold text-wedding-secondary pb-2">수</th>
                <th className="text-sm font-semibold text-wedding-secondary pb-2">목</th>
                <th className="text-sm font-semibold text-wedding-secondary pb-2">금</th>
                <th className="text-sm font-semibold text-blue-500 pb-2">토</th>
              </tr>
            </thead>
            <tbody className="text-sm text-wedding-primary">{generateCalendar()}</tbody>
          </table>
        </div>
      </motion.div>
    </section>
  )
}
