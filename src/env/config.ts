import { env } from "node:process";

export const PORT = env["PORT"] as unknown as number;
