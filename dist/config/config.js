"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function getEnvVar(key, required = true) {
    const value = process.env[key];
    if (!value && required) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
exports.env = {
    PORT: getEnvVar("PORT"),
    NODE_ENV: getEnvVar("NODE_ENV"),
    MONGO_URI: getEnvVar("MONGO_URI"),
    JWT_SECRET: getEnvVar("JWT_SECRET"),
};
