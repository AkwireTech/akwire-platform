import Exam from "../models/Exam.js";
import User from "../models/User.js";


// =============================
// GET EXAM (Random 20 Questions)
// =============================
export const getExam = async (req, res) => {
  try {

    const exam = await Exam.findOne();

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Shuffle questions
    const shuffled = exam.questions.sort(() => 0.5 - Math.random());

    // Select 20 questions
    const selectedQuestions = shuffled.slice(0, 20);

    res.json({
      title: exam.title,
      questions: selectedQuestions
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============================
// SUBMIT EXAM
// =============================
export const submitExam = async (req, res) => {
  try {

    const { answers } = req.body;

    const exam = await Exam.findOne();

    let score = 0;

    exam.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const percent = Math.round((score / exam.questions.length) * 100);

    const user = await User.findById(req.user._id);

    user.lastExamScore = percent;

    await user.save();

    res.json({
      score: percent,
      correct: score,
      total: exam.questions.length
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============================
// CREATE EXAM (Admin)
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
    res.status(500).json({ message: error.message });
  }
};