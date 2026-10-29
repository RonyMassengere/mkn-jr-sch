import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { nav, site } from '@/lib/site'
import { WaveDivider } from '@/components/accents'
import { SocialLinks } from '@/components/social-links'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 text-cream">
      <WaveDivider className="block h-12 w-full" fill="var(--leaf-deep)" />
      <div className="bg-leaf-deep">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:grid-cols-3 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-gold font-display text-lg font-800 text-charcoal">
                MJS
              </span>
              <span className="font-display text-lg font-700">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">
              {site.description}
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-700 uppercase tracking-wide text-gold">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/85 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="font-display text-sm font-700 uppercase tracking-wide text-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-cream/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {site.location}
                  <br />
                  {site.poBox}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="flex flex-col">
                  {site.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-cream/70 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>Mukono, Uganda</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
