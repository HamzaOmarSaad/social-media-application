import { TokenType, tokenTypeEnum } from "./../utils/security/token";
import { NextFunction, Request, Response } from "express";
import { badReqException } from "../utils/res/exceptions/domain.exceptions";
import { TokenService } from "../utils/security/token";

// export interface IRequest extends Request {
//   user?: HUser;
//   decoded?: JwtPayload;
// }
const tokenService = new TokenService();
export const auth = (tokenType: TokenType = tokenTypeEnum.access) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"] as string | undefined;

    if (!authorization) {
      throw new badReqException("No token provided");
    }

    const [start, token] = authorization.split(" ");
    if (start != "bearer") {
      throw new badReqException("No token provided");
    }
    if (!token) {
      throw new badReqException("No token provided");
    }
    const { user, decoded } = await tokenService.decodeToken({
      token,
      tokenType: tokenType,
    });
    req.user = user;
    req.decoded = decoded;
    next();
  };
};
