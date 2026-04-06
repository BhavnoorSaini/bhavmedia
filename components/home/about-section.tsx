import type { AboutFeature } from "@/lib/content/home";

interface AboutSectionProps {
  features: ReadonlyArray<AboutFeature>;
}

export function AboutSection({ features }: AboutSectionProps) {
  return (
    <section className="section-spacing bg-background border-t border-border/40">
      <div className="page-shell max-w-5xl mx-auto space-y-16">
        <div className="space-y-8 text-center">
          <h2 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-6xl leading-[1.15]">
            Calm direction, clear timelines, and imagery that still feels personal years later.
          </h2>
          <p className="text-xl font-light leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Every brief starts with listening. I provide on-location photography for clients in Plainfield, Naperville, Aurora, to downtown Chicago, ensuring the logistics of your shoot are as polished as the final images.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 pt-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-6 items-center text-center group p-8 rounded-3xl bg-muted/30 transition-colors hover:bg-muted/50">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background shadow-sm text-primary transition-transform group-hover:scale-110">
                <Icon className="h-8 w-8 stroke-[1.5]" />
              </span>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-foreground">{title}</h3>
                <p className="text-lg font-light leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
