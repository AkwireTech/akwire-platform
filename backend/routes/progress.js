import express from "express";
import { completeCourse, getProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// View progress
router.get("/", protect, getProgress);

// Mark course complete
router.post("/:courseId", protect, completeCourse);

export default router;