import type { ServiceOffering } from "@/lib/content/home";
import { Check } from "lucide-react";

interface ServicesSectionProps {
  services: ReadonlyArray<ServiceOffering>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="section-spacing bg-muted/30">
      <div className="page-shell flex flex-col gap-16">
        <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Specialized Services
          </h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            Choose the coverage you need and layer on planning support, direction, and retouching without the guesswork.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, label, description, features }) => (
            <div 
              key={label} 
              className="group relative flex flex-col items-center text-center overflow-hidden rounded-3xl bg-background p-8 border border-border/50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-7 w-7 stroke-[1.5]" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-foreground">{label}</h3>
              <p className="mb-8 text-base font-light leading-relaxed text-muted-foreground">{description}</p>
              
              <ul className="mt-auto space-y-3 text-sm font-light text-foreground/80 w-full">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted/50 text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
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
