import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { mainAdmin } from '../data/agents'
import { validateRegistration, type Errors } from '../utils/validation'
import { adminWaUrl, registrationMessage, type RegistrationValues } from '../utils/whatsapp'
import { formatPhone } from '../utils/phone'
import { btnPrimary, btnSecondary, btnWhatsApp, Notice, TextField } from './ui'

const empty: RegistrationValues = {
  fullName: '',
  studentId: '',
  age: '',
  institution: '',
  currentLocation: '',
  hometown: '',
  preferredLocation: '',
  phone: '',
}

const order: (keyof RegistrationValues)[] = [
  'fullName',
  'studentId',
  'age',
  'institution',
  'currentLocation',
  'hometown',
  'preferredLocation',
  'phone',
]

/**
 * Nothing is stored by this site: details exist only in this browser tab, and are
 * placed into a WhatsApp message that the student reviews and sends themselves.
 */
export default function StudentRegistrationForm() {
  const [values, setValues] = useState<RegistrationValues>(empty)
  const [errors, setErrors] = useState<Errors<RegistrationValues>>({})
  const [waLink, setWaLink] = useState<string | null>(null)

  const set = (k: keyof RegistrationValues) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
    setWaLink(null)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateRegistration(values)
    setErrors(errs)
    const firstBad = order.find((k) => errs[k])
    if (firstBad) {
      setWaLink(null)
      document.getElementById(`reg-${firstBad}`)?.focus()
      return
    }
    const url = adminWaUrl(registrationMessage(values))
    setWaLink(url)
    // Opening WhatsApp is NOT sending. The student must press Send in WhatsApp.
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="reg-title" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 id="reg-title" className="text-2xl font-bold text-brand-900">
        Student registration
      </h2>
      <p className="mt-2 text-sm text-slate-700">
        Fill in the details below. When you press the button, WhatsApp opens with your message ready for{' '}
        {mainAdmin.name} ({formatPhone(mainAdmin.phoneLocal)}). You review it and press Send yourself.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        <strong>Why we ask:</strong> so the team can recognise you as a student, understand where you are now and where
        you would like to stay, and reach you about suitable hostels. Your details are not shown publicly and are not
        saved on this website.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField id="reg-fullName" label="Full Name" required value={values.fullName} onChange={set('fullName')} error={errors.fullName} autoComplete="name" />
        <TextField
          id="reg-studentId"
          label="Student ID"
          required
          value={values.studentId}
          onChange={set('studentId')}
          error={errors.studentId}
          hint="Letters, numbers and leading zeros are kept exactly as typed."
          autoComplete="off"
        />
        <TextField id="reg-age" label="Age" required value={values.age} onChange={set('age')} error={errors.age} inputMode="numeric" placeholder="e.g. 21" />
        <TextField id="reg-institution" label="Current Institution" required value={values.institution} onChange={set('institution')} error={errors.institution} placeholder="e.g. UPSA" />
        <TextField id="reg-currentLocation" label="Current Location" required value={values.currentLocation} onChange={set('currentLocation')} error={errors.currentLocation} hint="Where you are staying right now." />
        <TextField id="reg-hometown" label="Hometown / Place of Origin" required value={values.hometown} onChange={set('hometown')} error={errors.hometown} />
        <TextField id="reg-preferredLocation" label="Preferred Hostel Location" required value={values.preferredLocation} onChange={set('preferredLocation')} error={errors.preferredLocation} placeholder="e.g. Madina" />
        <TextField
          id="reg-phone"
          label="Phone Number"
          required
          value={values.phone}
          onChange={set('phone')}
          error={errors.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. 024 123 4567"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className={btnWhatsApp}>
          Prepare my registration in WhatsApp
        </button>
        <Link to="/hostels" className={btnSecondary}>
          Skip and browse hostels
        </Link>
      </div>

      {waLink && (
        <div className="mt-6 space-y-3" aria-live="polite">
          <Notice tone="info" title="Next step">
            Your registration message is ready in WhatsApp. Please review the details and press Send. After sending,
            return to HostelLink Ghana to explore available hostel listings.
          </Notice>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/hostels" className={btnPrimary}>
              Continue to Find a Hostel
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              WhatsApp did not open? Open it again
            </a>
          </div>
          <p className="text-xs text-slate-600">
            Nothing has been sent yet. Registration is complete only after you press Send in WhatsApp and the team
            receives it.
          </p>
        </div>
      )}
    </form>
  )
}
