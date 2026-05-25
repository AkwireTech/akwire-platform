// models/LabResult.js
import mongoose from "mongoose";

const labResultSchema = new mongoose.Schema({
  userId: String,
  labId: String,
  score: Number,
  completedTasks: Number,
  totalTasks: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("LabResult", labResultSchema);