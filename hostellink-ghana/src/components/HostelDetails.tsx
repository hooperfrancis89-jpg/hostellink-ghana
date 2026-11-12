import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Hostel } from '../types'
import { TO_BE_CONFIRMED } from '../config'
import { mainAdmin } from '../data/agents'
import { formatPhone, telHref } from '../utils/phone'
import { adminWaUrl, enquiryMessage } from '../utils/whatsapp'
import HostelPhotoImg from './HostelPhotoImg'
import PhotoPlaceholder from './PhotoPlaceholder'
import PriceBlock from './PriceBlock'
import VerificationTag from './VerificationTag'
import { btnPrimary, btnSecondary, btnWhatsApp, Notice, inputCls } from './ui'

// ... Row component and main HostelDetails function remain the same ...

export default function HostelDetails({ hostel: h }: { hostel: Hostel }) {
  const [params] = useSearchParams()
  const enquireRef = useRef<HTMLElement>(null)
  const official = h.category === 'official-university'

  // New state for direct sheet booking
  const [studentName, setStudentName] = useState('')
  const [phone, setPhone] = useState('')
  const [roomType, setRoomType] = useState(h.roomTypes?.[0] || 'Standard Room')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (params.get('enquire')) enquireRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [params])

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!studentName.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.')
      return
    }

    setSubmitting(true)
    try {
      // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx8gzB6PwCnvWGjKwIoYgnVAA8Huby6lret94v_azKCSmv9cL-OJxl8oxvI5Z3Nb-6jaQ/exec'

      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim(),
          phone: phone.trim(),
          hostelName: h.name,
          roomType: roomType,
          checkInDate: new Date().toLocaleDateString()
        }),
      })

      setSuccess(true)
    } catch (err) {
      alert('Failed to submit booking. Please try again or contact via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const unknown = <span className="font-medium text-amber-800">{TO_BE_CONFIRMED}</span>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* ... previous JSX code up to the sidebar ... */}

      <aside ref={enquireRef} id="enquire" className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="enq-title">
        <h2 id="enq-title" className="text-lg font-bold text-brand-900">
          Enquire or request a booking
        </h2>
        {official ? (
          <Notice tone="warn">
            This is official university accommodation. Apply through the university’s own hostel portal.
          </Notice>
        ) : success ? (
          <div className="rounded-xl bg-green-50 p-4 text-center text-green-900">
            <p className="font-bold">Booking Request Submitted!</p>
            <p className="mt-1 text-sm">Your details have been logged directly into our bookings tracker. We will reach out to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-3">
            <p className="text-sm text-slate-700">
              Submit your details below to request a booking at <strong>{h.name}</strong>. This logs your request straight into our live tracker.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Full Name</label>
              <input
                type="text"
                required
                className={inputCls}
                placeholder="e.g. Ama Mensah"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                className={inputCls}
                placeholder="e.g. 0241234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Room Type</label>
              <select
                className={inputCls}
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                {h.roomTypes ? (
                  h.roomTypes.map((rt) => (
                    <option key={rt} value={rt}>{rt}</option>
                  ))
                ) : (
                  <option value="Standard">Standard Room</option>
                )}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`${btnPrimary} w-full`}
            >
              {submitting ? 'Submitting...' : 'Request a Booking'}
            </button>
            <a
              href={adminWaUrl(enquiryMessage(h.name, h.area))}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnWhatsApp} w-full mt-2`}
            >
              Or Send Enquiry via WhatsApp
            </a>
          </form>
        )}
        
        {/* ... rest of the sidebar code ... */}
      </aside>
    </div>
  )
}