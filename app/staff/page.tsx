import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { leadership, maleTeachers, femaleTeachers, prefectorialBody, initials, type StaffMember } from '@/lib/staff'

export const metadata: Metadata = {
  title: 'Our Staff',
  description:
    'Meet the dedicated staff of Mukono Junior School — the teachers and leaders who help every child learn with heart and grow with pride.',
}

function Avatar({ member, size }: { member: StaffMember; size: 'lg' | 'md' }) {
  const dimension = size === 'lg' ? 'size-32 sm:size-36' : 'size-24 sm:size-28'

  if (member.image) {
    return (
      <div className={`relative ${dimension} overflow-hidden rounded-2xl border border-border bg-muted`}>
        <Image
          src={member.image || '/placeholder.svg'}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          quality={80}
          className="object-cover"
        />
      </div>
    )
  }

  const monogram = initials(member.name)

  return (
    <div
      className={`grid ${dimension} place-items-center rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 font-display font-800 text-primary`}
    >
      <span className={size === 'lg' ? 'text-4xl' : 'text-2xl'}>{monogram}</span>
    </div>
  )
}

function StaffSection({ title, description, members }: { title: string; description: string; members: StaffMember[] }) {
  const mainMember = members[0]

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-800 uppercase tracking-[0.18em] text-accent">{title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      {mainMember && (
        <Reveal>
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <Image
                src={mainMember.image || '/placeholder.svg'}
                alt={mainMember.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-700 text-primary">{mainMember.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{mainMember.name}</p>
            </div>
          </article>
        </Reveal>
      )}
    </div>
  )
}

export default function StaffPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Staff"
        title="The people behind our pupils"
        description="A warm, committed team who know every child by name. Staff profiles shown here are placeholders and can be updated with final school photos and names when ready."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Leadership"
          title={<span className="accent-underline">School leadership</span>}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {leadership.map((member, i) => (
            <Reveal key={member.role} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'right center right' }}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    quality={80}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-700 text-primary">{member.name}</h3>
                  <p className="mt-1 text-sm font-700 text-accent">{member.role}</p>
                  {member.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {leadership[0] && (
        <section className="bg-leaf-deep py-16 text-cream sm:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 lg:grid-cols-[auto_1fr] lg:gap-12 lg:px-8">
            <Reveal>
              <div className="mx-auto flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-full border-4 border-gold/80 bg-cream/10 p-1 shadow-xl sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={leadership[0].secondaryImage || leadership[0].image || '/placeholder.svg'}
                    alt={leadership[0].name}
                    fill
                    className="object-cover object-center"
                    style={{ objectPosition: 'left center' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    quality={85}
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="max-w-3xl">
                <p className="font-display text-sm font-700 uppercase tracking-[0.18em] text-gold">
                  A welcome from our Head Teacher
                </p>
                <blockquote className="mt-4 font-display text-2xl font-600 leading-relaxed text-cream sm:text-3xl">
                  “At Mukono Junior School, we believe every child arrives with a unique light to share. Our role is to give them the care, discipline, and opportunity to let that light grow brightly.”
                </blockquote>
                <div className="mt-6">
                  <p className="font-display text-lg font-700 text-cream">{leadership[0].name}</p>
                  <p className="text-sm text-cream/70">{leadership[0].role}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Student Leadership"
          title={<span className="accent-underline">Prefectorial body</span>}
          description="Our pupil leaders help guide responsibility, order, and school pride across the campus."
        />

        <div className="mt-10">
          <Reveal>
            <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image
                  src={prefectorialBody[0].image || '/placeholder.svg'}
                  alt={prefectorialBody[0].name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  quality={85}
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-700 text-primary">{prefectorialBody[0].role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{prefectorialBody[0].name}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            eyebrow="Teaching Team"
            title="Our teaching staff"
            description="A dedicated team of academic staff supporting every phase of learning."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
            <StaffSection title="Male Staff Teachers" description="Primary classroom and subject support across the school." members={maleTeachers} />
            <StaffSection title="Female Staff Teachers" description="Early years, literacy, pastoral and classroom leadership support." members={femaleTeachers} />
          </div>
        </div>
      </section>
    </>
  )
}
