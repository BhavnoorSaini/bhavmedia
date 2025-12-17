import type { AboutFeature } from "@/lib/content/home";
import { Camera } from "lucide-react";

interface AboutSectionProps {
  features: ReadonlyArray<AboutFeature>;
}

export function AboutSection({ features }: AboutSectionProps) {
  return (
    <section className="section-spacing bg-muted/20">
      <div className="page-shell grid gap-10 md:grid-cols-[1.1fr,0.9fr] md:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            <Camera className="h-4 w-4" />
            <span>Approach</span>
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Calm direction, clear timelines, and imagery that still feels personal years later.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every brief starts with listening. I provide on-location photography for clients in Plainfield, Naperville, Aurora, to downtown Chicago, ensuring the logistics of your shoot are as polished as the final images.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-border/60 bg-background/70 p-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.08), transparent 45%), radial-gradient(circle at 88% 0%, hsl(var(--primary) / 0.06), transparent 35%), linear-gradient(130deg, rgba(255, 255, 255, 0.06) 0%, transparent 45%)",
              }}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
