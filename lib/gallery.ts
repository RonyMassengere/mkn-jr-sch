// Gallery photos grouped by category to make browsing easier on mobile and desktop.

export type GalleryPhoto = {
  src: string
  title: string
  alt: string
}

export type GalleryCategory = {
  id: string
  label: string
  description: string
  photos: GalleryPhoto[]
}

const basePhotos = {
  graduation: [
    { src: '/images/gallery/graduation/graduation.jpeg', title: 'Graduation Day', alt: 'Pupils celebrating graduation at school' },
    { src: '/images/gallery/graduation/graduation2.jpeg', title: 'Teachers leading graduates', alt: 'School graduation moment with children smiling' },
    { src: '/images/gallery/graduation/graduation3.jpeg', title: 'Proud Graduates', alt: 'Graduating pupils posing proudly' },
    { src: '/images/gallery/graduation/graduation4.jpeg', title: 'Graduation cards displayed.', alt: 'School ceremony and award presentation' },
    { src: '/images/gallery/graduation/graduation5.jpeg', title: 'Honoring graduate achievements', alt: 'Pupils celebrating a special school ceremony' },
    { src: '/images/gallery/graduation/gradduation6.jpeg', title: 'Ceremonial cake cutting', alt: 'School celebration with children and families' },
  ],
  talent: [
    { src: '/images/gallery/talentMDD/talentMDD1.jpeg', title: 'Talent Showcase', alt: 'Pupils performing at a talent showcase' },
    { src: '/images/gallery/talentMDD/talentMDD2.jpeg', title: 'Cultural Performance', alt: 'Students enjoying a music performance' },
    { src: '/images/gallery/talentMDD/talentMDD3.jpeg', title: 'Drama and Performance', alt: 'Pupils dancing in a school event' },
    { src: '/images/gallery/talentMDD/talentMDD4.jpeg', title: 'Drama and Expression', alt: 'Students presenting a drama performance' },
    { src: '/images/gallery/talentMDD/talentMDD5.jpeg', title: 'Modeling', alt: 'Pupils taking part in creative arts' },
    { src: '/images/gallery/talentMDD/talentMDD6.jpeg', title: 'Casual Performance', alt: 'Talent event with enthusiastic audience and performers' },
  ],
  staff: [
    { src: '/images/gallery/staff_gallery/staff_memebers1.jpeg', title: 'Teacher Mentorship', alt: 'Teacher guiding pupils in a classroom' },
    { src: '/images/gallery/staff_gallery/staff_memebers2.jpeg', title: 'Staff graduation address', alt: 'Teachers standing together at school' },
    { src: '/images/gallery/staff_gallery/staff_memebers3.jpeg', title: 'Learning Support', alt: 'School staff supporting students in class' },
    { src: '/images/gallery/staff_gallery/staff_memebers4.jpeg', title: 'Guiding Hands', alt: 'Teachers helping children understand lessons' },
    { src: '/images/gallery/staff_gallery/staff_memebers5.jpeg', title: 'Caring Educators', alt: 'Teachers interacting with young pupils' },
    { src: '/images/gallery/staff_gallery/staff_memebers6.jpeg', title: 'Dedicated Team', alt: 'Teachers and staff at Mukono Junior School' },
  ],
  infrastructure: [
    { src: '/images/gallery/school_facilities/school_facilities1.jpeg', title: 'School Buildings', alt: 'Main school buildings and campus' },
    { src: '/images/gallery/school_facilities/school_facilities4.jpeg', title: 'School Grounds', alt: 'Open campus grounds and school environment' },
    { src: '/images/gallery/school_facilities/school_facilities2.jpeg', title: 'School Clinic', alt: 'School clinic and health support area' },
    { src: '/images/gallery/school_facilities/school_facilities3.jpeg', title: 'School Van', alt: 'School van transporting pupils' },
    { src: '/images/gallery/school_facilities/school_facilities5.jpeg', title: 'Campus Grounds', alt: 'School facilities and outdoor learning area' },
    { src: '/images/gallery/school_facilities/school_facilities6.jpeg', title: 'Learning Spaces', alt: 'School environment designed for learning' },
  ],
  activities: [
    { src: '/images/gallery/co-activities/co-activities1.jpeg', title: 'Sports Time', alt: 'Pupils taking part in sports and physical activities' },
    { src: '/images/gallery/co-activities/co-activities2.jpeg', title: 'Science Activity', alt: 'Learners conducting a practical science activity' },
    { src: '/images/gallery/co-activities/co-activities5.jpeg', title: 'Club Time', alt: 'Pupils in a co-curricular club activity' },
    { src: '/images/hero/hero1.jpeg', title: 'Active Learning', alt: 'Children participating in engaging classroom activities' },
    { src: '/images/gallery/co-activities/co-activities3.jpeg', title: 'School Fun', alt: 'Pupils enjoying a co-curricular activity' },
    { src: '/images/gallery/co-activities/co-activities6.jpeg', title: 'Refreshing swim break', alt: 'Pupils developing teamwork and confidence' },
  ],
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'graduation',
    label: 'Graduation',
    description: 'Milestones, proud moments and celebratory school events.',
    photos: basePhotos.graduation,
  },
  {
    id: 'talent',
    label: 'Talent & MMD',
    description: 'Music, dance, drama and creative expression.',
    photos: basePhotos.talent,
  },
  {
    id: 'staff',
    label: 'Staff',
    description: 'The educators and caring adult team behind every learner.',
    photos: basePhotos.staff,
  },
  {
    id: 'infrastructure',
    label: 'School Infrastructure',
    description: 'Buildings, grounds, clinic, transport and learning spaces.',
    photos: basePhotos.infrastructure,
  },
  {
    id: 'activities',
    label: 'Co-Curricular',
    description: 'Pupils growing through sport, clubs and active learning.',
    photos: basePhotos.activities,
  },
]

export const galleryPhotos: GalleryPhoto[] = galleryCategories.flatMap((category) => category.photos)
