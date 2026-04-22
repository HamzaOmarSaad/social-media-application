import { Response } from "express";

export interface IAppError extends Error {
  statusCode?: number;
}
export interface ISucess {
  res: Response;
  data?: object;
  statusCode?: number;
  message?: string;
}
