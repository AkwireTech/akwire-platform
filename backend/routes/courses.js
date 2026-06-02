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
router.get("/", protect, getCourses);

// Admin-only routes
router.post("/", protect, admin, createCourse);
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

export default router;