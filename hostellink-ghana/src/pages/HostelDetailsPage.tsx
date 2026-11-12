import { Link, useParams } from 'react-router-dom'
import HostelDetails from '../components/HostelDetails'
import { btnPrimary } from '../components/ui'
import { getHostel } from '../data/hostels'

export default function HostelDetailsPage() {
  const { id } = useParams()
  const hostel = id ? getHostel(id) : undefined
  if (!hostel) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-900">Hostel not found</h1>
        <p className="mt-2 text-slate-700">That listing does not exist or may have been removed.</p>
        <Link to="/hostels" className={`${btnPrimary} mt-6`}>
          Back to all hostels
        </Link>
      </div>
    )
  }
  return <HostelDetails hostel={hostel} />
}
