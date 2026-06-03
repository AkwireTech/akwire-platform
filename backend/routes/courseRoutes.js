import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

// Public route — view courses
router.get("/", getCourses);

// Admin-only routes
router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;