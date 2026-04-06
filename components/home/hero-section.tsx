import type { HeroHighlight } from "@/lib/content/home";

type HeroSectionProps = {
  highlights: ReadonlyArray<HeroHighlight>;
};

export function HeroSection({ highlights }: HeroSectionProps) {
  return (
    <section className="section-spacing bg-background pt-24 pb-16">
      <div className="page-shell flex flex-col items-center text-center gap-20">
        <div className="max-w-4xl space-y-8 mt-12">
          <h1 className="text-balance text-5xl font-light tracking-tight text-foreground sm:text-7xl leading-tight">
            Professional Photography for <br className="hidden sm:block" />
            <span className="font-medium">Chicagoland Brands</span>
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl font-light leading-relaxed">
            Based in Plainfield, IL, we specialize in restaurant launches, editorial menu features, and brand storytelling across the Chicagoland area.
          </p>
        </div>

        <div className="grid w-full gap-12 sm:grid-cols-3 border-t border-border/40 pt-16">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-5 text-center px-4">
              <span className="inline-flex items-center justify-center text-primary">
                <Icon className="h-7 w-7 stroke-[1.5]" />
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-medium tracking-[0.15em] text-foreground uppercase">{title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
