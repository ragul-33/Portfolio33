/**
 * ---------------------------------------------------------------------------
 * SITE CONFIG — the single place to edit contact details and social links.
 * ---------------------------------------------------------------------------
 * Change the values below and the whole site updates. Nothing here is invented
 * by the template: only fill in links that actually exist, and leave a value as
 * an empty string ('') if a channel is not set up yet. Any link left empty is
 * rendered as a quiet placeholder instead of a dead link.
 */

export const CONTACT = {
  /** The address used by the contact form (Gmail compose / mailto fallback). */
  EMAIL: 'ragulmanickam33@gmail.com',

  /** Instagram profile URL. Leave '' until you have one — no invented links. */
  INSTAGRAM_URL: 'https://www.instagram.com/ragul__.33/?utm_source=ig_web_button_share_sheet',

  /** LinkedIn profile URL. */
  LINKEDIN_URL: 'https://www.linkedin.com/in/ragul-m-45446842b/',

  /** Resume file (place the PDF in /public). */
  RESUME_URL: '/resume.pdf',
};

export const IDENTITY = {
  NAME: 'Ragul',
  WORDMARK: 'Ragul.',
  ROLES: ['CREATIVE + DATA THINKER', 'BUSINESS ANALYSIS', 'DIGITAL DESIGNER'],
  /** Already established on the hero — kept here so it lives in one place. */
  LOCATION: 'Tirupur, India',
  LOCATION_SHORT: 'Tirupur, IN',
  TIMEZONE: 'IST (UTC +5:30)',
  AVAILABILITY: 'OPEN TO DATA, BUSINESS & CREATIVE ROLES',
  /** Ragul's personal sign-off. Kept here so it can be changed in one place. */
  SIGNATURE_EMOJI: '😏',
};

/**
 * Section numbering, in page order. The hero opens the page but is deliberately
 * unnumbered, so ABOUT is 01. `SectionHead` and the mobile menu both read from
 * here — previously the mobile menu counted `i + 2` and drifted out of step
 * with the real section numbers.
 */
export const SECTION_INDEX = {
  hero: '00',
  about: '01',
  capabilities: '02',
  tools: '03',
  process: '04',
  services: '05',
  identity: '—',
  collaboration: '06',
  contact: '07',
  human: '08',
};

/** Primary navigation — every entry scrolls to the matching section id. */
export const NAV_LINKS = [
  { label: 'ABOUT', href: '#about', index: SECTION_INDEX.about },
  { label: 'CAPABILITIES', href: '#capabilities', index: SECTION_INDEX.capabilities },
  { label: 'TOOLS', href: '#tools', index: SECTION_INDEX.tools },
  { label: 'SERVICES', href: '#services', index: SECTION_INDEX.services },
  { label: 'CONTACT', href: '#contact', index: SECTION_INDEX.contact },
];

export const FOOTER_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'TOOLS', href: '#tools' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
];

export const MAILTO_SUBJECT = 'Portfolio Inquiry';