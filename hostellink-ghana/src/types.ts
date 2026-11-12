export type PricePeriod = 'academic-year' | 'semester' | 'term' | 'month'

export const periodLabels: Record<PricePeriod, string> = {
  'academic-year': 'Per academic year',
  semester: 'Per semester',
  term: 'Per term',
  month: 'Per month',
}

/** Order used when grouping prices: only equal periods are directly comparable. */
export const periodRank: Record<PricePeriod, number> = {
  'academic-year': 0,
  semester: 1,
  term: 2,
  month: 3,
}

/**
 * unreviewed = listed from a research starting point, nothing checked yet
 * reviewed   = the team has checked some details (not a guarantee)
 * verified   = only when a real verification process has been completed
 * NOTHING is "verified" today — see SAFETY section and README.
 */
export type VerificationStatus = 'unreviewed' | 'reviewed' | 'verified'

export interface SourceLink {
  label: string
  url: string
}

export interface PriceOption {
  /** e.g. "4-in-1 room" */
  label: string
  amount: number
  /** Required: every price must state its payment period. */
  period: PricePeriod
  /** true only when the amount is taken from a published or written source. */
  verified: boolean
  /** Where/when the figure applies, e.g. "UPSA notice, 1st semester 2025/26". */
  note?: string
}

/**
 * A genuine photograph of THIS property. Add one only when you have evidence it shows this
 * property AND permission to use it. Keep the record honest: see PHOTO-SOURCES.md.
 */
export interface HostelPhoto {
  /** File in public/hostel-photos/, e.g. 'hostel-photos/green-hostel-front.jpg' (no leading slash). */
  src: string
  /** Describe what the picture shows, for screen readers. */
  alt: string
  /** Who supplied/owns it, e.g. "Supplied by the hostel owner (name, date)". */
  source: string
  sourceUrl?: string
  permission: 'owner-supplied' | 'official-site-permitted' | 'open-licence'
}

export interface Hostel {
  id: string
  name: string
  /** private = privately run hostel; official-university = run by the university itself */
  category: 'private' | 'official-university'
  /** Broad search area used by the location filter. */
  area: string
  /** null = address not confirmed */
  address: string | null
  /** Empty = price unknown ("Price to be confirmed."). Never invent a price. */
  prices: PriceOption[]
  roomTypes: string[] | null
  facilities: string[] | null
  availability: string | null
  nearbyLandmarks: string[] | null
  verification: VerificationStatus
  description: string
  sources: SourceLink[]
  /** Genuine, permitted photo URLs only. Empty = placeholders are shown. */
  photos: HostelPhoto[]
}

export interface Agent {
  id: string
  name: string
  role: string
  /** Local Ghana format, e.g. 0593371476. Converted automatically for WhatsApp and call links. */
  phoneLocal: string
  isAdmin?: boolean
}
