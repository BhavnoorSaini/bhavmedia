import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

type AuthButtonProps = {
  userEmail?: string | null;
  compact?: boolean;
};

export async function AuthButton({ userEmail, compact = false }: AuthButtonProps = {}) {
  let resolvedEmail = userEmail;

  if (typeof resolvedEmail === "undefined") {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    resolvedEmail = user?.email ?? null;
  }

  if (resolvedEmail) {
    return <LogoutButton />;
  }

  if (compact) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:border-primary hover:text-primary"
      >
        For Clients
      </Link>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        asChild
        size="sm"
        variant="outline"
        className="text-xs font-semibold uppercase tracking-[0.35em]"
      >
        <Link href="/auth/login">For Clients</Link>
      </Button>
    </div>
  );
}
