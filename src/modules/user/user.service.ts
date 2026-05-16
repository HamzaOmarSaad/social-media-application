import { OAuth2Client } from "google-auth-library";
import { UserRepo, userRepository } from "../../DB/repos/user.repo";
import { providerEnum, RoleEnum } from "../../Enums/enums";
import { CLIENT_ID } from "../../env/config";
import redisService from "../../utils/redis/redis.service";
import {
  badReqException,
  conflictException,
  NotFoundException,
} from "../../utils/res/exceptions/domain.exceptions";
import { TokenService } from "../../utils/security/token";
import { HUser, IUser } from "../../utils/types/db.type";
import { logoutType } from "../../utils/types/token.types";

export class userServices {
  private userRepo: UserRepo;
  private redis: typeof redisService;
  private tokenService;
  constructor() {
    this.userRepo = userRepository;
    this.redis = redisService;
    this.tokenService = new TokenService();
  }
  public getUserProfile(user: HUser) {
    return user.toJSON();
  }

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
