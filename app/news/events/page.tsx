import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'School Events',
  description:
    'Explore the school events at Mukono Junior School, from graduation to talent performances, swimming, and scouting and patriotism activities.',
}

const eventHighlights = [
  {
    title: 'School Graduation',
    description:
      'A proud milestone where pupils celebrate years of dedication, growth, and achievement with families, teachers, and the wider community.',
    image: '/images/news/events/graduation.jpeg',
  },
  {
    title: 'MMD & Talent Performance',
    description:
      'Creative showcases of music, drama, dance, and expression that build confidence and give every child a chance to shine.',
    image: '/images/news/events/MDD.jpeg',
  },
  {
    title: 'Swimming',
    description:
      'Water confidence, safety, and active participation through guided swimming activities that encourage discipline and healthy living.',
    image: '/images/news/events/swimming.jpeg',
  },
  {
    title: 'Scouting & Patriotism',
    description:
      'Grounded in service, responsibility, and national pride, these activities help pupils grow into respectful and active citizens.',
    image: '/images/news/events/scouting.jpeg',
  },
]

export default function NewsEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Celebrating school life and achievement"
        description="From graduation moments to creative performances and outdoor activities, school events help our children grow in confidence, teamwork, and pride."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-6">
          {eventHighlights.map((event, index) => (
            <Reveal key={event.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(43,38,33,0.45)]">
                <div className="grid gap-0 md:grid-cols-[minmax(260px,0.9fr)_1.1fr]">
                  <div className="relative min-h-[220px] w-full overflow-hidden md:min-h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                      quality={80}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-xs font-800 uppercase tracking-[0.18em] text-accent">School Event</p>
                    <h2 className="mt-3 font-display text-2xl font-700 text-primary sm:text-3xl">{event.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{event.description}</p>
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
