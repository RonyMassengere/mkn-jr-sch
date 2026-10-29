'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, MessageCircleMore, SendHorizonal, Sparkles, X } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  suggestions?: string[]
}

declare global {
  interface Window {
    chatway?: {
      init?: (config: Record<string, unknown>) => void
    }
    chatwayConfig?: Record<string, unknown>
  }
}

const quickPrompts = [
  'How much are the school fees?',
  'When do the term dates start?',
  'How do I contact the school?',
  'What is the school admission process?',
  'Send me the gallery link',
  'Show me recent PLE results',
]

function renderMessageText(text: string) {
  const regex = /(https?:\/\/[^\s]+|\/gallery|\/fees|\/contact|\/about|\/parents-hub|\/academics|\/news)/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (!part) return null

    const isLink = /^https?:\/\//.test(part) || part.startsWith('/')
    if (!isLink) {
      return <span key={`${part}-${index}`}>{part}</span>
    }

    return (
      <a
        key={`${part}-${index}`}
        href={part.startsWith('http') ? part : part}
        target={part.startsWith('http') ? '_blank' : undefined}
        rel={part.startsWith('http') ? 'noreferrer' : undefined}
        className="font-semibold underline underline-offset-2 text-primary hover:text-primary/80"
      >
        {part}
      </a>
    )
  })
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [chatwayFailed, setChatwayFailed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I’m here to help with fees, admissions, term dates, results, and school contacts. What would you like to know?',
      suggestions: quickPrompts,
    },
  ])
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isSending])

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_CHATWAY_API_KEY?.trim()

    if (!apiKey) {
      setChatwayFailed(true)
      return
    }

    const scriptId = 'chatway-widget-script'
    if (document.getElementById(scriptId)) {
      return
    }

    const config = {
      apiKey,
      position: 'right',
      title: 'School Assistant',
      subtitle: 'Ask about fees, admissions, results and school information',
      primaryColor: '#303f9f',
      secondaryColor: '#f7e600',
      showBranding: false,
      showHeader: true,
    }

    window.chatwayConfig = config

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = 'https://cdn.chatway.app/widget.js'
    script.onload = () => {
      if (window.chatway && typeof window.chatway.init === 'function') {
        try {
          window.chatway.init(config)
        } catch {
          setChatwayFailed(true)
        }
      } else {
        setChatwayFailed(true)
      }
    }
    script.onerror = () => setChatwayFailed(true)

    document.body.appendChild(script)

    return () => {
      const scriptTag = document.getElementById(scriptId)
      if (scriptTag) {
        scriptTag.remove()
      }
    }
  }, [])

  const handleSend = async (value?: string) => {
    const trimmed = (value ?? input).trim()
    if (!trimmed || isSending) return

    setInput('')
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
    ])
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await response.json()

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: data.answer || 'I could not find a clear answer for that. Please contact the school office for more help.',
          suggestions: data.suggestions ?? [],
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: 'The assistant is temporarily unavailable. Please contact the school office directly for the latest information.',
          suggestions: quickPrompts,
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[min(26rem,calc(100vw-1.25rem))] overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white shadow-[0_18px_45px_rgba(16,24,40,0.16)] ring-1 ring-primary/5">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/15">
                <Bot className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold">School Assistant</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-primary-foreground/80">
                  {chatwayFailed ? 'offline fallback' : 'online now'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 transition hover:bg-white/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex max-h-[24rem] min-h-[21rem] flex-col gap-3 bg-slate-50 p-3">
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-white text-slate-700'
                    }`}
                  >
                    <div className="break-words whitespace-pre-wrap">{renderMessageText(message.text)}</div>
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
                    <Sparkles className="size-4 animate-pulse text-primary" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {messages[messages.length - 1]?.suggestions?.length ? (
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestions?.slice(0, 4).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-primary/25 bg-white px-2.5 py-1.5 text-[11px] font-medium text-primary transition hover:bg-primary/5"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="Ask about fees, results, calendar..."
                className="h-10 flex-1 border-0 bg-transparent px-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={isSending || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <SendHorizonal className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-3 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_30px_rgba(48,63,159,0.32)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
      >
        <MessageCircleMore className="size-5" />
        Ask the school
      </button>
    </div>
  )
}
