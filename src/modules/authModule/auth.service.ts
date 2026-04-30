import UserModel from "../../DB/model/userModel";
import { DBRepo } from "../../DB/repo";
import { providerEnum } from "../../Enums/enums";
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from "../../env/config";
import { badReqException } from "../../utils/res/error.handle";
import { encryptService } from "../../utils/security/encryption";
import { hashService, verifyHashService } from "../../utils/security/hashing";
import {
  generateTokenService,
  tokenTypeEnum,
} from "../../utils/security/token";
import { ILogin, ISignup } from "./auth.types";

const userRepo = new DBRepo(UserModel);
export const SignupService = async ({
  userName,
  email,
  password,
  phone,
  gender,
}: ISignup) => {
  const isEmail = await userRepo.findOne({ email });
  if (isEmail) {
    throw new badReqException("email already exist");
  }
  const hashedPass = await hashService(password);
  const encryptedPhone = encryptService(phone);
  const data = {
    userName,
    email,
    gender,
    password: hashedPass,
    provider: providerEnum.system,
    phone: encryptedPhone,
  };
  await userRepo.create(data);
  return { message: " signup done login to proceed" };
};
export const loginService = async ({ email, password }: ILogin) => {
  const IsUser = await userRepo.findOne({ email });
  if (!IsUser) {
    throw new badReqException("wrong credential");
  }
  const passMatch = verifyHashService(password, IsUser.password);
  if (!passMatch) {
    throw new badReqException("wrong credential");
  }
  const accessToken = generateTokenService({
    payload: { _id: IsUser._id },
    tokenType: tokenTypeEnum.access,
    options: {
      expiresIn: ACCESS_EXPIRES_IN,
    },
  });
  const refreshToken = generateTokenService({
    payload: { _id: IsUser._id },
    tokenType: tokenTypeEnum.refresh,

    options: {
      expiresIn: REFRESH_EXPIRES_IN,
    },
  });
  return { accessToken, refreshToken, user: IsUser };
};
