import { HUser } from "./db.type";
import { JwtPayload } from "jsonwebtoken";

//declaration manager
declare module "express-serve-static-core" {
  interface Request {
    user: HUser;
    decoded: JwtPayload;
  }
}
