import Link from "next/link";
import type { HeroHighlight } from "@/lib/content/home";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type HeroSectionProps = {
  highlights: ReadonlyArray<HeroHighlight>;
};

export function HeroSection({ highlights }: HeroSectionProps) {
  return (
    <section className="section-spacing border-b border-border/60 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="relative page-shell section-stack">
        <div className="space-y-6 text-center sm:text-left">
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Thoughtful photography with a streamlined, detail-forward process.
            </h1>
            <p className="max-w-3xl text-balance text-base text-muted-foreground sm:text-lg sm:leading-relaxed">
              Restaurant launches, menu features, and editorial work handled with the same calm direction, clear communication, and polished delivery.
            </p>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none">
          {highlights.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="flex min-w-[240px] flex-col gap-3 rounded-[var(--card-radius-lg)] border-border/60 bg-background/90 p-5 backdrop-blur-sm sm:min-w-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.08), transparent 45%), radial-gradient(circle at 88% 0%, hsl(var(--primary) / 0.06), transparent 35%), linear-gradient(130deg, rgba(255, 255, 255, 0.06) 0%, transparent 45%)",
              }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
