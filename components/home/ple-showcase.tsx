import Link from 'next/link'
import { ArrowRight, ImageOff } from 'lucide-react'
import { getPleResults, type PleResult } from '@/lib/ple-results'
import { SectionHeading } from '@/components/section-heading'
import { PleShowcaseAnimatedCarousel } from '@/components/home/ple-showcase-carousel'

function PupilImage({ result, large = false }: { result: PleResult; large?: boolean }) {
  return (
    <div className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-muted text-primary ${large ? 'aspect-[4/3] w-full' : 'size-24'}`}>
      {result.photoUrl ? (
        <img
          src={result.photoUrl}
          alt={`${result.name} pupil photo`}
          className="size-full object-cover"
          loading="lazy"
        />
      ) : (
        <ImageOff className={large ? 'size-10 text-muted-foreground' : 'size-7 text-muted-foreground'} />
      )}
    </div>
  )
}

function ResultMeta({ result }: { result: PleResult }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs font-bold">
      <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">Aggregate {result.aggregate}</span>
      <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Division {result.division}</span>
    </div>
  )
}

function ShowcaseUnavailable() {
  return (
    <div className="rounded-3xl bg-muted/50 p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
      The latest PLE performance highlights are temporarily unavailable. Please visit the academics page or contact the school office for the approved results.
    </div>
  )
}

export async function PleShowcase() {
  const results = (await getPleResults()).slice(0, 3)

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="PLE Academic Excellence"
            title={<span className="accent-underline">Results worth celebrating</span>}
            description="A spotlight on the learners whose focus, courage, and steady preparation are shaping the next chapter of Mukono Junior School."
          />
          <Link href="/academics" className="group inline-flex shrink-0 items-center gap-2 font-bold text-accent transition-colors hover:text-primary">
            View full results
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10">
          {results.length < 3 ? <ShowcaseUnavailable /> : <PleShowcaseAnimatedCarousel results={results} />}
        </div>
      </div>
    </section>
  )
}