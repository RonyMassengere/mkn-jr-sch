'use client'

import { useActionState, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  UserRound,
  Users,
} from 'lucide-react'
import { submitApplication, type ApplicationFormState } from '@/app/actions/submit-application'

const initialState: ApplicationFormState = {
  success: false,
  message: '',
  fieldErrors: {},
}

type FormValues = {
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
}

const initialFormValues: FormValues = {
  studentFirstName: '',
  studentLastName: '',
  dateOfBirth: '',
  gender: '',
  gradeApplyingFor: '',
  previousSchool: '',
  parentName: '',
  relationship: '',
  phoneNumber: '',
  email: '',
  residentialAddress: '',
  medicalNotes: '',
}

const steps = [
  { id: 'student', label: 'Student Information', icon: BookOpenText },
  { id: 'parent', label: 'Parent Contacts', icon: GraduationCap },
  { id: 'review', label: 'Review & Submit', icon: ClipboardCheck },
]

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange,
  children,
  minLength,
  maxLength,
  pattern,
  inputMode,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  children?: React.ReactNode
  minLength?: number
  maxLength?: number
  pattern?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const inputClasses =
    'mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30'

  return (
    <label className="block text-sm font-700 text-foreground">
      {label} {required && <span className="text-accent">*</span>}
      {children ? (
        <div className="mt-2">{children}</div>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${inputClasses} ${error ? 'border-red-300 bg-red-50' : ''}`}
        />
      )}
      {error && (
        <span id={`${name}-error`} className="mt-1 block text-xs font-600 text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}

export function AdmissionsForm() {
  const [state, formAction, isPending] = useActionState(submitApplication, initialState)
  const [currentStep, setCurrentStep] = useState(0)
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [localErrors, setLocalErrors] = useState<Partial<Record<string, string>>>({})

  const currentStepTitle = steps[currentStep].label
  const currentStepIcon = steps[currentStep].icon
  const ActiveWizardIcon = currentStep === steps.length - 1 ? ClipboardCheck : currentStepIcon
  const progressPercent = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep])

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
    setLocalErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateCurrentStep = () => {
    const nextErrors: Partial<Record<string, string>> = {}

    if (currentStep === 0) {
      if (!formValues.studentFirstName.trim() || formValues.studentFirstName.trim().length < 2) {
        nextErrors.studentFirstName = 'Student first name must be at least 2 characters.'
      }
      if (!formValues.studentLastName.trim() || formValues.studentLastName.trim().length < 2) {
        nextErrors.studentLastName = 'Student last name must be at least 2 characters.'
      }
      if (!formValues.dateOfBirth) {
        nextErrors.dateOfBirth = 'Date of birth is required.'
      } else {
        const dob = new Date(formValues.dateOfBirth)
        if (Number.isNaN(dob.getTime()) || dob > new Date()) {
          nextErrors.dateOfBirth = 'Date of birth must be valid and cannot be in the future.'
        }
      }
      if (!formValues.gender) nextErrors.gender = 'Please select the student’s gender.'
      if (!formValues.gradeApplyingFor) nextErrors.gradeApplyingFor = 'Please select the grade.'
    }

    if (currentStep === 1) {
      if (!formValues.parentName.trim() || formValues.parentName.trim().length < 2) {
        nextErrors.parentName = 'Parent or guardian name is required.'
      }
      if (!formValues.relationship.trim() || formValues.relationship.trim().length < 2) {
        nextErrors.relationship = 'Please tell us your relationship.'
      }
      if (!formValues.phoneNumber.trim() || !/^\+?[0-9\s-]{7,15}$/.test(formValues.phoneNumber.trim())) {
        nextErrors.phoneNumber = 'Please enter a valid phone number.'
      }
      if (!formValues.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
        nextErrors.email = 'Please enter a valid email address.'
      }
      if (!formValues.residentialAddress.trim() || formValues.residentialAddress.trim().length < 8) {
        nextErrors.residentialAddress = 'Please enter a complete residential address.'
      }
    }

    setLocalErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goToNextStep = () => {
    if (!validateCurrentStep()) return
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-6">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <UserRound className="size-4" />
            <h3 className="font-display text-xl font-800">Student Information</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Student first name"
              name="studentFirstName"
              placeholder="e.g. Sarah"
              required
              minLength={2}
              maxLength={80}
              value={formValues.studentFirstName}
              onChange={(event) => updateField('studentFirstName', event.target.value)}
              error={localErrors.studentFirstName ?? state.fieldErrors?.studentFirstName}
            />
            <Field
              label="Student last name"
              name="studentLastName"
              placeholder="e.g. Nakiganda"
              required
              minLength={2}
              maxLength={80}
              value={formValues.studentLastName}
              onChange={(event) => updateField('studentLastName', event.target.value)}
              error={localErrors.studentLastName ?? state.fieldErrors?.studentLastName}
            />
            <Field
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              required
              value={formValues.dateOfBirth}
              onChange={(event) => updateField('dateOfBirth', event.target.value)}
              error={localErrors.dateOfBirth ?? state.fieldErrors?.dateOfBirth}
            />
            <label className="block text-sm font-700 text-foreground">
              Gender <span className="text-accent">*</span>
              <select
                name="gender"
                required
                value={formValues.gender}
                onChange={(event) => updateField('gender', event.target.value)}
                aria-invalid={Boolean(localErrors.gender ?? state.fieldErrors?.gender)}
                className={`mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30 ${localErrors.gender || state.fieldErrors?.gender ? 'border-red-300 bg-red-50' : ''}`}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {(localErrors.gender ?? state.fieldErrors?.gender) && (
                <span className="mt-1 block text-xs font-600 text-red-600">
                  {localErrors.gender ?? state.fieldErrors?.gender}
                </span>
              )}
            </label>
            <label className="block text-sm font-700 text-foreground">
              Grade applying for <span className="text-accent">*</span>
              <select
                name="gradeApplyingFor"
                required
                value={formValues.gradeApplyingFor}
                onChange={(event) => updateField('gradeApplyingFor', event.target.value)}
                aria-invalid={Boolean(localErrors.gradeApplyingFor ?? state.fieldErrors?.gradeApplyingFor)}
                className={`mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30 ${localErrors.gradeApplyingFor || state.fieldErrors?.gradeApplyingFor ? 'border-red-300 bg-red-50' : ''}`}
              >
                <option value="">Select grade</option>
                <option value="Baby Class">Baby Class</option>
                <option value="Nursery">Nursery</option>
                <option value="Primary 1">Primary 1</option>
                <option value="Primary 2">Primary 2</option>
                <option value="Primary 3">Primary 3</option>
                <option value="Primary 4">Primary 4</option>
                <option value="Primary 5">Primary 5</option>
                <option value="Primary 6">Primary 6</option>
                <option value="Primary 7">Primary 7</option>
              </select>
              {(localErrors.gradeApplyingFor ?? state.fieldErrors?.gradeApplyingFor) && (
                <span className="mt-1 block text-xs font-600 text-red-600">
                  {localErrors.gradeApplyingFor ?? state.fieldErrors?.gradeApplyingFor}
                </span>
              )}
            </label>
            <Field
              label="Previous school"
              name="previousSchool"
              placeholder="Optional if this is the first school"
              value={formValues.previousSchool}
              onChange={(event) => updateField('previousSchool', event.target.value)}
              error={localErrors.previousSchool ?? state.fieldErrors?.previousSchool}
            />
          </div>
        </div>
      )
    }

    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Users className="size-4" />
            <h3 className="font-display text-xl font-800">Parent or Guardian Contact</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Parent or guardian name"
              name="parentName"
              placeholder="e.g. Joseph Nakiganda"
              required
              minLength={2}
              maxLength={120}
              value={formValues.parentName}
              onChange={(event) => updateField('parentName', event.target.value)}
              error={localErrors.parentName ?? state.fieldErrors?.parentName}
            />
            <Field
              label="Relationship to student"
              name="relationship"
              placeholder="e.g. Father"
              required
              minLength={2}
              maxLength={50}
              value={formValues.relationship}
              onChange={(event) => updateField('relationship', event.target.value)}
              error={localErrors.relationship ?? state.fieldErrors?.relationship}
            />
            <Field
              label="Phone number"
              name="phoneNumber"
              type="tel"
              placeholder="e.g. 0772 123 456"
              required
              minLength={7}
              maxLength={15}
              pattern="[0-9+()\s-]+"
              inputMode="tel"
              value={formValues.phoneNumber}
              onChange={(event) => updateField('phoneNumber', event.target.value)}
              error={localErrors.phoneNumber ?? state.fieldErrors?.phoneNumber}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="e.g. parent@example.com"
              required
              maxLength={120}
              value={formValues.email}
              onChange={(event) => updateField('email', event.target.value.toLowerCase())}
              error={localErrors.email ?? state.fieldErrors?.email}
            />
            <div className="md:col-span-2">
              <Field
                label="Residential address"
                name="residentialAddress"
                placeholder="Street, village, district"
                required
                minLength={8}
                maxLength={250}
                value={formValues.residentialAddress}
                onChange={(event) => updateField('residentialAddress', event.target.value)}
                error={localErrors.residentialAddress ?? state.fieldErrors?.residentialAddress}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="mb-4 flex items-center gap-2 text-primary">
          <FileText className="size-4" />
          <h3 className="font-display text-xl font-800">Review & Submit</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-xs font-700 uppercase tracking-[0.18em] text-accent">Student</p>
            <div className="mt-3 space-y-2 text-sm text-foreground">
              <p><span className="font-700">Name:</span> {formValues.studentFirstName || '—'} {formValues.studentLastName || ''}</p>
              <p><span className="font-700">Date of birth:</span> {formValues.dateOfBirth || '—'}</p>
              <p><span className="font-700">Gender:</span> {formValues.gender || '—'}</p>
              <p><span className="font-700">Grade:</span> {formValues.gradeApplyingFor || '—'}</p>
              <p><span className="font-700">Previous school:</span> {formValues.previousSchool || 'Not provided'}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/30 p-4">
            <p className="text-xs font-700 uppercase tracking-[0.18em] text-accent">Parent</p>
            <div className="mt-3 space-y-2 text-sm text-foreground">
              <p><span className="font-700">Name:</span> {formValues.parentName || '—'}</p>
              <p><span className="font-700">Relationship:</span> {formValues.relationship || '—'}</p>
              <p><span className="font-700">Phone:</span> {formValues.phoneNumber || '—'}</p>
              <p><span className="font-700">Email:</span> {formValues.email || '—'}</p>
              <p><span className="font-700">Address:</span> {formValues.residentialAddress || '—'}</p>
            </div>
          </div>
        </div>

        <label className="block text-sm font-700 text-foreground">
          Additional details
          <textarea
            name="medicalNotes"
            rows={5}
            maxLength={500}
            value={formValues.medicalNotes}
            onChange={(event) => updateField('medicalNotes', event.target.value)}
            placeholder="Optional: allergies, medical conditions, learning support needs, or anything we should know to support your child well."
            className="mt-2 w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </label>
      </div>
    )
  }

  if (state.success) {
    return (
      <div className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary shadow-[0_12px_30px_-18px_rgba(48,63,159,0.5)]">
          <GraduationCap className="size-8 transition-transform duration-300 hover:scale-105" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-800 text-primary">Application received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{state.message}</p>
        {state.applicationId ? (
          <p className="mt-4 text-xs font-700 uppercase tracking-[0.18em] text-accent">
            Reference no: {state.applicationId}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(48,63,159,0.35)] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary shadow-[0_12px_30px_-18px_rgba(48,63,159,0.5)]">
          <ActiveWizardIcon className="size-5" />
        </span>
        <div>
          <p className="font-display text-xs font-700 uppercase tracking-[0.18em] text-accent">Admissions</p>
          <h2 className="font-display text-2xl font-800 text-primary">Application form</h2>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-xs font-700 uppercase tracking-[0.18em] text-accent">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{currentStepTitle}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isComplete = index < currentStep
            const StepStateIcon = isComplete ? CheckCircle2 : Icon

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-primary/40 bg-primary/5 text-primary shadow-[0_10px_25px_-18px_rgba(48,63,159,0.55)]'
                    : isComplete
                      ? 'border-accent/40 bg-accent/5 text-accent'
                      : 'border-border bg-background text-muted-foreground'
                }`}
              >
                <span
                  className={`grid size-9 place-items-center rounded-xl transition-all duration-300 ${
                    isActive || isComplete ? 'scale-105 bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <StepStateIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-700 uppercase tracking-[0.16em] text-current/80">Step {index + 1}</p>
                  <p className="truncate text-sm font-700 text-current">{step.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {state.message && !state.success && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-600 text-red-700">
          {state.message}
        </div>
      )}

      <div className="mt-8">
        {renderStepContent()}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">We will contact you after reviewing your application.</p>

        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-700 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-800 text-accent-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02]"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-800 text-accent-foreground shadow-sm transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? 'Submitting...' : 'Submit Application Form'}
              {!isPending && <ArrowRight className="size-4" />}
            </button>
          )}
        </div>
      </div>

      <input type="hidden" name="studentFirstName" value={formValues.studentFirstName} />
      <input type="hidden" name="studentLastName" value={formValues.studentLastName} />
      <input type="hidden" name="dateOfBirth" value={formValues.dateOfBirth} />
      <input type="hidden" name="gender" value={formValues.gender} />
      <input type="hidden" name="gradeApplyingFor" value={formValues.gradeApplyingFor} />
      <input type="hidden" name="previousSchool" value={formValues.previousSchool} />
      <input type="hidden" name="parentName" value={formValues.parentName} />
      <input type="hidden" name="relationship" value={formValues.relationship} />
      <input type="hidden" name="phoneNumber" value={formValues.phoneNumber} />
      <input type="hidden" name="email" value={formValues.email} />
      <input type="hidden" name="residentialAddress" value={formValues.residentialAddress} />
      <input type="hidden" name="medicalNotes" value={formValues.medicalNotes} />
    </form>
  )
}
