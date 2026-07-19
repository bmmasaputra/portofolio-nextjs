import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  subject: z.string().trim().min(1).max(1000),
  message: z.string().trim().min(1),
});

export type ContactForm = z.infer<typeof contactSchema>;