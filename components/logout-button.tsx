"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/* Use router to log out the user and redirect to home page */
export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button
      onClick={logout}
      size="sm"
      variant="outline"
      className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:border-primary hover:text-primary"
    >
      Logout
    </Button>
  );
}
