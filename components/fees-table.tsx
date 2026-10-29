'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Download, Loader2 } from 'lucide-react'

import type { FeeStructure } from '@/lib/fees'

function formatRequirements(requirements: string) {
  return requirements || 'As communicated by the school'
}

const feeCircularButtonClass =
  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-accent sm:w-auto sm:py-2.5'

function FeesTableContent() {
  const [fees, setFees] = useState<FeeStructure[]>([])
  const [loading, setLoading] = useState(true)
  const [errorState, setErrorState] = useState(false)
  const feeCircularHref = process.env.NEXT_PUBLIC_FEES_SHEET_URL || 'mailto:bursar@mukonojuniorschool.com'

  useEffect(() => {
    let isMounted = true
    let lastRequestAt = 0
    let requestInFlight = false

    const loadFees = async () => {
      const now = Date.now()
      if (requestInFlight || now - lastRequestAt < 60000) return
      lastRequestAt = now
      requestInFlight = true
      try {
        setErrorState(false)

        const response = await fetch('/api/fees', { cache: 'no-store' })
        if (!response.ok) {
          throw new Error('Unable to load fees')
        }

        const payload = await response.json()
        if (!Array.isArray(payload.fees) || payload.fees.length === 0) {
          throw new Error('The fees sheet returned no usable records.')
        }

        if (!isMounted) return
        setFees(payload.fees ?? [])
      } catch {
        if (!isMounted) return
        setErrorState(true)
      } finally {
        requestInFlight = false
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadFees()

    const intervalId = window.setInterval(loadFees, 60000)
    const handleFocus = () => loadFees()
    const handleVisibility = () => {
      if (!document.hidden) {
        loadFees()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  if (loading && !fees.length) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-slate-600">
        <Loader2 className="size-4 animate-spin text-primary" />
        Loading tuition and fees...
      </div>
    )
  }

  if (!fees.length) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p className="leading-relaxed">
            The fee structure is currently unavailable online. Please contact the school bursar for the latest approved fee schedule.
          </p>
        </div>

        <a
          href={feeCircularHref}
          target={feeCircularHref.startsWith('http') ? '_blank' : undefined}
          rel={feeCircularHref.startsWith('http') ? 'noreferrer' : undefined}
          className={feeCircularButtonClass}
        >
          <Download className="size-4" />
          Download fee circular
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[680px] border-collapse text-left sm:min-w-full">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-sm">Class Level</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-sm">Day Scholar Fee</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-sm">Boarding Fee</th>
                <th className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-sm">Included Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {fees.map((fee: FeeStructure) => (
                <tr key={`${fee.className}-${fee.dayFee}-${fee.boardingFee}`} className="align-top transition-colors hover:bg-primary/5">
                  <td className="px-3 py-4 text-xs font-semibold text-slate-900 sm:px-6 sm:text-sm">{fee.className}</td>
                  <td className="px-3 py-4 text-xs font-bold text-slate-900 sm:px-6 sm:text-sm">{fee.dayFee}</td>
                  <td className="px-3 py-4 text-xs font-bold text-slate-900 sm:px-6 sm:text-sm">{fee.boardingFee}</td>
                  <td className="px-3 py-4 text-xs leading-relaxed text-slate-700 sm:px-6 sm:text-sm">
                    {formatRequirements(fee.requirements)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {errorState && (
        <p className="text-xs text-amber-700">
          The latest refresh could not be completed. Showing the last available fee schedule.
        </p>
      )}

      <div className="flex justify-start">
        <a
          href={feeCircularHref}
          target={feeCircularHref.startsWith('http') ? '_blank' : undefined}
          rel={feeCircularHref.startsWith('http') ? 'noreferrer' : undefined}
          className={feeCircularButtonClass}
        >
          <Download className="size-4" />
          Download official fee circular
        </a>
      </div>
    </div>
  )
}

export function FeesTable() {
  return (
    <div className="rounded-3xl border border-border bg-muted/30 p-3 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent sm:text-xs">Fee Structure</p>
          <h3 className="mt-1 font-display text-xl font-800 text-primary sm:text-2xl">Tuition & Fees</h3>
        </div>
      </div>

      <div className="space-y-4">
        <FeesTableContent />
      </div>
    </div>
  )
}

export function FeesTableSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-muted/30 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2.5 w-20 rounded-full bg-slate-200" />
        <div className="h-8 w-44 rounded-full bg-slate-200" />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-slate-600">
        <Loader2 className="size-4 animate-spin text-primary" />
        Loading tuition and fees...
      </div>
    </div>
  )
}
