import express from "express";
import {

  completeCourse,
  getProgress,

  markLessonComplete,
  getLessonProgress,

  getCertificates

} from "../controllers/progressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// View progress
router.get("/", protect, getProgress);

router.get(
  "/lessons",
  protect,
  getLessonProgress
);

router.get(
  "/certificates",
  protect,
  getCertificates
);

router.post(
  "/lesson",
  protect,
  markLessonComplete
);

// Mark course complete
router.post("/:courseId", protect, completeCourse);

export default router;