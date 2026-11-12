import { useState, type FormEvent } from 'react'
import { mainAdmin } from '../data/agents'
import { periodLabels } from '../types'
import { formatPhone } from '../utils/phone'
import { validateListing, type Errors, type ListingValues } from '../utils/validation'
import { adminWaUrl } from '../utils/whatsapp'
import { btnWhatsApp, Notice, TextField, inputCls } from './ui'

const facilityOptions = ['Water supply', 'Electricity', 'Wi-Fi', 'Security', 'Kitchen', 'Study area', 'Laundry', 'Parking']

const empty: ListingValues = {
  hostelName: '',
  ownerName: '',
  contact: '',
  email: '',
  location: '',
  description: '',
  roomTypes: '',
  prices: '',
  paymentPeriod: '',
  facilities: [],
  otherFacilities: '',
  availability: '',
  preferredContact: '',
  consent: false,
}

const order: (keyof ListingValues)[] = [
  'hostelName', 'ownerName', 'contact', 'email', 'location', 'description',
  'roomTypes', 'prices', 'paymentPeriod', 'preferredContact', 'consent',
]

function listingMessage(v: ListingValues, photoNames: string[]): string {
  const facilities = [...v.facilities, v.otherFacilities.trim()].filter(Boolean).join(', ') || 'To be confirmed'
  return [
    'HOSTELLINK GHANA — NEW HOSTEL LISTING (PENDING REVIEW)',
    '',
    `Hostel Name: ${v.hostelName.trim()}`,
    `Owner / Representative: ${v.ownerName.trim()}`,
    `Contact Number: ${v.contact.trim()}`,
    `Email: ${v.email.trim() || 'Not provided'}`,
    `Location: ${v.location.trim()}`,
    `Description: ${v.description.trim()}`,
    `Room Types: ${v.roomTypes.trim()}`,
    `Prices: ${v.prices.trim()}`,
    `Payment Period: ${v.paymentPeriod}`,
    `Facilities: ${facilities}`,
    `Availability: ${v.availability.trim() || 'To be confirmed'}`,
    `Photos: ${photoNames.length ? `${photoNames.length} selected (${photoNames.join(', ')}) — will be sent in the chat` : 'To be sent in the chat'}`,
    `Preferred Contact Method: ${v.preferredContact}`,
    '',
    'I confirm I am authorised to provide this information.',
    'Status: Pending Review — not published or verified.',
  ].join('\n')
}

