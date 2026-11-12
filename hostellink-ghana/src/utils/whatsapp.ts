import { mainAdmin } from '../data/agents'
import { toInternational } from './phone'

export interface RegistrationValues {
  fullName: string
  studentId: string
  age: string
  institution: string
  currentLocation: string
  hometown: string
  preferredLocation: string
  phone: string
}

/** wa.me click-to-chat URL. `number` may be local or international; text is URL-encoded. */
export function waUrl(number: string, text?: string): string {
  const intl = toInternational(number)
  if (!intl) return '#'
  return `https://wa.me/${intl}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}

export const adminWaUrl = (text?: string): string => waUrl(mainAdmin.phoneLocal, text)

export function registrationMessage(v: RegistrationValues): string {
  return [
    'HOSTELLINK GHANA — NEW STUDENT REGISTRATION',
    '',
    `Full Name: ${v.fullName.trim()}`,
    `Student ID: ${v.studentId.trim()}`,
    `Age: ${v.age.trim()}`,
    `Current Institution: ${v.institution.trim()}`,
    `Current Location: ${v.currentLocation.trim()}`,
    `Hometown: ${v.hometown.trim()}`,
    `Preferred Hostel Location: ${v.preferredLocation.trim()}`,
    `Phone Number: ${v.phone.trim()}`,
    '',
    'Registration Source: HostelLink Ghana',
    'Project Team: ADM 6 | GROUP 6',
  ].join('\n')
}

export const enquiryMessage = (hostelName: string, area: string): string =>
  `Hello HostelLink Ghana, I would like to send an enquiry about ${hostelName} (${area}). Please confirm the current price, payment period, room types and availability. Sent from the HostelLink Ghana website.`

export const bookingRequestMessage = (hostelName: string, area: string): string =>
  `Hello HostelLink Ghana, I would like to REQUEST a booking at ${hostelName} (${area}). I understand this is a request only and not a confirmed booking. Please tell me the next steps, the price, payment period and what the payment covers. Sent from the HostelLink Ghana website.`
