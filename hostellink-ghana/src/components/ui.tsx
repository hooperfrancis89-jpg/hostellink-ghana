import type { ReactNode } from 'react'

const btn =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 min-h-[44px] text-sm font-semibold text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500'
export const btnPrimary = `${btn} bg-brand-600 text-white hover:bg-brand-700`
export const btnSecondary = `${btn} border border-brand-600 bg-white text-brand-700 hover:bg-brand-50`
export const btnWhatsApp = `${btn} bg-green-700 text-white hover:bg-green-800`
export const btnAccent = `${btn} bg-accent-500 text-slate-900 hover:bg-accent-600`
export const btnLight = `${btn} bg-white text-brand-900 hover:bg-brand-50`

export const inputCls =
  'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 aria-[invalid=true]:border-red-600'

export function Section({
  title,
  intro,
  children,
  id,
  tone = 'white',
}: {
  title?: string
  intro?: string
  children: ReactNode
  id?: string
  tone?: 'white' | 'soft'
}) {
  return (
    <section id={id} className={tone === 'soft' ? 'bg-slate-50' : 'bg-white'}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {title && <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">{title}</h2>}
        {intro && <p className="mt-2 max-w-3xl text-slate-600">{intro}</p>}
        <div className={title ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="bg-brand-50 border-b border-brand-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-3xl text-lg text-slate-700">{intro}</p>}
      </div>
    </div>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  hint?: string
  required?: boolean
  type?: string
  inputMode?: 'text' | 'tel' | 'numeric' | 'email'
  autoComplete?: string
  placeholder?: string
  multiline?: boolean
  options?: { value: string; label: string }[]
}

/** Accessible labelled field: input, textarea or select, with hint and error text. */
export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
  multiline,
  options,
}: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name: id,
    value,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: inputCls,
  } as const
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-slate-800">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-500"> (optional)</span>
        )}
      </label>
      {options ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea {...common} rows={4} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          {...common}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function Notice({
  tone = 'info',
  children,
  title,
}: {
  tone?: 'info' | 'warn' | 'ok'
  children: ReactNode
  title?: string
}) {
  const cls =
    tone === 'warn'
      ? 'border-amber-300 bg-amber-50 text-amber-900'
      : tone === 'ok'
        ? 'border-green-300 bg-green-50 text-green-900'
        : 'border-brand-100 bg-brand-50 text-brand-900'
  return (
    <div className={`rounded-lg border p-4 text-sm ${cls}`} role="note">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  )
}
