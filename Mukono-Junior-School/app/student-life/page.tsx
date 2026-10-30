import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Apple,
  ArrowRight,
  BookOpen,
  HeartPulse,
  Music,
  ShieldCheck,
  Shirt,
  Users,
  Volleyball,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Student Life & Culture',
  description:
    'Discover the co-curricular activities, sports, uniform guidance, and wellbeing approach that support life at Mukono Junior School.',
}

const activities = [
  {
    icon: Music,
    title: 'Music, dance & drama',
    body: 'Performances and creative expression help pupils build confidence, teamwork, and pride in their talents and culture.',
  },
  {
    icon: Volleyball,
    title: 'Sports & active learning',
    body: 'Games, physical education, and guided swimming activities encourage fitness, discipline, cooperation, and water confidence.',
  },
  {
    icon: Users,
    title: 'Scouting, service & leadership',
    body: 'Shared responsibilities and school activities give children opportunities to practise respect, service, and character building.',
  },
  {
    icon: BookOpen,
    title: 'Clubs & enrichment',
    body: 'Classroom and co-curricular experiences invite pupils to explore interests, ask questions, and learn by doing.',
  },
] as const

const familyGuidance = [
  {
    icon: Shirt,
    title: 'Uniform & readiness',
    body: 'The school office provides the current approved uniform list and class-specific requirements. Please confirm the latest guidance before purchasing and label your child’s belongings clearly.',
  },
  {
    icon: HeartPulse,
    title: 'Health & safety',
    body: 'Share relevant medical conditions, allergies, and learning-support needs with the school. Families can ask the office about health support, visitor arrangements, and pupil collection procedures.',
  },
  {
    icon: Apple,
    title: 'Nutrition & wellbeing',
    body: 'Discuss dietary needs and meal arrangements with the school before your child starts. Clear communication helps staff support healthy routines and respond appropriately to allergies.',
  },
] as const

export default function StudentLifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Student Life & Culture"
        title="A nurturing environment where every child can belong and grow"
        description="Holistic child development reaches beyond the classroom. At Mukono Junior School, pupils build friendships, confidence, healthy habits, and character through shared experiences and caring guidance."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Learn, contribute, flourish"
          title={<span className="accent-underline">A rich school life for curious learners</span>}
          description="Creative performances, sports, scouting, and practical activities give children meaningful ways to discover their strengths and learn alongside one another."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {activities.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={index * 70}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-800 text-primary">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/news/events"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-800 text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            Explore school events
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-800 text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Visit the school gallery
          </Link>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Care & everyday expectations"
            title="Working together for safe, healthy school days"
            description="Families and educators share an important role in each child’s wellbeing. Our team can provide the latest practical guidance during admissions or a campus visit."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {familyGuidance.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 80}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-800 text-primary">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-primary/15 bg-primary p-6 text-primary-foreground sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 size-6 shrink-0 text-secondary" />
              <p className="text-sm leading-relaxed text-primary-foreground/90">
                Individualized mentorship begins with good communication. Let our team know what helps your child feel secure, included, and ready to learn.
              </p>
            </div>
            <Link
              href="/contact#inquiry-form"
              className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-800 text-secondary-foreground transition-transform hover:scale-[1.02] sm:mt-0"
            >
              Speak with our team
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
