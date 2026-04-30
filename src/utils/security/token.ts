import jwt, { SignOptions } from "jsonwebtoken";
import {
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  JWT_SECRET,
} from "../../env/config";
import { badReqException } from "../res/error.handle";

const tokenTypeEnum = {
  access: "access",
  refresh: "refresh",
} as const;

type TokenType = keyof typeof tokenTypeEnum;

type TokenInputType = {
  payload: object;
  options?: SignOptions;
  tokenType: TokenType;
};
type TokenVerifyType = {
  token: string;
  tokenType: TokenType;
};

export const generateTokenService = ({
  payload,
  options = {},
  tokenType,
}: TokenInputType): string => {
  const expiresIn =
    tokenType === "access" ? ACCESS_EXPIRES_IN : REFRESH_EXPIRES_IN;

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    ...options,
  });
};
export const verifyToken = ({ token, tokenType }: TokenVerifyType) => {
  try {
    if (tokenType === "access" || tokenType === "refresh") {
      return jwt.verify(token, JWT_SECRET);
    }

    throw new badReqException("Invalid token type");
  } catch (err) {
    throw new badReqException("Token verification failed");
  }
};
