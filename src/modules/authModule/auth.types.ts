import * as z from "zod";

export const signupSchema = {
  body: z
    .object({
      name: z.string().min(3).max(16),
      email: z.email().min(3).max(4),
      password: z.string().min(8).max(25),
      rePassword: z.string().min(8).max(25),
      age: z.number().optional(),
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

export interface ISignup {
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface ILogin {
  email: string;
  password: string;
}
