import express from "express";

import {

    getCourses,
    getCourse,
    createCourse

} from "../controllers/courseController.js";

import { protect }
from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// PUBLIC ROUTES
// ==========================

router.get("/", getCourses);

router.get("/:id", getCourse);

// ==========================
// ADMIN ROUTES
// ==========================

router.post(
    "/",
    protect,
    createCourse
);

export default router;