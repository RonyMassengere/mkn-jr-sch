import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { getAllNews } from '@/lib/news'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/admissions',
    '/admissions/apply',
    '/academics',
    '/student-life',
    '/parents-hub',
    '/gallery',
    '/staff',
    '/news',
    '/news/events',
    '/news/facilities',
    '/contact',
  ].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    }),
  )

  const newsRoutes = getAllNews().map((item) => ({
    url: `${site.url}/news/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...routes, ...newsRoutes]
}
