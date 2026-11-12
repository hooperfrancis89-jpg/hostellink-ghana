# Hostel photograph record

Rule: a photo is added only if (1) there is reasonable evidence it shows THIS property and
(2) the owner or licence allows reuse. Nothing here is "verified".

Last research: 20 Oct 2026. Searched for official websites and social pages for each private
hostel. Results were unrelated places (e.g. a "Madina Hostel" in Egypt, Airbnb/Expedia pages
for other properties) or listing sites whose photos cannot be reused. No qualifying photo
was found, so NO photos have been added.

| Listing | Category | Photo on site | Source / permission | Still needed |
|---|---|---|---|---|
| Hostel A | Official UPSA | none | none found | Photo from UPSA with written permission |
| Matthew Opoku Prempeh Hostel | Official UPSA | none | none found | Photo from UPSA with written permission |
| Amon Kotei Hostel | Official UPSA | none | none found | Photo from UPSA with written permission |
| Green Hostel, Madina | Private | none | none found | Owner-supplied photos + permission |
| HTC Tower, Madina | Private | none | none found | Owner-supplied photos + permission |
| P-Cular Heights, Madina | Private | none | none found | Owner-supplied photos + permission |
| Goodwill Plaza Hostel | Private | none | none found | Owner-supplied photos + permission |
| The Nest, ARS Avenue | Private | none | none found | Owner-supplied photos + permission |
| La Nyanteh Hostel | Private | none | none found | Owner-supplied photos + permission |

## How to add a photo
1. Get the photo from the owner and ask in WhatsApp: "May HostelLink Ghana show this photo on its academic project website?" Keep their reply (screenshot).
2. Resize it to about 1200 px wide (JPG, under 300 KB).
3. Save it in `public/hostel-photos/` with a descriptive name, e.g. `green-hostel-madina-front-gate.jpg`.
4. In `src/data/hostels.ts`, add to that hostel: `photos: [{ src: 'hostel-photos/green-hostel-madina-front-gate.jpg', alt: 'Front gate of Green Hostel, Madina', source: 'Supplied by the hostel owner, 20 Oct 2026', permission: 'owner-supplied' }]`
5. Update the table above.

## UPSA logo
`public/upsa-logo.jpg` was supplied by the project owner (Hooper) on 20 Oct 2026. It is shown unaltered
on a white background. Its use is for this academic project and does not imply UPSA endorsement.
Confirm you are allowed to use it. The file is low resolution (236x120); ask UPSA for a higher-quality copy if you can.
