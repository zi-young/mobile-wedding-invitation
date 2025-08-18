"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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
      calendar.push(<td key={`empty-${i}`}></td>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      const isWeddingDay = day === 8

      calendar.push(
        <td key={day} className="py-1 text-center">
          <span
            className={`flex items-center justify-center w-9 h-9 text-[15px] rounded-full transition
              ${isWeddingDay ? "bg-wedding-primary text-wedding-white font-bold shadow-md" : ""}
              ${isToday ? "bg-wedding-secondary/20 text-wedding-secondary font-semibold" : ""}
            `}
          >
            {day}
          </span>
        </td>,
      )
    }

    const weeks = []
    for (let i = 0; i < calendar.length; i += 7) {
      weeks.push(<tr key={`week-${i / 7}`}>{calendar.slice(i, i + 7)}</tr>)
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
        <div className="mb-2 text-2xl font-semibold tracking-wide text-wedding-secondary">2025.11.08</div>
        <div className="text-wedding-primary">토요일 오후 02시 30분</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="p-6 mb-8 border shadow-md bg-wedding-white rounded-xl border-wedding-primary/20"
      >
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-[15px] text-wedding-secondary">
              <th className="py-2 text-red-500">일</th>
              <th className="py-2">월</th>
              <th className="py-2">화</th>
              <th className="py-2">수</th>
              <th className="py-2">목</th>
              <th className="py-2">금</th>
              <th className="py-2 text-blue-500">토</th>
            </tr>
          </thead>
          <tbody className="text-[15px] text-wedding-primary">{generateCalendar()}</tbody>
        </table>
      </motion.div>
    </section>
  )
}
