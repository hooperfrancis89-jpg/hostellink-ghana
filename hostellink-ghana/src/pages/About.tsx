import { Link } from 'react-router-dom'
import { Notice, PageTitle, Section } from '../components/ui'
import { SITE } from '../config'

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  )
}

const h2 = 'text-2xl font-bold text-brand-900'

export default function About() {
  return (
    <>
      <PageTitle
        title="About Us"
        intro="HostelLink Ghana is a student-focused digital platform concept designed to make finding accommodation easier, clearer, and more convenient."
      />
      <Section>
        <div className="max-w-3xl space-y-10">
          <p className="text-slate-800">
            It aims to connect students with hostel owners and accommodation agents while helping users compare prices,
            locations, facilities, and available options. The project was developed by ADM 6, Group 6 at the University
            of Professional Studies, Accra for the {SITE.challenge}.
          </p>
          <Notice tone="warn" title="Academic project">
            {SITE.disclaimer}
          </Notice>

          <div>
            <h2 className={h2}>The accommodation problem</h2>
            <div className="mt-3">
              <List
                items={[
                  'Prices are unclear or quoted without saying whether they are per month, semester or year.',
                  'Listings are outdated, so students visit places that are full or no longer exist.',
                  'It is hard to compare facilities, locations and costs across hostels.',
                  'Fraudulent agents can take deposits for rooms that do not exist.',
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className={h2}>Our proposed solution</h2>
            <p className="mt-3 text-slate-700">
              One place to search, filter and compare hostels near UPSA and other campuses, with honest labels for
              anything not yet confirmed, direct contact with the team, a hostel submission process for owners, and
              clear safety guidance.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-brand-900">Target users</h2>
              <div className="mt-3">
                <List items={['Students looking for accommodation', 'Private hostel owners and agents', 'Parents and guardians helping students choose']} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-900">Benefits for students</h2>
              <div className="mt-3">
                <List items={['Compare prices with clear payment periods', 'Search by name, location and budget', 'Safety checklist and a way to report concerns']} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-900">Benefits for hostel owners</h2>
              <div className="mt-3">
                <List items={['Present the property clearly to students', 'Simple submission with assisted listing', 'Direct enquiries from interested students']} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-900">Benefits for parents</h2>
              <div className="mt-3">
                <List items={['Transparent information, with unknowns clearly marked', 'Practical checks to do before any payment', 'A contact point for questions']} />
              </div>
            </div>
          </div>

          <div>
            <h2 className={h2}>Proposed business model</h2>
            <p className="mt-3 text-slate-700">
              These are <strong>proposed</strong> revenue sources. None is operating yet, and this website does not
              process payments.
            </p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-slate-700">
              <li>Booking commissions, where agreed with hostels and once a booking system exists.</li>
              <li>Premium hostel listings.</li>
              <li>Hostel management support.</li>
              <li>Optional promotional listings.</li>
            </ol>
          </div>

          <div>
            <h2 className={h2}>How we could attract users</h2>
            <h3 className="mt-3 font-semibold text-slate-900">Students</h3>
            <List items={['Campus groups', 'Student ambassadors', 'WhatsApp sharing', 'Social media', 'University-related communities']} />
            <h3 className="mt-4 font-semibold text-slate-900">Hostel owners</h3>
            <List
              items={[
                'Simple registration',
                'Assisted listing submissions',
                'Digital skills training',
                'Clear information about platform benefits',
                'Fair referral partnerships',
              ]}
            />
            <p className="mt-4 text-sm text-slate-600">
              The site is kept lightweight (no heavy images or third-party scripts) to suit students with limited
              internet data.
            </p>
          </div>

          <div>
            <h2 className={h2}>Future development</h2>
            <div className="mt-3">
              <List
                items={[
                  'A secure database and administrator dashboard to review submitted listings',
                  'A real verification process (visits, documents) before any “Verified” label is shown',
                  'Confirmed availability that is updated by hostels',
                  'More campuses across Ghana',
                  'A booking and payment system with proper receipts',
                ]}
              />
            </div>
          </div>

          <p className="text-sm text-slate-600">
            Questions? <Link to="/agents" className="font-semibold text-brand-700 underline">Contact the team</Link>.
          </p>
        </div>
      </Section>
    </>
  )
}
