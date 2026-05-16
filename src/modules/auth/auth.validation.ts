import * as z from "zod";
import { generalValidationFields } from "../../utils/validation/general.validation";

export const loginSchema = {
  body: z.strictObject({
    email: generalValidationFields.email,
    password: generalValidationFields.password,
  }),
};
export const signupSchema = {
  body: loginSchema.body
    .safeExtend({
      userName: z.string().min(3).max(16),
      rePassword: z.string().min(8).max(25).optional(),
      phone: generalValidationFields.phone,
    })
    .refine(
      (val) => {
        return val?.password === val?.rePassword;
      },
      {
        error: "password dont match  ",
        path: ["password", "rePassword"],
      },
    ),
};

export const resendEmailSchema = {
  body: z.object({
    email: generalValidationFields.email,
  }),
};
export const confirmEmailSchema = {
  body: z.object({
    email: generalValidationFields.email,
    otp: generalValidationFields.otp,
  }),
};
