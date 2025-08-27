"use client"

import { useEffect } from "react"

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 스크린샷 캡처 방지
    const preventScreenshot = () => {
      // 키보드 단축키 방지
      document.addEventListener('keydown', (e) => {
        // 입력 필드에서는 단축키 허용
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }

        // Ctrl+Shift+I (개발자 도구)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
          e.preventDefault()
          return false
        }
        // Ctrl+Shift+C (요소 검사)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
          e.preventDefault()
          return false
        }
        // Ctrl+U (소스 보기)
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault()
          return false
        }
        // F12 (개발자 도구)
        if (e.key === 'F12') {
          e.preventDefault()
          return false
        }
        // Ctrl+Shift+J (콘솔)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
          e.preventDefault()
          return false
        }
        // Ctrl+S (저장)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault()
          return false
        }
        // Ctrl+P (인쇄)
        if (e.ctrlKey && e.key === 'p') {
          e.preventDefault()
          return false
        }
      })

      // 우클릭 메뉴 방지 (입력 필드 제외)
      document.addEventListener('contextmenu', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }
        e.preventDefault()
        return false
      })

      // 드래그 방지
      document.addEventListener('dragstart', (e) => {
        e.preventDefault()
        return false
      })

      // 선택 방지 (입력 필드 제외)
      document.addEventListener('selectstart', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }
        e.preventDefault()
        return false
      })

      // 복사 방지 (입력 필드 제외)
      document.addEventListener('copy', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }
        e.preventDefault()
        return false
      })

      // 잘라내기 방지 (입력 필드 제외)
      document.addEventListener('cut', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }
        e.preventDefault()
        return false
      })

      // 붙여넣기 방지 (입력 필드 제외)
      document.addEventListener('paste', (e) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          return
        }
        e.preventDefault()
        return false
      })
    }

    // 모바일에서 확대 방지
    const preventZoom = () => {
      let lastTouchEnd = 0
      document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)

      // 더블탭 확대 방지
      document.addEventListener('gesturestart', (e) => {
        e.preventDefault()
      })

      document.addEventListener('gesturechange', (e) => {
        e.preventDefault()
      })

      document.addEventListener('gestureend', (e) => {
        e.preventDefault()
      })
    }

    preventScreenshot()
    preventZoom()

    // 페이지 떠날 때 경고
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return <>{children}</>
} 