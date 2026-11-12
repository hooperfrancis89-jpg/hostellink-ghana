/** Clearly labelled stand-in used until genuine, permitted photographs are added. */
export default function PhotoPlaceholder({ label = 'Photo unavailable', className = '' }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — genuine photograph to be added`}
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-center text-slate-600 ${className}`}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />
      </svg>
      <span className="mt-1 text-xs font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-[11px]">Genuine photo to be added</span>
    </div>
  )
}
