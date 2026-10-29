'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { site } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// If the Formspree endpoint hasn't been configured yet, fall back to a mailto
// link so the form still works out of the box.
const isFormspreeConfigured = !site.formspreeEndpoint.includes('yourFormId')

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (!isFormspreeConfigured) {
      // mailto fallback
      const name = String(data.get('name') ?? '')
      const email = String(data.get('email') ?? '')
      const message = String(data.get('message') ?? '')
      const subject = encodeURIComponent(`Website enquiry from ${name}`)
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="font-display text-xl font-700 text-primary">Message sent!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-700 text-primary-foreground transition-transform duration-200 hover:scale-105"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-700 text-foreground">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
            placeholder="e.g. Jane Namubiru"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-700 text-foreground">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-700 text-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="resize-y rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
            placeholder="How can we help?"
          />
        </div>

        {status === 'error' && (
          <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-600 text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            Something went wrong. Please try again or email us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-700 text-accent-foreground shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </button>

        {!isFormspreeConfigured && (
          <p className="text-center text-xs text-muted-foreground">
            Tip for staff: set your Formspree endpoint in{' '}
            <code className="rounded bg-muted px-1.5 py-0.5">lib/site.ts</code> to
            receive messages here. Until then, this opens your email app.
          </p>
        )}
      </div>
    </form>
  )
}
