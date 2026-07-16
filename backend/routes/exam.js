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
import ExamResult from "../models/ExamResult.js";
import Course from "../models/Course.js";

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
// =====================================
// SUBMIT EXAM
// =====================================
router.post("/submit", protect, async (req, res) => {

    try {

        console.log("🔥 CUSTOM EXAM SUBMIT ROUTE HIT");

        const { answers, questions } = req.body;

        if (!answers || !questions) {

            return res.status(400).json({
                message: "Invalid exam submission"
            });

        }

        let correct = 0;

        const domainScores = {};

        const domainCounts = {};

        // ===========================
        // Calculate Score
        // ===========================

        questions.forEach((q, index) => {

        const submitted = answers[index];

        let selectedAnswer;

        // Backward compatibility:
        // Old exams send option indexes.
        // New exams may send answer text.

        if (typeof submitted === "number") {

            selectedAnswer = q.options[submitted];

        } else {

            selectedAnswer = submitted;

        }

        const isCorrect = selectedAnswer === q.answer;

        if (isCorrect) {

            correct++;

        }

        const domain = q.domain || "General";

        if (!domainScores[domain]) {

            domainScores[domain] = 0;
            domainCounts[domain] = 0;

        }

        if (isCorrect) {

            domainScores[domain]++;

        }

        domainCounts[domain]++;

    });

    const score = Math.round(
        (correct / questions.length) * 100
    );

        // ===========================
        // Update User Record
        // ===========================

        const user = req.user;

        user.lastExamScore = score;

        if (!user.examAttempts) {

            user.examAttempts = [];

        }

        user.examAttempts.push({

            score,

            date: new Date()

        });

        // ===========================
        // Award Certificate
        // ===========================

        if (score >= 80) {

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

                }

            }

        }

        await user.save();

        // ===========================
        // Convert Domain Scores
        // ===========================

        for (const domain in domainScores) {

            domainScores[domain] = Math.round(

                (domainScores[domain] /
                 domainCounts[domain]) * 100

            );

        }

        // ===========================
        // Save Exam Result
        // ===========================

        const savedResult = await ExamResult.create({

            userId: user._id,

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

    }

    catch (err) {

        console.error("Exam submit error:", err);

        res.status(500).json({

            error: err.message

        });

    }

});

// =====================================
// HISTORY / RECOMMENDATIONS
// =====================================
router.get("/history", protect, getExamHistory);
router.get("/recommendations", protect, getRecommendations);

// =====================================
// ADMIN
// =====================================
router.post("/", protect, admin, createExam);

export default router;