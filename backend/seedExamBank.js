import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "./models/Exam.js";
import questions from "./data/securityPlusQuestions.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const seedExam = async () => {

await Exam.deleteMany({});

await Exam.create({
title: "Security+ Master Exam",
questions: questions
});

console.log("Security+ Question Bank Seeded");

process.exit();
};

seedExam();