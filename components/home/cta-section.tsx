import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="page-shell relative overflow-hidden rounded-[3rem] bg-muted/40 border border-border/50 px-6 py-20 sm:px-16 sm:py-28 md:py-32 flex flex-col items-center text-center">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-background/50" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
          <h2 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-6xl leading-[1.1]">
            Let’s map out the session.
          </h2>
          <p className="text-lg font-light text-muted-foreground sm:text-xl leading-relaxed max-w-2xl">
            Send over your timeline, moodboard, or venue details and I’ll reply with a clear plan, pricing, and production schedule.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-lg font-medium text-background transition-transform hover:scale-105"
            >
              Book a consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 stroke-[2]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
