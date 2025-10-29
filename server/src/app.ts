import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;
