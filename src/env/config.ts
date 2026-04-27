import { env } from "node:process";

export const PORT = env["PORT"] as unknown as number;

export const DB_URI = env["DB_URI"] as string;
export const ENCRYPTION_KEY = env["ENCRYPTION_KEY"] as string;

export const JWT_SECRET = env["JWT_SECRET"] as string;

export const ACCESS_EXPIRES_IN = env["ACCESS_EXPIRES_IN"] as unknown as number;
export const REFRESH_EXPIRES_IN = env[
  "REFRESH_EXPIRES_IN"
] as unknown as number;
