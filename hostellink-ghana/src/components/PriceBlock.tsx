import type { Hostel } from '../types'
import { periodLabels } from '../types'
import { formatPrice } from '../utils/filters'

/** Always states the payment period, and says so plainly when price or period is unknown. */
export default function PriceBlock({ hostel, large = false, max }: { hostel: Hostel; large?: boolean; max?: number }) {
  if (hostel.prices.length === 0) {
    return (
      <div>
        <p className="text-sm font-semibold text-slate-800">Price to be confirmed.</p>
        <p className="text-sm text-slate-700">Payment period to be confirmed.</p>
      </div>
    )
  }
  const shown = max ? hostel.prices.slice(0, max) : hostel.prices
  return (
    <div>
      <ul className="space-y-2">
        {shown.map((p) => (
          <li key={p.label}>
            <p className={`${large ? 'text-3xl' : 'text-xl'} font-extrabold text-brand-900`}>
              {formatPrice(p.amount)} <span className="text-sm font-semibold text-slate-700">{periodLabels[p.period].toLowerCase()}</span>
            </p>
            <p className="text-sm text-slate-700">{p.label}</p>
            {large && p.note && <p className="text-xs text-slate-600">{p.note}</p>}
          </li>
        ))}
      </ul>
      {hostel.prices.some((p) => !p.verified) ? (
        <p className="mt-1 text-xs font-medium text-amber-800">Price not yet verified: confirm with the hostel.</p>
      ) : (
        <p className="mt-1 text-xs font-medium text-amber-800">As published by UPSA for 2025/26. Confirm the current fee.</p>
      )}
    </div>
  )
}
