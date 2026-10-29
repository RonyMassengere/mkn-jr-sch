import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const admissionsTable = pgTable('admissions', {
  id: serial('id').primaryKey(),
  studentFirstName: text('studentFirstName').notNull(),
  studentLastName: text('studentLastName').notNull(),
  dateOfBirth: text('dateOfBirth').notNull(),
  gender: text('gender').notNull(),
  gradeApplyingFor: text('gradeApplyingFor').notNull(),
  previousSchool: text('previousSchool'),
  parentName: text('parentName').notNull(),
  relationship: text('relationship').notNull(),
  phoneNumber: text('phoneNumber').notNull(),
  email: text('email').notNull(),
  residentialAddress: text('residentialAddress').notNull(),
  medicalNotes: text('medicalNotes'),
  status: text('status').notNull().default('Pending'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
})
