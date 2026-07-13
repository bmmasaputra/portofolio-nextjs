export type ContactResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      code: "VALIDATION_ERROR" | "SMTP_ERROR" | "INTERNAL_SERVER_ERROR";
      message: string;
      errors?: Record<string, string[] | undefined>;
    };
