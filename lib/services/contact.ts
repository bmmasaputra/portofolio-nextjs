import { ContactResponse } from "@/types/api";
import { ContactForm } from "@/lib/validation/contact";

export async function sendContactForm(data: ContactForm) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json() as Promise<ContactResponse>;
}
