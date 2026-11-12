import { PageTitle, Section } from '../components/ui'
import { SITE } from '../config'
import { mainAdmin } from '../data/agents'
import { formatPhone } from '../utils/phone'

export default function Privacy() {
  return (
    <>
      <PageTitle title="Privacy Policy" intro="Plain-language privacy information for this academic demonstration." />
      <Section>
        <div className="max-w-3xl space-y-6 text-slate-700">
          <p>{SITE.disclaimer}</p>
          <div>
            <h2 className="text-xl font-bold text-brand-900">What we collect, and why</h2>
            <p className="mt-2">
              If you register, you type your full name, Student ID, age, institution, current location, hometown,
              preferred hostel location and phone number. This is used only so the team can recognise you as a student,
              understand where you are and where you would like to stay, and contact you about hostels.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-900">Where it goes</h2>
            <p className="mt-2">
              This website has no database. Your details stay in your browser, are placed into a WhatsApp message, and
              are sent <strong>only if you press Send</strong> in WhatsApp. They go to {mainAdmin.name} (
              {formatPhone(mainAdmin.phoneLocal)}). WhatsApp’s own terms and privacy policy apply to that message.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-900">What we do not do</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>We do not show students’ personal details publicly.</li>
              <li>We do not store registrations on this website, or use cookies, analytics or advertising trackers.</li>
              <li>We do not ask for payments, bank details, passwords or PINs.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-900">Hostel owners</h2>
            <p className="mt-2">
              Listing details you prepare are sent the same way, by WhatsApp. Photos are not uploaded to this website.
              Please share only photos and information you are authorised to share.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-900">Your choices</h2>
            <p className="mt-2">
              To ask the team to delete information you have sent, or to ask a question about this policy, message{' '}
              {mainAdmin.name} on WhatsApp. If this project becomes a full platform, this policy will be updated before
              any data is stored.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
