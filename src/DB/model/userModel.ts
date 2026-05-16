import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../utils/types/db.type";
import { GenderEnum, providerEnum, RoleEnum } from "../../Enums/enums";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function (this) {
        return this.provider == providerEnum.system;
      },
    },
    phone: {
      type: String,
    },
    isEmailConfirmed: {
      type: Date,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: providerEnum.system,
      enum: [providerEnum.system, providerEnum.google],
    },
    gender: {
      type: Number,
      default: GenderEnum.male,
      enum: [GenderEnum.male, GenderEnum.female],
    },
    role: {
      type: Number,
      default: RoleEnum.user,
      enum: [RoleEnum.user, RoleEnum.admin],
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

const UserModel = mongoose.models.user || model<IUser>("user", userSchema);
export default UserModel;
