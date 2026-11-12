import type { Agent } from '../types'

/**
 * ONE place to edit agent details.
 * Enter numbers in local format (10 digits starting with 0). They are converted to
 * international format (233...) automatically for WhatsApp and call links.
 *
 * VERIFY BEFORE PUBLISHING: Mohammed's number was originally supplied as "53 141 6480"
 * (9 digits). It has been entered as 0531416480 on the assumption that the leading 0 was
 * dropped. Confirm with Mohammed.
 */
export const agents: Agent[] = [
  {
    id: 'hooper-francis',
    name: 'Hooper Francis',
    role: 'Main Website Administrator / Primary Registration Contact',
    phoneLocal: '0593371476',
    isAdmin: true,
  },
  { id: 'edith-naa', name: 'Edith Naa', role: 'HostelLink Ghana Agent', phoneLocal: '0595592411' },
  { id: 'frank-adom', name: 'Frank Adom', role: 'HostelLink Ghana Agent', phoneLocal: '0540565297' },
  { id: 'ella', name: 'Ella', role: 'HostelLink Ghana Agent', phoneLocal: '0547184845' },
  { id: 'elizabeth', name: 'Elizabeth', role: 'HostelLink Ghana Agent', phoneLocal: '0538907418' },
  { id: 'hamida', name: 'Hamida', role: 'HostelLink Ghana Agent', phoneLocal: '0256734764' },
  // VERIFY: see note above.
  { id: 'mohammed', name: 'Mohammed', role: 'HostelLink Ghana Agent', phoneLocal: '0531416480' },
]

export const mainAdmin = agents.find((a) => a.isAdmin) as Agent
