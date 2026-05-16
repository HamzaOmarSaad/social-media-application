import redisService from "./utils/redis/redis.service";
import express, { Express, Request, Response, NextFunction } from "express";
import { PORT } from "./env/config";
import { IAppError } from "./utils/types/res.type";
import { connectDB } from "./DB/config/connection";
import { authRouter } from "./modules";
import { NotFoundException } from "./utils/res/exceptions/domain.exceptions";

const app: Express = express();

const bootstrap = async () => {
  app.use(express.json());

  //db connections
  await connectDB();
  await redisService.connectRedisDB();

  // application-routing
  // app.use("/users");
  app.use("/auth", authRouter);

  // unknown path
  app.all("{/*dummy}", (req, res, next) => {
    throw new NotFoundException("invalid URL");
  });
  // error handler
  app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    const errorData = {
      errMsg: err.message,
      statusCode: err.statusCode || 500,
    };
    res.status(err.statusCode || 500).json({ err: JSON.parse(err.message) });
    if (err.validationError?.length) {
      Object.assign(errorData, { validationError: err.validationError });
    }
  });
  app.listen(PORT, () => {
    console.log("server running on port ", PORT);
  });
};
export default bootstrap;
