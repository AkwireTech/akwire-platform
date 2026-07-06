import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addModuleToCourse,
    addLessonToModule
} from "../controllers/courseController.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get("/", getCourses);
router.get("/:id", getCourse);

// ==========================================
// PROTECTED ROUTES
// ==========================================
router.post("/", protect, admin, createCourse);
router.post("/:id/modules", protect, admin, addModuleToCourse);
router.post("/:id/modules/:moduleIndex/lessons", protect, admin, addLessonToModule);
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

export default router;