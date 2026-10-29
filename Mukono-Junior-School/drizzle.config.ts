import fs from 'node:fs'
import path from 'node:path'
import 'dotenv/config'
import type { Config } from 'drizzle-kit'

const envLocalPath = path.resolve(process.cwd(), '.env.local')
const envLocalValue = fs.existsSync(envLocalPath) ? fs.readFileSync(envLocalPath, 'utf8') : ''
const localDatabaseUrl = envLocalValue.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '')

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? localDatabaseUrl ?? '',
  },
  verbose: true,
  strict: true,
} satisfies Config
