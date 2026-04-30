import { Response, Request, Router, type Router as routerType } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { signupSchema } from "./auth.types";
import { SignupService } from "./auth.service";
import { successRes } from "../../utils/res/sucess.handle";

const router: routerType = Router();

const routes = {
  signup: "/signup",
};
router.post(
  routes.signup,
  validationMiddleware(signupSchema),
  async (req: Request, res: Response) => {
    const { userName, password, email, phone, gender } = req.body;
    const data = await SignupService({
      userName,
      password,
      email,
      phone,
      gender,
    });
    return successRes({
      res,
      message: "user signed in successfully",
      data,
      statusCode: 200,
    });
  },
);

export default router;
