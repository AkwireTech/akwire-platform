import express from "express";

import {
    getExam,
    getModuleQuiz,
    getFinalExam,
    submitExam,
    createExam,
    getExamHistory,
    getRecommendations
} from "../controllers/examController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// =====================================
// EXAM LOAD ROUTES
// =====================================

router.get("/", protect, getExam);

router.get("/final", protect, getFinalExam);

router.get("/module/:id", protect, getModuleQuiz);

// =====================================
// SUBMIT EXAM
// =====================================

router.post(
    "/submit",
    protect,
    submitExam
);

// =====================================
// HISTORY
// =====================================

router.get(
    "/history",
    protect,
    getExamHistory
);

// =====================================
// RECOMMENDATIONS
// =====================================

router.get(
    "/recommendations",
    protect,
    getRecommendations
);

// =====================================
// ADMIN
// =====================================

router.post(
    "/",
    protect,
    admin,
    createExam
);

export default router;