import { MetadataRoute } from 'next';

const SITE_URL = 'https://bhavmedia.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/protected/client/', '/auth/login'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}