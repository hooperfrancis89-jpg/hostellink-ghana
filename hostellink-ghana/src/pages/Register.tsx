import StudentRegistrationForm from '../components/StudentRegistrationForm'
import { PageTitle, Section } from '../components/ui'

export default function Register() {
  return (
    <>
      <PageTitle title="Student Registration" intro="Register your interest and the team can help you find a suitable hostel." />
      <Section>
        <div className="mx-auto max-w-3xl">
          <StudentRegistrationForm />
        </div>
      </Section>
    </>
  )
}
