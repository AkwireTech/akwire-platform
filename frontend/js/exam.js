import ExamEngine from "./examEngine.js";

document.addEventListener("DOMContentLoaded", () => {

    window.examEngine = new ExamEngine({

        mode: "practice",

        examTitle: "Practice Exam",

        endpoint: "/api/exam",

        submitEndpoint: "/api/exam/submit",

        passScore: 80,

        instantFeedback: false,

        timeLimit: 30 * 60

    });

});