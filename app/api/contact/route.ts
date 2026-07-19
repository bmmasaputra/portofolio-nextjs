import { NextResponse as res } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { sendEmailForm } from "@/lib/mail";
import { EmailError } from "@/lib/errors";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return res.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          message: "Please check your input.",
          errors: z.flattenError(result.error).fieldErrors,
        },
        { status: 400 },
      );
    }

    await sendEmailForm(result.data);

    return res.json(
      {
        success: true,
        message:
          "Your message has been sent successfully. I will get back to you as soon as possible.",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof EmailError) {
      return res.json(
        {
          success: false,
          code: "SMTP_ERROR",
          message: error.message,
        },
        { status: error.status },
      );
    }

    console.error(error);

    return res.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Oops... Something went wrong. you may want to email me directly at bimagung2203@gmail.com",
      },
      { status: 500 },
    );
  }
}