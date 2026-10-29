'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { galleryCategories } from '@/lib/gallery'
import { cn } from '@/lib/utils'
import { ImageWithSkeleton } from '@/components/image-with-skeleton'

export function GalleryCategoryGrid() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0].id)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const currentCategory = useMemo(
    () => galleryCategories.find((category) => category.id === activeCategory) ?? galleryCategories[0],
    [activeCategory],
  )

  const showLightbox = selectedIndex !== null

  const currentPhoto = showLightbox ? currentCategory.photos[selectedIndex] : null

  const openPhoto = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => setSelectedIndex(null)

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + currentCategory.photos.length) % currentCategory.photos.length)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % currentCategory.photos.length)
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
        <div className="rounded-3xl border border-border bg-card p-3 shadow-sm sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id)
                  setSelectedIndex(null)
                }}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-700 transition-all duration-200',
                  activeCategory === category.id
                    ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                    : 'border-border bg-background text-muted-foreground hover:border-accent/40 hover:text-foreground',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-6">
            <p className="text-xs font-800 uppercase tracking-[0.18em] text-accent">
              {currentCategory.label}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {currentCategory.photos.map((photo, index) => (
              <Reveal key={`${currentCategory.id}-${photo.title}`} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => openPhoto(index)}
                  className="group block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_30px_-18px_rgba(43,38,33,0.45)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <ImageWithSkeleton
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                      wrapperClassName="h-full w-full"
                    />
                  </div>
                  <div className="border-t border-border bg-card/90 px-3 py-2 text-center text-[10px] font-700 uppercase tracking-[0.08em] text-foreground sm:text-sm">
                    {photo.title}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {showLightbox && currentPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-xl"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/15 bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-slate-950/60 text-white transition hover:bg-slate-800"
              aria-label="Close image"
            >
              <X className="size-5" />
            </button>

            <div className="relative flex items-center justify-center bg-slate-950">
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-900/70 text-white transition hover:bg-slate-800 sm:left-4"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="relative w-full max-h-[78vh] min-h-[280px] overflow-hidden">
                <ImageWithSkeleton
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  width={1600}
                  height={1200}
                  className="h-auto max-h-[78vh] w-full"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={90}
                  objectFit="contain"
                  wrapperClassName="w-full min-h-[280px] max-h-[78vh]"
                />
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-slate-900/70 text-white transition hover:bg-slate-800 sm:right-4"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <div className="border-t border-white/10 bg-slate-950/80 px-4 py-3 text-center text-sm text-slate-100 sm:px-6">
              <p className="font-display text-lg font-700">{currentPhoto.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                {currentCategory.label} · {selectedIndex! + 1}/{currentCategory.photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
