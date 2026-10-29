import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { getAllNews, getNewsBySlug, formatDate } from '@/lib/news'

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsBySlug(slug)
  if (!item) return { title: 'News' }
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getNewsBySlug(slug)
  if (!item) notFound()

  return (
    <>
      <PageHeader eyebrow={formatDate(item.date)} title={item.title} />

      <article className="mx-auto max-w-3xl px-5 py-16">
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-sm font-700 text-accent transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to all news
        </Link>

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-600 uppercase tracking-wide text-accent">
          <CalendarDays className="size-3.5" />
          {formatDate(item.date)}
        </p>

        {item.image && (
          <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={85}
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg mt-8 max-w-none font-sans leading-relaxed text-foreground prose-headings:font-display prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: item.contentHtml }}
        />
      </article>
    </>
  )
}
