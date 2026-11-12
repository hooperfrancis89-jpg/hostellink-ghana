import AgentDirectory from '../components/AgentDirectory'
import { Notice, PageTitle, Section } from '../components/ui'

export default function Agents() {
  return (
    <>
      <PageTitle
        title="Meet Our Agents"
        intro="Students can contact the team for help with hostel searches, enquiries and finding their way around the platform."
      />
      <Section>
        <AgentDirectory />
        <div className="mt-8">
          <Notice>
            These agents are members of the ADM 6, Group 6 project team. They are not claimed to be officially
            affiliated with UPSA, and the hostels listed on this site are not claimed to be verified. Never send money
            before reading the{' '}
            <a href="#/safety" className="font-semibold underline">safety checklist</a>.
          </Notice>
        </div>
      </Section>
    </>
  )
}
