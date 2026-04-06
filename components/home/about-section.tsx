import type { AboutFeature } from "@/lib/content/home";

interface AboutSectionProps {
  features: ReadonlyArray<AboutFeature>;
}

export function AboutSection({ features }: AboutSectionProps) {
  return (
    <section className="section-spacing bg-background">
      <div className="page-shell grid gap-16 md:grid-cols-2 md:items-center">
        <div className="space-y-8">
          <h2 className="text-balance text-3xl font-light tracking-tight text-foreground sm:text-5xl leading-tight">
            Calm direction, clear timelines, and imagery that still feels personal years later.
          </h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Every brief starts with listening. I provide on-location photography for clients in Plainfield, Naperville, Aurora, to downtown Chicago, ensuring the logistics of your shoot are as polished as the final images.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:pl-10">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-6">
              <span className="mt-1 flex-shrink-0 text-primary">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </span>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">{title}</h3>
                <p className="text-base font-light leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
