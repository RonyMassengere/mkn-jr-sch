import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { NewsCard } from '@/components/news-card'

const featuredStories = [
  {
    slug: 'events',
    href: '/news/events',
    title: 'School Events',
    date: '2025-12-12',
    description:
      'Graduation, performances, and school activities that help pupils grow in confidence, teamwork, and pride.',
    image: '/images/news/events/graduation.jpeg',
  },
  {
    slug: 'facilities',
    href: '/news/facilities',
    title: 'School Facilities',
    date: '2025-10-08',
    description:
      'A look at the classrooms, grounds, van transport, and everyday learning spaces that support safe, active school life.',
    image: '/images/news/facilities/school_building.jpeg',
  },
  {
    slug: 'facilities',
    href: '/news/facilities',
    title: 'School Clinic',
    date: '2025-09-12',
    description:
      'A caring health space supporting pupil wellbeing, safety, and confidence throughout the school day.',
    image: '/images/news/facilities/school_clinic.jpeg',
  },
] as const

export function NewsSnippet() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Latest Happenings"
          title={<span className="accent-underline">News &amp; Events</span>}
        />
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 font-700 text-accent transition-colors hover:text-primary"
        >
          View all news
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredStories.map((item, i) => (
          <Reveal key={`${item.slug}-${item.title}`} delay={i * 90}>
            <NewsCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
