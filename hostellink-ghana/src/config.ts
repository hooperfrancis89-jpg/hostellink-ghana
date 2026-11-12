// Site-wide settings. Edit here, not in components.

export const SITE = {
  name: 'HostelLink Ghana',
  university: 'University of Professional Studies, Accra',
  group: 'ADM 6 | GROUP 6',
  challenge: 'Accra Digital Challenge Fund',
  /**
   * LOGO: while this is null a clearly labelled placeholder is shown.
   * To use a real logo: put the file in the `public/` folder, then set this to its file
   * name, e.g. 'upsa-logo.png'. Only use the official UPSA logo if you have permission.
   */
  logoFile: 'upsa-logo.jpg' as string | null,
  disclaimer:
    'HostelLink Ghana is an academic project developed by ADM 6, Group 6 at the University of Professional Studies, Accra. It is not an official UPSA accommodation service.',
} as const

export const TO_BE_CONFIRMED = 'Information to be confirmed'
