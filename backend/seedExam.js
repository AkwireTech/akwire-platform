import mongoose from "mongoose";
import dotenv from "dotenv";
import Exam from "./models/Exam.js";
import { questions } from "./data/examQuestions.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("Connected to MongoDB");

await Exam.deleteMany({});

await Exam.create({
title: "Security+ Practice Exam",
questions
});

console.log("Exam seeded successfully");

process.exit();