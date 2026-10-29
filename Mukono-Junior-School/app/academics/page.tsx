import type { Metadata } from 'next'
import { Suspense } from 'react'
import {
  Baby,
  BookOpen,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FlaskConical,
  GraduationCap,
  Languages,
  Monitor,
  Palette,
  Sprout,
  Trophy,
  Users,
  Volleyball,
} from 'lucide-react'
import { FeesTable, FeesTableSkeleton } from '@/components/fees-table'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { AcademicPerformance } from '@/components/academic-performance'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Academics & Activities',
  description:
    'Explore the UNEB/NCDC-aligned learning journey at Mukono Junior School, from ECD and thematic lower primary to PLE preparation and co-curricular learning.',
}

const curriculumSubjects = [
  {
    icon: Calculator,
    title: 'Mathematics',
    body: 'Build number sense, problem-solving, and practical reasoning through guided practice and everyday examples.',
  },
  {
    icon: BookOpen,
    title: 'English',
    body: 'Grow confident readers, writers, speakers, and listeners through stories, vocabulary, grammar, and composition.',
  },
  {
    icon: FlaskConical,
    title: 'Science',
    body: 'Explore the natural world with observation, questioning, experiments, and hands-on investigation.',
  },
  {
    icon: Users,
    title: 'Social Studies',
    body: 'Understand home, community, Uganda, and the wider world while developing responsible citizenship.',
  },
]

const learningStages = [
  {
    icon: Baby,
    eyebrow: 'Early Childhood Development',
    title: 'Baby & Nursery',
    body: 'Children learn through play, songs, stories, movement, and guided discovery. Activities develop language, fine and gross motor skills, social confidence, creativity, and independence as a joyful preparation for P.1.',
  },
  {
    icon: Languages,
    eyebrow: 'P.1 – P.3',
    title: 'Lower Primary',
    body: 'Thematic teaching connects literacy, numeracy, writing, religious education, health, and the world around the child. Local languages support understanding alongside English, in line with the NCDC approach.',
  },
  {
    icon: GraduationCap,
    eyebrow: 'P.4 – P.7',
    title: 'Upper Primary',
    body: 'Learners move into deeper subject-specific teaching, regular practice, continuous assessment, and increasingly independent study. P.7 pupils receive focused support as they prepare for the PLE.',
  },
]

const practicalLearning = [
  { icon: Monitor, title: 'ICT & computer literacy', body: 'Age-appropriate digital skills, responsible technology use, and practical computer confidence.' },
  { icon: Sprout, title: 'Agriculture & Home Science', body: 'Hands-on projects such as gardening, care for the environment, and useful everyday skills.' },
  { icon: Palette, title: 'Creative Arts', body: 'Music, dance, drama, drawing, and making give children a space to express ideas and culture.' },
  { icon: Volleyball, title: 'Physical Education', body: 'Games and sports build fitness, teamwork, discipline, and resilience alongside classroom learning.' },
]

const resources = [
  {
    title: 'Academic calendar',
    description: 'Term dates, visitation days, midterm breaks, and examination weeks.',
    href: '/parents-hub',
  },
  {
    title: 'School requirements list',
    description: 'Scholastic materials, uniforms, and day or boarding requirements.',
    href: '/parents-hub',
  },
]

