import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function CtaSection() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-border/50 bg-foreground px-6 py-20 text-center sm:rounded-[3rem] sm:px-16 sm:py-28 md:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
            <Mail className="h-6 w-6 text-primary-foreground/80 stroke-[1.5]" />
          </div>
          <h2 className="text-balance text-4xl font-light leading-[1.1] tracking-tight text-primary-foreground sm:text-6xl">
            Let&rsquo;s map out the session.
          </h2>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-primary-foreground/70 sm:text-xl">
            Send over your timeline, moodboard, or venue details and I&rsquo;ll
            reply with a clear plan, pricing, and production schedule.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary-foreground px-8 text-lg font-medium text-foreground transition-transform hover:scale-105"
            >
              Book a consultation
              <ArrowRight className="h-5 w-5 stroke-[2] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
