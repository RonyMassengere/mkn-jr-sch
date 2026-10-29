import { BookOpen, Trophy, Users, Sprout } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const highlights = [
  {
    icon: BookOpen,
    title: 'Academic Excellence',
    body: 'A disciplined, supportive learning culture that helps every child reach their personal goals.',
  },
  {
    icon: Trophy,
    title: 'A Strong School Culture',
    body: 'Children grow in a confident, disciplined environment where learning, teamwork, and character are valued every day.',
  },
  {
    icon: Sprout,
    title: 'Values That Last',
    body: 'Self-discipline, mutual respect, and community service woven into everyday school life.',
  },
  {
    icon: Users,
    title: 'A Caring Community',
    body: 'Dormitories, a well-stocked library, and a resource centre on a spacious, accessible compound.',
  },
]

export function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Why Families Choose Us"
        title={<span className="accent-underline">A place to grow</span>}
        description="Everything at Mukono Junior School is built around helping children learn with heart and grow with pride."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, i) => {
          const Icon = item.icon
          return (
            <Reveal key={item.title} delay={i * 90}>
              <article className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(43,38,33,0.4)]">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-700 text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
