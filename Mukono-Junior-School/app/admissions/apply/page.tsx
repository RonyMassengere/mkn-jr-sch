import type { Metadata } from 'next'
import { AdmissionsForm } from '@/components/admissions-form'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Apply for Admission',
  description:
    'Submit a student application to Mukono Junior School and begin the enrollment journey with confidence.',
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Begin your child’s journey with Mukono Junior School"
        description="We are delighted to support your family through a clear, warm, and guided enrollment process. Please complete the form carefully so our admissions team can respond to your application promptly."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <AdmissionsForm />
      </section>
    </>
  )
}
