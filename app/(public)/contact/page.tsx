import type { Metadata } from "next";
import ContactForm, { ContactFormState } from "@/components/email/contact-form";
import { sendEmail } from "@/lib/resend/email";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Share your brief, timeline, and references to get a tailored photography proposal with secure gallery delivery and fast communication.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | BhavMedia",
    description:
      "Reach out for restaurant launches, portrait sessions, events, and retouching projects. Expect next-day replies.",
    type: "website",
    url: "/contact",
  },
};

/* Handle contact form submission on the server */
async function handleContactSubmit(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  "use server";

  const result = await sendEmail(formData);

  if (result.success) {
    return {
      status: "success",
      message: "Your message has been sent successfully.",
    };
  }

  return {
    status: "error",
    message: result.error ?? "We couldn't send your message. Please try again or email us directly.",
  };
}

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="section-spacing border-y border-border/60 bg-muted/20">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl">
            <ContactForm className="border-border/70" action={handleContactSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}
