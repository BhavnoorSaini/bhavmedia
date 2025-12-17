import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";
import { heroHighlights, services, aboutFeatures } from "@/lib/content/home";

export const metadata: Metadata = {
  title: {
    absolute: "BhavMedia",
  },
  description:
    "See how BhavMedia plans shoots, directs talent, and delivers for restaurants, portraits, events, automobiles, and real-estate projects.",
  openGraph: {
    title: "BhavMedia Photography Studio",
    description:
      "Thoughtful photography with menu, portrait, event, automotive, and property coverage plus retouching and streamlined gallery delivery.",
    url: "/",
    type: "website",
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
