import { Response, Request, Router, type Router as routerType } from "express";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { loginSchema, signupSchema } from "./auth.validation";
import { successRes } from "../../utils/res/success.handle";
import authService from "./auth.service";
import { routes } from "./auth.routes";
import { ILoginDTO, ISignupDTO } from "./auth.dto";

const router: routerType = Router();

router.post(
  routes.signup,
  validationMiddleware(signupSchema),
  async (req: Request, res: Response) => {
    const { userName, password, email, phone }: ISignupDTO = req.body;
    const data = await authService.SignupService({
      userName,
      password,
      email,
      phone,
    });
    return successRes({
      res,
      message: "user signed in successfully",
      data,
      statusCode: 200,
    });
  },
);
router.post(
  routes.login,
  validationMiddleware(loginSchema),
  async (req: Request, res: Response) => {
    const { password, email }: ILoginDTO = req.body;
    const data = await authService.loginService(
      {
        password,
        email,
      },
      `${req.protocol}://${req.host}`,
    );
    return successRes({
      res,
      message: "user signed in successfully",
      data,
      statusCode: 200,
    });
  },
);

export default router;
