
import express from "express";

import { protect }
from "../middleware/authMiddleware.js";

import { admin }
from "../middleware/adminMiddleware.js";

import {

    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse

} from "../controllers/courseController.js";

const router =
    express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all courses
router.get(
    "/",
    getCourses
);

// Get single course
router.get(
    "/:id",
    getCourse
);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Create course
router.post(
    "/",
    protect,
    createCourse
);

// Update course
router.put(
    "/:id",
    protect,
    updateCourse
);

// Delete course
router.delete(
    "/:id",
    protect,
    deleteCourse
);

export default router;