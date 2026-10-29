import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'School Facilities',
  description:
    'Discover the facilities that support learning at Mukono Junior School, including classrooms, school vans, playgrounds, and learning materials.',
}

const facilityHighlights = [
  {
    title: 'School Buildings',
    description:
      'Well-organised classrooms and learning spaces that provide a calm, safe environment for reading, concentration, and discovery.',
    image: '/images/news/facilities/school_building.jpeg',
  },
  {
    title: 'School Vans',
    description:
      'Reliable transport support that helps children arrive safely and comfortably, making school attendance smoother for every family.',
    image: '/images/news/facilities/school_van.jpeg',
  },
  {
    title: 'Playground & Learning Materials',
    description:
      'Active play spaces and practical teaching resources that help pupils build movement, creativity, curiosity, and confidence.',
    image: '/images/news/facilities/school_playground.jpeg',
  },
]

export default function NewsFacilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Facilities"
        title="Spaces that help every child thrive"
        description="Our campus is designed to support active learning, safe movement, and a strong sense of belonging from the classroom to the playground."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-6">
          {facilityHighlights.map((facility, index) => (
            <Reveal key={facility.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(43,38,33,0.45)]">
                <div className="grid gap-0 md:grid-cols-[minmax(260px,0.9fr)_1.1fr]">
                  <div className="relative min-h-[220px] w-full overflow-hidden md:min-h-full">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                      quality={80}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-xs font-800 uppercase tracking-[0.18em] text-accent">Campus Facility</p>
                    <h2 className="mt-3 font-display text-2xl font-700 text-primary sm:text-3xl">{facility.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{facility.description}</p>
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
