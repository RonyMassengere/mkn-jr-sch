import fs from 'node:fs'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    return undefined
  }

  const envFile = fs.readFileSync(envPath, 'utf8')
  const match = envFile.match(/^DATABASE_URL=(.+)$/m)
  if (!match) {
    return undefined
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '')
}

const databaseUrl = resolveDatabaseUrl()

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Add it to .env.local or your environment before using the admissions database.')
}

const sql = neon(databaseUrl)

export const db = drizzle(sql)
