import Link from 'next/link'
import { ArrowRight, Library, GraduationCap, Home } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const facilities = [
  { icon: Library, label: 'Well-stocked library & resource centre' },
  { icon: Home, label: 'Student dormitories on a spacious compound' },
  { icon: GraduationCap, label: 'Quality education for every learner' },
]

export function AboutSnippet() {
  return (
    <section className="bg-leaf-deep py-16 text-cream sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <span className="inline-block font-display text-sm font-700 uppercase tracking-[0.18em] text-gold">
            About Our School
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-800 leading-tight sm:text-4xl">
            A conducive place to learn, play, and belong
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-cream/85">
            Mukono Junior School emphasises academic excellence, self-discipline,
            mutual respect, and community service — all aimed at helping each
            student pursue their personal goals. Our campus offers a calm,
            welcoming environment for young learners.
          </p>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-700 text-charcoal transition-transform duration-200 ease-out hover:scale-105"
          >
            Read our story
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-leaf relative rounded-3xl p-7">
            <h3 className="font-display text-lg font-700 text-gold">
              Facilities &amp; Amenities
            </h3>
            <ul className="mt-5 space-y-4">
              {facilities.map((f) => {
                const Icon = f.icon
                return (
                  <li key={f.label} className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream/10 text-gold">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm leading-relaxed text-cream/90">
                      {f.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