const learningApproach = [
  {
    title: 'Understanding first',
    body: 'Teachers use explanation, questions, and examples to help children understand new ideas before they are expected to memorise them.',
  },
  {
    image: '/images/gallery/garden.png',
    alt: 'Pupils learning through a school garden activity',
    title: 'Learning by doing',
    body: 'Projects, practical activities, discussion, and play connect lessons to real life and give children confidence to try.',
  },
  {
    image: '/images/gallery/library.png',
    alt: 'Pupils reading together in the school library',
    title: 'Progress together',
    body: 'Regular feedback helps families and teachers celebrate progress, identify support needs, and keep every learner moving forward.',
  },
]

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academics & Activities"
        title="A clear path for every learner"
        description="A balanced UNEB/NCDC-aligned journey from playful early learning to confident PLE preparation, with practical skills and character growing alongside academic progress."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Curriculum Overview"
          title={<span className="accent-underline">Strong foundations, purposeful progress</span>}
          description="Our academic programme follows Uganda's national direction while giving teachers room to make learning active, relevant, and supportive."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                  <BookOpen className="size-6" />
                </span>
                <h3 className="font-display text-xl font-800 text-primary">UNEB / NCDC pathway</h3>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Learners are guided through the Ugandan national curriculum with a focus on understanding, practice, and steady progress. In P.7, teaching and revision support readiness for the four PLE subjects: Mathematics, English, Science, and Social Studies.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {curriculumSubjects.map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm font-700 text-primary">
                    <Icon className="size-5 shrink-0 text-accent" />
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl bg-primary p-7 text-primary-foreground sm:p-9">
              <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-secondary">
                How children learn
              </p>
              <h3 className="mt-3 font-display text-2xl font-800">Learning that connects to life</h3>
              <div className="mt-6 grid gap-4">
                {learningApproach.map((item) => (
                  <article key={item.title} className="overflow-hidden rounded-2xl border border-white/15 bg-white/10">
                    <div className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                        <h4 className="font-display text-base font-800 text-primary-foreground">{item.title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="By Class Stage"
            title="The right support at every age"
            description="Each stage has a clear purpose, with teaching approaches matched to children's development."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {learningStages.map(({ icon: Icon, eyebrow, title, body }, i) => (
              <Reveal key={title} delay={i * 90}>
                <article className="h-full rounded-2xl border border-border bg-card p-7">
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-7" />
                  </span>
                  <p className="mt-5 text-xs font-800 uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl font-800 text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="PLE Results"
            title={<span className="accent-underline">Celebrating learner achievement</span>}
            description="Explore the latest PLE performance results, refreshed automatically from the school's published results sheet."
          />
          <div className="mt-10">
            <AcademicPerformance />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Tuition & Fees"
          title={<span className="accent-underline">Transparent fees for families</span>}
          description="Fee information is published directly from the approved school sheet so updates can be made by administration without needing a developer to edit the website."
        />
        <div className="mt-10">
          <Suspense fallback={<FeesTableSkeleton />}>
            <FeesTable />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Practical & Co-Curricular Learning"
          title={<span className="accent-underline">Skills for school and life</span>}
          description="The timetable makes room for creativity, physical wellbeing, digital confidence, and useful practical experiences."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {practicalLearning.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 90}>
              <article className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground shadow-sm">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-xl font-800 text-primary sm:text-lg">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center text-center">
            <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-secondary">Progress & Achievement</p>
            <h2 className="mt-2 font-display text-3xl font-800 sm:text-4xl">Progress worth celebrating</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-primary-foreground/80">
              Through continuous assessment, teacher feedback, and purposeful revision, we help each learner make progress. Our pupils also grow in confidence through debating, mathematics activities, spelling, reading, and other classroom and school enrichment experiences.
            </p>
          </div>

          <div className="mt-8 grid justify-items-center gap-4 md:grid-cols-2">
            <div className="w-full max-w-md rounded-2xl border border-secondary/35 bg-primary-foreground/10 p-6 text-left md:text-center">
              <GraduationCap className="size-8 text-secondary" />
              <p className="mt-3 font-display text-lg font-800">Education achievement</p>
              <p className="mt-1 text-sm text-primary-foreground/75">Strong academic growth supported by regular feedback, revision, and guided learning.</p>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-secondary/35 bg-primary-foreground/10 p-6 text-left md:text-center">
              <Users className="size-8 text-secondary" />
              <p className="mt-3 font-display text-lg font-800">Long-term service</p>
              <p className="mt-1 text-sm text-primary-foreground/75">Committed leadership and experienced teachers who support pupils through many school years.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Parent Hub"
          title={<span className="accent-underline">Resources for families</span>}
          description="Keep the essentials close at hand. The administration can replace these resource links with the latest approved documents as they are published."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              className="group flex items-start justify-between gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
            >
              <span>
                <span className="font-display text-lg font-800 text-primary">{resource.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{resource.description}</span>
              </span>
              <Download className="size-5 shrink-0 text-accent transition-transform group-hover:translate-y-1" />
            </a>
          ))}
        </div>
        <div id="assessment-policy" className="mt-6 rounded-2xl border border-border bg-muted/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <ClipboardCheck className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-800 text-primary">Assessment & grading</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Teachers use classwork, homework, projects, quizzes, tests, and observation to understand each child's progress. Families should expect regular feedback and progress reporting, with specific reporting schedules shared by the school each term.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
