"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

type ContactFormProps = {
  className?: string;
  action: (
    prevState: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
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

  const fieldGroupClassName = "space-y-3";
  const labelClassName = "text-sm font-medium text-foreground tracking-wide uppercase";
  const inputClassName = "bg-transparent shadow-none border-0 border-b border-border/80 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-foreground transition-colors font-light text-base md:text-lg placeholder:text-muted-foreground/70";

  return (
    <div className={cn("w-full", className)}>
      <form ref={formRef} action={formAction} className="space-y-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div className={fieldGroupClassName}>
            <Label htmlFor="firstName" className={labelClassName}>First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Jane"
              autoComplete="given-name"
              className={inputClassName}
              required
            />
          </div>
          <div className={fieldGroupClassName}>
            <Label htmlFor="lastName" className={labelClassName}>Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div className={fieldGroupClassName}>
          <Label htmlFor="email" className={labelClassName}>Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            className={inputClassName}
            required
          />
        </div>

        <div className={fieldGroupClassName}>
          <Label htmlFor="message" className={labelClassName}>Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your timeline, location, and vision..."
            className={cn("min-h-[120px] resize-none pb-2", inputClassName)}
            required
          />
        </div>

        <div className="pt-4 flex flex-col items-center sm:items-start">
          <SubmitButton pending={isPending} />
        </div>

        {transientState.status !== "idle" && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-light mt-8 border-l-2",
              transientState.status === "success"
                ? "border-primary text-foreground bg-primary/5"
                : "border-destructive text-destructive bg-destructive/5",
            )}
          >
            {transientState.status === "success" ? (
              <CheckCircle2 className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
            )}
            <p>{transientState.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="group inline-flex items-center gap-3 border-b border-primary/30 pb-2 text-lg font-medium text-foreground transition-all hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
    >
      {pending ? "Sending..." : "Send Message"}
      {!pending && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 stroke-[1.5]" />}
    </button>
  );
}
