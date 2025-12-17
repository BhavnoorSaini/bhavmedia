import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BhavMedia Photography',
    short_name: 'BhavMedia',
    description: 'Professional restaurant, automotive, and event photography in the Chicagoland area.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon3.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon4.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}