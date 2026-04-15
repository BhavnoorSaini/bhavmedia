import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { NavbarMobileMenu } from "@/components/navbar-mobile-menu";
import { createClient } from "@/lib/supabase/server";

/* Adapt to auth status */
export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = Boolean(user);

  return (
    <header className="relative z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex w-full max-w-6xl items-center px-4 py-4 sm:px-6"
      >
        {/* Logo */}
        <div className="flex items-center">
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

        {/* Desktop nav links */}
        {!isLoggedIn && (
          <div className="hidden flex-1 items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:flex lg:justify-start">
            <Link
              href="/"
              className="rounded-full px-3 py-1.5 transition hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="rounded-full px-3 py-1.5 transition hover:text-primary"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-3 py-1.5 transition hover:text-primary"
            >
              Contact
            </Link>
          </div>
        )}

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Auth button: always visible for logged-in, desktop-only for logged-out */}
          <div className={isLoggedIn ? "block" : "hidden sm:block"}>
            <AuthButton />
          </div>

          {/* Mobile burger menu (logged-out only) */}
          {!isLoggedIn && <NavbarMobileMenu authButton={<AuthButton />} />}
        </div>
      </nav>
    </header>
  );
}