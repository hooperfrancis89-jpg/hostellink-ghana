# HostelLink Ghana

An academic project by **ADM 6 | GROUP 6**, University of Professional Studies, Accra (UPSA), for the **Accra Digital Challenge Fund** (Option C: private hostels near university campuses).

> HostelLink Ghana is an academic project developed by ADM 6, Group 6 at the University of Professional Studies, Accra. It is not an official UPSA accommodation service.

Stack: React 18, TypeScript, Tailwind CSS 3, React Router (HashRouter), Vite, Vitest. There is no backend. The built site is about 72 KB of JavaScript (gzipped), so it loads quickly on mobile data.

## Run it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the built site at http://localhost:4173
```

## Folder structure

```
public/                 favicon and (optional) your logo file
src/
  config.ts             site name, group, disclaimer, logo file name
  types.ts              Hostel, PriceOption, Agent types
  data/agents.ts        ALL agent details (edit here)
  data/hostels.ts       ALL hostel listings (edit here)
  utils/                phone, whatsapp, validation, filters (pure, unit-tested)
  components/           Header, Footer, Logo, StudentRegistrationForm, HostelSearch,
                        HostelCard, HostelDetails, BudgetFilter, PriceBlock, AgentCard,
                        AgentDirectory, HostelSubmissionForm, SafetyInformation,
                        ReportListing, VerificationTag, PhotoPlaceholder, ui
  pages/                Home, FindHostel, HostelDetailsPage, Register, ListHostel,
                        Agents, About, Safety, Privacy
  __tests__/core.test.ts
```

## How to change things

**Replace the logo.** The site shows a labelled placeholder until you set a logo.
1. Copy your logo into `public/`, e.g. `public/upsa-logo.png`.
2. In `src/config.ts`, set `logoFile: 'upsa-logo.png'`.
Use the official UPSA logo only if you have permission.

**Update agent details.** Edit `src/data/agents.ts`. Enter each number in local format (`0593371476`). The site converts it to `233593371476` for WhatsApp and call links, and shows it as `+233 59 337 1476`. The agent cards and the Home page both read from this file.

**Update hostel listings.** Edit `src/data/hostels.ts`. Copy a block, give it a new unique `id`, and fill in only what you have confirmed. Leave unknown fields as `null` or `[]` and the site shows "Information to be confirmed" automatically. Add genuine, permitted photo URLs to `photos`. Keep `verification: 'unreviewed'` unless you have run a real verification process.

**Change prices and payment periods.** Each hostel has a `prices` list. Every entry needs an `amount`, a `period` (`'semester'`, `'academic-year'`, `'term'` or `'month'`) and a `label` (room type). Set `verified: true` only if the figure comes from a written or published source, and say which in `note`. A hostel with an empty `prices` list shows "Price to be confirmed."

## Deploy

The site uses `HashRouter` and a relative base path, so `dist/` works on any static host with no server rules.
- **Netlify**: run `npm run build`, then drag the `dist/` folder onto app.netlify.com/drop.
- **Vercel**: import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages**: upload the repo, run `npm run build`, and publish the contents of `dist/` (for example with the `gh-pages` package or a Pages workflow).

## What works today (frontend only)

- Responsive navigation, with a mobile menu, across all nine pages.
- Student registration with validation. It builds the required message from the real values entered and opens WhatsApp to the primary contact. The student must press Send. It never claims the message was sent.
- All seven agent contacts, each with a WhatsApp button and a call button. The admin card is visually distinct.
- Hostel search, five budget presets, min/max budget, location filters, sorting and clear filters.
- Hostel detail pages with source links, enquiry and "Request a Booking" buttons that open WhatsApp.
- A listing form with validation. It prepares a WhatsApp message to the admin and labels the listing "Pending Review".
- A suspicious-listing report form, the safety checklist, privacy policy, About page, business model and user-growth plan.

## What needs a backend or external service

| Feature | What it needs |
| --- | --- |
| Saving registrations or listings | A database and a secure API (e.g. Supabase, Firebase). Today nothing is stored, and the site says so. |
| Photo uploads | File storage. Right now photos are not uploaded: owners send them in WhatsApp. |
| Admin review and "Pending Review" to "Published" | Authentication plus an admin dashboard |
| Real-time availability | Hostel owners updating data, via a dashboard or API |
| Bookings and payments | A payment provider (e.g. Paystack or Flutterwave) and a confirmation process. The site processes no payments. |
| A genuine "Verified" badge | A written verification procedure carried out by people. No listing is verified, and the badge is never shown. |

Never put secret API keys in this frontend code. Use a backend for anything private.

## Testing summary

Run on this build:
- **Unit tests** (`npm test`): 15 pass. They cover phone normalisation, the WhatsApp URL and message, validation (including Student ID kept as text with leading zeros), data honesty, search, budgets, sorting and payment-period isolation.
- **Real-browser walkthrough** (headless Chromium against the built site): 54 checks pass. They cover branding, registration validation and its WhatsApp message, all seven agents' WhatsApp links, filters and sorting, detail pages, unknown-data labels, the absence of verification badges and "Booking Confirmed", the listing form, every page, the mobile menu, and no horizontal scrolling at 375 px.
- **Not tested**: real WhatsApp opening on a phone. The test checks the exact URL the site opens, but this environment cannot reach whatsapp.com. Please try it on your phone. Also untested: Safari/iOS and screen readers.

## Check before you publish

1. **Mohammed's number.** It was supplied as `53 141 6480` (9 digits) and is entered as `0531416480`. Confirm it with him. It is flagged in `src/data/agents.ts`.
2. **Phone numbers** for the other agents: check each one with its owner.
3. **UPSA fees** on the official hostels come from UPSA's notice for 1st semester 2025/26 and may have changed. Confirm current fees at upsa.edu.gh.
4. **Private hostels** have no confirmed address, price, facilities or availability. The names come from the research links you supplied. Contact each hostel, then fill in `src/data/hostels.ts`.
5. **ghhostels.com** blocks automated reading, so nothing was taken from it. Check it by hand if you want to use it as a source.
6. **Photos**: placeholders are shown. Add real photos only with the owner's permission.
7. **Agent assignment**: no hostel has a specific agent yet, so all enquiries go to the main administrator.
8. **Logo**: set it up as described above, if you have permission to use it.

## Honest-data rules built into the project

No fake reviews, testimonials, statistics, badges or invented hostel details. Prices always show a payment period. Budgets are compared only with prices in the same period. Official UPSA hostels (Hostel A, Matthew Opoku Prempeh, Amon Kotei) are labelled as official university accommodation and are never offered as bookable through HostelLink Ghana.
