import { providerEnum } from "./../../Enums/enums";
import { Document } from "mongoose";
import { GenderEnum } from "../../Enums/enums";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  isEmailConfirmed: boolean;
  isDeleted: boolean;
  role: string;
  provider: providerEnum;
  gender: GenderEnum;
}
