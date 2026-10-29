import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { GalleryCategoryGrid } from '@/components/gallery-category-grid'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore school moments at Mukono Junior School — graduation, talent, staff, infrastructure, and co-curricular activities.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our school life"
        description="Browse the school through the stories, spaces and people that make Mukono Junior School special."
      />

      <GalleryCategoryGrid />
    </>
  )
}
