import express from "express";
import {

  completeCourse,
  getProgress,
  markLessonComplete,
  getLessonProgress,
  getCertificates,
  getStatus

} from "../controllers/progressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/test-cert",
  (req, res) => {

    res.json({
      message:
        "test route working"
    });

  }
);

// View progress
router.get("/", protect, getProgress);

router.get(
  "/lessons",
  protect,
  getLessonProgress
);

router.get(
  "/status",
  protect,
  getStatus
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