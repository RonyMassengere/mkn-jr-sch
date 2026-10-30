import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowUpRight } from 'lucide-react'
import { formatDate, type NewsMeta } from '@/lib/news'

export function NewsCard({ item }: { item: NewsMeta }) {
  const href = item.href ?? `/news/${item.slug}`

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(43,38,33,0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={item.image || '/images/hero/hero1.jpeg'}
          alt={item.image ? item.title : 'Pupils learning together at Mukono Junior School'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-600 uppercase tracking-wide text-accent">
          <CalendarDays className="size-3.5" />
          {formatDate(item.date)}
        </span>
        <h3 className="mt-2 text-balance font-display text-lg font-700 leading-snug text-primary">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-700 text-primary transition-colors group-hover:text-accent">
          Read more
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
