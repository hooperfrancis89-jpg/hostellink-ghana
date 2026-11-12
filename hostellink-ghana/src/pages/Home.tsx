import { Link } from 'react-router-dom'
import StudentRegistrationForm from '../components/StudentRegistrationForm'
import { btnAccent, btnLight, Section } from '../components/ui'
import { mainAdmin } from '../data/agents'
import { formatPhone } from '../utils/phone'
import { waUrl } from '../utils/whatsapp'

const problems: [string, string][] = [
  ['Unclear pricing', 'Every price on HostelLink Ghana states its payment period, and unknown prices say “Price to be confirmed.”'],
  ['Outdated listings', 'Details we have not confirmed are labelled “Information to be confirmed” instead of guessed.'],
  ['Hard-to-compare facilities', 'Search, budget filters and sorting put options side by side, using the same payment period.'],
  ['Fraudulent agents', 'A safety checklist and a report form help students check before paying anyone.'],
]

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find Your Next Student Home with Confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Discover, compare, and enquire about student hostels near UPSA and other university campuses in Ghana.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/hostels" className={btnAccent}>
              Find a Hostel
            </Link>
            <Link to="/list-your-hostel" className={btnLight}>
              List Your Hostel
            </Link>
          </div>
        </div>
      </section>

      <Section tone="soft" id="register">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">Register your interest</h2>
            <p className="mt-3 text-slate-700">
              Tell us a little about yourself and where you would like to stay. The team will use this to help you with
              hostel searches and enquiries.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Your details are sent only by WhatsApp, and only when you press Send.</li>
              <li>They are never displayed publicly on this website.</li>
              <li>This site does not save your registration.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Primary registration contact: <strong>{mainAdmin.name}</strong>,{' '}
              <a href={waUrl(mainAdmin.phoneLocal)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline underline-offset-2">
                {formatPhone(mainAdmin.phoneLocal)}
              </a>
            </p>
          </div>
          <StudentRegistrationForm />
        </div>
      </Section>

      <Section title="Problems we want to solve" intro="Finding a hostel in Accra can be stressful. HostelLink Ghana is designed around four common problems.">
        <ul className="grid gap-5 sm:grid-cols-2">
          {problems.map(([t, d]) => (
            <li key={t} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-brand-900">{t}</h3>
              <p className="mt-1 text-sm text-slate-700">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft" title="Before you pay anyone" intro="Always check a hostel and its representative yourself. Listings here are not guaranteed.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/safety" className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Read the safety checklist
          </Link>
          <Link to="/agents" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-brand-600 bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Meet our agents
          </Link>
        </div>
      </Section>
    </>
  )
}
