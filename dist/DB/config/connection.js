"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedisDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../env/config");
const redis_1 = require("redis");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.DB_URI);
        console.log("🚀 ~ DB connected successfully");
    }
    catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error);
    }
};
exports.connectDB = connectDB;
const redisClient = (0, redis_1.createClient)({
    url: config_1.REDIS_DB_URI,
    database: config_1.REDIS_DB_NAME,
});
const connectRedisDB = async () => {
    try {
        await redisClient.connect();
        console.log("🚀 ~ redis connected successfully");
    }
    catch (error) {
        console.log("🚀 ~ redis connectDB ~ error:", error);
    }
};
exports.connectRedisDB = connectRedisDB;
