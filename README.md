# BhavMedia — Photography & Visual Storytelling

BhavMedia is a professional photography studio based online. We capture weddings, portraits, events, and commercial shoots with a focus on authentic moments, clean composition, and beautiful color.

## Portfolio

- Browse the full portfolio on the site: the homepage and the `/gallery` route showcase selected projects and client galleries.
- Client galleries include private download links and high-resolution image delivery.

## Services

- Weddings & Engagements
- Automobile & Bikes
- Events & Editorial
- Portraits & Headshots
- Commercial & Product Photography
- Photo Editing, Retouching & Prints

For pricing and availability, request a personalized quote via the contact page.

## Booking & Contact

- Contact form: visit the site's `/contact` page.

Please include event date, location, and a brief description when enquiring.

## Client Deliverables

- Curated online gallery for proofing
- High-resolution downloads (JPEG, TIFF on request)
- Print-ready files and optional print orders
- Flexible licensing for personal and commercial use

## Run Locally (development)

If you want to run this site locally ( Next.js project), install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to preview locally.

## Tech & Credits

- Built with Next.js, Tailwind CSS, Supabase
- Infrastructure: Supabase handles authentication, the primary database, and private file storage used for client galleries and authenticated downloads (private client galleries are served under `/auth/client`). Cloudflare R2 is used for public-facing gallery storage (the `/gallery` route). See `lib/supabase` and `lib/r2` for implementation details.

## Artwork & Licensing

All images and creative work displayed on this site are the property of BhavMedia. Reuse or commercial licensing requires prior permission — contact us for licensing and prints.

---

© BhavMedia
