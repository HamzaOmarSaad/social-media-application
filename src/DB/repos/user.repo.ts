import { IUser } from "../../utils/types/db.type";
import UserModel from "../model/userModel";
import { DBRepo } from "./repo";

export class UserRepo extends DBRepo<IUser> {
  constructor() {
    super(UserModel);
  }
  public async findByEmail(email: string) {
    return await this.findOne({ email: email });
  }
}

export const userRepository = new UserRepo();
