import type { ComponentType, SVGProps } from 'react'
import { MessageCircle, Music2 } from 'lucide-react'
import { site } from '@/lib/site'

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.6v8h2.9Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const socials = [
  { label: 'WhatsApp', href: site.socials.whatsapp, icon: MessageCircle as SocialIcon },
  { label: 'Facebook', href: site.socials.facebook, icon: FacebookIcon as SocialIcon },
  { label: 'TikTok', href: site.socials.tiktok, icon: Music2 as SocialIcon },
  { label: 'Instagram', href: site.socials.instagram, icon: InstagramIcon as SocialIcon },
] as const

export function SocialLinks({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <div className="flex items-center gap-1.5" aria-label="Social media links">
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit our ${label} page`}
          className={
            variant === 'light'
              ? 'grid size-9 place-items-center rounded-full text-cream/80 transition-all duration-300 hover:bg-cream/15 hover:text-gold hover:scale-110 hover:rotate-[8deg]'
              : 'grid size-9 place-items-center rounded-full text-primary/70 transition-all duration-300 hover:bg-primary/10 hover:text-accent hover:scale-110 hover:rotate-[8deg]'
          }
        >
          <Icon className="size-[18px]" strokeWidth={2} />
        </a>
      ))}
    </div>
  )
}
