import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CalendarRange,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { AboutSnippet } from '@/components/home/about-snippet'
import { NewsSnippet } from '@/components/home/news-snippet'
import { PleShowcase } from '@/components/home/ple-showcase'

const utilityLinks = [
  {
    href: '/admissions',
    label: 'Admissions',
    description: 'Simple enrollment steps and a warm welcome for new families.',
    icon: GraduationCap,
  },
  {
    href: '/academics',
    label: 'Fees',
    description: 'Clear tuition guidance and a transparent fee structure.',
    icon: BookOpen,
  },
  {
    href: '/parents-hub',
    label: 'Portal',
    description: 'Term dates, resources, and school updates in one place.',
    icon: Users,
  },
  {
    href: '/parents-hub',
    label: 'Calendar',
    description: 'Upcoming events, holidays, and key dates for the term.',
    icon: CalendarRange,
  },
] as const

const stats = [
  { value: 'Baby Class', label: 'to P.7 learning journey' },
  { value: '100%', label: 'guided pastoral care and mentoring' },
  { value: '4', label: 'core values that shape daily life' },
  { value: '1', label: 'supportive community, one child at a time' },
] as const

const announcements = [
  {
    title: 'Admissions for the new academic year are now open.',
    detail: 'Families are invited to begin the enrollment process early and schedule a personal school tour.',
  },
  {
    title: 'Term calendar and holiday homework are available in the parent portal.',
    detail: 'Parents can access our latest academic dates, school reminders, and downloadable resources.',
  },
  {
    title: 'We are nurturing future-ready learners in a safe, stimulating campus.',
    detail: 'Our teachers and support staff focus on both academic excellence and strong character development.',
  },
] as const

function UtilityBar() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-6 sm:pt-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {utilityLinks.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-28px_rgba(48,63,159,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <ArrowRight className="size-4 text-accent transition-transform duration-200 group-hover:translate-x-1" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-800 text-primary">{label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function TrustIndicators() {
  return (
    <section className="bg-muted/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex items-center gap-3 text-primary">
          <span className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
            <Sparkles className="size-5" />
          </span>
          <p className="font-display text-lg font-800">A learning community families trust</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl font-800 text-primary">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnnouncementPanel() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <div className="rounded-[2rem] border border-border bg-gradient-to-r from-primary/95 to-primary p-7 text-primary-foreground shadow-[0_25px_60px_-35px_rgba(48,63,159,0.7)] sm:p-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-700 uppercase tracking-[0.2em] text-gold">Latest updates</p>
            <h2 className="mt-3 font-display text-3xl font-800 leading-tight sm:text-4xl">
              Recent announcements for families
            </h2>
          </div>
          <Link
            href="/parents-hub"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-800 text-charcoal transition-transform duration-200 hover:scale-[1.02]"
          >
            View parent resources
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {announcements.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/15 bg-white/8 p-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-800 uppercase tracking-[0.16em] text-gold">
                <ShieldCheck className="size-3.5" />
                School update
              </div>
              <h3 className="font-display text-xl font-800 text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <UtilityBar />
      <Highlights />
      <TrustIndicators />
      <AboutSnippet />
      <AnnouncementPanel />
      <NewsSnippet />
      <PleShowcase />
    </>
  )
}
