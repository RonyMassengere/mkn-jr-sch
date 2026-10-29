export interface PleResult {
  name: string
  indexNumber: string
  aggregate: number
  division: string
  gender: string
  remarks: string
  photoUrl: string
}

const SHEET_FETCH_TIMEOUT_MS = 5000

function normalizeHeader(value: string) {
  return value.replace(/\u00a0/g, ' ').replace(/[^a-zA-Z0-9]+/g, ' ').trim().toLowerCase()
}

function cleanCellText(value: string | undefined) {
  return (value ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    if (character === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
      continue
    }
    if (character === ',' && !insideQuotes) {
      cells.push(current.trim())
      current = ''
      continue
    }
    current += character
  }
  cells.push(current.trim())
  return cells
}

function parseCsv(csvText: string) {
  return csvText.split(/\r?\n/).map(parseCsvLine).filter((row) => row.some((cell) => cell.trim() !== ''))
}

function findHeaderIndex(headers: string[], matchers: RegExp[]) {
  return headers.findIndex((header) => matchers.some((matcher) => matcher.test(header)))
}

function getCsvUrl(sheetUrl: string) {
  if (/\/export\?format=csv|[?&]output=csv/.test(sheetUrl)) {
    return sheetUrl
  }

  const match = sheetUrl.match(/\/spreadsheets\/d\/(?:e\/)?([^/?#]+)/)
  if (!match) return sheetUrl

  const gid = sheetUrl.match(/[?&#]gid=(\d+)/)?.[1]
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv${gid ? `&gid=${gid}` : ''}`
}

function parseAggregate(value: string) {
  const aggregate = Number.parseInt(value.replace(/[^0-9-]/g, ''), 10)
  return Number.isFinite(aggregate) ? aggregate : Number.POSITIVE_INFINITY
}

export function getGoogleDriveImageUrl(value: string) {
  const cleanValue = cleanCellText(value)
  if (!cleanValue) return ''
  const idFromUrl = cleanValue.match(/(?:id=|\/d\/|file\/d\/)([a-zA-Z0-9_-]+)/)?.[1]
  const fileId = idFromUrl ?? (cleanValue.match(/^[a-zA-Z0-9_-]{15,}$/) ? cleanValue : '')
  return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : cleanValue
}

export async function getPleResults(): Promise<PleResult[]> {
  const sheetUrl = process.env.NEXT_PUBLIC_PLE_RESULTS_URL
  if (!sheetUrl) return []

  try {
    const response = await fetch(getCsvUrl(sheetUrl), {
      next: { revalidate: 30 },
      headers: { Accept: 'text/csv, text/plain, */*' },
      signal: AbortSignal.timeout(SHEET_FETCH_TIMEOUT_MS),
    })
    if (!response.ok) throw new Error(`Unable to fetch PLE results: ${response.status}`)

    const rows = parseCsv(await response.text())
    if (rows.length < 2) return []
    const headers = rows[0].map(normalizeHeader)
    const nameIndex = findHeaderIndex(headers, [/name/, /pupil/, /student/, /candidate/])
    const indexNumberIndex = findHeaderIndex(headers, [/index/, /candidate number/, /index no/])
    const aggregateIndex = findHeaderIndex(headers, [/aggregate/, /agg/, /total/])
    const divisionIndex = findHeaderIndex(headers, [/division/, /div/])
    const genderIndex = findHeaderIndex(headers, [/gender/, /sex/])
    const remarksIndex = findHeaderIndex(headers, [/remark/, /comment/, /note/])
    const photoIndex = findHeaderIndex(headers, [/photo/, /image/, /picture/, /avatar/])
    if (nameIndex < 0 || aggregateIndex < 0) return []

    return rows.slice(1).map((row) => ({
      name: cleanCellText(row[nameIndex]),
      indexNumber: cleanCellText(row[indexNumberIndex]),
      aggregate: parseAggregate(cleanCellText(row[aggregateIndex])),
      division: cleanCellText(row[divisionIndex]) || 'Pending',
      gender: cleanCellText(row[genderIndex]) || 'Not provided',
      remarks: cleanCellText(row[remarksIndex]) || 'Keep reaching for your best.',
      photoUrl: getGoogleDriveImageUrl(cleanCellText(row[photoIndex])),
    })).filter((result) => result.name && Number.isFinite(result.aggregate))
      .sort((first, second) => first.aggregate - second.aggregate || first.name.localeCompare(second.name))
  } catch (error) {
    console.error('Failed to load PLE results from Google Sheet:', error)
    return []
  }
}