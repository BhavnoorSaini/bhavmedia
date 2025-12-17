"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

type ContactFormProps = {
  className?: string;
  action: (
    prevState: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: null,
};

export default function ContactForm({ className, action }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialContactFormState,
  );
  const [transientState, setTransientState] = useState(initialContactFormState);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fieldClassName =
    "border-white/25 bg-background/50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] focus-visible:border-primary/40 focus-visible:ring-primary/40";

  useEffect(() => {
    if (state.status === "idle") return undefined;
    if (state.status === "success") {
      formRef.current?.reset();
    }

    setTransientState(state);
    const timeout = setTimeout(
      () => setTransientState(initialContactFormState),
      5000,
    );
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-[var(--card-radius-lg)] border border-border/70 bg-background/95 shadow-xl",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.22), transparent 55%), radial-gradient(circle at 88% 10%, hsl(var(--primary) / 0.18), transparent 52%), linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 58%)",
        }}
        aria-hidden
      />
      <CardHeader className="relative z-10 space-y-3 text-center sm:text-left">
        <div className="space-y-2">
          <CardTitle className="text-2xl sm:text-3xl">Send us a message</CardTitle>
          <CardDescription className="text-base">
            Expect a personal reply within 24 hours.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                className={fieldClassName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                className={fieldClassName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
              className={fieldClassName}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your timeline, location, and what you're looking to capture..."
              className={cn("min-h-[160px] resize-none", fieldClassName)}
              required
            />
          </div>

          <SubmitButton pending={isPending} />
          {transientState.status !== "idle" ? (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm",
                transientState.status === "success"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-destructive/40 bg-destructive/10 text-destructive",
              )}
            >
              {transientState.status === "success" ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              )}
              <p className="text-left">{transientState.message}</p>
            </div>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        "Sending..."
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}