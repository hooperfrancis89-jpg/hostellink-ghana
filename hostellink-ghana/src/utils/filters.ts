import type { Hostel, PricePeriod } from '../types'

export interface BudgetPreset {
  id: string
  label: string
  min: number
  max: number | null
  minExclusive?: boolean
}

export const budgetPresets: BudgetPreset[] = [
  { id: '2500-3000', label: 'GH₵2,500–GH₵3,000', min: 2500, max: 3000 },
  { id: '3000-3500', label: 'GH₵3,000–GH₵3,500', min: 3000, max: 3500 },
  { id: '3500-4000', label: 'GH₵3,500–GH₵4,000', min: 3500, max: 4000 },
  { id: '4000-5000', label: 'GH₵4,000–GH₵5,000', min: 4000, max: 5000 },
  { id: 'above-5000', label: 'Above GH₵5,000', min: 5000, max: null, minExclusive: true },
]

export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

export interface Filters {
  query: string
  presetId: string | null
  minBudget: string
  maxBudget: string
  /** Budgets are only compared against prices with this payment period. */
  comparePeriod: PricePeriod
  areas: string[]
  facilities: string[]
  sort: SortKey
}

export const defaultFilters: Filters = {
  query: '',
  presetId: null,
  minBudget: '',
  maxBudget: '',
  comparePeriod: 'semester',
  areas: [],
  facilities: [],
  sort: 'default',
}

const toNum = (s: string): number | null => {
  const t = s.replace(/[,\sGH₵]/gi, '')
  if (t === '') return null
  const n = Number(t)
  return Number.isFinite(n) && n >= 0 ? n : null
}

export function activeBudget(f: Filters): { min: number | null; max: number | null; minExclusive: boolean } | null {
  if (f.presetId) {
    const p = budgetPresets.find((x) => x.id === f.presetId)
    if (p) return { min: p.min, max: p.max, minExclusive: !!p.minExclusive }
  }
  const min = toNum(f.minBudget)
  const max = toNum(f.maxBudget)
  if (min === null && max === null) return null
  return { min, max, minExclusive: false }
}

/** Prices of one hostel that share the chosen payment period (never mixes periods). */
export const pricesIn = (h: Hostel, period: PricePeriod) => h.prices.filter((p) => p.period === period)

function inBudget(h: Hostel, b: NonNullable<ReturnType<typeof activeBudget>>, period: PricePeriod): boolean {
  return pricesIn(h, period).some((p) => {
    if (b.min !== null && (b.minExclusive ? p.amount <= b.min : p.amount < b.min)) return false
    if (b.max !== null && p.amount > b.max) return false
    return true
  })
}

export function matchesSearch(h: Hostel, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const hay = [h.name, h.area, h.address ?? '', ...(h.facilities ?? []), ...(h.nearbyLandmarks ?? [])]
    .join(' ')
    .toLowerCase()
  return q.split(/\s+/).every((word) => hay.includes(word))
}

export interface FilterResult {
  results: Hostel[]
  /** Listings hidden only because their price or payment period is not yet confirmed. */
  hiddenForUnknownPrice: number
}

export function filterHostels(all: Hostel[], f: Filters): FilterResult {
  const budget = activeBudget(f)
  const base = all.filter(
    (h) =>
      matchesSearch(h, f.query) &&
      (f.areas.length === 0 || f.areas.includes(h.area)) &&
      (f.facilities.length === 0 || (h.facilities !== null && f.facilities.every((x) => h.facilities!.includes(x)))),
  )
  const results = budget ? base.filter((h) => inBudget(h, budget, f.comparePeriod)) : [...base]
  const hiddenForUnknownPrice = budget
    ? base.filter((h) => h.prices.length === 0).length
    : 0

  const lowest = (h: Hostel): number | null => {
    const ps = pricesIn(h, f.comparePeriod).map((p) => p.amount)
    return ps.length ? Math.min(...ps) : null
  }
  const byName = (a: Hostel, b: Hostel): number => a.name.localeCompare(b.name)

  if (f.sort === 'name') results.sort(byName)
  else if (f.sort === 'price-asc' || f.sort === 'price-desc') {
    // Ranks only prices in the selected payment period; listings without one go last.
    const dir = f.sort === 'price-asc' ? 1 : -1
    results.sort((a, b) => {
      const pa = lowest(a)
      const pb = lowest(b)
      if (pa === null || pb === null) return pa === pb ? byName(a, b) : pa === null ? 1 : -1
      return dir * (pa - pb) || byName(a, b)
    })
  }
  return { results, hiddenForUnknownPrice }
}

export const formatPrice = (n: number): string => `GH₵${n.toLocaleString('en-GH')}`
