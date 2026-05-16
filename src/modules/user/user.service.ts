import { UserRepo, userRepository } from "../../DB/repos/user.repo";
import { providerEnum, RoleEnum } from "../../Enums/enums";
import { CLIENT_ID } from "../../env/config";
import redisService from "../../utils/redis/redis.service";
import { conflictException } from "../../utils/res/exceptions/domain.exceptions";
import { TokenService } from "../../utils/security/token";
import { HUser, IUser } from "../../utils/types/db.type";
import { logoutType } from "../../utils/types/token.types";

export class userServices {
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
  public getUserProfile(user: HUser) {
    return user.toJSON();
  }
  public gmailSigninService = async (googleToken) => {
    const ticket = await this.GoogleClient.verifyIdToken({
      idToken: googleToken,
      audience: CLIENT_ID,
    });
    const { email, name, email_verified } = ticket.getPayload();

    const isEmailExist = await this.userRepo.findByEmail(email);
    // we create token in both cases if login or sign up
    let accessToken;
    let refreshToken;
    let userInfo;
    // login case
    if (isEmailExist) {
      if (isEmailExist.provider == providerEnum.system) {
        throw new conflictException("different provider use system login ");
      }
      const tokens = this.tokenService.createLoginTokens({
        iss: "google",
        user: isEmailExist,
      });
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      userInfo = isEmailExist;
    } else {
      // sign up
      const data = {
        userName: name,
        email,
        provider: providerEnum.google,
        changedCredentialsTime: email_verified,
        role: RoleEnum.user,
      };
      const newUser: HUser = await this.userRepo.create(data);

      const tokens = this.tokenService.createLoginTokens({
        iss: "google",
        user: newUser,
      });
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      userInfo = newUser;
    }
    return { accessToken, refreshToken, userInfo };
  };
  //---------------------log out-----------------------

  logoutService = async ({
    user,
    jti,
    iat = "",
    flag = logoutType.allDevices,
  }: {
    user: HUser;
    jti: string;
    iat: string;
    flag: number;
  }) => {
    if (flag == logoutType.allDevices) {
      user.changedCredentialsTime = Date.now() as unknown as Date;
      await user.save();
    } else {
      const key = this.redis.revokeTokenGenerator({
        userId: user._id,
        jti,
      });
      await this.redis.setValue({
        key,
        value: jti,
        ttl: 7 * 24 * 60 * 60,
      });
    }

    return { data: {} };
  };
  rotateToken() {}
}
const userService = new userServices();

export default userService;
