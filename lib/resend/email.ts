"use server";

import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  // Extract and cast data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `BhavMedia <${process.env.RESEND_FROM_EMAIL}>`, 
      to: [`${process.env.RESEND_TO_EMAIL}`],
      subject: `BhavMedia Contact Message`,
      // Pass all the data to template
      react: EmailTemplate({ 
        firstName: firstName, 
        message: message,
        email: email 
      }),
    });

    // Handle errors
    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Error:", err);
    return { success: false, error: "Internal Server Error" };
  }
}