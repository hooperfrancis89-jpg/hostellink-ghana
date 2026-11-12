import { useState } from 'react'
import { SITE } from '../config'

/**
 * Shows public/<SITE.logoFile> when set (and loadable); otherwise a clearly labelled placeholder.
 * To replace: see "Replace the logo" in the README.
 */
export default function Logo({ size = 52 }: { size?: number }) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${SITE.logoFile ?? ''}`
  if (SITE.logoFile && !failed) {
    return (
      <img
        src={src}
        alt="University of Professional Studies, Accra (UPSA) logo"
        height={size}
        className="w-auto rounded bg-white object-contain p-1"
        style={{ height: size }}
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label="Logo placeholder — replace with the approved logo"
      className="flex flex-col items-center justify-center rounded border-2 border-dashed border-white/60 text-center text-[8px] font-semibold uppercase leading-tight text-white/80"
      style={{ width: size, height: size }}
    >
      Logo
      <br />
      placeholder
    </div>
  )
}
