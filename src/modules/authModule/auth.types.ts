import * as z from "zod";
import { GenderEnum } from "../../Enums/enums";

export const signupSchema = {
  body: z
    .object({
      name: z.string().min(3).max(16),
      email: z.email().min(3).max(4),
      password: z.string().min(8).max(25),
      rePassword: z.string().min(8).max(25),
      age: z.number().optional(),
      gender: z.number().optional(),
      phone: z.string().optional(),
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
  userName: string;
  email: string;
  password: string;
  phone: string;
  gender: GenderEnum;
}
export interface ILogin {
  email: string;
  password: string;
}
