import {
  NextFunction,
  Router,
  type Router as routerType,
  Response,
  Request,
} from "express";
import { userRoutes } from "./user.routes";
import { auth } from "../../middlewares/authentication.middleware";
import userService from "./user.service";
import { successRes } from "../../utils/res/success.handle";

const router: routerType = Router();

router.get(
  userRoutes.getUserInfo,
  auth(),
  (req: Request, res: Response, next: NextFunction) => {
    const data = userService.getUserProfile(req.user);
    return successRes({
      res,
      message: "user retrieved successfully",
      data,
      statusCode: 200,
    });
  },
);

export default router;
