import Exam from "../models/Exam.js";
import User from "../models/User.js";
import { generateExam } from "../services/examService.js";
import { generateRecommendations } from "../services/adaptiveTraining.js";

// =============================
// GET EXAM (Random 20 Questions)
// =============================

// =============================
// GET EXAM (Balanced Domains)
// =============================
export const getExam = async (req, res) => {
  try {

    const exam = await generateExam();

    res.json(exam);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message });

  }
};

//=====================================
// Adaptive Learning
//=====================================
export const getRecommendations = async (req,res)=>{

try{

const user = await User.findById(req.user._id);

if(!user.domainScores){
return res.json({recommendations:[]});
}

const recommendations = generateRecommendations(user.domainScores);

res.json({
domainScores:user.domainScores,
recommendations
});

}catch(error){

res.status(500).json({
message:"Failed to generate recommendations"
});

}

};


// =============================
// SUBMIT EXAM
// =============================
export const submitExam = async (req, res) => {

try {

const { answers, questions } = req.body;

if (!answers || !questions) {
return res.status(400).json({ message: "Invalid exam submission" });
}

let score = 0;

questions.forEach((q, index) => {

const selectedIndex = answers[index];

if (selectedIndex === undefined) return;

const selectedAnswer = q.options[selectedIndex];

if (selectedAnswer === q.answer) {
score++;
}

});

const percent = Math.round((score / questions.length) * 100);

const user = await User.findById(req.user._id);

user.lastExamScore = percent;

if (!user.examAttempts) {
user.examAttempts = [];
}

user.examAttempts.push({
score: percent,
date: new Date()
});

await user.save();

res.json({
score: percent,
correct: score,
total: questions.length
});

} catch (error) {

console.error("Submit exam error:", error);

res.status(500).json({
message: "Server error while submitting exam"
});

}

};

// =============================
// ADMIN: CREATE EXAM
// =============================
export const createExam = async (req, res) => {
  try {

    const { title, questions } = req.body;

    const exam = await Exam.create({
      title,
      questions
    });

    res.status(201).json(exam);

  } catch (error) {

    console.error("Create exam error:", error);

    res.status(500).json({
      message: "Server error while creating exam"
    });

  }
};

export const getExamHistory = async (req,res)=>{

try{

const user = await User.findById(req.user._id);

res.json({
attempts:user.examAttempts
});

}catch(error){

res.status(500).json({
message:"Failed to load exam history"
});

}

};