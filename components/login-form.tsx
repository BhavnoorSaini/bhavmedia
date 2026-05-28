"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useId, useMemo, useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const supabase = useMemo(() => createClient(), []);

  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/protected/client");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, router, supabase]);

  const inputClassName = "bg-transparent shadow-none border-0 border-b border-border/80 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors font-light text-base md:text-lg placeholder:text-muted-foreground/70";
  const labelClassName = "text-sm font-medium text-foreground tracking-wide uppercase";

  return (
    <div className={cn("w-full bg-muted/40 p-8 sm:p-12 rounded-[2.5rem] border border-border/60 shadow-sm relative overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-background/20" />
      <div className="relative z-10 flex flex-col gap-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-light text-foreground tracking-tight">Login</h2>
          <p className="text-base font-light text-muted-foreground">
            Enter your email and provided password.
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3 text-left">
            <Label htmlFor={emailId} className={labelClassName}>Email</Label>
            <Input
              id={emailId}
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={inputClassName}
            />
          </div>
          <div className="space-y-3 text-left">
            <Label htmlFor={passwordId} className={labelClassName}>Password</Label>
            <Input
              id={passwordId}
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={inputClassName}
            />
          </div>
          
          {error && (
            <div className="flex items-center justify-center gap-3 px-4 py-3 text-sm font-light border-l-2 border-destructive text-destructive bg-destructive/5">
              <AlertTriangle className="h-5 w-5 stroke-[1.5] shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="pt-4 flex flex-col items-center">
            <button 
              type="submit" 
              disabled={isLoading}
              className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-foreground px-10 text-base font-medium text-background transition-transform hover:scale-105 shadow-xl shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? "Logging in..." : "Login"}
              {!isLoading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 stroke-[2]" />}
            </button>
          </div>
          
          <div className="pt-2 text-center">
            <Link href="/" className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Return Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
