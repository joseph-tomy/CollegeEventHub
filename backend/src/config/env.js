import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/collegeeventhub",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
