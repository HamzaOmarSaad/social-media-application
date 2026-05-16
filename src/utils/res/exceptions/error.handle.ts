export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}
