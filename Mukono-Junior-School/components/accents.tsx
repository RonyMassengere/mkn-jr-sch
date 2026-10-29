import type React from 'react'

// Small, hand-crafted SVG accents used sparingly across the site.

export function LeafAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M52 12C24 14 12 30 12 52c22 0 38-12 40-40Z"
        fill="var(--leaf)"
      />
      <path
        d="M18 46C28 36 38 26 46 18"
        stroke="var(--cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Wavy section divider (replaces flat straight lines).
export function WaveDivider({
  className,
  fill = 'var(--cream)',
  flip = false,
}: {
  className?: string
  fill?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <path
        d="M0 40C180 8 360 8 540 32c180 24 360 40 540 24s180-40 360-40v80H0Z"
        fill={fill}
      />
    </svg>
  )
}

// Torn-paper style divider.
export function TornDivider({
  className,
  fill = 'var(--cream)',
}: {
  className?: string
  fill?: string
}) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 18l40-6 36 10 46-12 40 8 44-10 40 12 46-8 40 6 44-12 40 10 46-6 40 10 44-12 40 8 46-10 40 12 44-8 40 6 46-12 40 10 44-6 40 10 46-12 40 8 44-10 40 12 46-8 40 6 44-12 40 10 46-6 40 8V40H0Z"
        fill={fill}
      />
    </svg>
  )
}
