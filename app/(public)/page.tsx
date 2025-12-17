import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
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
    canonical: "https://bhavmedia.com",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <StructuredData />
      <HeroSection highlights={heroHighlights} />
      <AboutSection features={aboutFeatures} />
      <ServicesSection services={services} />
      <CtaSection />
    </main>
  );
}
