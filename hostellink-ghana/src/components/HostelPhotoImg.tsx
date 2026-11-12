import { useState } from 'react'
import type { HostelPhoto } from '../types'
import PhotoPlaceholder from './PhotoPlaceholder'

/**
 * Responsive hostel photo (fixed 16:10 box, never stretches on phones). If the file is
 * missing or fails to load, the labelled placeholder is shown instead of a broken image.
 */
export default function HostelPhotoImg({ photo, label, className = '' }: { photo?: HostelPhoto; label?: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!photo || failed) return <PhotoPlaceholder label={label} className={`aspect-[16/10] w-full ${className}`} />
  return (
    <figure className={className}>
      <img
        src={`${import.meta.env.BASE_URL}${photo.src}`}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="aspect-[16/10] w-full object-cover"
      />
      <figcaption className="bg-slate-50 px-2 py-1 text-[11px] text-slate-600">Photo: {photo.source}. Not independently verified.</figcaption>
    </figure>
  )
}
