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
      <section className="section-spacing pt-24 pb-16">
        <div className="page-shell flex flex-col items-center gap-16">
          <div className="text-center space-y-6 max-w-2xl mt-12">
            <h1 className="text-balance text-5xl font-light tracking-tight text-foreground sm:text-7xl leading-tight">
              Let's work together
            </h1>
            <p className="text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              Tell me about your project, timeline, and vision. I'll get back to you within 24 hours to discuss details and pricing.
            </p>
          </div>
          
          <div className="w-full max-w-2xl border-t border-border/80 pt-16">
            <ContactForm action={handleContactSubmit} />
          </div>
        </div>
      </section>
    </div>
  );
}
