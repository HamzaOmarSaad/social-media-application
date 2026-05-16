import mongoose from "mongoose";
import { DB_URI } from "../../env/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("🚀 ~ DB connected successfully");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};
