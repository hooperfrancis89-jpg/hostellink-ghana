import type { Hostel, HostelPhoto, SourceLink } from '../types'

/**
 * HOSTEL LISTINGS — one entry per property, no duplicates.
 *
 * HONESTY RULES
 *  - These entries come from research starting points only (Google Maps searches). Nothing
 *    below has been confirmed. Address, price, payment period, room types, facilities,
 *    availability and landmarks are therefore null = "Information to be confirmed".
 *  - Never invent a value. When you confirm a detail with the hostel, fill it in and set
 *    the matching flag (e.g. priceVerified: true) only if you have it in writing.
 *  - Always set `pricePeriod` whenever you set `price`.
 *  - Leave `verification` as 'unreviewed' unless a real verification process has been done.
 *  - Add genuine photos to `photos` (see HostelPhoto in types.ts and PHOTO-SOURCES.md) only with proof of the property and permission.
 *
 * To add a hostel: copy one block, give it a new unique `id`, and fill in what is confirmed.
 */

const maps = (q: string): string => `https://www.google.com/maps/search/${q}/`

const base = {
  address: null,
  prices: [],
  roomTypes: null,
  facilities: null,
  availability: null,
  nearbyLandmarks: null,
  verification: 'unreviewed' as 'unreviewed' | 'reviewed' | 'verified',
  photos: [] as HostelPhoto[],
}

const mapSource = (q: string): SourceLink[] => [
  { label: 'Google Maps search (starting point, not proof of listing details)', url: maps(q) },
]

const pending =
  'Listed as a research starting point. Address, price, payment period, room types, facilities and availability are still to be confirmed with the hostel.'

const UPSA_NOTICE: SourceLink = {
  label: 'Official UPSA hostel application notice (1st semester 2025/26)',
  url: 'https://upsa.edu.gh/opening-of-hostel-application-portal-for-continuing-students-first-semester-2025-26-academic-year/',
}
const upsaNote =
  'UPSA notice, 1st semester 2025/26 (includes GH₵200 refundable damage deposit and GH₵60 hall dues). Fees may have changed: confirm with UPSA.'
const upsaDescription =
  'Official UPSA university hostel, not a private hostel. Applications go through the university’s own hostel portal, never through HostelLink Ghana, and fees must not be paid to any staff member or student. Fees below are from the 2025/26 notice and may have changed.'

const official = (id: string, name: string, fourInOne: number, twoInOne: number): Hostel => ({
  ...base,
  id,
  name,
  category: 'official-university',
  area: 'UPSA official hostel',
  verification: 'reviewed',
  description: upsaDescription,
  roomTypes: ['4-in-1 room', '2-in-1 room'],
  prices: [
    { label: '4-in-1 room', amount: fourInOne, period: 'semester', verified: true, note: upsaNote },
    { label: '2-in-1 room', amount: twoInOne, period: 'semester', verified: true, note: upsaNote },
  ],
  sources: [UPSA_NOTICE, ...mapSource(encodeURIComponent(name).replace(/%20/g, '+') + '+UPSA+Accra')],
})

export const hostels: Hostel[] = [
  official('hostel-a', 'Hostel A', 2070, 5700),
  official('matthew-opoku-prempeh-hostel', 'Matthew Opoku Prempeh Hostel', 2510, 6995),
  official('amon-kotei-hostel', 'Amon Kotei Hostel', 2620, 7105),
  {
    ...base,
    id: 'green-hostel-madina',
    name: 'Green Hostel, Madina',
    category: 'private',
    area: 'Madina',
    description: pending,
    sources: mapSource('Green+Hostel+Madina+UPSA+Accra'),
  },
  {
    ...base,
    id: 'htc-tower-madina',
    name: 'HTC Tower, Madina',
    category: 'private',
    area: 'Madina',
    description: pending,
    sources: mapSource('HTC+Tower+hostel+Rawlings+Circle+Madina'),
  },
  {
    ...base,
    id: 'p-cular-heights-madina',
    name: 'P-Cular Heights, Madina',
    category: 'private',
    area: 'Madina',
    description: pending,
    sources: mapSource('P-Cular+Heights+hostel+Madina+Accra'),
  },
  {
    ...base,
    id: 'goodwill-plaza-hostel',
    name: 'Goodwill Plaza Hostel',
    category: 'private',
    area: 'Near UPSA',
    description: pending,
    sources: mapSource('Goodwill+Plaza+Hostel+UPSA+Accra'),
  },
  {
    ...base,
    id: 'the-nest-ars-avenue',
    name: 'The Nest, ARS Avenue',
    category: 'private',
    area: 'Madina',
    description: pending,
    sources: mapSource('The+Nest+hostel+ARS+Avenue+Madina'),
  },
  {
    ...base,
    id: 'la-nyanteh-hostel',
    name: 'La Nyanteh Hostel',
    category: 'private',
    area: 'Madina',
    description: pending,
    sources: mapSource('La+Nyanteh+Hostel+Madina+Accra'),
  },
]

/** General research directory (not tied to one listing). */
export const RESEARCH_DIRECTORY: SourceLink = {
  label: 'GH Hostels directory',
  url: 'https://ghhostels.com/',
}
export const RESEARCH_MAP_SEARCH: SourceLink = {
  label: 'Private student hostels near UPSA (Google Maps)',
  url: maps('private+student+hostels+near+UPSA+Madina+Accra'),
}

export const getHostel = (id: string): Hostel | undefined => hostels.find((h) => h.id === id)
