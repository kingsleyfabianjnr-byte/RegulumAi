import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth";
import complianceRoutes from "./routes/compliance";
import userRoutes from "./routes/users";
import scraperRoutes from "./routes/scraper";

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Serve static assets (landing page, etc.)
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

// Landing page
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// RegulumAI dashboard (static HTML with Tailwind)
app.get("/dashboard", (_req, res) => {
  const dashboardPath = path.join(__dirname, "..", "..", "client", "dashboard.html");
  res.sendFile(dashboardPath);
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/users", userRoutes);
app.use("/v1/scraper", scraperRoutes);

app.listen(PORT, () => {
  console.log(`RegulumAi server running on port ${PORT}`);
});

export default app;
