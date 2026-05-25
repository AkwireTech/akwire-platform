import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  explanation: String,
  domain: String
});

const examSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

export default mongoose.model("Exam", examSchema);