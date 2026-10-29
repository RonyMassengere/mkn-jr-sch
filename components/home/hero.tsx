'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { ImageWithSkeleton } from '@/components/image-with-skeleton'

const slides = [
  {
    image: '/images/hero/hero5.jpeg',
    alt: 'Mukono Junior School grounds at golden hour',
    eyebrow: 'A place to belong',
    title: 'Learning with heart, growing with pride.',
    description:
      'A joyful, ambitious community helping every child discover their confidence and potential.',
  },
  {
    image: '/images/hero/hero2.jpeg',
    alt: 'Students learning together in a bright classroom',
    eyebrow: 'Curious minds',
    title: 'Every lesson opens a new door.',
    description:
      'Our classrooms make space for questions, creativity, and the steady confidence that comes from being supported.',
  },
  {
    image: '/images/hero/hero3.jpeg',
    alt: 'Students reading in the school library',
    eyebrow: 'Room to imagine',
    title: 'Big ideas start with a good story.',
    description:
      'From Baby Class through P.7, we nurture a love of reading and the imagination to see what is possible.',
  },
  {
    image: '/images/hero/hero4.jpeg',
    alt: 'Students playing football on the school grounds',
    eyebrow: 'Growing together',
    title: 'Confidence is built beyond the classroom.',
    description:
      'Sport, friendship, and service help children build character, resilience, and pride in their community.',
  },
] as const

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(interval)
  }, [])

  const slide = slides[activeSlide]

  const goToSlide = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length)
  }

  return (
    <section className="relative isolate overflow-hidden bg-cream pb-8 pt-20 sm:pt-24">
      <div className="absolute inset-0">
        <ImageWithSkeleton
          src={slide.image}
          alt={slide.alt}
          fill
          priority={activeSlide === 0}
          sizes="100vw"
          className="transition-opacity duration-700"
          objectFit="cover"
          wrapperClassName="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-deep/90 via-leaf-deep/62 to-leaf-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent sm:from-charcoal/45" />

      <div className="relative mx-auto flex min-h-[610px] max-w-6xl items-end px-4 pb-16 pt-24 sm:min-h-[680px] sm:items-center sm:px-8 sm:py-16">
        <div className="w-full max-w-[30rem] rounded-[1.5rem] border border-white/30 bg-[rgba(255,255,255,0.12)] p-5 shadow-[0_20px_60px_-28px_rgba(12,18,36,0.8)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:max-w-[34rem] lg:p-10">
          <p className="font-display text-[0.65rem] font-800 uppercase tracking-[0.24em] text-[#f7e600] sm:text-xs">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[12ch] text-balance font-display text-3xl font-800 leading-[1.02] text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg">
            {slide.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-3 font-800 text-accent-foreground shadow-lg shadow-accent/30 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-7 sm:py-3.5"
            >
              Click Here
            </Link>
            <span className="text-xs font-700 text-white/85 sm:text-sm">
              {site.location} · Baby Class – P.7
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-2" aria-label="Hero slides">
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === activeSlide
                  ? 'w-10 bg-white'
                  : 'w-2 bg-white/55 hover:bg-white/85',
              )}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goToSlide(activeSlide - 1)}
            className="grid size-10 place-items-center rounded-full border border-white/50 bg-leaf-deep/45 text-white backdrop-blur-md transition-colors hover:bg-leaf-deep/75"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeSlide + 1)}
            className="grid size-10 place-items-center rounded-full border border-white/50 bg-leaf-deep/45 text-white backdrop-blur-md transition-colors hover:bg-leaf-deep/75"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
