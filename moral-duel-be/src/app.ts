import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import authRoutes from "./routes/auth.routes";
import caseRoutes from "./routes/case.routes";
import voteRoutes from "./routes/vote.routes";

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Moral Oracle API is running" });
});

app.use("/auth", authRoutes);
app.use("/case", caseRoutes);
app.use("/vote", voteRoutes);

export default app;
