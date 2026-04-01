import "dotenv/config";
import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otp.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import { cleanup } from "./store/otpStore.js";

const app = express();
const PORT = process.env.PORT;
console.log("port being used", PORT)

// Middleware
const allowedOrigins = (process.env.FRONTEND_ORIGIN)
  .split(",")
  .map((o) => o.trim());

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Ensure preflight OPTIONS requests are handled for all routes
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/otp", otpRoutes);
app.use("/api/leads", leadsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// Cleanup expired OTP entries every 60 seconds
setInterval(cleanup, 60 * 1000);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
