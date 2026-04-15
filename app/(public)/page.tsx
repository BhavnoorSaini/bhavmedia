import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedWorkSection } from "@/components/home/featured-work-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";
import { heroHighlights, services, aboutFeatures } from "@/lib/content/home";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Home | BhavMedia",
  description:
    "Local Chicago, IL photographer specializing in premium restaurant, event, portrait, and car photography services. Based in Plainfield, IL, serving the entire Chicagoland area.",
  alternates: {
    canonical: "https://bhavmedia.com/",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
};

const FEATURED_IMAGE_KEYS = [
  "aurora-car-photography-acura-tlx-13.jpg",
  "joliet-car-photography-acura-tlx-1.jpg",
  "naperville-car-photography-acura-tlx-8.jpg",
  "romeoville-car-photography-acura-tlx-1.jpg",
  "romeoville-car-photography-acura-tlx-6.jpg",
  "joliet-car-photography-acura-tlx-3.jpg",
] as const;

function buildFeaturedImages() {
  const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  return FEATURED_IMAGE_KEYS.map((key) => ({
    name: key
      .split(".")[0]
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    url: `${R2_PUBLIC_URL}/${key}`,
  }));
}

export default function Home() {
  const featuredImages = buildFeaturedImages();

  return (
    <main className="flex flex-1 flex-col">
      <StructuredData />
      <HeroSection highlights={heroHighlights} />
      <FeaturedWorkSection images={featuredImages} />
      <AboutSection features={aboutFeatures} />
      <ServicesSection services={services} />
      <CtaSection />
    </main>
  );
}
