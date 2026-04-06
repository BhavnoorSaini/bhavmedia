import type { HeroHighlight } from "@/lib/content/home";
import Link from "next/link";

type HeroSectionProps = {
  highlights: ReadonlyArray<HeroHighlight>;
};

export function HeroSection({ highlights }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center pb-24 pt-32 overflow-hidden bg-background">
      {/* Subtle modern background gradient or pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="page-shell relative z-20 flex flex-col gap-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-balance text-6xl font-light tracking-tight text-foreground sm:text-8xl leading-[1.05]">
            Professional Photography for <br className="hidden sm:block" />
            <span className="font-medium text-foreground">Chicagoland Brands</span>
          </h1>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground sm:text-2xl font-light leading-relaxed">
            Based in Plainfield, IL, we specialize in restaurant launches, editorial menu features, and brand storytelling across the Chicagoland area.
          </p>
          <div className="pt-6 flex flex-row justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
            <Link 
              href="/gallery"
              className="flex-1 sm:flex-none inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-foreground px-4 sm:px-8 text-sm sm:text-base font-medium text-background transition-transform hover:scale-105 shadow-xl shadow-foreground/10 whitespace-nowrap"
            >
              View Portfolio
            </Link>
            <Link 
              href="/contact"
              className="flex-1 sm:flex-none inline-flex h-12 sm:h-14 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 sm:px-8 text-sm sm:text-base font-medium transition-colors hover:bg-muted whitespace-nowrap"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-10 sm:grid-cols-3 pt-12 border-t border-border/50">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center gap-5 group">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-medium tracking-wide text-foreground">{title}</h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
