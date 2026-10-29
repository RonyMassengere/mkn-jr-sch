import { NextResponse } from 'next/server'
import { getPleResults } from '@/lib/ple-results'

export async function GET() {
  try {
    const results = await getPleResults()
    return NextResponse.json({ results, updatedAt: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    console.error('PLE results API error:', error)
    return NextResponse.json({ results: [], error: 'PLE results are temporarily unavailable.' }, { status: 503 })
  }
}