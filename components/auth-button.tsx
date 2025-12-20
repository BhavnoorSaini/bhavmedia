import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";


export async function AuthButton() {
  let resolvedEmail: string | null | undefined = undefined;

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

  return (
    <Link
      href="/auth/login"
      className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:border-primary hover:text-primary"
    >
      For Clients
    </Link>
  );
}
