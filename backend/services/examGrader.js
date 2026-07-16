// ==========================================
// Akwire Exam Grader Service
// Shared by Practice Exams, Module Quizzes,
// and Final Exams
// ==========================================

export function gradeExam(questions, answers) {

    let correct = 0;

    const domainScores = {};

    const domainCounts = {};

    questions.forEach((q, index) => {

        const submitted = answers[index];

        let selectedAnswer = null;

        // ----------------------------------
        // Backward Compatibility
        // ----------------------------------
        // Supports BOTH:
        // 1. Option index (0,1,2,3)
        // 2. Answer text ("Firewall")
        // ----------------------------------

        if (typeof submitted === "number") {

            selectedAnswer = q.options[submitted];

        } else if (typeof submitted === "string") {

            selectedAnswer = submitted;

        }

        const isCorrect =
            selectedAnswer === q.answer;

        if (isCorrect) {

            correct++;

        }

        const domain =
            q.domain || "General";

        if (!domainScores[domain]) {

            domainScores[domain] = 0;
            domainCounts[domain] = 0;

        }

        if (isCorrect) {

            domainScores[domain]++;

        }

        domainCounts[domain]++;

    });

    for (const domain in domainScores) {

        domainScores[domain] = Math.round(

            (domainScores[domain] /
                domainCounts[domain]) * 100

        );

    }

    const score = Math.round(

        (correct / questions.length) * 100

    );

    return {

        score,
        correct,
        total: questions.length,
        domainScores

    };

}