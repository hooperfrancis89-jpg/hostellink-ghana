import { useMemo, useState } from 'react'
import BudgetFilter from '../components/BudgetFilter'
import HostelCard from '../components/HostelCard'
import HostelSearch from '../components/HostelSearch'
import { btnSecondary, Notice, PageTitle } from '../components/ui'
import { hostels, RESEARCH_DIRECTORY, RESEARCH_MAP_SEARCH } from '../data/hostels'
import { defaultFilters, filterHostels, type Filters } from '../utils/filters'

const areas = Array.from(new Set(hostels.map((h) => h.area))).sort()
const facilities = Array.from(new Set(hostels.flatMap((h) => h.facilities ?? []))).sort()

export default function FindHostel() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const patch = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }))
  const { results, hiddenForUnknownPrice } = useMemo(() => filterHostels(hostels, filters), [filters])
  const priceSorted = filters.sort === 'price-asc' || filters.sort === 'price-desc'

  return (
    <>
      <PageTitle title="Find a Hostel" intro="Search, filter and compare hostels around UPSA and Madina, Accra." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <Notice tone="warn" title="Please read">
          These listings come from research starting points. Prices, facilities and availability are mostly still
          “to be confirmed” and nothing here is verified. Confirm everything with the hostel before paying.
        </Notice>

        <HostelSearch filters={filters} onChange={patch} />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <BudgetFilter filters={filters} onChange={patch} onClear={() => setFilters(defaultFilters)} areas={areas} facilities={facilities} />

          <div>
            <p className="mb-4 text-sm font-semibold text-slate-800" role="status" aria-live="polite">
              {results.length} {results.length === 1 ? 'hostel' : 'hostels'} found
            </p>

            {hiddenForUnknownPrice > 0 && (
              <div className="mb-4">
                <Notice>
                  {hiddenForUnknownPrice} {hiddenForUnknownPrice === 1 ? 'listing is' : 'listings are'} hidden because the
                  price or payment period is still to be confirmed, so it cannot be compared with your budget. Clear the
                  budget filter to see them.
                </Notice>
              </div>
            )}
            {priceSorted && (
              <div className="mb-4">
                <Notice>
                  Prices are grouped by payment period (academic year, semester, term, month) and sorted within each
                  group, because different periods are not directly comparable. Listings without a price come last.
                </Notice>
              </div>
            )}

            {results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-bold text-brand-900">No hostels match your search</h2>
                <p className="mt-2 text-sm text-slate-700">
                  Try a different name or area, widen your budget, or clear the filters.
                </p>
                <button type="button" className={`${btnSecondary} mt-4`} onClick={() => setFilters(defaultFilters)}>
                  Clear filters
                </button>
              </div>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2">
                {results.map((h) => (
                  <li key={h.id}>
                    <HostelCard hostel={h} />
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Research more yourself</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <a href={RESEARCH_DIRECTORY.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline underline-offset-2">
                    {RESEARCH_DIRECTORY.label}
                  </a>
                </li>
                <li>
                  <a href={RESEARCH_MAP_SEARCH.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline underline-offset-2">
                    {RESEARCH_MAP_SEARCH.label}
                  </a>
                </li>
              </ul>
              <p className="mt-2 text-xs">External sites are not run by HostelLink Ghana and are not proof of availability or price.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