export default function HostelSubmissionForm() {
  const [v, setV] = useState<ListingValues>(empty)
  const [errors, setErrors] = useState<Errors<ListingValues>>({})
  const [photos, setPhotos] = useState<string[]>([])
  const [link, setLink] = useState<string | null>(null)

  const set = <K extends keyof ListingValues>(k: K) => (val: ListingValues[K]) => {
    setV((p) => ({ ...p, [k]: val }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
    setLink(null)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateListing(v)
    setErrors(errs)
    const bad = order.find((k) => errs[k])
    if (bad) {
      setLink(null)
      document.getElementById(`list-${bad}`)?.focus()
      return
    }
    const url = adminWaUrl(listingMessage(v, photos))
    setLink(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-label="Hostel submission form">
      <Notice tone="warn" title="Demonstration limits">
        This website has no database or admin dashboard yet, so your listing is <strong>not</strong> saved or published
        here. Pressing the button prepares a WhatsApp message to {mainAdmin.name} ({formatPhone(mainAdmin.phoneLocal)})
        for you to review and send. Any listing the team receives is marked <strong>Pending Review</strong> until its
        details have actually been checked. It is never automatically published or verified.
      </Notice>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="list-hostelName" label="Hostel name" required value={v.hostelName} onChange={set('hostelName')} error={errors.hostelName} />
        <TextField id="list-ownerName" label="Owner or authorised representative’s name" required value={v.ownerName} onChange={set('ownerName')} error={errors.ownerName} autoComplete="name" />
        <TextField id="list-contact" label="Contact number" required type="tel" inputMode="tel" value={v.contact} onChange={set('contact')} error={errors.contact} placeholder="e.g. 024 123 4567" autoComplete="tel" />
        <TextField id="list-email" label="Email" type="email" inputMode="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <div className="sm:col-span-2">
          <TextField id="list-location" label="Hostel location" required value={v.location} onChange={set('location')} error={errors.location} hint="Street, area and a nearby landmark if possible." />
        </div>
        <div className="sm:col-span-2">
          <TextField id="list-description" label="Description" required multiline value={v.description} onChange={set('description')} error={errors.description} />
        </div>
        <TextField id="list-roomTypes" label="Room types" required value={v.roomTypes} onChange={set('roomTypes')} error={errors.roomTypes} placeholder="e.g. 2-in-a-room, 4-in-a-room" />
        <TextField id="list-prices" label="Prices" required value={v.prices} onChange={set('prices')} error={errors.prices} placeholder="e.g. GH₵3,200 for 2-in-a-room" hint="Give each price with the room type it applies to." />
        <TextField
          id="list-paymentPeriod"
          label="Payment period"
          required
          value={v.paymentPeriod}
          onChange={set('paymentPeriod')}
          error={errors.paymentPeriod}
          options={[
            ...Object.values(periodLabels).map((l) => ({ value: l, label: l })),
            { value: 'Mixed (explain in description)', label: 'Mixed (explain in description)' },
            { value: 'To be confirmed', label: 'To be confirmed' },
          ]}
        />
        <TextField id="list-availability" label="Availability information" value={v.availability} onChange={set('availability')} placeholder="e.g. Rooms open from September" />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Facilities</legend>
        <div className="grid gap-1 sm:grid-cols-4">
          {facilityOptions.map((f) => (
            <label key={f} className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={v.facilities.includes(f)}
                onChange={() => set('facilities')(v.facilities.includes(f) ? v.facilities.filter((x) => x !== f) : [...v.facilities, f])}
              />
              {f}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <TextField id="list-otherFacilities" label="Other facilities" value={v.otherFacilities} onChange={set('otherFacilities')} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="list-photos" className="mb-1 block text-sm font-semibold text-slate-800">
          Photographs <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="list-photos"
          type="file"
          accept="image/*"
          multiple
          aria-describedby="list-photos-hint"
          className={inputCls}
          onChange={(e) => setPhotos(Array.from(e.target.files ?? []).map((f) => f.name))}
        />
        <p id="list-photos-hint" className="mt-1 text-xs text-slate-600">
          Photos are <strong>not uploaded</strong> by this demo. The file names are listed in your message and you attach
          the pictures in WhatsApp. Only send photos you own or have permission to share.
        </p>
      </div>

      <TextField
        id="list-preferredContact"
        label="Preferred contact method"
        required
        value={v.preferredContact}
        onChange={set('preferredContact')}
        error={errors.preferredContact}
        options={['WhatsApp', 'Phone call', 'Email'].map((x) => ({ value: x, label: x }))}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            id="list-consent"
            type="checkbox"
            className="mt-1 h-5 w-5"
            checked={v.consent}
            onChange={(e) => set('consent')(e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'list-consent-error' : undefined}
          />
          <span>
            I confirm that I am authorised to provide this information about the hostel and that it is accurate to the
            best of my knowledge.
          </span>
        </label>
        {errors.consent && (
          <p id="list-consent-error" role="alert" className="mt-1 text-sm font-medium text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" className={btnWhatsApp}>
        Prepare my listing in WhatsApp
      </button>

      {link && (
        <div aria-live="polite" className="space-y-2">
          <Notice tone="info" title="Status: Pending Review (not yet sent)">
            Your listing message is ready in WhatsApp. Review it and press Send. It is not published or verified until
            the team has reviewed your details.
          </Notice>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-700 underline underline-offset-4">
            WhatsApp did not open? Open it again
          </a>
        </div>
      )}
    </form>
  )
}
