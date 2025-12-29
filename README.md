# BhavMedia — Photography & Visual Storytelling

BhavMedia is a professional photography studio based online. We capture weddings, portraits, events, and commercial shoots with a focus on authentic moments, clean composition, and beautiful color.

## Features

- Responsive, high-performance portfolio and gallery pages
- Public gallery served from Cloudflare R2 (`/gallery`) for fast CDN delivery
- Private client galleries with authenticated access and private file storage (Supabase) at `/auth/client`
- Account-based authentication and database powered by Supabase
- High-resolution downloads, print-ready files, and optional print ordering
- Contact form uses Resend for transactional emails
- Built with Next.js and Tailwind CSS for fast local development and deployment

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

If you want to run this site locally (Next.js project), create a `.env.local` file with the required environment variables (example below), install dependencies, and start the dev server.

Create a `.env.local` file with these variables (fill in values):

```env
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_BUCKET_NAME=
NEXT_PUBLIC_R2_PUBLIC_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=

NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL=
NEXT_PUBLIC_SOCIAL_TIKTOK_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
```

Note: the contact page uses Resend for sending emails.

Install dependencies and run the dev server:

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
