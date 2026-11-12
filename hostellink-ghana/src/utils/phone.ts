/**
 * Converts a Ghana phone number to international digits without "+", e.g.
 *   "0593371476", "+233 59 337 1476", "059 337 1476", "233593371476" -> "233593371476"
 * Returns null if the input is not a plausible Ghana number.
 */
export function toInternational(input: string): string | null {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  if (d.startsWith('233')) {
    // handles "+233 (0)59..." typed with an extra zero
    if (d.length === 13 && d[3] === '0') d = '233' + d.slice(4)
  } else if (d.startsWith('0') && d.length === 10) {
    d = '233' + d.slice(1)
  } else {
    return null
  }
  return /^233[2-5]\d{8}$/.test(d) ? d : null
}

export function isValidGhanaPhone(input: string): boolean {
  return toInternational(input) !== null
}

/** "233593371476" or "0593371476" -> "+233 59 337 1476" */
export function formatPhone(input: string): string {
  const intl = toInternational(input)
  if (!intl) return input
  return `+233 ${intl.slice(3, 5)} ${intl.slice(5, 8)} ${intl.slice(8)}`
}

export const telHref = (input: string): string => {
  const intl = toInternational(input)
  return intl ? `tel:+${intl}` : '#'
}
