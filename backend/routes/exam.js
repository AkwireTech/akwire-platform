import express from "express";

import {
  getExam,
  getModuleQuiz,
  getFinalExam,
  submitExam,
  createExam,
  getExamHistory,
  getRecommendations
}

from "../controllers/examController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import ExamResult from "../models/ExamResult.js";
import Course from "../models/Course.js";


const router = express.Router();

router.get("/module/:id", protect, getModuleQuiz);

router.get(
  "/final",
  protect,
  getFinalExam
);

// Get exam questions

router.get(
  "/module/:id",
  protect,
  getModuleQuiz
);

router.get("/", protect, getExam);


// Submit exam answers + save result
router.post("/submit", protect, async (req, res) => {
  try {
    console.log("🔥 CUSTOM EXAM SUBMIT ROUTE HIT");
    const { answers, questions } = req.body;

    let correct = 0;
    const domainScores = {};
    const domainCounts = {};

    questions.forEach((q, index) => {
      const selectedAnswerText = q.options[answers[index]];
      const isCorrect = selectedAnswerText === q.answer;

      if (isCorrect) correct++;

      const domain = q.domain || "General";

      if (!domainScores[domain]) {
        domainScores[domain] = 0;
        domainCounts[domain] = 0;
      }

      if (isCorrect) domainScores[domain]++;
      domainCounts[domain]++;
    });

    const score = Math.round((correct / questions.length) * 100);

    // Award certificate only if final exam passed

    if (score >= 80) {

      const user = req.user;

      const course = await Course.findOne({

        title: "Security+ Fundamentals"

      });

      if (course) {

        const alreadyCertified =

          user.certifiedCourses?.some(

            cert =>

              cert.toString() ===
              course._id.toString()

          );

        if (!alreadyCertified) {

          user.certifiedCourses.push(
            course._id
          );

          await user.save();

          console.log(
            "Certificate awarded"
          );

        }

      }

    }

    // Convert domain scores to %
    for (const domain in domainScores) {
      domainScores[domain] = Math.round(
        (domainScores[domain] / domainCounts[domain]) * 100
      );
    }

    // Save exam result
    const savedResult = await ExamResult.create({
      userId: req.user._id,
      score,
      domainScores
    });

    console.log("Exam saved:", savedResult);

    res.json({
      score,
      correct,
      total: questions.length,
      domainScores
    });

  } catch (err) {
    console.error("Exam submit error:", err);
    res.status(500).json({ error: err.message });
  }
});

// History / recommendations
router.get("/history", protect, getExamHistory);
router.get("/recommendations", protect, getRecommendations);

export default router;