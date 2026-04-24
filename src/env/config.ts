import { env } from "node:process";

export const PORT = env["PORT"] as unknown as number;
export const DB_URI = env["DB_URI"] as string;
