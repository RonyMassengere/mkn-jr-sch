import type { Metadata } from 'next'
import { Target, HeartHandshake, ShieldCheck, HandHeart } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { LeafAccent } from '@/components/accents'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Mukono Junior School — our mission, our values of academic excellence, self-discipline, mutual respect and community service, and our campus in Mukono, Uganda.',
}

const values = [
  {
    icon: Target,
    title: 'Academic Excellence',
    body: 'We set high expectations and support every learner to meet their personal goals with confidence.',
  },
  {
    icon: ShieldCheck,
    title: 'Self-Discipline',
    body: 'Good habits, responsibility, and focus that serve our pupils well beyond the classroom.',
  },
  {
    icon: HeartHandshake,
    title: 'Mutual Respect',
    body: 'A kind, inclusive community where every child and family is valued and heard.',
  },
  {
    icon: HandHeart,
    title: 'Community Service',
    body: 'Giving back is part of who we are — we nurture caring, contributing citizens.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Learning with heart, growing with pride"
        description="Mukono Junior School is a primary school in Mukono, Uganda, guiding children from Baby Class through P.7 in a warm, disciplined, and supportive environment."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our Mission"
              title={<span className="accent-underline">Every child, their best self</span>}
              description="We exist to help each student pursue their own goals through academic excellence, strong character, and a genuine sense of belonging."
            />
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                At Mukono Junior School, learning goes hand in hand with
                character. Our teachers know their pupils by name, celebrate
                their progress, and gently guide them toward self-discipline and
                confidence.
              </p>
              <p>
                We believe a calm, conducive environment — a spacious compound,
                a well-stocked library, and dedicated resource centre — gives
                young learners room to explore, question, and grow.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <LeafAccent className="absolute -left-4 -top-4 size-12 -rotate-12" />
              <div
                className="relative h-full min-h-[420px] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/hero/hero3.jpeg')",
                }}
                aria-label="School image placeholder"
                role="img"
              >
                <div className="flex h-full min-h-[420px] items-end bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent p-6 sm:p-8">
                  <div className="max-w-xs rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs font-700 uppercase tracking-[0.18em] text-cream/90">
                      School Life
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-700 text-white">
                      Mukono Junior School
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            align="center"
            eyebrow="What We Stand For"
            title="Our core values"
            description="Four commitments shape daily life at Mukono Junior School."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 90}>
                  <article className="h-full rounded-2xl border border-border bg-card p-6">
                    <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-700 text-primary">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.body}
                    </p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
