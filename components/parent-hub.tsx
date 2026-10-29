'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CalendarDays, Clock3, Download, FileText, Loader2 } from 'lucide-react'

type DriveFile = {
  id: string
  name: string
  mimeType?: string
  modifiedTime?: string
  size?: string
}

type HighlightItem = {
  title: string
  date: string
  type: string
  notes: string
}

const toDisplayDate = (isoValue?: string) => {
  if (!isoValue) return 'Date unavailable'

  const date = new Date(isoValue)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return new Intl.DateTimeFormat('en-UG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const toDisplayTime = (isoValue?: string) => {
  if (!isoValue) return ''

  const date = new Date(isoValue)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('en-UG', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

const formatFileSize = (size?: string) => {
  const value = Number(size ?? '0')
  if (!value || Number.isNaN(value)) return 'Unknown size'

  const units = ['B', 'KB', 'MB', 'GB']
  let bytes = value
  let unitIndex = 0

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024
    unitIndex += 1
  }

  return `${bytes.toFixed(bytes >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

const formatDate = (value?: string) => {
  if (!value) return 'Date unavailable'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return new Intl.DateTimeFormat('en-UG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const parseIcsDate = (value?: string) => {
  if (!value) return null

  const trimmed = value.trim()

  if (/^\d{8}$/.test(trimmed)) {
    const year = trimmed.slice(0, 4)
    const month = trimmed.slice(4, 6)
    const day = trimmed.slice(6, 8)
    return new Date(`${year}-${month}-${day}T12:00:00Z`)
  }

  const normalized = trimmed.replace(/Z$/, '')
  const isoCandidate = /^\d{8}T\d{6}$/.test(normalized)
    ? `${normalized.slice(0, 4)}-${normalized.slice(4, 6)}-${normalized.slice(6, 8)}T${normalized.slice(9, 11)}:${normalized.slice(11, 13)}:${normalized.slice(13, 15)}Z`
    : normalized

  const parsed = new Date(isoCandidate)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const parseIcsCalendarEvents = (icsContent: string): HighlightItem[] => {
  const blocks = icsContent
    .split('BEGIN:VEVENT')
    .slice(1)
    .map((block) => block.split('END:VEVENT')[0]?.trim())
    .filter(Boolean)

  return blocks
    .map((block) => {
      const lines = block.split(/\r?\n/).map((line) => line.trim())
      const summaryLine = lines.find((line) => line.startsWith('SUMMARY')) ?? ''
      const descriptionLine = lines.find((line) => line.startsWith('DESCRIPTION')) ?? ''
      const startLine = lines.find((line) => line.startsWith('DTSTART')) ?? ''

      const summary = summaryLine
        .replace(/^SUMMARY[:;]?/, '')
        .replace(/\\n/g, ' ')
        .replace(/\\,/g, ',')
        .trim()

      const description = descriptionLine
        .replace(/^DESCRIPTION[:;]?/, '')
        .replace(/\\n/g, ' ')
        .replace(/\\,/g, ',')
        .trim()

      const rawStartValue = startLine.includes(':') ? startLine.split(':').slice(1).join(':') : ''
      const startDate = parseIcsDate(rawStartValue)
      const dateText = startDate ? toDisplayDate(startDate.toISOString()) : 'Date unavailable'
      const timeText = startDate ? toDisplayTime(startDate.toISOString()) : ''

      return {
        title: summary || 'School event',
        date: timeText ? `${dateText}, ${timeText}` : dateText,
        type: 'CALENDAR',
        notes: description || 'School event scheduled in the calendar.',
      }
    })
    .filter((event) => event.title)
    .slice(0, 4)
}

export function ParentHub() {
  const folderId = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID
  const apiKey = process.env.NEXT_PUBLIC_DRIVE_API_KEY
  const calendarSrc = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_IFRAME_SRC

  const [files, setFiles] = useState<DriveFile[]>([])
  const [events, setEvents] = useState<HighlightItem[]>([])
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadDriveFiles = async () => {
      if (!folderId || !apiKey) {
        setError('Google Drive environment variables are missing. Add NEXT_PUBLIC_DRIVE_FOLDER_ID and NEXT_PUBLIC_DRIVE_API_KEY to your .env.local file.')
        setLoading(false)
        return
      }

      try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,modifiedTime,size)&key=${apiKey}`

        const response = await fetch(url, { cache: 'no-store' })

        if (!response.ok) {
          throw new Error(`Google Drive request failed with status ${response.status}`)
        }

        const data = (await response.json()) as { files?: DriveFile[] }
        const nextFiles = (data.files ?? []).filter((file) => file?.id && file?.name)

        if (isActive) {
          setFiles(nextFiles)
          setError(null)
        }
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Unable to load Google Drive files.'

        if (isActive) {
          setError(message)
          setFiles([])
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    const loadCalendarEvents = async () => {
      const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || 'f79a29b7b08c854ed65b587c5f1ef6a680fbcf82f6f4b531cffbbea97b6f67ef@group.calendar.google.com'

      if (isActive) setCalendarLoading(true)

      if (!calendarId) {
        if (isActive) {
          setEvents([])
          setCalendarLoading(false)
        }
        return
      }

      try {
        const response = await fetch(`/api/calendar-events?calendarId=${encodeURIComponent(calendarId)}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`Google Calendar feed request failed with status ${response.status}`)
        }

        const payload = (await response.json()) as { events?: HighlightItem[] }

        if (isActive) {
          setEvents(payload.events ?? [])
          setCalendarLoading(false)
        }
      } catch {
        if (isActive) {
          setEvents([])
          setCalendarLoading(false)
        }
      }
    }

    void loadDriveFiles()
    void loadCalendarEvents()

    return () => {
      isActive = false
    }
  }, [folderId, apiKey])

  return (
    <section className="parent-hub-page relative overflow-hidden">
      <div className="parent-hub-shell mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-5 md:pt-12 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="parent-hub-header mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs font-700 uppercase tracking-[0.2em] text-accent mt-20">Parents' Hub</p>
            <h1 className="parent-hub-title mt-2 max-w-2xl font-display text-2xl font-800 leading-[1.08] text-primary sm:text-3xl md:text-4xl lg:text-[2.8rem]">
              School updates, documents &amp; calendar
            </h1>
          </div>
          <a
            href="/academics"
            className="parent-hub-button inline-flex w-full items-center justify-center rounded-full border border-border bg-white/70 px-4 py-2.5 text-sm font-700 text-primary shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent sm:w-auto md:self-end"
          >
            Back to Academics
          </a>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="parent-resource-card rounded-[24px] border border-white/50 bg-white/65 p-4 shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] backdrop-blur-xl sm:p-5 lg:p-6">
              <div className="resource-header flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-2xl font-800 text-primary">Parent resources</p>
                  <p className="mt-1 text-sm text-muted-foreground">Updated documents from the school drive.</p>
                </div>
                <span className="resource-badge inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-800 uppercase tracking-[0.18em] text-primary">
                  Drive
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {loading && (
                  <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-sm font-600 text-muted-foreground">
                    <Loader2 className="size-5 animate-spin text-primary" />
                    Loading parent downloads...
                  </div>
                )}

                {!loading && error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                    <AlertCircle className="mt-0.5 size-5 shrink-0" />
                    <div>
                      <p className="font-700">Unable to load downloads</p>
                      <p className="mt-1 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {!loading && !error && files.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center text-sm text-muted-foreground">
                    No public files are currently available in the shared parent folder.
                  </div>
                )}

                {!loading && !error && files.length > 0 && (
                  <div className="space-y-4">
                    {files.map((file) => (
                      <article
                        key={file.id}
                        className="resource-item rounded-2xl border border-border/80 bg-gradient-to-r from-white via-muted/40 to-primary/[0.02] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                      >
                        <div className="resource-item-head flex items-start gap-3">
                          <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shadow-inner shadow-primary/10">
                            <FileText className="size-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h2 className="font-display text-lg font-800 text-primary">{file.name}</h2>
                            <div className="resource-meta mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span>{formatDate(file.modifiedTime)}</span>
                              <span>{formatFileSize(file.size)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <a
                            href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="resource-item-download inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-700 text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
                          >
                            <Download className="size-4" />
                            Download
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="school-calendar-card rounded-[24px] border border-white/50 bg-white/65 p-4 shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] backdrop-blur-xl sm:p-5">
              <div className="calendar-header mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-800 text-primary">School calendar</p>
                  <p className="mt-1 text-sm text-muted-foreground">Important dates, school events, and parent reminders.</p>
                </div>
                <span className="calendar-badge grid size-11 place-items-center rounded-2xl bg-secondary text-secondary-foreground shadow-sm">
                  <CalendarDays className="size-5" />
                </span>
              </div>

              {calendarSrc ? (
                <div className="calendar-embed overflow-hidden rounded-[18px] border border-border/80 bg-gradient-to-br from-[#f8f9ff] to-[#eef4ff] shadow-inner shadow-primary/5">
                  <iframe
                    src={calendarSrc}
                    title="Mukono Junior School Calendar"
                    className="h-[440px] w-full border-0 bg-white md:h-[480px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-sm text-muted-foreground">
                  Google Calendar source is missing. Add NEXT_PUBLIC_GOOGLE_CALENDAR_IFRAME_SRC in your environment config.
                </div>
              )}
            </div>
          </div>

          <div className="key-dates-card rounded-[24px] border border-white/50 bg-white/65 p-4 shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="rounded-[18px] border border-border/80 bg-gradient-to-br from-primary/6 via-white to-primary/4 p-3 sm:p-4">
              <div className="mb-3 flex items-center gap-2">
                <Clock3 className="size-4 text-accent" />
                <p className="font-display text-lg font-800 text-primary">Upcoming key dates</p>
              </div>
              <div className="space-y-3">
                {calendarLoading ? (
                  <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm font-600 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    Loading upcoming dates...
                  </div>
                ) : events.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-white/80 p-4 text-sm text-muted-foreground">
                    No upcoming school events are currently published in the Google Calendar.
                  </div>
                ) : (
                  events.map((item) => (
                    <div key={`${item.title}-${item.date}`} className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-base font-800 text-primary">{item.title}</h3>
                        <span className="rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-800 uppercase tracking-[0.12em] text-primary">
                          {item.type}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-700 text-accent">{item.date}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
