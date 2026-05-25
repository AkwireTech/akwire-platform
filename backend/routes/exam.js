import express from "express";
import { getExam, createExam, getExamHistory, getRecommendations } from "../controllers/examController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import ExamResult from "../models/ExamResult.js";

const router = express.Router();

// Get exam questions
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