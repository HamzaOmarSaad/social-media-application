import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3).max(16),
    email: z.email().min(3).max(4),
    password: z.string().min(8).max(25),
    repassword: z.string().min(8).max(25),
    age: z.number().optional(),
  })
  .refine(
    (val) => {
      return val?.password === val?.repassword;
    },
    {
      error: "password dont match  ",
    },
  );

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phone: string;
}
