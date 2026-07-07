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
    updateModule,
    deleteModule,
    addLessonToModule,
    updateLesson,
    deleteLesson
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
router.put("/:id", protect, admin, updateCourse);
router.delete("/:id", protect, admin, deleteCourse);

// MODULES
router.post("/:id/modules", protect, admin, addModuleToCourse);
router.put("/:id/modules/:moduleIndex", protect, admin, updateModule);
router.delete("/:id/modules/:moduleIndex", protect, admin, deleteModule);

// LESSONS
router.post("/:id/modules/:moduleIndex/lessons", protect, admin, addLessonToModule);
router.put("/:id/modules/:moduleIndex/lessons/:lessonIndex", protect, admin, updateLesson);
router.delete("/:id/modules/:moduleIndex/lessons/:lessonIndex", protect, admin, deleteLesson);

export default router;