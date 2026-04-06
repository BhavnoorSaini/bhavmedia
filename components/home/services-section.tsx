import type { ServiceOffering } from "@/lib/content/home";

interface ServicesSectionProps {
  services: ReadonlyArray<ServiceOffering>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="section-spacing bg-muted/20">
      <div className="page-shell flex flex-col gap-20">
        <div className="max-w-2xl space-y-6">
          <h2 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Services
          </h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Choose the coverage you need and layer on planning support, direction, and retouching without the guesswork.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, label, description, features }) => (
            <div key={label} className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-border/40 pb-5">
                <Icon className="h-6 w-6 text-primary stroke-[1.5]" />
                <h3 className="text-lg font-medium text-foreground">{label}</h3>
              </div>
              <p className="text-base font-light leading-relaxed text-muted-foreground">{description}</p>
              <ul className="space-y-3 text-sm font-light text-foreground/70 mt-auto pt-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
