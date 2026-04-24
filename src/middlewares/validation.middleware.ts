import { $ZodIssue } from "zod/v4/core";
import * as z from "zod";
import { NextFunction, Request, Response } from "express";
import { validationException } from "../utils/res/error.handle";

type keyType = keyof Request;
type schemaType = Partial<Record<keyof Request, z.ZodType>>;
export const validationMiddleware = async (schema: schemaType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(schema) as keyType[];
    const issues: $ZodIssue[] = [];
    keys.forEach((key) => {
      if (schema[key]) {
        const validationRes = schema[key].safeParse(req.body);
        if (!validationRes.success) {
          issues.push(...validationRes.error.issues);
        }
      }
    });
    if (issues.length) {
      throw new validationException(issues);
    }
  };
};
