import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../utils/types/db.type";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.models.user || model("user", userSchema);
export default UserModel;
