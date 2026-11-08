# BhavMedia

My photography site at [bhavmedia.com](https://bhavmedia.com): a public portfolio, plus a private portal where clients sign in to view and download their photos.

## How it works

Public and client photos are stored separately because they're accessed in different ways.

- **Public gallery:** Portfolio images live in Cloudflare R2 and load straight from its public URL. The gallery page just lists the bucket, and the CDN handles delivery.
- **Client galleries:** Paid work lives in a private Supabase Storage bucket, with one folder per client. When a client signs in, the server looks up their folder from their profile and creates signed links that expire after an hour. Links are requested in parallel batches of 90 to stay under Supabase's limit of 100 per request.
- **Download all:** A server route collects a client's files and returns them as a single ZIP.
- **Accounts:** Clients can't sign up on their own; accounts are created for them. Sessions are refreshed in the Next.js proxy, client pages are hidden from search engines, and clients are signed out automatically when they leave the portal.
- **Contact form:** Inquiries arrive by email through Resend.

## Built with

Next.js · TypeScript · Tailwind CSS · Supabase (Auth, Postgres, Storage) · Cloudflare R2 · Resend · Vercel

## Photos

All photographs on the site are © BhavMedia and may not be reused without permission.
