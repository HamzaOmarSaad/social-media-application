import { $ZodIssue } from "zod/v4/core";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

export class NotFoundException extends AppError {
  constructor(message?: string) {
    super(message || "not found ", 404);
  }
}
export class badReqException extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class conflictException extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
export class validationException extends AppError {
  constructor(message: Array<$ZodIssue>) {
    super(message as unknown as string, 400);
  }
}
