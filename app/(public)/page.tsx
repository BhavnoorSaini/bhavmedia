import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";
import { heroHighlights, services, aboutFeatures } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Home",
  description:
    "BhavMedia captures restaurant launches, car shoots, portraits, events, and real-estate.",
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
      <HeroSection highlights={heroHighlights} />
      <AboutSection features={aboutFeatures} />
      <ServicesSection services={services} />
      <CtaSection />
    </main>
  );
}
