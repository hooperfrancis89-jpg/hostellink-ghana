import type { Agent } from '../types'
import { formatPhone, telHref } from '../utils/phone'
import { waUrl } from '../utils/whatsapp'
import { btnSecondary, btnWhatsApp } from './ui'

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function AgentCard({ agent }: { agent: Agent }) {
  const admin = !!agent.isAdmin
  return (
    <article
      className={`rounded-2xl border p-5 ${admin ? 'border-brand-600 bg-brand-900 text-white shadow-lg sm:p-8' : 'border-slate-200 bg-white shadow-sm'}`}
      aria-labelledby={`agent-${agent.id}`}
    >
      <div className={`flex items-center gap-4 ${admin ? 'sm:gap-6' : ''}`}>
        {/* Profile-photo placeholder: initials only. No generated or stock photos of real people. */}
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full font-bold ${admin ? 'h-20 w-20 bg-white/15 text-2xl' : 'h-14 w-14 bg-brand-50 text-lg text-brand-700'}`}
        >
          {initials(agent.name)}
        </div>
        <div>
          {admin && <p className="mb-1 inline-block rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-bold text-slate-900">Main Website Administrator</p>}
          <h3 id={`agent-${agent.id}`} className={`font-bold ${admin ? 'text-2xl' : 'text-lg text-brand-900'}`}>
            {agent.name}
          </h3>
          <p className={`text-sm ${admin ? 'text-white/85' : 'text-slate-600'}`}>{agent.role}</p>
          <p className={`mt-1 font-semibold ${admin ? 'text-accent-500' : 'text-slate-900'}`}>{formatPhone(agent.phoneLocal)}</p>
        </div>
      </div>
      <div className={`mt-4 grid gap-2 ${admin ? 'sm:max-w-md sm:grid-cols-[2fr_1fr]' : 'grid-cols-2'}`}>
        <a
          href={waUrl(agent.phoneLocal, `Hello ${agent.name}, I found you on HostelLink Ghana and need help with hostel enquiries.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={btnWhatsApp}
          aria-label={`Message ${agent.name} on WhatsApp (opens in a new tab)`}
        >
          {admin ? 'Contact Main Admin on WhatsApp' : 'WhatsApp'}
        </a>
        <a href={telHref(agent.phoneLocal)} className={admin ? 'inline-flex min-h-[44px] items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-50' : btnSecondary} aria-label={`Call ${agent.name}`}>
          Call
        </a>
      </div>
    </article>
  )
}
