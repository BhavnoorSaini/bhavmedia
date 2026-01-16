import { MetadataRoute } from 'next';

const SITE_URL = 'https://bhavmedia.com/';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/gallery',
        '/contact',
        '/_next/static/',
      ],
      disallow: [
        '/protected/',
        '/auth/',
        '/api/',
      ],
    },
    sitemap: `${SITE_URL}sitemap.xml`,
  }
}