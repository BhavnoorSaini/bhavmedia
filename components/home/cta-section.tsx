import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-spacing bg-background py-32 border-t border-border/20">
      <div className="page-shell">
        <div className="flex flex-col items-center text-center space-y-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-6xl leading-tight">
            Let’s map out the session.
          </h2>
          <p className="text-lg font-light text-muted-foreground sm:text-xl leading-relaxed">
            Send over your timeline, moodboard, or venue details and I’ll reply with a clear plan, pricing, and production schedule.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-3 border-b border-primary/30 pb-2 text-lg font-medium text-foreground transition-all hover:border-foreground"
            >
              Book a consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
