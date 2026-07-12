import ExamEngine from "./examEngine.js";

document.addEventListener("DOMContentLoaded", () => {

    window.examEngine = new ExamEngine({

        mode: "final",

        examTitle: "Security+ Final Exam",

        endpoint: "/api/exam/final",

        submitEndpoint: "/api/exam/submit",

        passScore: 80,

        instantFeedback: false,

        timeLimit: 60 * 60

    });

});