import { $ZodIssue } from "zod/v4/core";
import { Response } from "express";

export interface IAppError extends Error {
  statusCode?: number;
  validationError?: $ZodIssue[];
}
export interface ISucess {
  res: Response;
  data?: object;
  statusCode?: number;
  message?: string;
}
