import { periodLabels, type PricePeriod } from '../types'
import { budgetPresets, defaultFilters, type Filters } from '../utils/filters'
import { inputCls, Notice } from './ui'

interface Props {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
  areas: string[]
  facilities: string[]
}

const toggle = (list: string[], v: string): string[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

export default function BudgetFilter({ filters, onChange, onClear, areas, facilities }: Props) {
  const dirty = JSON.stringify(filters) !== JSON.stringify(defaultFilters)
  return (
    <aside aria-label="Filters" className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
      <fieldset>
        <legend className="text-sm font-bold text-brand-900">Budget</legend>
        <div className="mt-2 mb-3">
          <label htmlFor="compare-period" className="mb-1 block text-xs font-semibold text-slate-700">
            Compare budget against prices charged
          </label>
          <select
            id="compare-period"
            className={inputCls}
            value={filters.comparePeriod}
            onChange={(e) => onChange({ comparePeriod: e.target.value as PricePeriod })}
          >
            {(Object.keys(periodLabels) as PricePeriod[]).map((p) => (
              <option key={p} value={p}>
                {periodLabels[p]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-600">
            Prices with a different payment period are never compared with your budget.
          </p>
        </div>
        <div className="space-y-1">
          {budgetPresets.map((p) => (
            <label key={p.id} className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="budget-preset"
                className="h-4 w-4"
                checked={filters.presetId === p.id}
                onChange={() => onChange({ presetId: p.id, minBudget: '', maxBudget: '' })}
              />
              {p.label}
            </label>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="min-budget" className="mb-1 block text-xs font-semibold text-slate-700">
              Minimum (GH₵)
            </label>
            <input
              id="min-budget"
              inputMode="numeric"
              className={inputCls}
              value={filters.minBudget}
              onChange={(e) => onChange({ minBudget: e.target.value, presetId: null })}
              placeholder="e.g. 2500"
            />
          </div>
          <div>
            <label htmlFor="max-budget" className="mb-1 block text-xs font-semibold text-slate-700">
              Maximum (GH₵)
            </label>
            <input
              id="max-budget"
              inputMode="numeric"
              className={inputCls}
              value={filters.maxBudget}
              onChange={(e) => onChange({ maxBudget: e.target.value, presetId: null })}
              placeholder="e.g. 4000"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-brand-900">Location</legend>
        <div className="mt-2 space-y-1">
          {areas.map((a) => (
            <label key={a} className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={filters.areas.includes(a)}
                onChange={() => onChange({ areas: toggle(filters.areas, a) })}
              />
              {a}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-bold text-brand-900">Facilities</legend>
        {facilities.length === 0 ? (
          <div className="mt-2">
            <Notice>
              No facility information has been confirmed yet, so there is nothing to filter by. Facility filters will
              appear here once listings are confirmed.
            </Notice>
          </div>
        ) : (
          <div className="mt-2 space-y-1">
            {facilities.map((f) => (
              <label key={f} className="flex min-h-[40px] cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={filters.facilities.includes(f)}
                  onChange={() => onChange({ facilities: toggle(filters.facilities, f) })}
                />
                {f}
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        disabled={!dirty}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear filters
      </button>
    </aside>
  )
}
