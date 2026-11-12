import type { Filters, SortKey } from '../utils/filters'
import { inputCls } from './ui'

interface Props {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
}

export default function HostelSearch({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_220px]" role="search">
      <div>
        <label htmlFor="hostel-search" className="mb-1 block text-sm font-semibold text-slate-800">
          Search by hostel name or location
        </label>
        <input
          id="hostel-search"
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="e.g. Madina, Green Hostel, Nest"
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="hostel-sort" className="mb-1 block text-sm font-semibold text-slate-800">
          Sort by
        </label>
        <select
          id="hostel-sort"
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortKey })}
          className={inputCls}
        >
          <option value="default">Default order</option>
          <option value="price-asc">Lowest price</option>
          <option value="price-desc">Highest price</option>
          <option value="name">Hostel name (A–Z)</option>
        </select>
      </div>
    </div>
  )
}
