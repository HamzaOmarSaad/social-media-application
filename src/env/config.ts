import { env } from "node:process";

export const PORT = env["PORT"] as unknown as number;

export const DB_URI = env["DB_URI"] as string;
export const ENCRYPTION_KEY = env["ENCRYPTION_KEY"] as string;

export const SYSTEM_JWT_SECRET = env["SYSTEM_JWT_SECRET"] as string;
export const SYSTEM_JWT_REFRESH_SECRET = env[
  "SYSTEM_JWT_REFRESH_SECRET"
] as string;
export const USER_JWT_SECRET = env["USER_JWT_SECRET"] as string;
export const USER_JWT_REFRESH_SECRET = env["USER_JWT_REFRESH_SECRET"] as string;

export const ACCESS_EXPIRES_IN = env["ACCESS_EXPIRES_IN"] as unknown as number;
export const REFRESH_EXPIRES_IN = env[
  "REFRESH_EXPIRES_IN"
] as unknown as number;

export const REDIS_DB_URI = env["REDIS_DB_URI"] as unknown as string;
export const REDIS_DB_NAME = env["REDIS_DB_NAME"] as unknown as number;

export const CLIENT_ID = env["CLIENT_ID"] as unknown as number;
