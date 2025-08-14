"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

export default function RSVPSection() {
  const [showModal, setShowModal] = useState(false) // 초기에는 모달을 숨김
  const [modalMessage, setModalMessage] = useState("") // 모달 메시지 상태
  const [isSuccessModal, setIsSuccessModal] = useState(false) // 성공/실패 모달 타입
  const [formData, setFormData] = useState({
    attendance: "true",
    side: "bride",
    name: "",
    guestCount: "1",
    companionName: "",
    agreed: false,
  })

  // 커스텀 알림 모달을 보여주는 함수
  const showAlertModal = (message: string, isSuccess: boolean) => {
    setModalMessage(message)
    setIsSuccessModal(isSuccess)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!formData.name.trim()) {
      showAlertModal("참석자 성함을 입력해주세요.", false) // alert 대신 커스텀 모달
      return
    }
    if (!formData.agreed) {
      showAlertModal("개인정보 수집 및 이용에 동의해주세요.", false) // alert 대신 커스텀 모달
      return
    }
  
    // 구글 앱 스크립트의 '배포된 웹 앱' URL을 여기에 직접 입력합니다.
    // 이는 API Route를 거치지 않고 직접 통신하기 위함입니다.
    const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbzcLtJMkA0o20-4SrM-8Pyz7aGv85fxBAcatNe7S4oiYr8V-B-RnIoz3ehY13kFp4Ez0Q/exec";

    try {
      console.log("전송할 데이터:", formData); 
      const response = await fetch(googleAppsScriptUrl, { // API Route 대신 직접 Google Apps Script URL 사용
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // CORS 문제 해결을 위해 'Origin' 헤더를 명시적으로 보내는 경우가 도움이 될 수 있습니다.
          // 'Access-Control-Allow-Origin'은 서버 응답 헤더이므로 클라이언트 요청에는 필요 없습니다.
        },
        body: JSON.stringify(formData),
        // mode: 'no-cors'를 사용할 경우, 스크립트 응답을 받을 수 없을 수 있습니다.
        // 스크립트 배포 시 '모든 사용자에게 액세스 권한 부여'를 확인하세요.
      });
  
      // Google Apps Script는 보통 텍스트 응답을 반환합니다.
      const textResult = await response.text();
      console.log("Google Apps Script 응답 (텍스트):", textResult);
      
      // Google Apps Script에서 성공/실패 여부를 판단하는 로직이 필요할 수 있습니다.
      // 여기서는 스크립트가 'success'라는 문자열을 반환한다고 가정합니다.
      if (textResult.includes("success")) { // 스크립트 응답 텍스트에 'success'가 포함되어 있는지 확인
        showAlertModal("참석의사를 전달 완료 했습니다.", true) // alert 대신 커스텀 모달
        // 폼 초기화 및 모달 닫기
        setShowModal(false) // onSubmit 성공 시 모달 닫기
        setFormData({
          attendance: "true",
          side: "bride",
          name: "",
          guestCount: "1",
          companionName: "",
          agreed: false,
        })
      } else {
        // 스크립트에서 명확한 오류 메시지를 반환하지 않는 경우를 대비
        showAlertModal("전송에 실패했습니다. Google Apps Script 응답을 확인해주세요.", false)
        console.error("Google Apps Script 응답 오류:", textResult);
      }
    } catch (error) {
      console.error("Error sending RSVP:", error)
      showAlertModal("전송 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.", false)
    }
  }
  
  // handleInputChange 함수를 수정하여 'checked' 속성 접근 방식을 개선했습니다.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 이벤트 타겟이 HTMLInputElement이고 타입이 'checkbox' 또는 'radio'일 경우에만 checked 값을 사용합니다.
    const inputElement = e.target as HTMLInputElement; // HTMLInputElement로 단언하여 'type' 속성 접근
    const newValue = (inputElement.type === "checkbox" || inputElement.type === "radio") 
                     ? inputElement.checked 
                     : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <section className="px-6 py-12 bg-wedding-light">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="text-sm tracking-[3px] text-wedding-secondary mb-2">R.S.V.P.</div>
        <h2 className="text-xl font-medium text-wedding-primary">참석 의사 전달</h2>
        <p className="mt-2 text-sm text-wedding-primary">
          신랑, 신부에게 참석의사를
          <br />
          미리 전달할 수 있어요.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-6 py-3 space-x-2 transition-colors border rounded-lg bg-wedding-white border-wedding-primary hover:bg-wedding-primary hover:text-wedding-white text-wedding-primary"
        >
          <Check className="w-4 h-4 text-current" />
          <span>참석의사 전달하기</span>
        </button>
      </motion.div>

      {/* RSVP Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-wedding-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-wedding-primary">참석 의사 전달</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-wedding-light">
                  <X className="w-5 h-5 text-wedding-primary" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attendance */}
                <div>
                  <label className="block mb-3 text-sm font-medium text-wedding-primary">가능 여부를 선택해 주세요.</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="true"
                        checked={formData.attendance === "true"}
                        onChange={handleInputChange}
                        className="mr-2 text-wedding-primary focus:ring-wedding-primary"
                      />
                      <span className="text-wedding-primary">가능</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attendance"
                        value="false"
                        checked={formData.attendance === "false"}
                        onChange={handleInputChange}
                        className="mr-2 text-wedding-primary focus:ring-wedding-primary"
                      />
                      <span className="text-wedding-primary">불가</span>
                    </label>
                  </div>
                </div>

                {/* Side */}
                <div>
                  <label className="block mb-3 text-sm font-medium text-wedding-primary">신랑 & 신부에게 전달될 정보를 입력해 주세요.</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="side"
                        value="groom"
                        checked={formData.side === "groom"}
                        onChange={handleInputChange}
                        className="mr-2 text-wedding-primary focus:ring-wedding-primary"
                      />
                      <span className="text-wedding-primary">🤵 신랑측</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="side"
                        value="bride"
                        checked={formData.side === "bride"}
                        onChange={handleInputChange}
                        className="mr-2 text-wedding-primary focus:ring-wedding-primary"
                      />
                      <span className="text-wedding-primary">👰 신부측</span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-wedding-primary">
                    성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name" // name 속성 추가
                    placeholder="(필수) 대표자 한 분의 성함을 입력해 주세요."
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg border-wedding-primary/30 focus:outline-none focus:ring-2 focus:ring-wedding-primary focus:border-wedding-primary text-wedding-primary placeholder:text-wedding-secondary/60 bg-wedding-white"
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-wedding-primary">추가인원</label>
                  <select
                    name="guestCount" // name 속성 추가
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg border-wedding-primary/30 focus:outline-none focus:ring-2 focus:ring-wedding-primary focus:border-wedding-primary text-wedding-primary bg-wedding-white"
                  >
                    {Array.from({ length: 11 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        외 {i}명
                      </option>
                    ))}
                  </select>
                </div>

                {/* Companions */}
                {Number.parseInt(formData.guestCount) > 1 && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-wedding-primary">동행인 성함</label>
                    <input
                      type="text"
                      name="companionName" // name 속성 추가
                      placeholder="참석인원 성함을 쉼표(,)로 구분하여 입력해 주세요."
                      value={formData.companionName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg border-wedding-primary/30 focus:outline-none focus:ring-2 focus:ring-wedding-primary focus:border-wedding-primary text-wedding-primary placeholder:text-wedding-secondary/60 bg-wedding-white"
                    />
                  </div>
                )}

                {/* Privacy Agreement */}
                <div className="p-4 border rounded-lg bg-wedding-light border-wedding-primary/20">
                  <div className="mb-2 text-sm font-medium text-wedding-primary">
                    개인정보 수집 및 이용 동의(필수) <span className="text-red-500">*</span>
                  </div>
                  <p className="mb-3 text-xs text-wedding-secondary">
                    참석여부 전달을 위한 개인정보 수집 및 이용에 동의해주세요.
                    <br />
                    항목: 성함,연락처,동행인 성함 · 보유기간: 청첩장 이용 종료시 까지
                  </p>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreed" // name 속성 추가
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="mr-2 text-wedding-primary focus:ring-wedding-primary"
                    />
                    <span className="text-sm text-wedding-primary">동의합니다.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 transition-colors rounded-lg text-wedding-white bg-wedding-primary hover:bg-wedding-secondary"
                >
                  신랑 & 신부에게 <strong>전달하기</strong>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 text-center rounded-lg shadow-lg bg-wedding-white">
            <h4 className={`text-lg font-bold mb-4 ${isSuccessModal ? 'text-green-600' : 'text-red-600'}`}>
              {isSuccessModal ? "알림" : "오류"}
            </h4>
            <p className="mb-6 text-wedding-primary">{modalMessage}</p>
            <button
              onClick={() => setModalMessage("")} // 메시지 상태를 비워 모달 닫기
              className="px-6 py-2 rounded-lg bg-wedding-primary text-wedding-white hover:bg-wedding-secondary"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
