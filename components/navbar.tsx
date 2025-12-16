import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";

/* Adapt to auth status */
export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = Boolean(user);
  const userEmail = user?.email ?? null;

  return (
    <header className="relative z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6"
      >
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
              BhavMedia
            </span>
          ) : (
            <Link href="/">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                BhavMedia
              </span>
            </Link>
          )}
        </div>

        {!isLoggedIn && (
          <div className="order-last flex w-full flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:order-none sm:flex-1 sm:justify-center lg:justify-start">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-3 py-1.5 text-muted-foreground transition hover:text-primary"
            >
              Contact
            </Link>
            <AuthButton compact />
          </div>
        )}

        {isLoggedIn && (
          <div className="ml-auto flex items-center gap-3">
            <AuthButton userEmail={userEmail} />
          </div>
        )}
      </nav>
    </header>
  );
}