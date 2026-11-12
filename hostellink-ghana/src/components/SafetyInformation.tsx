import ReportListing from './ReportListing'
import { Notice } from './ui'

const checklist: [string, string][] = [
  ['Confirm the property’s identity and address', 'Check that the name and address match what you were told, for example on a map and with people who live nearby.'],
  ['Ask for recent photographs or arrange a visit', 'Photos can be old or copied. Visit in person, or take a trusted friend or family member.'],
  ['Get the price and payment period in writing', 'Ask whether it is per academic year, semester, term or month. Do not compare them as if they were equal.'],
  ['Ask about water, electricity, security and other facilities', 'Find out what is provided, what is shared and whether there are extra charges.'],
  ['Confirm what the payment covers', 'Rent only, or utilities, deposit, agent fees and other charges too?'],
  ['Request receipts', 'Every payment should have a receipt with the hostel name, amount, date and purpose.'],
  ['Independently verify representatives', 'Check an agent’s identity through the hostel owner or another source you trust, not only through the agent.'],
  ['Avoid sending deposits to unknown people without checks', 'Do not pay anyone you have not met or verified, and be careful when you are rushed to pay.'],
  ['Understand the cancellation terms', 'Ask what happens to your money if you change your mind or the room is not as described.'],
  ['Report suspicious listings', 'Use the report form below so the team can look into it.'],
]

const levels: [string, string, string][] = [
  ['Unreviewed', 'Listed from a research starting point. Nobody has checked the details.', 'All listings on this site today.'],
  ['Reviewed', 'The team has checked some details with the hostel, such as price or contact. This is still not a guarantee.', 'None yet.'],
  ['Verified', 'Shown only after a real verification process (for example a visit and documents checked).', 'None yet. No verification badge is shown.'],
]

export default function SafetyInformation() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="stay-safe">
        <h2 id="stay-safe" className="text-2xl font-bold text-brand-900">
          Stay Safe While Finding Accommodation
        </h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-2">
          {checklist.map(([t, d], i) => (
            <li key={t} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{t}</p>
                <p className="text-sm text-slate-700">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="levels">
        <h2 id="levels" className="text-2xl font-bold text-brand-900">
          Unreviewed, reviewed and verified
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th scope="col" className="p-3">Level</th>
                <th scope="col" className="p-3">What it means</th>
                <th scope="col" className="p-3">Today</th>
              </tr>
            </thead>
            <tbody>
              {levels.map(([a, b, c]) => (
                <tr key={a} className="border-b border-slate-200">
                  <th scope="row" className="p-3 font-semibold">{a}</th>
                  <td className="p-3">{b}</td>
                  <td className="p-3">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Notice tone="warn">
            HostelLink Ghana does not guarantee the safety, quality or honesty of any property or agent. Agents listed on
            this site are team members of this academic project and are not claimed to be officially affiliated with UPSA.
            Always do your own checks.
          </Notice>
        </div>
      </section>

      <section aria-labelledby="report">
        <h2 id="report" className="sr-only">Report a listing</h2>
        <ReportListing />
      </section>
    </div>
  )
}
