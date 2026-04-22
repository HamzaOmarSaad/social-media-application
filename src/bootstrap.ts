import express, { Express, Request, Response, NextFunction } from "express";
import userRouter from "./modules/userModule/user.controller";
import { PORT } from "./env/config";
import { IAppError } from "./utils/types/res";
import { NotFoundException } from "./utils/res/error.handle";

const app: Express = express();

const bootstrap = async () => {
  app.use(express.json());
  app.use("/users", userRouter);
  app.all("{/*dummy}", (req, res, next) => {
    throw new NotFoundException("invalid URL");
  });
  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({ err: err.message });
  });
  app.listen(PORT, () => {
    console.log("server runnug on port ", PORT);
  });
};
export default bootstrap;
