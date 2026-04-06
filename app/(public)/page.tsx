import type { Metadata } from "next";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/r2/r2";
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

export const dynamic = "force-dynamic";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function getFeaturedImages() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
    });
    const { Contents } = await r2Client.send(command);
    const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

    const all =
      Contents?.map((file) => ({
        name: (file.Key || "")
          .split(".")[0]
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        url: `${R2_PUBLIC_URL}/${file.Key}`,
      })) || [];

    return shuffle(all);
  } catch {
    return [];
  }
}

export default async function Home() {
  const images = await getFeaturedImages();
  const heroImages = images.slice(0, 3);
  const featuredImages = images.slice(3, 9);

  return (
    <main className="flex flex-1 flex-col">
      <StructuredData />
      <HeroSection highlights={heroHighlights} images={heroImages} />
      <FeaturedWorkSection images={featuredImages} />
      <AboutSection features={aboutFeatures} />
      <ServicesSection services={services} />
      <CtaSection />
    </main>
  );
}
