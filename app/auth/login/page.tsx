import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Client Portal | BhavMedia",
  description:
    "Securely access and download your professional photography galleries.",
  alternates: {
    canonical: "https://bhavmedia.com/auth/login",
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
    <main className="flex flex-col flex-1 bg-background min-h-screen">
      <section className="section-spacing flex flex-col items-center justify-center flex-1 py-24">
        <div className="page-shell max-w-3xl mx-auto flex flex-col items-center gap-16">
          <div className="text-center space-y-6">
            <h1 className="text-balance text-4xl font-light tracking-tight text-foreground sm:text-6xl leading-[1.1]">
              Client Portal
            </h1>
            <p className="mx-auto max-w-xl text-balance text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              Sign in to securely access and download your high-resolution photography galleries.
            </p>
          </div>

          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
