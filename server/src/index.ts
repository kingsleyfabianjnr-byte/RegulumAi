import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import complianceRoutes from "./routes/compliance";
import userRoutes from "./routes/users";

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`RegulumAi server running on port ${PORT}`);
});

export default app;
