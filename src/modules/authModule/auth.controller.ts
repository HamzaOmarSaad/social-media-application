import { Response, Request, Router, type Router as routerType } from "express";

const router: routerType = Router();

const routes = {
  signup: "/signup",
};
router.post(routes.signup, (req: Request, res: Response) => {});

export default router;
