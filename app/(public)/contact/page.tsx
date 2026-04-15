import type { Metadata } from "next";
import ContactForm, { ContactFormState } from "@/components/email/contact-form";
import { sendEmail } from "@/lib/resend/email";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Contact Us | BhavMedia",
  description:
    "Ready to capture your next project? Contact BhavMedia for professional restaurant, event, and portrait photography in Plainfield, Chicago, and the surrounding suburbs. Fast next-day replies.",
  alternates: {
    canonical: "https://bhavmedia.com/contact",
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ]
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
    <div className="flex flex-col flex-1 bg-background">
      <StructuredData />
      <section className="section-spacing pt-24 pb-24 border-t border-border/40">
        <div className="page-shell max-w-3xl mx-auto flex flex-col items-center gap-16">
          
          {/* Header Text */}
          <div className="text-center space-y-6">
            <h1 className="text-balance text-5xl font-light tracking-tight text-foreground sm:text-7xl leading-[1.1]">
              Let&apos;s map out <br className="hidden sm:block" /> the session.
            </h1>
            <p className="text-lg font-light leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Tell me about your project, timeline, and vision. I&apos;ll get back to you within 24 hours to discuss details and pricing.
            </p>
          </div>

          {/* Form */}
          <div className="w-full bg-muted/40 p-8 sm:p-12 rounded-[2.5rem] border border-border/60 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-background/20" />
            <div className="relative z-10">
              <h2 className="text-2xl font-light text-foreground mb-10 tracking-tight text-center">Send a message</h2>
              <ContactForm action={handleContactSubmit} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
