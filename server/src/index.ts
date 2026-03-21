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
app.use(express.urlencoded({ extended: true }));

// Serve static assets (landing page, etc.)
const publicDir = path.resolve(__dirname, "..", "public");
const clientDir = path.resolve(__dirname, "..", "..", "client");

// Landing page
app.get("/", (_req, res) => {
  res.sendFile(path.resolve(clientDir, "index.html"));
});

// RegulumAI dashboard (static HTML with Tailwind)
app.get("/dashboard", (_req, res) => {
  res.sendFile(path.resolve(clientDir, "dashboard.html"));
});

// Marketing landing page (client/index.html)
app.get("/create-rule", (_req, res) => {
  res.sendFile(path.resolve(clientDir, "index.html"));
});

app.get("/signup", (_req, res) => {
  res.sendFile(path.resolve(clientDir, "signup.html"));
});

app.get("/login", (_req, res) => {
  res.sendFile(path.resolve(clientDir, "login.html"));
});

app.use(express.static(publicDir));

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
