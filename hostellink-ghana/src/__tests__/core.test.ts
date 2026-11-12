import { describe, expect, it } from 'vitest'
import { agents, mainAdmin } from '../data/agents'
import { hostels } from '../data/hostels'
import { filterHostels, defaultFilters, budgetPresets } from '../utils/filters'
import { formatPhone, isValidGhanaPhone, toInternational } from '../utils/phone'
import { registrationMessage, waUrl } from '../utils/whatsapp'
import { validateListing, validateRegistration } from '../utils/validation'

const good = {
  fullName: 'Ama Mensah', studentId: '0012345', age: '21', institution: 'UPSA',
  currentLocation: 'Madina', hometown: 'Kumasi', preferredLocation: 'Madina', phone: '024 123 4567',
}

describe('phone helpers', () => {
  it('normalises Ghana numbers', () => {
    for (const n of ['0593371476', '+233 59 337 1476', '059 337 1476', '233593371476'])
      expect(toInternational(n)).toBe('233593371476')
  })
  it('rejects bad numbers', () => {
    for (const n of ['12345', '0193371476', 'abc', '059337147']) expect(isValidGhanaPhone(n)).toBe(false)
  })
  it('formats for display', () => expect(formatPhone('0593371476')).toBe('+233 59 337 1476'))
})

describe('agents', () => {
  it('has exactly seven agents with the supplied numbers', () => {
    expect(agents.map((a) => [a.name, toInternational(a.phoneLocal)])).toEqual([
      ['Hooper Francis', '233593371476'], ['Edith Naa', '233595592411'], ['Frank Adom', '233540565297'],
      ['Ella', '233547184845'], ['Elizabeth', '233538907418'], ['Hamida', '233256734764'],
      ['Mohammed', '233531416480'],
    ])
    expect(mainAdmin.name).toBe('Hooper Francis')
  })
})

describe('registration', () => {
  it('accepts valid input and keeps Student ID as text with leading zeros', () => {
    expect(validateRegistration(good)).toEqual({})
    expect(registrationMessage(good)).toContain('Student ID: 0012345')
  })
  it('flags each bad field', () => {
    const e = validateRegistration({ ...good, fullName: '', studentId: '', age: '2x', phone: '123', hometown: '' })
    expect(Object.keys(e).sort()).toEqual(['age', 'fullName', 'hometown', 'phone', 'studentId'])
    expect(validateRegistration({ ...good, age: '5' }).age).toBeTruthy()
    expect(validateRegistration({ ...good, age: '150' }).age).toBeTruthy()
    expect(validateRegistration({ ...good, studentId: 'UP/12/345' })).toEqual({})
  })
  it('builds the WhatsApp message in the required format and URL for the admin', () => {
    const msg = registrationMessage(good)
    expect(msg.split('\n')[0]).toBe('HOSTELLINK GHANA — NEW STUDENT REGISTRATION')
    expect(msg).toContain('Full Name: Ama Mensah')
    expect(msg).toContain('Phone Number: 024 123 4567')
    expect(msg.endsWith('Project Team: ADM 6 | GROUP 6')).toBe(true)
    const url = waUrl(mainAdmin.phoneLocal, msg)
    expect(url.startsWith('https://wa.me/233593371476?text=')).toBe(true)
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(msg)
  })
})

describe('listing form', () => {
  it('requires consent and valid fields', () => {
    const e = validateListing({
      hostelName: '', ownerName: '', contact: 'x', email: 'bad', location: '', description: 'short',
      roomTypes: '', prices: '', paymentPeriod: '', facilities: [], otherFacilities: '',
      availability: '', preferredContact: '', consent: false,
    })
    expect(Object.keys(e)).toEqual(expect.arrayContaining(['hostelName', 'contact', 'email', 'description', 'consent', 'paymentPeriod']))
  })
})

describe('hostel data honesty', () => {
  it('has no duplicate ids or names', () => {
    expect(new Set(hostels.map((h) => h.id)).size).toBe(hostels.length)
    expect(new Set(hostels.map((h) => h.name.toLowerCase())).size).toBe(hostels.length)
  })
  it('never marks anything verified and always attaches a period to a price', () => {
    for (const h of hostels) {
      expect(h.verification).not.toBe('verified')
      for (const p of h.prices) expect(p.period).toBeTruthy()
      expect(h.sources.length).toBeGreaterThan(0)
    }
  })
  it('classifies Amon Kotei as official UPSA accommodation, not private', () => {
    expect(hostels.find((h) => h.id === 'amon-kotei-hostel')?.category).toBe('official-university')
  })
})

describe('filters', () => {
  const f = (p: Partial<typeof defaultFilters>) => ({ ...defaultFilters, ...p })
  it('search by name and area', () => {
    expect(filterHostels(hostels, f({ query: 'amon' })).results.map((h) => h.id)).toEqual(['amon-kotei-hostel'])
    expect(filterHostels(hostels, f({ query: 'madina' })).results.length).toBeGreaterThan(3)
    expect(filterHostels(hostels, f({ query: 'zzzz' })).results).toEqual([])
  })
  it('budget presets filter per-semester prices and hide unpriced listings', () => {
    const preset = (id: string) => f({ presetId: id })
    expect(filterHostels(hostels, preset('2500-3000')).results.map((h) => h.id).sort())
      .toEqual(['amon-kotei-hostel', 'matthew-opoku-prempeh-hostel'])
    expect(filterHostels(hostels, preset('above-5000')).results).toHaveLength(3)
    expect(filterHostels(hostels, preset('3500-4000')).results).toHaveLength(0)
    expect(filterHostels(hostels, preset('2500-3000')).hiddenForUnknownPrice).toBe(6)
    expect(budgetPresets).toHaveLength(5)
  })
  it('does not compare different payment periods', () => {
    expect(filterHostels(hostels, f({ presetId: '2500-3000', comparePeriod: 'academic-year' })).results).toEqual([])
    expect(filterHostels(hostels, f({ presetId: '2500-3000', comparePeriod: 'month' })).results).toEqual([])
  })
  it('min/max budget and sorting', () => {
    expect(filterHostels(hostels, f({ minBudget: '5000', maxBudget: '6000' })).results.map((h) => h.id)).toEqual(['hostel-a'])
    const asc = filterHostels(hostels, f({ sort: 'price-asc' })).results
    expect(asc.slice(0, 3).map((h) => h.id)).toEqual(['hostel-a', 'matthew-opoku-prempeh-hostel', 'amon-kotei-hostel'])
    const desc = filterHostels(hostels, f({ sort: 'price-desc' })).results
    expect(desc[0].id).toBe('amon-kotei-hostel')
    expect(desc.slice(-1)[0].prices).toHaveLength(0) // unpriced last
    const names = filterHostels(hostels, f({ sort: 'name' })).results.map((h) => h.name)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })
})
