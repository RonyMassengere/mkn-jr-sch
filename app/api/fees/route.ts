import { NextResponse } from 'next/server'

import { getFeesFromSheet } from '@/lib/fees'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const fees = await getFeesFromSheet()
    return NextResponse.json({ fees })
  } catch {
    return NextResponse.json({ fees: [] }, { status: 500 })
  }
}
