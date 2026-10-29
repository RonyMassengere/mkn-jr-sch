import { NextResponse } from 'next/server'

const parseGoogleCalendarDate = (value?: string) => {
  if (!value) return null

  const clean = value.trim().replace(/;.*$/, '')

  if (/^\d{8}$/.test(clean)) {
    const year = clean.slice(0, 4)
    const month = clean.slice(4, 6)
    const day = clean.slice(6, 8)
    return new Date(`${year}-${month}-${day}T12:00:00Z`)
  }

  const dateTimeMatch = clean.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/)
  if (dateTimeMatch) {
    const [, year, month, day, hour, minute, second, zone] = dateTimeMatch
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${zone || ''}`)
  }

  const parsed = new Date(clean)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const calendarId = searchParams.get('calendarId')

  if (!calendarId) {
    return NextResponse.json({ events: [] }, { status: 400 })
  }

  try {
    const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`
    const response = await fetch(icsUrl, { cache: 'no-store' })

    if (!response.ok) {
      return NextResponse.json({ events: [] }, { status: response.status })
    }

    const icsContent = await response.text()
    const blocks = icsContent
      .split('BEGIN:VEVENT')
      .slice(1)
      .map((block) => block.split('END:VEVENT')[0]?.trim())
      .filter(Boolean)

    const events = blocks
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
        const dateValue = rawStartValue.replace(/^;.*$/, '').trim()
        const parsedDate = parseGoogleCalendarDate(dateValue)

        const displayDate = parsedDate && !Number.isNaN(parsedDate.getTime())
          ? new Intl.DateTimeFormat('en-UG', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(parsedDate)
          : 'Date unavailable'

        return {
          title: summary || 'School event',
          date: displayDate,
          type: 'CALENDAR',
          notes: description || 'School event scheduled in the calendar.',
        }
      })
      .filter((event) => event.title)
      .slice(0, 4)

    return NextResponse.json({ events })
  } catch {
    return NextResponse.json({ events: [] }, { status: 500 })
  }
}
