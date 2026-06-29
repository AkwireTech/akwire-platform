import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addModule,
    addLesson
} from "../controllers/courseController.js";

const router = express.Router();

console.log("✅ courseRoutes loaded");
// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all courses
router.get("/", getCourses);

// ==========================================
// COURSE BUILDER ROUTES
// ==========================================

// Add Module
router.post(
    "/:courseId/modules",
    protect,
    admin,
    addModule
);

// Add Lesson
router.post(
    "/:courseId/modules/:moduleId/lessons",
    protect,
    admin,
    addLesson
);

// ==========================================
// COURSE CRUD
// ==========================================

// Get single course
router.get("/:id", getCourse);

// Create course
router.post(
    "/",
    protect,
    admin,
    createCourse
);

// Update course
router.put(
    "/:id",
    protect,
    admin,
    updateCourse
);

// Delete course
router.delete(
    "/:id",
    protect,
    admin,
    deleteCourse
);

export default router;