import {
  emailEnum,
  GenderEnum,
  providerEnum,
  RoleEnum,
} from "../../Enums/enums";
import { emailEvent } from "../../utils/email/emailEvent";
import { email_template } from "../../utils/email/genrateHTML";
import { generateOTP } from "../../utils/OTP/otp";
import redisService from "../../utils/redis/redis.service";
import {
  badReqException,
  conflictException,
  NotFoundException,
} from "../../utils/res/exceptions/domain.exceptions";
import { encryptService } from "../../utils/security/encryption";
import { hashService, verifyHashService } from "../../utils/security/hashing";
import { TokenService } from "../../utils/security/token";
import { HUser, IUser } from "../../utils/types/db.type";
import { ILoginDTO, ISignupDTO } from "./auth.dto";
import { UserRepo, userRepository } from "../../DB/repos/user.repo";
import { CLIENT_ID } from "../../env/config";
import { OAuth2Client } from "google-auth-library";

class authServices {
  private userRepo: UserRepo;
  private redis: typeof redisService;
  private tokenService;
  private GoogleClient;

  constructor() {
    this.userRepo = userRepository;
    this.redis = redisService;
    this.tokenService = new TokenService();
    this.GoogleClient = new OAuth2Client(CLIENT_ID);
  }

  private async sendEmailOTP({
    email,
    subject,
    title,
  }: {
    email: string;
    subject: emailEnum;
    title: string;
  }) {
    const blockedKey = this.redis.BlockedOtpKeyGenerator({
      email,
      subject,
    });

    const otpKey = this.redis.otpKeyGenerator({
      email,
      subject,
    });

    const attemptsKey = this.redis.maxAttemptOtpKeyGenerator({
      email,
      subject,
    });

    // check if blocked
    const isBlockedTTL = await this.redis.TTL({
      key: blockedKey,
    });

    if (isBlockedTTL > 0) {
      throw new badReqException(
        `Sorry, you are blocked. Try again after ${isBlockedTTL} seconds`,
      );
    }

    const remainingOtpTTL = await this.redis.TTL({
      key: otpKey,
    });

    if (remainingOtpTTL > 0) {
      throw new badReqException(
        `Current OTP still active. Try again after ${remainingOtpTTL} seconds`,
      );
    }

    const attempts = await this.redis.incr(attemptsKey);

    if (attempts === 1) {
      await this.redis.expire({ key: attemptsKey, ttl: 300 });
    }

    if (attempts > 3) {
      await this.redis.setValue({
        key: blockedKey,
        value: 1,
        ttl: 7 * 60,
      });

      throw new badReqException("Sorry, you have reached the limit");
    }

    const code = generateOTP();

    await this.redis.setValue({
      key: otpKey,
      value: await hashService(String(code)),
      ttl: 120,
    });

    emailEvent.publish("confirm-Email", {
      to: email,
      subject: title,
      html: email_template({
        message: String(code),
        title,
      }),
    });
  }
  public confirmEmail = async (email: string, otp: number) => {
    const key: string = this.redis.otpKeyGenerator({
      email,
      subject: emailEnum.confirmEmail,
    });
    // get db value
    const hashed = await this.redis.getValue<string>(key);

    if (!hashed) {
      throw new badReqException(`wrong otp`);
    }
    // check email correctness
    const account = await this.userRepo.findOne({
      email,
      isEmailConfirmed: { $exists: false },
      provider: providerEnum.system,
    });
    if (!account) {
      throw new badReqException(` email not found  `);
    }
    // compare OTPs
    const match = await verifyHashService(otp.toString(), hashed);

    if (!match) {
      throw new badReqException(`wrong otp`);
    }
    //confirm email is done
    account.isEmailConfirmed = new Date();
    account.save();
    await this.redis.deleteValue({ key });

    return true;
  };
  public resendEmail = async (email: string) => {
    // check email correctness
    const account = await this.userRepo.findOne({
      email,
      isEmailConfirmed: { $exists: false },
      provider: providerEnum.system,
    });
    if (!account) {
      throw new badReqException(` email not found  `);
    }
    await this.sendEmailOTP({
      email,
      subject: emailEnum.confirmEmail,
      title: "email confirmation",
    });
    return;
  };
  public async loginService(inputs: ILoginDTO, issuer: string) {
    const { email, password } = inputs;
    const IsUser = await this.userRepo.findOne({ email });
    if (!IsUser) {
      throw new badReqException("wrong credential");
    }
    const passMatch = verifyHashService(password, IsUser.password as string);
    if (!passMatch) {
      throw new badReqException("wrong credential");
    }
    const { accessToken, refreshToken } = this.tokenService.createLoginTokens({
      user: IsUser,
      iss: issuer,
    });

    return { accessToken, refreshToken, user: IsUser };
  }
  public async SignupService({
    userName,
    email,
    password,
    phone,
    rePassword,
  }: ISignupDTO) {
    const isEmail = await this.userRepo.findOne({ email });
    if (isEmail) {
      throw new badReqException("email already exist");
    }
    const hashedPass = await hashService(password);
    const encryptedPhone = encryptService(phone as string);
    const data: IUser = {
      userName,
      email,
      gender: GenderEnum.male,
      role: RoleEnum.user,
      password: hashedPass,
      provider: providerEnum.system,
      phone: encryptedPhone,
    };
    const user = await this.userRepo.create(data);
    if (!user) throw new conflictException("fail");
    await this.sendEmailOTP({
      email,
      subject: emailEnum.confirmEmail,
      title: "email confirmation",
    });

    return { message: " signup done login to proceed", user };
  }
  private async VerifyGoogleAccount(googleToken: string) {
    const ticket = await this.GoogleClient.verifyIdToken({
      idToken: googleToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) {
      throw new badReqException("invalid token payload");
    }
    return payload;
  }
  public LoginWithGoogleService = async (
    googleToken: string,
    iss: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    const payload = await this.VerifyGoogleAccount(googleToken);

    const isEmailExist = await this.userRepo.findByEmail(
      payload?.email as string,
    );
    if (!isEmailExist) {
      throw new NotFoundException("invalid token payload");
    }
    if (isEmailExist.provider != providerEnum.google) {
      throw new conflictException("wrong provider use system login ");
    }
    const { accessToken, refreshToken } = this.tokenService.createLoginTokens({
      iss,
      user: isEmailExist,
    });

    return { accessToken, refreshToken };
  };
  public SignupWithGoogleService = async (
    googleToken: string,
    iss: string,
  ): Promise<{
    credentials: { accessToken: string; refreshToken: string };
  }> => {
    const payload = await this.VerifyGoogleAccount(googleToken);

    const isEmailExist = await this.userRepo.findByEmail(
      payload?.email as string,
    );

    if (isEmailExist) {
      if (isEmailExist.provider != providerEnum.google) {
        throw new conflictException("wrong provider use system login ");
      }
      return {
        credentials: await this.LoginWithGoogleService(googleToken, iss),
      };
    }
    // sign up
    const data: IUser = {
      userName: payload.name as string,
      email: payload.email as string,
      provider: providerEnum.google,
      isEmailConfirmed: new Date(),
      role: RoleEnum.user,
    };
    const newUser: HUser = await this.userRepo.create(data);

    const { accessToken, refreshToken } = this.tokenService.createLoginTokens({
      iss,
      user: newUser,
    });

    return { credentials: { accessToken, refreshToken } };
  };
}
export default new authServices();
