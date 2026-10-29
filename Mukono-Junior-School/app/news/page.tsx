import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'News & Events',
  description:
    'Updated highlights from Mukono Junior School — events and the school facilities that support a vibrant learning environment.',
}

const featuredSections = [
  {
    title: 'School Events',
    description:
      'Graduation, MMD & talent performances, swimming, and scouting and patriotism activities that help our pupils grow in confidence and character.',
    href: '/news/events',
    image: "url('/images/news/events/graduation.jpeg')",
  },
  {
    title: 'School Facilities',
    description:
      'Explore the school buildings, van transport, playgrounds, and learning materials that support safe, active, and engaging school life.',
    href: '/news/facilities',
    image: "url('/images/news/facilities/school_building.jpeg')",
  },
  {
    title: 'School Clinic',
    description:
      'A caring health space that supports the wellbeing of pupils and teachers, ensuring children stay safe, supported, and ready to learn.',
    href: '/news/facilities',
    image: "url('/images/news/facilities/school_clinic.jpeg')",
  },
]

export default function NewsPage() {
  const sections = [...featuredSections].sort(() => Math.random() - 0.5)

  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="What’s happening at MJS"
        description="Fresh highlights from school events and the facilities that make learning joyful, safe, and purposeful."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(43,38,33,0.45)]">
                <div className="grid gap-0 md:grid-cols-[minmax(260px,0.9fr)_1.1fr]">
                  <div className="relative min-h-[220px] w-full overflow-hidden md:min-h-full">
                    <Image
                      src={section.image.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                      quality={80}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-xs font-800 uppercase tracking-[0.18em] text-accent">School Update</p>
                    <h2 className="mt-3 font-display text-2xl font-700 text-primary sm:text-3xl">{section.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{section.description}</p>
                    <Link
                      href={section.href}
                      className="mt-5 inline-flex items-center gap-2 self-start font-700 text-accent transition-colors hover:text-primary"
                    >
                      Explore
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
