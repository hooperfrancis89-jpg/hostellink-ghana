import { useState, type FormEvent } from 'react'
import { adminWaUrl } from '../utils/whatsapp'
import { btnWhatsApp, TextField } from './ui'

export default function ReportListing() {
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (reason.trim().length < 10) {
      setError('Please describe what looks suspicious or inaccurate (at least 10 characters).')
      document.getElementById('report-reason')?.focus()
      return
    }
    setError('')
    const text = [
      'HOSTELLINK GHANA — REPORT A LISTING',
      '',
      `Listing / agent: ${name.trim() || 'Not stated'}`,
      `What looks wrong: ${reason.trim()}`,
    ].join('\n')
    window.open(adminWaUrl(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5" aria-label="Report a suspicious or inaccurate listing">
      <h3 className="text-lg font-bold text-brand-900">Report a suspicious or inaccurate listing</h3>
      <p className="text-sm text-slate-700">
        This opens WhatsApp with your report ready for the main administrator. Please do not include your bank or
        mobile-money PIN or any password.
      </p>
      <TextField id="report-name" label="Listing or agent name" value={name} onChange={setName} />
      <TextField id="report-reason" label="What looks suspicious or inaccurate?" required multiline value={reason} onChange={(v) => { setReason(v); setError('') }} error={error} />
      <button type="submit" className={btnWhatsApp}>
        Prepare report in WhatsApp
      </button>
    </form>
  )
}
