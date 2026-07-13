export class EmailError extends Error {
  constructor(
    public readonly code: "SMTP_ERROR",
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "EmailError";
  }
}
