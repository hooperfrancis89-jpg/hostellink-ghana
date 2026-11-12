import { Link } from 'react-router-dom'
import type { Hostel } from '../types'
import { TO_BE_CONFIRMED } from '../config'
import { adminWaUrl } from '../utils/whatsapp'
import HostelPhotoImg from './HostelPhotoImg'
import PhotoPlaceholder from './PhotoPlaceholder'
import PriceBlock from './PriceBlock'
import VerificationTag from './VerificationTag'
import { btnPrimary, btnSecondary, btnWhatsApp } from './ui'

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  const h = hostel
  const official = h.category === 'official-university'
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby={`h-${h.id}`}>
      {h.photos[0] ? (
        <HostelPhotoImg photo={h.photos[0]} />
      ) : (
        <PhotoPlaceholder className="aspect-[16/10] w-full" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${official ? 'bg-purple-100 text-purple-900' : 'bg-brand-50 text-brand-700'}`}
          >
            {official ? 'Official university accommodation' : 'Private hostel'}
          </span>
          <VerificationTag status={h.verification} />
        </div>
        <h3 id={`h-${h.id}`} className="text-lg font-bold text-brand-900">
          {h.name}
        </h3>
        <dl className="space-y-1 text-sm text-slate-700">
          <div className="flex gap-1">
            <dt className="font-semibold">Area:</dt>
            <dd>{h.area} (search area)</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">Room type:</dt>
            <dd>{h.roomTypes ? h.roomTypes.join(', ') : TO_BE_CONFIRMED}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">Facilities:</dt>
            <dd>{h.facilities ? h.facilities.join(', ') : TO_BE_CONFIRMED}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-semibold">Availability:</dt>
            <dd>{h.availability ?? TO_BE_CONFIRMED}</dd>
          </div>
        </dl>
        <PriceBlock hostel={h} />
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link to={`/hostels/${h.id}`} className={btnPrimary}>
            View Details
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={adminWaUrl(`Hello HostelLink Ghana, I am interested in ${h.name}. Please help me find its current price, room types and availability.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnWhatsApp}
            >
              Contact Agent
            </a>
            <Link to={`/hostels/${h.id}?enquire=1`} className={btnSecondary}>
              Enquire / Request
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
