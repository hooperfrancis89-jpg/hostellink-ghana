import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE } from '../config'
import Logo from './Logo'
import { btnAccent, btnSecondary } from './ui'

const links: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/hostels', label: 'Find a Hostel' },
  { to: '/register', label: 'Register' },
  { to: '/list-your-hostel', label: 'List Your Hostel' },
  { to: '/agents', label: 'Our Agents' },
  { to: '/about', label: 'About Us' },
  { to: '/safety', label: 'Safety' },
]

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
              {SITE.university}
            </p>
            <p className="text-[11px] font-semibold tracking-wider text-accent-500 sm:text-xs">{SITE.group}</p>
            <Link to="/" className="text-lg font-extrabold uppercase tracking-wide sm:text-2xl" onClick={close}>
              HostelLink Ghana
            </Link>
          </div>
        </div>
      </div>

      <nav aria-label="Main navigation" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={linkCls}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close menu' : 'Menu'}
          </button>
          <div className="flex items-center gap-2">
            <Link to="/register" className={`${btnSecondary} hidden sm:inline-flex`}>
              Register
            </Link>
            <Link to="/agents" className={btnAccent}>
              Contact an Agent
            </Link>
          </div>
        </div>
        {open && (
          <ul id="mobile-menu" className="space-y-1 border-t border-slate-200 px-4 py-3 lg:hidden">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={linkCls} onClick={close}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
