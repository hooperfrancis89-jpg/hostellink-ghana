import SafetyInformation from '../components/SafetyInformation'
import { PageTitle, Section } from '../components/ui'

export default function Safety() {
  return (
    <>
      <PageTitle title="Safety and Verification" intro="How to protect yourself when looking for a hostel, and what our listing labels really mean." />
      <Section>
        <SafetyInformation />
      </Section>
    </>
  )
}
