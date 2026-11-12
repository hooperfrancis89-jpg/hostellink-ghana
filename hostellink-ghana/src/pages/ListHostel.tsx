import HostelSubmissionForm from '../components/HostelSubmissionForm'
import { PageTitle, Section } from '../components/ui'

export default function ListHostel() {
  return (
    <>
      <PageTitle
        title="List Your Hostel on HostelLink Ghana"
        intro="Reach more students, present your accommodation clearly, and make it easier for prospective residents to enquire about your property."
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <HostelSubmissionForm />
        </div>
      </Section>
    </>
  )
}
