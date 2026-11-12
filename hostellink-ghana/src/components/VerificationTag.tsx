import type { VerificationStatus } from '../types'

/**
 * A "Verified" badge is only ever rendered for status 'verified', which requires a real
 * verification process. No listing uses it today, so students only see honest labels.
 */
export default function VerificationTag({ status }: { status: VerificationStatus }) {
  if (status === 'verified')
    return <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-900">Verified</span>
  if (status === 'reviewed')
    return <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-900">Details reviewed (not a guarantee)</span>
  return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">Unreviewed listing</span>
}
