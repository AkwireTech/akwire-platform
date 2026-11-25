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
  filesystem: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

    // Lab classification
  category: {
    type: String,
    default: "general"
  },

  // How the student experiences the lab
  experienceType: {
    type: String,
    default: "guided-lab"
  },

  // Environment used by the lab engine
  environment: {
    type: String,
    default: "linux-terminal"
  },

  // Optional environment and engine configurations
  network: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  scoring: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  mentor: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  completion: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

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