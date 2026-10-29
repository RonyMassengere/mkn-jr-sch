import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'Admissions',
  description:
    'Explore the Mukono Junior School admissions process, fee guidelines, and family tour options for a smooth enrollment journey.',
}

const steps = [
  {
    title: 'Book a family meeting',
    body: 'Speak with our admissions team about your child’s age, learning needs, and the best fit within our school community.',
  },
  {
    title: 'Complete the application',
    body: 'Submit the online enquiry or visit the school office to collect the application form and enrollment checklist.',
  },
  {
    title: 'Prepare the supporting documents',
    body: 'Bring the pupil’s birth certificate, passport photos, previous report cards, and any transfer documents required for the class level.',
  },
  {
    title: 'Secure your child’s place',
    body: 'Confirm the school place, complete the fee commitment, and receive guidance on uniforms, books, and a smooth start date.',
  },
] as const

const feeGuidelines = [
  'Fees are structured to remain transparent, affordable, and easy to plan for as a family.',
  'Parents are encouraged to confirm the exact levy for the relevant class before the term begins.',
  'A clear breakdown of school charges, materials, and uniform requirements is shared at enrollment.',
] as const

const downloads = [
  {
    title: 'Admission requirements checklist',
    description: 'A simple guide covering the documents and items every new family should prepare.',
    href: '/admission-requirements.txt',
    label: 'Download checklist',
    icon: FileText,
  },
  {
    title: 'Fee schedule guide',
    description: 'Transparent term-by-term guidance to help parents plan ahead with confidence.',
    href: '/fee-guide.txt',
    label: 'Download fee guide',
    icon: BookOpen,
  },
] as const

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Secure your child’s future with a smooth, supportive start"
        description="We are delighted to welcome families seeking a nurturing, disciplined, and future-ready learning environment for their children."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Why parents choose MJS"
              title={<span className="accent-underline">Holistic child development, rooted in care</span>}
              description="Our admissions process is designed to help parents understand the school, the expectations, and the warm support available from day one."
            />
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                From Baby Class through P.7, Mukono Junior School creates a calm and stimulating environment where children grow academically, socially, and morally.
              </p>
              <p>
                Every enrollment journey is guided by dedicated educators, a clear process, and a commitment to child-centred learning that values both excellence and pastoral care.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/admissions/apply"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-800 text-accent-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02]"
              >
                Secure Your Child&apos;s Future - Apply Now
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact#inquiry-form"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-800 text-primary transition-transform duration-200 hover:border-accent hover:text-accent"
              >
                Book Your School Tour Today
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] sm:p-8">
              <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-accent">Our promise</p>
              <h3 className="mt-3 font-display text-2xl font-800 text-primary">A welcoming start for every child</h3>
              <ul className="mt-6 space-y-4">
                {[
                  'Dedicated and certified educators who know each child well.',
                  'A safe, stimulating campus with clear routines and daily mentoring.',
                  'A school culture built on discipline, respect, and confidence.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm leading-relaxed text-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            align="center"
            eyebrow="Enrollment Journey"
            title="A simple process for new families"
            description="We keep the pathway to enrollment clear, warm, and transparent so families can prepare with confidence."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary text-lg font-800 text-secondary-foreground">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-800 text-primary">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Requirements & fees"
              title={<span className="accent-underline">Clear guidance for a confident start</span>}
              description="Our admissions and fee information is transparent, practical, and designed to help parents plan ahead."
            />
            <div className="mt-8 space-y-4">
              {downloads.map(({ title, description, href, label, icon: Icon }) => (
                <div key={title} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-800 text-primary">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <a
                    href={href}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-800 text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <Download className="size-4" />
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-primary p-7 text-primary-foreground shadow-[0_25px_60px_-35px_rgba(48,63,159,0.8)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <h3 className="font-display text-2xl font-800">Fee structure at a glance</h3>
            </div>
            <div className="mt-6 space-y-4">
              {feeGuidelines.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-primary-foreground/90">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-white/15 bg-white/8 p-4">
              <p className="font-display text-lg font-800 text-gold">Need the exact figures?</p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                Our admissions team can walk you through class-specific school charges, material needs, and payment guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-leaf-deep py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-gold">School tour</p>
              <h2 className="mt-2 font-display text-3xl font-800 sm:text-4xl">See the campus before you enrol</h2>
              <p className="mt-4 max-w-xl text-pretty leading-relaxed text-cream/80">
                Visit the classrooms, library, sports grounds, and our warm learning spaces to experience the school culture first-hand.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/6 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-gold text-charcoal">
                  <CalendarCheck className="size-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-800 text-gold">Parents are welcome</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">
                    Schedule a guided school visit to meet our team, ask questions, and explore the environment your child will grow in.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact#inquiry-form"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-800 text-charcoal transition-transform duration-200 hover:scale-[1.02]"
                >
                  Book Your School Tour Today
                </Link>
                <a
                  href="https://wa.me/256701651477"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-800 text-white"
                >
                  <Users className="size-4" />
                  Speak With Our Admissions Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_18px_40px_-28px_rgba(48,63,159,0.3)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-accent">Visit us</p>
              <h3 className="mt-2 font-display text-2xl font-800 text-primary">Takkajunge, Mukono</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-700 text-primary">
              <MapPin className="size-4" />
              Mukono Junior School
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
