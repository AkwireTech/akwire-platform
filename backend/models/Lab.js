import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  id: String,
  label: String,
  cmd: String,
  nextObjective: String,
  question: String,
  answer: String
});

const labSchema = new mongoose.Schema({
  labId: String,
  title: String,
  clearance: String,
  briefing: String,
  objective: String,
  tasks: [taskSchema],
  scenarios: Object,
  hints: [String],
  order: { type: Number, required: true },
  isUnlocked: { type: Boolean, default: false },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  }
});

export default mongoose.model("Lab", labSchema);