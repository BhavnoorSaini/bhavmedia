import type { ServiceOffering } from "@/lib/content/home";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface ServicesSectionProps {
  services: ReadonlyArray<ServiceOffering>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="section-spacing">
      <div className="page-shell section-stack">
        <div className="max-w-3xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Services</span>
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Flexible collections that scale from intimate sessions to full-scale productions.
          </h2>
          <p className="text-base text-muted-foreground">
            Choose the coverage you need and layer on planning support, direction, and retouching without the guesswork.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:snap-none">
          {services.map(({ icon: Icon, label, description, features }) => (
            <Card
              key={label}
              className="h-full min-w-[260px] rounded-[var(--card-radius-lg)] border-border/70 bg-muted/10 sm:min-w-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.08), transparent 45%), radial-gradient(circle at 88% 0%, hsl(var(--primary) / 0.06), transparent 35%), linear-gradient(130deg, rgba(255, 255, 255, 0.06) 0%, transparent 45%)",
              }}
            >
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                <ul className="space-y-1 text-sm text-foreground/80">
                  {features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-primary">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
