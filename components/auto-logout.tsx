"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AutoLogout() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function checkAndLogout() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        const session = data?.session;

        if (!mounted) return;

        // Logout whenever an authenticated user navigates outside protected routes.
        if (session && !pathname.startsWith("/protected")) {
          await supabase.auth.signOut();
          router.push("/");
        }
      } catch (err) {
        // Quietly ignore errors; don't block rendering.
        console.error("AutoLogout error:", err);
      }
    }

    checkAndLogout();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  return null;
}
