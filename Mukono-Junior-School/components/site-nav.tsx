'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { nav, site } from '@/lib/site'
import { SocialLinks } from '@/components/social-links'

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Academics', href: '/academics' },
  { label: 'Parents Hub', href: '/parents-hub' },
  { label: 'Contact', href: '/contact' },
] as const

const secondaryLinks = [
  { label: 'About', href: '/about' },
  { label: 'Staff', href: '/staff' },
  { label: 'Gallery', href: '/gallery' },
  {
    label: 'News',
    href: '/news',
    items: [
      { label: 'News & Updates', href: '/news' },
      { label: 'Events', href: '/news/events' },
      { label: 'School Facilities', href: '/news/facilities' },
    ],
  },
] as const

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false)
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setDesktopMoreOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const toggleMobileAccordion = (label: string) => {
    setMobileAccordionOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 isolate">
      <div
        className={cn(
          'border-b border-white/30 bg-white/65 shadow-sm backdrop-blur-xl transition-all duration-300 ease-out supports-[backdrop-filter]:bg-white/55',
          scrolled && 'shadow-lg shadow-primary/10',
        )}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-2 px-3 py-3 sm:px-5 lg:gap-3">
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Image
              src="/mjs-logo.png"
              alt="MJS"
              width={48}
              height={48}
              sizes="48px"
              className="size-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 sm:size-[3rem]"
              priority
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-base font-800 tracking-tight text-primary sm:text-lg lg:text-[1.75rem]">
                {site.name}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
                Takkajunge
              </span>
            </span>
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <ul className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-1">
              {primaryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative inline-flex rounded-full px-2.5 py-2 text-xs font-700 text-[#303f9f] transition-colors duration-200 hover:bg-[#f7e600]/25 hover:text-[#c91f2b] xl:px-3 xl:text-sm',
                      isActive(item.href) ? 'text-accent accent-underline' : 'text-[#303f9f]',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li
                className="relative py-1.5"
                onMouseEnter={() => setDesktopMoreOpen(true)}
                onMouseLeave={() => setDesktopMoreOpen(false)}
              >
                <button
                  type="button"
                  onFocus={() => setDesktopMoreOpen(true)}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget as Node | null
                    if (!event.currentTarget.parentElement?.contains(nextTarget)) {
                      setDesktopMoreOpen(false)
                    }
                  }}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-700 transition-colors duration-200 hover:bg-[#f7e600]/25 hover:text-[#c91f2b] xl:px-3 xl:text-sm',
                    desktopMoreOpen ? 'bg-[#f7e600]/25 text-[#c91f2b]' : 'text-[#303f9f]',
                  )}
                >
                  More
                  <ChevronDown className={cn('size-3.5 transition-transform duration-200', desktopMoreOpen && 'rotate-180')} />
                </button>

                <div
                  className={cn(
                    'absolute left-1/2 top-full z-20 mt-1 w-56 -translate-x-1/2 rounded-2xl border border-border bg-white p-2 shadow-xl transition-all duration-200',
                    desktopMoreOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
                  )}
                >
                  {secondaryLinks.map((item) => {
                    if ('items' in item && item.items) {
                      return (
                        <div key={item.label} className="rounded-xl border border-border/80 bg-muted/25 p-1.5">
                          <Link
                            href={item.href}
                            onClick={() => setDesktopMoreOpen(false)}
                            className={cn(
                              'block rounded-lg px-3 py-2 text-sm font-600 text-foreground transition-colors hover:bg-white hover:text-accent',
                              isActive(item.href) && 'bg-primary/5 text-accent',
                            )}
                          >
                            {item.label}
                          </Link>

                          <div className="mt-1 space-y-1 border-l border-border/60 pl-3">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setDesktopMoreOpen(false)}
                                className={cn(
                                  'block rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white hover:text-foreground',
                                  isActive(subItem.href) && 'text-accent',
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDesktopMoreOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2 text-sm font-600 text-foreground transition-colors hover:bg-muted hover:text-accent',
                          isActive(item.href) && 'bg-primary/5 text-accent',
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </li>
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden xl:block">
              <SocialLinks variant="dark" />
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full bg-accent px-4 py-2.5 text-xs font-700 text-accent-foreground shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] sm:inline-flex sm:text-sm"
            >
              Get in Touch
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-white/60 bg-white/45 text-primary shadow-[0_10px_30px_-15px_rgba(48,63,159,0.35)] backdrop-blur-xl transition-all duration-200 hover:bg-white/70 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/60"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 flex h-screen w-[80%] max-w-sm flex-col border-r border-border bg-white shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Image src="/mjs-logo.png" alt="MJS" width={32} height={32} className="rounded-full" />
                </div>
                <div>
                  <p className="font-display text-base font-800 text-primary">{site.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">School menu</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-border bg-muted text-foreground transition-colors hover:text-accent"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto p-4">
              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-700 transition-colors',
                    isActive(item.href) ? 'bg-primary/10 text-accent' : 'text-foreground hover:bg-muted',
                  )}
                >
                  {item.label}
                  <ChevronRight className="size-4" />
                </Link>
              ))}

              {secondaryLinks.map((item) => {
                if ('items' in item && item.items) {
                  const isOpen = Boolean(mobileAccordionOpen[item.label])

                  return (
                    <div key={item.label} className="rounded-2xl border border-border bg-muted/40 p-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileAccordion(item.label)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-700 text-foreground"
                      >
                        {item.label}
                        <ChevronDown className={cn('size-4 transition-transform', isOpen && 'rotate-180')} />
                      </button>

                      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0')}>
                        <div className="space-y-1 border-l border-border/80 pl-3 pt-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                'block rounded-xl px-3 py-2 text-sm font-600 transition-colors',
                                isActive(subItem.href) ? 'bg-primary/10 text-accent' : 'text-muted-foreground hover:bg-white hover:text-foreground',
                              )}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-700 transition-colors',
                      isActive(item.href) ? 'bg-primary/10 text-accent' : 'text-foreground hover:bg-muted',
                    )}
                  >
                    {item.label}
                    <ChevronRight className="size-4" />
                  </Link>
                )
              })}
            </nav>

            <div className="border-t border-border p-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-800 text-accent-foreground shadow-sm"
              >
                Get in Touch
              </Link>
              <div className="mt-4 flex justify-center">
                <SocialLinks variant="dark" />
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
