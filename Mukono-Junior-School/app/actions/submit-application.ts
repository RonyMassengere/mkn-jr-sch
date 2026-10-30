'use server'

import { Resend } from 'resend'
import { db } from '@/db'
import { admissionsTable } from '@/db/schema'
import { site } from '@/lib/site'

export type ApplicationFormState = {
  success: boolean
  message: string
  applicationId?: number
  fieldErrors?: Partial<Record<string, string>>
}

const normalizeText = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : ''

const cleanPhoneNumber = (value: string) => value.replace(/[^+\d]/g, '').trim()

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character] ?? character
  })

const formatDisplayDate = (value: string) => {
  if (!value) return 'Not provided'

  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function getOfficeEmail() {
  return process.env.ADMISSIONS_OFFICE_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim() || site.email
}

function getFromEmail() {
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim()

  if (!fromEmail) {
    throw new Error('RESEND_FROM_EMAIL is missing. Configure a verified sender address in Resend.')
  }

  return fromEmail
}

function buildStyledEmailTemplate({
  title,
  intro,
  highlight,
  rows,
  footerLabel,
}: {
  title: string
  intro: string
  highlight: string
  rows: Array<{ label: string; value: string }>
  footerLabel: string
}) {
  const rowsMarkup = rows
    .map(
      (row) => `
        <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8ebff; font-size: 13px; color: #303f9f; font-weight: 700; width: 180px; vertical-align: top;">${escapeHtml(row.label)}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e8ebff; font-size: 13px; color: #171717; line-height: 1.6; vertical-align: top;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join('')

  return `
    <div style="margin: 0; padding: 0; background-color: #f3f4ff; font-family: Arial, Helvetica, sans-serif; color: #171717;">
      <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d9dcf2; border-radius: 18px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #303f9f 0%, #c91f2b 100%); padding: 24px 28px; color: #ffffff;">
          <div style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; opacity: 0.9;">Mukono Junior School</div>
          <h1 style="margin: 10px 0 0; font-size: 28px; line-height: 1.2; color: #ffffff;">${escapeHtml(title)}</h1>
        </div>

        <div style="padding: 24px 28px; background-color: #ffffff;">
          <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.7; color: #171717;">${escapeHtml(intro)}</p>
          <div style="padding: 14px 16px; background-color: #fffbea; border-left: 4px solid #f7e600; border-radius: 10px; margin-bottom: 18px;">
            <strong style="font-size: 14px; color: #303f9f;">${escapeHtml(highlight)}</strong>
          </div>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #e8ebff; border-radius: 12px; overflow: hidden;">
            <tbody>
              ${rowsMarkup}
            </tbody>
          </table>
        </div>

        <div style="padding: 20px 28px 28px; background-color: #f7f8ff; border-top: 1px solid #e8ebff;">
          <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #555b72;">${escapeHtml(footerLabel)}</p>
          <p style="margin: 10px 0 0; font-size: 14px; font-weight: 700; color: #303f9f;">Mukono Junior School</p>
        </div>
      </div>
    </div>
  `
}

async function sendApplicationEmails(payload: {
  studentFirstName: string
  studentLastName: string
  dateOfBirth: string
  gender: string
  gradeApplyingFor: string
  previousSchool: string
  parentName: string
  relationship: string
  phoneNumber: string
  email: string
  residentialAddress: string
  medicalNotes: string
  applicationId?: number
}) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured.')
  }

  const resend = new Resend(resendApiKey)
  const officeEmail = getOfficeEmail()
  const fromEmail = getFromEmail()
  const studentName = `${payload.studentFirstName} ${payload.studentLastName}`
    .replace(/[\r\n]/g, ' ')
    .slice(0, 164)

  const officeHtml = buildStyledEmailTemplate({
    title: 'Admissions Application Received',
    intro: 'A new student admissions application has been received and is ready for review by the school office.',
    highlight: `Application reference: ${payload.applicationId ?? 'Pending review'}`,
    rows: [
      { label: 'Student Name', value: studentName },
      { label: 'Date of Birth', value: formatDisplayDate(payload.dateOfBirth) },
      { label: 'Gender', value: payload.gender },
      { label: 'Grade Applying For', value: payload.gradeApplyingFor },
      { label: 'Previous School', value: payload.previousSchool || 'Not provided' },
      { label: 'Parent / Guardian', value: `${payload.parentName} (${payload.relationship})` },
      { label: 'Phone Number', value: payload.phoneNumber },
      { label: 'Email', value: payload.email },
      { label: 'Residential Address', value: payload.residentialAddress },
      { label: 'Medical Notes', value: payload.medicalNotes || 'No additional notes provided' },
    ],
    footerLabel: 'Please contact the parent or guardian directly to confirm the next steps, campus tour schedule, and enrollment documentation.',
  })

  const parentHtml = buildStyledEmailTemplate({
    title: 'Thank You for Applying',
    intro: `Dear ${payload.parentName}, thank you for submitting an application for ${studentName}. Our admissions team has received your form and will review it shortly.`,
    highlight: 'Next steps will be shared with you after the admissions review.',
    rows: [
      { label: 'Student Name', value: studentName },
      { label: 'Grade Applying For', value: payload.gradeApplyingFor },
      { label: 'Parent / Guardian', value: payload.parentName },
      { label: 'Phone Number', value: payload.phoneNumber },
      { label: 'Email Address', value: payload.email },
      { label: 'Residential Address', value: payload.residentialAddress },
    ],
    footerLabel: 'We look forward to welcoming your family to Mukono Junior School. Please keep an eye on your email for the next admissions update or school tour follow-up.',
  })

  const officePromise = resend.emails.send({
    from: fromEmail,
    to: [officeEmail],
    subject: `New admissions application: ${studentName}`,
    html: officeHtml,
  })

  const parentPromise = resend.emails.send({
    from: fromEmail,
    to: [payload.email],
    subject: 'Application received - Mukono Junior School',
    html: parentHtml,
  })

  const [officeResult, parentResult] = await Promise.allSettled([officePromise, parentPromise])

  if (officeResult.status === 'rejected') {
    console.error('Failed to send the school admissions notification email.', officeResult.reason)
    throw new Error('Failed to send school office notification.')
  }
  if (officeResult.value.error) {
    console.error('Resend rejected the school admissions notification email.', officeResult.value.error)
    throw new Error('Failed to send school office notification.')
  }

  if (parentResult.status === 'rejected') {
    console.error('Failed to send the parent admissions confirmation email.', parentResult.reason)
    throw new Error('Failed to send parent confirmation email.')
  }
  if (parentResult.value.error) {
    console.error('Resend rejected the parent admissions confirmation email.', parentResult.value.error)
    throw new Error('Failed to send parent confirmation email.')
  }

  return { officeResult, parentResult }
}

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const studentFirstName = normalizeText(formData.get('studentFirstName'))
  const studentLastName = normalizeText(formData.get('studentLastName'))
  const dateOfBirth = normalizeText(formData.get('dateOfBirth'))
  const gender = normalizeText(formData.get('gender'))
  const gradeApplyingFor = normalizeText(formData.get('gradeApplyingFor'))
  const previousSchool = normalizeText(formData.get('previousSchool'))
  const parentName = normalizeText(formData.get('parentName'))
  const relationship = normalizeText(formData.get('relationship'))
  const phoneNumber = cleanPhoneNumber(normalizeText(formData.get('phoneNumber')))
  const email = normalizeText(formData.get('email')).toLowerCase()
  const residentialAddress = normalizeText(formData.get('residentialAddress'))
  const medicalNotes = normalizeText(formData.get('medicalNotes'))

  const fieldErrors: Partial<Record<string, string>> = {}
  const validGenders = new Set(['Female', 'Male', 'Prefer not to say'])
  const validGrades = new Set([
    'Baby Class',
    'Nursery',
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'Primary 7',
  ])

  if (!studentFirstName || studentFirstName.length < 2) {
    fieldErrors.studentFirstName = 'Student first name must be at least 2 characters.'
  }
  if (!studentLastName || studentLastName.length < 2) {
    fieldErrors.studentLastName = 'Student last name must be at least 2 characters.'
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    fieldErrors.dateOfBirth = 'Date of birth is required.'
  } else {
    const dob = new Date(`${dateOfBirth}T00:00:00.000Z`)
    const [year, month, day] = dateOfBirth.split('-').map(Number)
    const hasValidCalendarDate =
      dob.getUTCFullYear() === year &&
      dob.getUTCMonth() + 1 === month &&
      dob.getUTCDate() === day

    if (!hasValidCalendarDate || dateOfBirth > new Date().toISOString().slice(0, 10)) {
      fieldErrors.dateOfBirth = 'Date of birth must be valid and cannot be in the future.'
    }
  }
  if (!validGenders.has(gender)) fieldErrors.gender = 'Please select the student’s gender.'
  if (!validGrades.has(gradeApplyingFor)) {
    fieldErrors.gradeApplyingFor = 'Please select the class your child is applying for.'
  }
  if (!parentName || parentName.length < 2) {
    fieldErrors.parentName = 'Parent or guardian name is required.'
  }
  if (!relationship || relationship.length < 2) {
    fieldErrors.relationship = 'Please tell us your relationship to the student.'
  }
  if (!/^\+?\d{7,15}$/.test(phoneNumber)) {
    fieldErrors.phoneNumber = 'Please enter a valid phone number.'
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  }
  if (!residentialAddress || residentialAddress.length < 8) {
    fieldErrors.residentialAddress = 'Please enter a complete residential address.'
  }
  if (studentFirstName.length > 80) fieldErrors.studentFirstName = 'Student first name is too long.'
  if (studentLastName.length > 80) fieldErrors.studentLastName = 'Student last name is too long.'
  if (previousSchool.length > 120) fieldErrors.previousSchool = 'Previous school must be 120 characters or fewer.'
  if (parentName.length > 120) fieldErrors.parentName = 'Parent or guardian name must be 120 characters or fewer.'
  if (relationship.length > 50) fieldErrors.relationship = 'Relationship must be 50 characters or fewer.'
  if (residentialAddress.length > 250) fieldErrors.residentialAddress = 'Address must be 250 characters or fewer.'
  if (medicalNotes.length > 2000) fieldErrors.medicalNotes = 'Additional notes must be 2,000 characters or fewer.'

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: 'Please review the highlighted fields and submit again.',
      fieldErrors,
    }
  }

  try {
    const result = await db
      .insert(admissionsTable)
      .values({
        studentFirstName,
        studentLastName,
        dateOfBirth,
        gender,
        gradeApplyingFor,
        previousSchool: previousSchool || null,
        parentName,
        relationship,
        phoneNumber,
        email,
        residentialAddress,
        medicalNotes: medicalNotes || null,
      })
      .returning({
        id: admissionsTable.id,
      })

    const applicationId = result[0]?.id
    if (typeof applicationId !== 'number') {
      throw new Error('Admissions application was saved without a returned reference number.')
    }

    try {
      await sendApplicationEmails({
        studentFirstName,
        studentLastName,
        dateOfBirth,
        gender,
        gradeApplyingFor,
        previousSchool,
        parentName,
        relationship,
        phoneNumber,
        email,
        residentialAddress,
        medicalNotes,
        applicationId,
      })
    } catch (emailError) {
      console.error('Failed to send admissions emails:', emailError)
      return {
        success: false,
        message:
          'Your application was saved, but automated email notifications could not be sent. Please contact the school office and share this reference; you do not need to submit the form again.',
        applicationId,
      }
    }

    return {
      success: true,
      message: `Thank you, ${studentFirstName}. Your application has been submitted successfully and is now pending review.`,
      applicationId,
    }
  } catch (error) {
    console.error('Failed to submit admissions application:', error)

    return {
      success: false,
      message: 'We could not submit your application right now. Please try again in a moment or contact the school office directly.',
    }
  }
}
