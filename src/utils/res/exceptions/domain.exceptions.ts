import { $ZodIssue } from "zod/v4/core";
import { AppError } from "./error.handle";

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

export class unauthorizedException extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
