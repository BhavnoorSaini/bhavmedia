import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type FeaturedImage = {
  name: string;
  url: string;
};

interface FeaturedWorkSectionProps {
  images: FeaturedImage[];
}

export function FeaturedWorkSection({ images }: FeaturedWorkSectionProps) {
  if (images.length === 0) return null;

  // Use up to 6 images for the grid
  const featured = images.slice(0, 6);

  return (
    <section className="section-spacing bg-background">
      <div className="page-shell flex flex-col gap-12">
        <div className="flex flex-col items-center text-center space-y-5">
          <h2 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Recent Work
          </h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground max-w-2xl">
            A glimpse into recent shoots across Chicagoland.
          </p>
        </div>

        {/* Bento-style image grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:grid-rows-2">
          {featured.map((img, i) => (
            <div
              key={img.name}
              className={`group relative overflow-hidden rounded-2xl bg-muted/30 ${
                i === 0
                  ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={img.url}
                alt={img.name}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover transition duration-700 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View full portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
