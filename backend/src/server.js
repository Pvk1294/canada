import "dotenv/config";
import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otp.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import { cleanup } from "./store/otpStore.js";

const app = express();

/**
 * ✅ PORT FIX
 * DigitalOcean injects PORT at runtime
 */
const PORT = process.env.PORT || 8080;

/**
 * ✅ DEBUG (REMOVE LATER)
 */
console.log("ENV DEBUG:", {
  PORT: process.env.PORT,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
});

/**
 * ✅ SAFE CORS ORIGIN PARSING
 * Prevent crash if env missing
 */
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

/**
 * ✅ CORS SETUP
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/**
 * ✅ HANDLE PREFLIGHT
 */
app.options("*", cors());

/**
 * ✅ BODY PARSER
 */
app.use(express.json());

/**
 * ✅ REQUEST LOGGER
 */
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

/**
 * ✅ ROUTES
 */
app.use("/api/otp", otpRoutes);
app.use("/api/leads", leadsRoutes);

/**
 * ✅ HEALTH CHECK
 */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

/**
 * ✅ GLOBAL ERROR HANDLER
 */
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, error: err.message || "Internal server error" });
});

/**
 * ✅ CLEANUP JOB
 */
setInterval(cleanup, 60 * 1000);

/**
 * ✅ START SERVER
 */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});