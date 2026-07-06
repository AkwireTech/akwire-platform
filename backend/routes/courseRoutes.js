import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addModuleToCourse
} from "../controllers/courseController.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", getCourse);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Create course
router.post("/", protect, admin, createCourse);

// Add module to course
router.post("/:id/modules", protect, admin, addModuleToCourse);

// Update course
router.put("/:id", protect, admin, updateCourse);

// Delete course
router.delete("/:id", protect, admin, deleteCourse);

export default router;