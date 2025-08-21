"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Copy, Check } from "lucide-react"

const accounts = {
  groom: [
  //   { name: "박충용", bank: "국민", number: "123" },
  //   { name: "서희영", bank: "우리", number: "123" },
    { name: "우만경", bank: "국민", number: "484602-04-078438" },
  ],
  bride: [
    { name: "박형철", bank: "농협", number: "207179-52-261426" },
    { name: "다이쿠지에코", bank: "농협", number: "170781-56-082109" },
    { name: "박희영", bank: "신한", number: "110-385-384960" },
  ],
}

export default function AccountSection() {
  const [groomOpen, setGroomOpen] = useState(false)
  const [brideOpen, setBrideOpen] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountId)
      setTimeout(() => setCopiedAccount(null), 2000)
    })
  }

  const toggleGroom = () => {
    console.log('Toggle groom clicked, current state:', groomOpen)
    setGroomOpen(!groomOpen)
  }

  const toggleBride = () => {
    console.log('Toggle bride clicked, current state:', brideOpen)
    setBrideOpen(!brideOpen)
  }

  console.log('Current openSection state:', groomOpen || brideOpen)

  return (
    <section className="px-6 py-12 bg-wedding-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <h2 className="text-2xl font-medium text-wedding-primary">마음 전하실 곳</h2>
        <p className="mt-3 mb-0 text-base text-wedding-secondary">
          축하의 마음만으로도 충분합니다.
        </p>
        <p className="text-base text-wedding-secondary">
          <b>화환</b>은 정중히 사양합니다.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        {/* Groom Side */}
        <div className="overflow-hidden border rounded-lg border-wedding-primary/20">
          <button
            onClick={toggleGroom}
            className="flex items-center justify-between w-full px-4 py-3 transition-colors hover:bg-wedding-light/30"
          >
            <span className="text-base font-medium text-wedding-primary">신랑측</span>
            <ChevronDown className={`w-5 h-5 transition-transform text-wedding-primary ${groomOpen ? "rotate-180" : ""}`} />
          </button>
          {groomOpen && (
            <div className="border-t border-wedding-primary/20">
              {accounts.groom.map((account, index) => (
                <div key={index} className="px-4 py-3 border-b border-wedding-primary/10 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-medium text-wedding-primary">{account.name}</span>
                      <span className="text-base text-wedding-secondary">
                        {account.bank} {account.number}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${account.bank} ${account.number}`, `groom-${index}`)}
                      className="p-2 transition-colors rounded-full hover:bg-wedding-light"
                    >
                      {copiedAccount === `groom-${index}` ? (
                        <Check className="w-4 h-4 text-wedding-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-wedding-secondary" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bride Side */}
        <div className="overflow-hidden border rounded-lg border-wedding-primary/20">
          <button
            onClick={toggleBride}
            className="flex items-center justify-between w-full px-4 py-3 transition-colors hover:bg-wedding-light/30"
          >
            <span className="text-base font-medium text-wedding-primary">신부측</span>
            <ChevronDown className={`w-5 h-5 transition-transform text-wedding-primary ${brideOpen ? "rotate-180" : ""}`} />
          </button>
          {brideOpen && (
            <div className="border-t border-wedding-primary/20">
              {accounts.bride.map((account, index) => (
                <div key={index} className="px-4 py-3 border-b border-wedding-primary/10 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-medium text-wedding-primary">{account.name}</span>
                      <span className="text-base text-wedding-secondary">
                        {account.bank} {account.number}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${account.bank} ${account.number}`, `bride-${index}`)}
                      className="p-2 transition-colors rounded-full hover:bg-wedding-light"
                    >
                      {copiedAccount === `bride-${index}` ? (
                        <Check className="w-4 h-4 text-wedding-primary" />
                      ) : (
                        <Copy className="w-4 h-4 text-wedding-secondary" />
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
