'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className={[
        'fixed bottom-24 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full',
        'bg-primary text-primary-foreground shadow-[0_16px_32px_rgba(48,63,159,0.28)]',
        'transition-all duration-300 ease-out hover:scale-105 hover:bg-primary/90',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
    >
      <ArrowUp className="size-5" />
    </button>
  )
}
