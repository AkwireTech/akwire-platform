import Exam from "../models/Exam.js";

export const generateExam = async (examTitle = null) => {

  let exam;

  if (examTitle) {

    exam = await Exam.findOne({
      title: examTitle
    });

  } else {

    exam = await Exam.findOne();
  }

  if (!exam || !exam.questions || exam.questions.length === 0) {
    throw new Error("No exam questions found");
  }

  // Safe copy
  const pool = [...exam.questions];

  // Fisher-Yates shuffle
  const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  // Pick questions by exact domain
  const pickQuestions = (domain, count) => {

    const filtered = pool.filter(
      q => q.domain === domain
    );

    shuffle(filtered);

    return filtered.slice(0, count);
  };

  // =============================
  // BALANCED EXAM
  // 4 QUESTIONS PER DOMAIN
  // =============================

  let selectedQuestions = [

    ...pickQuestions("General Security Concepts", 4),

    ...pickQuestions("Threats & Vulnerabilities", 4),

    ...pickQuestions("Security Architecture", 4),

    ...pickQuestions("Security Operations", 4),

    ...pickQuestions("Governance Risk Compliance", 4)

  ];

  // =============================
  // REMOVE DUPLICATES
  // =============================

  const uniqueMap = new Map();

  selectedQuestions.forEach(q => {

    uniqueMap.set(q.question, q);

  });

  selectedQuestions = [...uniqueMap.values()];

  // =============================
  // FILL IF LESS THAN 20
  // =============================

  if (selectedQuestions.length < 20) {

    const usedQuestions = new Set(
      selectedQuestions.map(q => q.question)
    );

    const remaining = pool.filter(
      q => !usedQuestions.has(q.question)
    );

    shuffle(remaining);

    const needed = 20 - selectedQuestions.length;

    selectedQuestions = [
      ...selectedQuestions,
      ...remaining.slice(0, needed)
    ];
  }

  // =============================
  // FINAL SHUFFLE
  // =============================

  shuffle(selectedQuestions);

  return {

    title: exam.title,

    questions: selectedQuestions

  };

};