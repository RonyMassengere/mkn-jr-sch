import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { AboutSnippet } from '@/components/home/about-snippet'
import { NewsSnippet } from '@/components/home/news-snippet'
import { PleShowcase } from '@/components/home/ple-showcase'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <AboutSnippet />
      <NewsSnippet />
      <PleShowcase />
    </>
  )
}
