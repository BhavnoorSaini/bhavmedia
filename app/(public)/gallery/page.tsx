import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/r2/r2";
import { GalleryGrid } from "@/components/gallery/public-gallery";
import { Suspense } from "react";
import type { Metadata } from "next";
import { GallerySkeleton } from "@/components/gallery/gallery-skeleton";

export const metadata: Metadata = {
  title: "Gallery | BhavMedia",
  description:
    "Explore our professional photography portfolio featuring restaurant, car, and event photography across Chicago, Plainfield, and the surrounding Chicagoland area.",
  alternates: {
    canonical: "https://bhavmedia.com/gallery",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
};

async function getGalleryImages() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
  });

  try {
    const { Contents } = await r2Client.send(command);
    const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

    return Contents?.map((file) => ({
      // Strip and space image name so it can be used as alt text
      name: (file.Key || "").split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      url: `${R2_PUBLIC_URL}/${file.Key}`,
    })) || [];
  } catch (error) {
    console.error("R2 Fetch Error:", error);
    return [];
  }
}

export default function GalleryPage() {
  return (
    <main className="flex flex-col flex-1 bg-background min-h-screen">
      <section className="section-spacing pt-24 pb-24 border-t border-border/40">
        <div className="page-shell max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h1 className="text-balance text-5xl font-light tracking-tight text-foreground sm:text-7xl leading-[1.1]">
              Portfolio
            </h1>
            <p className="max-w-2xl mx-auto text-balance text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              A curated selection of recent editorial, portrait, and brand photography.
            </p>
          </div>
          
          <Suspense fallback={<GallerySkeleton />}>
            <GalleryContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

async function GalleryContent() {
  const images = await getGalleryImages();
  return <GalleryGrid images={images} />;
}
