import type { HeroHighlight } from "@/lib/content/home";
import type { FeaturedImage } from "./featured-work-section";
import Image from "next/image";
import Link from "next/link";

type HeroSectionProps = {
  highlights: ReadonlyArray<HeroHighlight>;
  images?: FeaturedImage[];
};

export function HeroSection({ highlights, images = [] }: HeroSectionProps) {
  const heroImages = images.slice(0, 3);

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background pb-24 pt-32">
      {/* Layered background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-muted/40 via-transparent to-transparent" />

      <div className="page-shell relative z-20 flex flex-col gap-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Photography &middot; Direction &middot; Retouching
          </p>
          <h1 className="text-balance text-5xl font-light tracking-tight text-foreground leading-[1.08] sm:text-8xl">
            Professional Photography for{" "}
            <br className="hidden sm:block" />
            <span className="font-medium text-foreground">
              Chicagoland Brands
            </span>
          </h1>
          <p className="max-w-2xl text-balance text-lg font-light leading-relaxed text-muted-foreground sm:text-2xl">
            Based in Plainfield, IL, we specialize in restaurant launches,
            editorial menu features, and brand storytelling across the
            Chicagoland area.
          </p>
          <div className="flex w-full max-w-md flex-row justify-center gap-3 pt-6 sm:max-w-none sm:gap-4">
            <Link
              href="/gallery"
              className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-xl shadow-foreground/10 transition-transform hover:scale-105 sm:h-14 sm:flex-none sm:px-8 sm:text-base"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-border bg-background/50 px-4 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-muted sm:h-14 sm:flex-none sm:px-8 sm:text-base"
            >
              Book a Session
            </Link>
          </div>
        </div>

        {/* Hero image preview strip */}
        {heroImages.length > 0 && (
          <div className="mx-auto flex w-full max-w-3xl gap-3 sm:gap-4">
            {heroImages.map((img, i) => (
              <div
                key={img.name}
                className={`relative overflow-hidden rounded-2xl bg-muted/30 ${
                  i === 1
                    ? "aspect-[3/4] flex-[1.2]"
                    : "aspect-[3/4] flex-1 hidden sm:block"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  sizes={i === 1 ? "40vw" : "25vw"}
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid w-full gap-10 border-t border-border/50 pt-12 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col items-center gap-5 text-center"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-medium tracking-wide text-foreground">
                  {title}
                </h3>
                <p className="text-base font-light leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
