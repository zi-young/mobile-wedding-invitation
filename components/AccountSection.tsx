"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Copy, Check } from "lucide-react"

const accounts = {
  groom: [
    { name: "박충용", bank: "국민", number: "123" },
    { name: "서희영", bank: "우리", number: "123" },
    { name: "우만경", bank: "국민", number: "123" },
  ],
  bride: [
    { name: "박형철", bank: "국민", number: "123" },
    { name: "다이쿠지에코", bank: "농협", number: "123" },
    { name: "박희영", bank: "카카오뱅크", number: "123" },
  ],
}

export default function AccountSection() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountId)
      setTimeout(() => setCopiedAccount(null), 2000)
    })
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <section className="px-6 py-12 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="text-sm tracking-[3px] text-gray-500 mb-2">ACCOUNT</div>
        <h2 className="text-xl font-medium text-gray-800">마음 전하실 곳</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        {/* Groom Side */}
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection("groom")}
            className="flex items-center justify-between w-full px-4 py-3 transition-colors bg-gray-50 hover:bg-gray-100"
          >
            <span className="font-medium">신랑측</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSection === "groom" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "groom" && (
            <div className="border-t border-gray-200">
              {accounts.groom.map((account, index) => (
                <div key={index} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{account.name}</span>
                      <span className="text-sm text-gray-600">
                        {account.bank} {account.number}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${account.bank} ${account.number}`, `groom-${index}`)}
                      className="p-2 transition-colors rounded-full hover:bg-gray-100"
                    >
                      {copiedAccount === `groom-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bride Side */}
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection("bride")}
            className="flex items-center justify-between w-full px-4 py-3 transition-colors bg-gray-50 hover:bg-gray-100"
          >
            <span className="font-medium">신부측</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSection === "bride" ? "rotate-180" : ""}`} />
          </button>
          {openSection === "bride" && (
            <div className="border-t border-gray-200">
              {accounts.bride.map((account, index) => (
                <div key={index} className="px-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{account.name}</span>
                      <span className="text-sm text-gray-600">
                        {account.bank} {account.number}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${account.bank} ${account.number}`, `bride-${index}`)}
                      className="p-2 transition-colors rounded-full hover:bg-gray-100"
                    >
                      {copiedAccount === `bride-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
