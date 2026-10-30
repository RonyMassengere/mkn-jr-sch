import { NextResponse } from 'next/server'

import { getFeesFromSheet } from '@/lib/fees'

export const dynamic = 'force-dynamic'

const escapeCsvCell = (value: string) => {
  const safeValue = /^[\t\r ]*[=+\-@]/.test(value) ? `'${value}` : value
  return `"${safeValue.replace(/"/g, '""')}"`
}

export async function GET(request: Request) {
  try {
    const fees = await getFeesFromSheet()

    if (new URL(request.url).searchParams.get('format') === 'csv') {
      if (fees.length === 0) {
        return new Response(
          'The approved fee schedule is temporarily unavailable. Please view the Academics page or contact the school office for current figures.',
          {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          },
        )
      }

      const rows = [
        ['Class Level', 'Day Scholar Fee', 'Boarding Fee', 'Included Requirements'],
        ...fees.map((fee) => [fee.className, fee.dayFee, fee.boardingFee, fee.requirements]),
      ]
      const csv = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')

      return new Response(`\uFEFF${csv}`, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="mukono-junior-school-fee-schedule.csv"',
          'Cache-Control': 'no-store',
        },
      })
    }

    return NextResponse.json({ fees })
  } catch (error) {
    console.error('Failed to provide the current fee schedule:', error)
    if (new URL(request.url).searchParams.get('format') === 'csv') {
      return new Response(
        'The approved fee schedule is temporarily unavailable. Please view the Academics page or contact the school office for current figures.',
        {
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        },
      )
    }

    return NextResponse.json({ fees: [] }, { status: 500 })
  }
}
