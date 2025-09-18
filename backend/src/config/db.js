import mongoose from "mongoose";
import env from "./env.js";

export default async function connectDB() {
  if (!env.MONGODB_URI) throw new Error("MONGODB_URI missing");
  mongoose.connection.on("connected", () => console.log("Mongo connected"));
  mongoose.connection.on("error", (e) => console.error("Mongo error:", e.message));
  mongoose.connection.on("disconnected", () => console.warn("Mongo disconnected"));
  await mongoose.connect(env.MONGODB_URI);
}
