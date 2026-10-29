import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

/*
  News & Events content system.

  Each news item is a Markdown file in /content/news with frontmatter:

    ---
    title: "Sports Day 2025"
    date: "2025-03-14"
    description: "A short one-line summary shown in cards."
    image: "/images/news/sports-day.png"   # optional
    ---

    Full story goes here in Markdown...

  Non-technical staff edit these files (see README-NEWS.md). Adding or editing
  a file and committing it publishes the item on the next deploy — no database.
*/

const NEWS_DIR = path.join(process.cwd(), 'content', 'news')

export type NewsMeta = {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  href?: string
}

export type NewsItem = NewsMeta & {
  /** Rendered HTML body */
  contentHtml: string
}

function readDir(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return []
  return fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.md'))
}

export function getAllNews(): NewsMeta[] {
  return readDir()
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: String(data.title ?? 'Untitled'),
        date: String(data.date ?? ''),
        description: String(data.description ?? ''),
        image: data.image ? String(data.image) : undefined,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getNewsBySlug(slug: string): NewsItem | null {
  const file = path.join(NEWS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? 'Untitled'),
    date: String(data.date ?? ''),
    description: String(data.description ?? ''),
    image: data.image ? String(data.image) : undefined,
    contentHtml: marked.parse(content, { async: false }) as string,
  }
}

export function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
