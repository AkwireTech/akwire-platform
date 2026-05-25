import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  domainScores: {
    type: Object, // { networking: 80, linux: 60, security: 90 }
    required: true
  }
}, {
  timestamps: true
});

const ExamResult = mongoose.model("ExamResult", examResultSchema);

export default ExamResult;