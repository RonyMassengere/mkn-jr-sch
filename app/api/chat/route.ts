import { NextResponse } from 'next/server'

import { getFeesFromSheet, type FeeStructure } from '@/lib/fees'
import { getPleResults } from '@/lib/ple-results'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value
}

function extractSchoolInfo() {
  return {
    schoolName: site.name,
    shortName: site.shortName,
    location: site.location,
    email: site.email,
    phone: site.phones[0],
    whatsapp: site.socials.whatsapp,
    description: site.description,
    url: site.url,
  }
}

function summarizeFees(fees: FeeStructure[]) {
  if (!fees.length) {
    return 'No fee data was available in the current website data.'
  }

  return fees
    .slice(0, 4)
    .map((fee) => `${fee.className}: day ${fee.dayFee}${fee.boardingFee !== '—' ? `, boarding ${fee.boardingFee}` : ''}`)
    .join('; ')
}

function summarizeResults(results: Awaited<ReturnType<typeof getPleResults>>) {
  if (!results.length) {
    return 'No PLE result data is currently available on the website.'
  }

  return results
    .slice(0, 3)
    .map((result) => `${result.name}: aggregate ${result.aggregate}, division ${result.division}`)
    .join('; ')
}

async function getCalendarSummary() {
  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) {
    return 'No calendar data is configured in the environment.'
  }

  try {
    const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`
    const response = await fetch(icsUrl, { cache: 'no-store' })
    if (!response.ok) {
      return 'The school calendar could not be loaded right now.'
    }

    const icsContent = await response.text()
    const blocks = icsContent
      .split('BEGIN:VEVENT')
      .slice(1)
      .map((block) => block.split('END:VEVENT')[0]?.trim())
      .filter(Boolean)

    const event = blocks[0]
    if (!event) {
      return 'There are no upcoming school events currently available.'
    }

    const summary = event.match(/SUMMARY:(.*)/)?.[1]?.replace(/\\n/g, ' ').replace(/\\,/g, ',')
    const start = event.match(/DTSTART(?:;VALUE=DATE)?:(.*)/)?.[1]
    const firstDate = start && start.match(/^(\d{4})(\d{2})(\d{2})/)
    const dateText = firstDate ? `${firstDate[1]}-${firstDate[2]}-${firstDate[3]}` : 'upcoming'

    if (!summary) {
      return 'The upcoming event is available in the calendar, but summary details are not currently available.'
    }

    return `Upcoming event: ${summary} on ${dateText}.`
  } catch {
    return 'The school calendar is temporarily unavailable.'
  }
}

function buildGenericSuggestions() {
  return ['Ask about school fees', 'Ask about admissions', 'Ask about results', 'Ask about contacts']
}

function selectRelevantContext(question: string, context: Record<string, unknown>) {
  const normalized = normalizeText(question)
  const relevant: Record<string, unknown> = {
    schoolName: context.schoolName,
    location: context.location,
    email: context.email,
    phone: context.phone,
    description: context.description,
  }

  if (/hello|hi|hey|good morning|good afternoon|good evening/.test(normalized)) {
    return { ...relevant, greeting: true }
  }

  if (/fee|tuition|boarding|day scholar|school fee|payment|cost/.test(normalized)) {
    relevant.feeSummary = context.feeSummary
  }

  if (/result|ple|aggregate|exam|performance|score|division/.test(normalized)) {
    relevant.resultSummary = context.resultSummary
  }

  if (/calendar|term|holiday|event|opening|reopen|school date|date/.test(normalized)) {
    relevant.calendarSummary = context.calendarSummary
  }

  if (/admission|enroll|register|join|apply|intake/.test(normalized)) {
    relevant.admissions = 'Applicants should contact the school office for the latest admissions process and requirements.'
  }

  if (/contact|phone|email|location|address|call|where is|reach/.test(normalized)) {
    relevant.contactSummary = `${context.schoolName} is in ${context.location}. Email ${context.email} or call ${context.phone}.`
  }

  if (/about|school|who are you|what is this/.test(normalized)) {
    relevant.aboutSummary = context.description
  }

  return relevant
}

function extractJsonFromText(content: string) {
  try {
    const cleaned = content
      .replace(/```json\s*/gi, '')
      .replace(/```/g, '')
      .trim()

    return JSON.parse(cleaned)
  } catch {
    const match = content.match(/\{[\s\S]*\}/)
    if (!match) {
      return null
    }

    try {
      return JSON.parse(match[0])
    } catch {
      return null
    }
  }
}

async function callOpenAi(question: string, context: Record<string, unknown>) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY
  if (!apiKey) {
    return null
  }

  const selectedContext = selectRelevantContext(question, context)
  const payload = {
    model: 'gpt-4o-mini',
    temperature: 0.2,
    response_format: { type: 'json_object' },
    input: [
      {
        role: 'system',
        content:
          'You are a helpful school assistant for Mukono Junior School. Only answer the specific question asked. Ignore unrelated website data. Use only the provided context. If a fact is missing, say it is not available in the current website data. Keep replies short, warm, and natural. Return valid JSON with keys: answer and suggestions.',
      },
      {
        role: 'user',
        content: `Question: ${question}\n\nRelevant school context:\n${JSON.stringify(selectedContext, null, 2)}`,
      },
    ],
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI request failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    const outputText =
      data.output_text ??
      ((Array.isArray(data.output) ? data.output : [])
        .flatMap((item: any) => item?.content ?? [])
        .filter((content: any) => content?.type === 'output_text')
        .map((content: any) => content?.text)
        .join('\n') ?? '')

    const parsed = extractJsonFromText(outputText)
    if (!parsed || typeof parsed.answer !== 'string') {
      return null
    }

    return {
      answer: truncate(parsed.answer, 700),
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 4).map(String) : buildGenericSuggestions(),
    }
  } catch (error) {
    console.error('OpenAI chat generation failed:', error)
    return null
  }
}

function buildFallbackAnswer(question: string, context: Record<string, unknown>) {
  const relevant = selectRelevantContext(question, context)

  if (relevant.greeting) {
    return {
      answer: `Hello! I can help with school fees, admissions, results, calendar dates, and school contacts. What would you like to know?`,
      suggestions: buildGenericSuggestions(),
    }
  }

  const facts: string[] = []
  if (relevant.feeSummary) facts.push(`Fee info: ${String(relevant.feeSummary)}.`)
  if (relevant.resultSummary) facts.push(`Results: ${String(relevant.resultSummary)}.`)
  if (relevant.calendarSummary) facts.push(`Calendar: ${String(relevant.calendarSummary)}.`)
  if (relevant.contactSummary) facts.push(String(relevant.contactSummary))
  if (relevant.aboutSummary) facts.push(String(relevant.aboutSummary))
  if (relevant.admissions) facts.push(String(relevant.admissions))

  if (!facts.length) {
    return {
      answer: `I can help with the school’s fees, admissions, results, calendar, and contact details. Please ask specifically about one of those topics.`,
      suggestions: buildGenericSuggestions(),
    }
  }

  return {
    answer: `${facts.join(' ')} If you need exact confirmation for a class or a specific school event, contact the school office directly.`,
    suggestions: buildGenericSuggestions(),
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string }
    const message = (body.message ?? '').trim()

    if (!message) {
      return NextResponse.json({
        answer: 'Please ask a question about the school, its fees, admissions, results, or contact details.',
        suggestions: buildGenericSuggestions(),
      })
    }

    const info = extractSchoolInfo()
    const fees = await getFeesFromSheet()
    const results = await getPleResults()
    const calendarSummary = await getCalendarSummary()

    const context = {
      ...info,
      feeSummary: summarizeFees(fees),
      resultSummary: summarizeResults(results),
      calendarSummary,
      feeRecords: fees.slice(0, 5),
      resultRecords: results.slice(0, 5),
      question: message,
    }

    const llmReply = await callOpenAi(message, context)
    if (llmReply) {
      return NextResponse.json(llmReply)
    }

    return NextResponse.json(buildFallbackAnswer(message, context))
  } catch (error) {
    console.error('Chatbot generation failed:', error)
    return NextResponse.json(
      {
        answer: 'The assistant could not load the latest school data right now. Please contact the school office directly for the most accurate answer.',
        suggestions: buildGenericSuggestions(),
      },
      { status: 500 },
    )
  }
}
