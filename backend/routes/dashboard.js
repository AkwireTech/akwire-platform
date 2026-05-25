import express from "express";
import mongoose from "mongoose";
import LabResult from "../models/LabResult.js";
import Lab from "../models/Lab.js";
import ExamResult from "../models/ExamResult.js";

const router = express.Router();

router.get("/lab-dashboard/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const results = await LabResult.find({
      userId: new mongoose.Types.ObjectId(userId)
    });

    // 🔥 Get total labs
    const totalLabs = await Lab.countDocuments();

    // 🔥 Get BEST score per lab
    const bestScores = {};

    results.forEach(r => {
      if (!bestScores[r.labId] || r.score > bestScores[r.labId]) {
        bestScores[r.labId] = r.score;
      }
    });

    const examResults = await ExamResult.find({
      userId: new mongoose.Types.ObjectId(userId)
    }).sort({ createdAt: -1 }).limit(1);

    const latestExam = examResults[0] || null;

    const uniqueScores = Object.values(bestScores);

    // 🔥 FIXED average (based on unique labs only)
    const avgScore =
      uniqueScores.length > 0
        ? uniqueScores.reduce((sum, s) => sum + s, 0) / uniqueScores.length
        : 0;

    // 🔥 Completed labs (ONLY best scores)
    // 🔥 Sequential completion logic
    const labs = await Lab.find().sort({ order: 1 });

    let completedLabs = 0;

    for (let lab of labs) {
      const score = bestScores[lab.labId];

      if (score && score >= 70) {
        completedLabs++;
      } else {
        break; // ⛔ stop at first incomplete lab
      }
    }

    // 🔥 Progress
    const progress =
      totalLabs > 0 ? (completedLabs / totalLabs) * 100 : 0;

    res.json({
      totalLabs,
      avgScore,
      completedLabs,
      progress,
      results,
      latestExam
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;