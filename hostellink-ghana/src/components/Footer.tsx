import { Link } from 'react-router-dom'
import { SITE } from '../config'
import { mainAdmin } from '../data/agents'
import { formatPhone } from '../utils/phone'
import { waUrl } from '../utils/whatsapp'

const cols: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/hostels', label: 'Find a Hostel' },
  { to: '/list-your-hostel', label: 'List Your Hostel' },
  { to: '/agents', label: 'Our Agents' },
  { to: '/about', label: 'About Us' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/safety', label: 'Safety Information' },
  { to: '/agents', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold uppercase tracking-wide">HostelLink Ghana</p>
          <p className="mt-1 text-sm font-semibold text-accent-500">{SITE.group}</p>
          <p className="text-sm text-white/80">{SITE.university}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {cols.map((c) => (
              <li key={c.label}>
                <Link to={c.to} className="text-white/90 underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-semibold">Primary registration contact</p>
          <p className="mt-1">{mainAdmin.name}</p>
          <a
            href={waUrl(mainAdmin.phoneLocal)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-1 font-semibold text-accent-500 underline underline-offset-4"
            aria-label={`Chat with ${mainAdmin.name} on WhatsApp (opens in a new tab)`}
          >
            {formatPhone(mainAdmin.phoneLocal)}
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-white/80 sm:px-6">{SITE.disclaimer}</p>
      </div>
    </footer>
  )
}
