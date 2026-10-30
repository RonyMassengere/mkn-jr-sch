export type StaffMember = {
  name?: string
  role: string
  bio?: string
  image?: string
  secondaryImage?: string
  gender?: 'male' | 'female'
}

export const leadership: StaffMember[] = [
  {
    name: 'Katongole Nabil',
    role: 'Head Teacher',
    bio: 'Leads the school with a focus on academic excellence, discipline, and pupil wellbeing.',
    image: '/images/HM-main.jpg',
    secondaryImage: '/images/staff/HM.jpeg',
  },
  {
    name: 'Onyu Augstine',
    role: 'School Accountant',
    bio: 'Oversees school finances, budgeting, and financial planning.',
    image: '/images/staff/ACC.jpeg',
  },
  {
    role: 'School Directors',
    bio: 'Provide strategic leadership and long-term direction for Mukono Junior School.',
    image: '/images/staff/Directors2.jpg',
  },
]

export const prefectorialBody: StaffMember[] = [
  {
    name: 'School Prefectorial Body',
    role: 'Prefectorial Leadership',
    gender: 'male',
    image: '/images/staff/prefects.jpeg',
  },
]

export const maleTeachers: StaffMember[] = [
  {
    name: 'Classroom and subject teaching team',
    role: 'School Teaching Team',
    gender: 'male',
    image: '/images/staff/male_teachers.jpeg',
  },
]

export const femaleTeachers: StaffMember[] = [
  {
    name: 'Early years and classroom educators',
    role: 'School Teaching Team',
    gender: 'female',
    image: '/images/staff/female_teachers.jpeg',
  },
]

export function initials(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'MJS'

  const result = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')

  return result || 'MJS'
}
