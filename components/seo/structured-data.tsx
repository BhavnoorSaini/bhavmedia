export function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BhavMedia",
    "url": "https://bhavmedia.com",
    "logo": "https://bhavmedia.com/icon4.png",
    "image": "https://bhavmedia.com/opengraph-image.png",
    "description": "Professional restaurant, automotive, and event photography serving the Chicagoland area and surrounding suburbs.",
    "telephone": "+1-630-596-6820",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Plainfield",
      "addressRegion": "IL",
      "postalCode": "60544",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6322,
      "longitude": -88.2039
    },
    "areaServed": [
      { "@type": "City", "name": "Chicago" },
      { "@type": "City", "name": "Plainfield" },
      { "@type": "City", "name": "Naperville" },
      { "@type": "City", "name": "Joliet" },
      { "@type": "City", "name": "Aurora" },
      { "@type": "City", "name": "Bolingbrook" },
      { "@type": "City", "name": "Downers Grove" }
    ],
    "sameAs": [
      "https://www.instagram.com/tlx.aspexy"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BhavMedia",
    "url": "https://bhavmedia.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bhavmedia.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}