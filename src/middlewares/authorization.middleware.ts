import { NextFunction, Response, Request } from "express";
import { RoleEnum } from "../Enums/enums";
import { unauthorizedException } from "../utils/res/exceptions/domain.exceptions";

export const authorize = (roles: RoleEnum[] = []) => {
  async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role)) {
      throw new unauthorizedException(" not authorized user ");
    }
    next();
  };
};
