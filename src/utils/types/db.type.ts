import { providerEnum } from "./../../Enums/enums";
import { HydratedDocument } from "mongoose";
import { GenderEnum } from "../../Enums/enums";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  isEmailConfirmed: boolean;
  isDeleted: boolean;
  role: number;
  provider: providerEnum;
  gender: GenderEnum;
}
export type HUser = HydratedDocument<IUser>;
