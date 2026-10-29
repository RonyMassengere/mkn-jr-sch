// PLACEHOLDER-FRIENDLY site config. School staff can update these values
// (contact details, tagline, nav) in one place without touching page code.

export const site = {
  name: 'Mukono Junior School',
  shortName: 'MJS',
  tagline: 'Learning with heart, growing with pride',
  description:
    'Mukono Junior School is a primary school in Mukono, Uganda, fostering academic excellence, self-discipline, mutual respect, and community service from Baby Class through P.7.',
  // TODO: replace with the real deployed domain before launch.
  url: 'https://mukono-junior-school.example',
  location: 'Takkajunge, Mukono, Uganda',
  poBox: 'P.O. Box 349, Mukono',
  email: 'mukonojunior@gmail.com',
  phones: ['0701 651 477', '0776 484 612'],
  // Replace the profile URLs below with the school's official accounts.
  socials: {
    whatsapp: 'https://wa.me/256701651477',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
    instagram: 'https://www.instagram.com/',
  },
  // Formspree endpoint — replace "yourFormId" with the school's real form ID.
  // Create a free form at https://formspree.io and paste the endpoint here.
  formspreeEndpoint: 'https://formspree.io/f/xwlkjgvy',
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Parents Hub', href: '/parents-hub' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Staff', href: '/staff' },
  {
    label: 'News',
    href: '/news',
    items: [
      { label: 'Events', href: '/news/events' },
      { label: 'School Facilities', href: '/news/facilities' },
    ],
  },
  { label: 'Contact', href: '/contact' },
] as const
