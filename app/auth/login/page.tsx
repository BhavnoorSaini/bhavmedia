import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "BhavMedia Client Portal Login",
  description:
    "Access secure galleries and download bundles.",
  alternates: {
    canonical: "/auth/login",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-screen overflow-hidden border-b border-border/60 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_14%_18%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_88%_12%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_52%_88%,hsl(var(--primary)/0.14),transparent_50%)]" />
        <div className="pointer-events-none absolute -left-28 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-5xl grid-rows-[auto_1fr] gap-12 px-6 py-16 sm:py-20">
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Sign in to access your galleries.
              </h1>
              <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
                We keep your memories safe with encrypted authentication. Reach out anytime if you need help getting into your account.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center pb-10 sm:pb-16">
            <LoginForm className="relative w-full max-w-md" />
          </div>
        </div>
      </section>
    </main>
  );
}