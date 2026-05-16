import { providerEnum, RoleEnum } from "./../../Enums/enums";
import { HydratedDocument } from "mongoose";
import { GenderEnum } from "../../Enums/enums";

export interface IUser {
  userName: string;
  email: string;
  password?: string;
  phone?: string;
  isEmailConfirmed?: Date;
  isDeleted?: boolean;
  role: RoleEnum;
  provider: providerEnum;
  gender?: GenderEnum;
  changedCredentialsTime?: Date;
  profilePicture?: string;
}
export type HUser = HydratedDocument<IUser>;
