import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-spacing">
      <div className="page-shell">
        <div
          className="relative overflow-hidden rounded-[var(--card-radius-lg)] border border-border/60 bg-background/95 shadow-[0_35px_120px_-60px_rgba(10,10,20,0.9)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.2), transparent 55%), radial-gradient(circle at 88% 0%, hsl(var(--primary) / 0.18), transparent 50%), linear-gradient(130deg, rgba(255, 255, 255, 0.16) 0%, transparent 55%)",
          }}
        >
          <div className="space-y-6 px-6 py-10 text-center sm:px-14 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Next steps
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Let’s map out the session while the inspiration is fresh.
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Send over your timeline, moodboard, or venue details and I’ll reply with a clear plan, pricing, and production schedule.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-primary/30 shadow-md">
                <Link href="/contact">
                  Book a consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
