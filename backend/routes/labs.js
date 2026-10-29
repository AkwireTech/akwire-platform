import express from "express";
import {
  getLabs,
  getLabById,
  createLab,
  updateLab,
  deleteLab
} from "../controllers/labController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import LabResult from "../models/LabResult.js";

const router = express.Router();


/* ============================
   VALIDATE LAB ANSWER
============================ */
router.post("/:labId/validate-answer", protect, async (req, res) => {
  try {
    const { labId } = req.params;
    const { taskId, answer } = req.body;

    if (!taskId || typeof answer !== "string" || !answer.trim()) {
      return res.status(400).json({
        message: "Task ID and answer are required."
      });
    }

    const lab = await Lab.findOne({ labId }).select("tasks");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found." });
    }

    const task = lab.tasks.find(item => item.id === taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const normalize = value =>
      String(value || "").trim().toLowerCase().replace(/\s+/g, " ");

    const correct = normalize(answer) === normalize(task.answer);

    return res.json({
      correct,
      message: correct
        ? "Correct. Analysis confirmed."
        : "Incorrect. Review the evidence and try again."
    });

  } catch (error) {
    console.error("Answer validation failed:", error);
    res.status(500).json({ message: "Unable to validate answer." });
  }
});


/* ============================
   🔥 SAVE LAB RESULT (NEW)
============================ */
import Lab from "../models/Lab.js";

router.post("/complete", protect, async (req, res) => {
  try {
    const { labId, score, completedTasks, totalTasks } = req.body;

    console.log("Completing lab:", labId, "Score:", score);

    // ✅ Save result
    await LabResult.create({
      userId: req.user._id,
      labId,
      score,
      completedTasks,
      totalTasks
    });

    // ✅ Find current lab
    const currentLab = await Lab.findOne({ labId: labId });

    if (!currentLab) {
      console.log("❌ Current lab not found");
      return res.json({ message: "Saved, but lab not found" });
    }

    console.log("Current Lab Order:", currentLab.order);

    // ✅ Unlock next lab if score >= 60
    // 🔥 Adaptive Unlock Logic
if (score >= 60) {

  const currentLab = await Lab.findOne({ labId: labId });

  if (!currentLab) {
    console.log("❌ Lab not found");
    return res.json({ message: "Lab saved but not found" });
  }

  const nextLab = await Lab.findOne({
    order: { $gt: currentLab.order }
  }).sort({ order: 1 });

  if (nextLab) {
    nextLab.isUnlocked = true;
    await nextLab.save();

    console.log("✅ Unlocked:", nextLab.title);
  } else {
    console.log("⚠️ No next lab found");
  }
}

    res.json({ message: "Lab completed + unlock processed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   EXISTING ROUTES (UNCHANGED)
============================ */

// Get all labs
router.get("/", protect, getLabs);

// ⚠️ MUST stay BELOW /complete
router.get("/:id", protect, getLabById);

// Admin routes
router.post("/", protect, admin, createLab);
router.put("/:id", protect, admin, updateLab);
router.delete("/:id", protect, admin, deleteLab);

export default router;