import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const PORT = Number(env.PORT) || 5000;

// Validate critical env
["MONGODB_URI", "JWT_SECRET"].forEach(k => {
  if (!process.env[k]) {
    console.error(`Missing required env var: ${k}`);
    process.exit(1);
  }
});

(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down...`);
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
      setTimeout(() => process.exit(1), 10000).unref();
    };
    ["SIGINT", "SIGTERM"].forEach(sig => process.on(sig, () => shutdown(sig)));

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Promise Rejection:", err);
      shutdown("unhandledRejection");
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
})();
