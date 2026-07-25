import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import labRoutes from "./routes/labs.js";
import dashboardRoutes from "./routes/dashboard.js";
import progressRoutes from "./routes/progress.js";
import examRoutes from "./routes/exam.js";
import userRoutes from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import courseRoutes from "./routes/courseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/labs", labRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/users", userRoutes);
app.use(express.static("public"));
app.use("/api/ai", aiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SERVE FRONTEND
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => res.send("Akwire Platform API Running"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));