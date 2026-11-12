import { isValidGhanaPhone } from './phone'
import type { RegistrationValues } from './whatsapp'

export type Errors<T> = Partial<Record<keyof T, string>>

const hasLetters = (s: string): boolean => /\p{L}.*\p{L}/u.test(s)

export function validateRegistration(v: RegistrationValues): Errors<RegistrationValues> {
  const e: Errors<RegistrationValues> = {}
  const name = v.fullName.trim()
  if (!name) e.fullName = 'Please enter your full name.'
  else if (name.length < 3 || !hasLetters(name)) e.fullName = 'Enter your full name using letters (at least 3 characters).'

  // Student ID is TEXT: it can contain letters and leading zeros (e.g. 0012345 or UP/12/345).
  const sid = v.studentId.trim()
  if (!sid) e.studentId = 'Please enter your Student ID.'
  else if (!/^[A-Za-z0-9][A-Za-z0-9/\-\s]{2,24}$/.test(sid))
    e.studentId = 'Student ID should be 3–25 characters: letters, numbers, spaces, "/" or "-".'

  const age = v.age.trim()
  if (!age) e.age = 'Please enter your age.'
  else if (!/^\d+$/.test(age)) e.age = 'Age must be a whole number, e.g. 21.'
  else if (Number(age) < 15 || Number(age) > 70) e.age = 'Please enter an age between 15 and 70.'

  if (!v.institution.trim()) e.institution = 'Please enter your current institution.'
  if (!v.currentLocation.trim()) e.currentLocation = 'Please enter where you are staying now.'
  if (!v.hometown.trim()) e.hometown = 'Please enter your hometown or place of origin.'
  if (!v.preferredLocation.trim()) e.preferredLocation = 'Please enter your preferred hostel location, e.g. Madina.'

  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!isValidGhanaPhone(v.phone))
    e.phone = 'Enter a valid Ghana number, e.g. 024 123 4567 or +233 24 123 4567.'
  return e
}

export interface ListingValues {
  hostelName: string
  ownerName: string
  contact: string
  email: string
  location: string
  description: string
  roomTypes: string
  prices: string
  paymentPeriod: string
  facilities: string[]
  otherFacilities: string
  availability: string
  preferredContact: string
  consent: boolean
}

export function validateListing(v: ListingValues): Errors<ListingValues> {
  const e: Errors<ListingValues> = {}
  if (!v.hostelName.trim()) e.hostelName = 'Please enter the hostel name.'
  if (!v.ownerName.trim()) e.ownerName = 'Please enter the owner or representative’s name.'
  if (!v.contact.trim()) e.contact = 'Please enter a contact number.'
  else if (!isValidGhanaPhone(v.contact)) e.contact = 'Enter a valid Ghana number, e.g. 024 123 4567.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'That email address does not look right.'
  if (!v.location.trim()) e.location = 'Please enter the hostel location.'
  if (v.description.trim().length < 20) e.description = 'Please describe the hostel in at least 20 characters.'
  if (!v.roomTypes.trim()) e.roomTypes = 'List the room types, or write "To be confirmed".'
  if (!v.prices.trim()) e.prices = 'Enter the prices, or write "To be confirmed".'
  if (!v.paymentPeriod) e.paymentPeriod = 'Choose the payment period.'
  if (!v.preferredContact) e.preferredContact = 'Choose how you would like to be contacted.'
  if (!v.consent) e.consent = 'You must confirm that you are authorised to provide this information.'
  return e
}
