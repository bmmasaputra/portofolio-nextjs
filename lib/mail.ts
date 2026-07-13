import nodemailer from "nodemailer";
import { ContactForm } from "./validation/contact";
import { EmailError } from "./errors";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmailForm(data: ContactForm): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_RECEIVER,
      subject: data.subject,
      text: `Sender: ${data.name} <${data.email}>\n\n${data.message}`,
      replyTo: data.email,
    });
  } catch (error: any) {
    console.error("Error sending email:", error);

    throw new EmailError(
      "SMTP_ERROR",
      503,
      error.code || "An error occurred while sending the email. You may want to email me directly at bimagung2203@gmail.com",
    );  
  }
}

export async function verifyTransporter(): Promise<void> {
  try {
    await transporter.verify();

  } catch (error: any) {
    console.error("SMTP verification failed:", error);

    throw new EmailError(
      "SMTP_ERROR",
      503,
      error,
    );
  }
}
