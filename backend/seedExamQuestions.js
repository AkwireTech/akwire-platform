import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "./models/Exam.js";
import questions from "./data/securityPlusQuestions.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {

await Exam.deleteMany({});

await Exam.create({
title: "Security+ Practice Exam",
questions: questions
});

console.log("Exam question bank seeded");

process.exit();
};

seed();