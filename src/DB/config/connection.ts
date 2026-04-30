import mongoose from "mongoose";
import { DB_URI, REDIS_DB_NAME, REDIS_DB_URI } from "../../env/config";
import { createClient } from "redis";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("🚀 ~ DB connected successfully");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};

const redisClient = createClient({
  url: REDIS_DB_URI,
  database: REDIS_DB_NAME,
});

export const connectRedisDB = async () => {
  try {
    await redisClient.connect();
    console.log("🚀 ~ redis connected successfully");
  } catch (error) {
    console.log("🚀 ~ redis connectDB ~ error:", error);
  }
};
