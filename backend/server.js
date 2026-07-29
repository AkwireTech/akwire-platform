import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import labRoutes from "./routes/labs.js";
import dashboardRoutes from "./routes/dashboard.js";
import progressRoutes from "./routes/progress.js";
import examRoutes from "./routes/exam.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ======================================
// REQUEST LOGGER
// ======================================

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// ======================================
// CORS
// ======================================

const allowedOrigins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://localhost:5173"
];

app.use(cors({
    origin(origin, callback) {

        // Allow Postman
        if (!origin) {
            return callback(null, true);
        }

        // Local development
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow ALL Vercel preview deployments
        if (origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }

        return callback(new Error("CORS not allowed"));
    },

    credentials: true
}));

// ======================================
// MIDDLEWARE
// ======================================

app.use(express.json());

app.use(cookieParser());

// ======================================
// API ROUTES
// ======================================

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

// ======================================
// STATIC FILES
// ======================================

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

// ======================================
// HOME
// ======================================

app.get("/", (req, res) => {

    res.send("Akwire Platform API Running");

});

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(err.status || 500).json({

        success: false,
        message: err.message || "Internal Server Error"

    });

});

// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});