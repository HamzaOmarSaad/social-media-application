import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../utils/types/db.type";
import { GenderEnum, providerEnum } from "../../Enums/enums";

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
    phone: {
      type: String,
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: providerEnum.system,
    },
    gender: {
      type: Number,
      default: GenderEnum.male,
    },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
);

const UserModel = mongoose.models.user || model("user", userSchema);
export default UserModel;
