// =============================
// PRACTICE EXAM ENGINE
// =============================

let examTime = 30 * 60;
let timerInterval;
let questions = [];
let currentQ = 0;
let userAnswers = [];
let flaggedQuestions = [];

// =============================
// TIMER
// =============================
function startExamTimer() {
    const timerElement = document.getElementById("exam-timer");
    if (!timerElement) return;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(examTime / 60);
        const seconds = examTime % 60;

        timerElement.innerText =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        examTime--;

        if (examTime < 0) {
            clearInterval(timerInterval);
            alert("Time is up! Submitting exam.");
            submitExam();
        }
    }, 1000);
}

// =============================
// LOAD PRACTICE EXAM
// =============================
async function fetchExam() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user._id) {
            window.location.href = "login.html";
            return;
        }

        const res = await fetch(
            "https://akwire-api.onrender.com/api/exam",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!res.ok) {
            console.error("Practice exam load failed:", res.status);
            return;
        }

        const data = await res.json();

        if (!data || !Array.isArray(data.questions)) {
            console.error("No exam questions found.");
            return;
        }

        questions = data.questions.map(q => ({
            q: q.question || q.q || "",
            options: Array.isArray(q.options) ? q.options : [],
            answer: q.answer || "",
            explanation: q.explanation || "",
            domain: q.domain || "General Security Concepts"
        }));

        userAnswers = new Array(questions.length).fill(null);

        loadQuestion();
    } catch (err) {
        console.error("Exam fetch error:", err);
    }
}

// =============================
// LOAD QUESTION
// =============================
function loadQuestion() {
    if (!questions.length) return;

    buildQuestionNav();

    const qData = questions[currentQ];
    if (!qData) return;

    document.getElementById("question-number").innerText =
        `Question ${currentQ + 1} of ${questions.length}`;

    document.getElementById("question-text").innerHTML = `
        <div class="question-domain">
            ${qData.domain}
        </div>

        <div class="question-title">
            ${qData.q}
        </div>
    `;

    const feedbackBox = document.getElementById("feedback-box");
    if (feedbackBox) {
        feedbackBox.style.display = "none";
    }

    const optionsDiv = document.getElementById("options-container");
    optionsDiv.innerHTML = "";

    qData.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;

        if (userAnswers[currentQ] === index) {

            btn.classList.add("selected");

    }

        btn.onclick = () => selectAnswer(index);
        optionsDiv.appendChild(btn);
    });

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
        prevBtn.style.visibility = currentQ === 0 ? "hidden" : "visible";
    }

    if (nextBtn) {
        nextBtn.innerText =
            currentQ === questions.length - 1
                ? "Review Exam"
                : "Next";
    }
}

// =============================
// SELECT ANSWER
// =============================
function selectAnswer(answerIndex) {

    userAnswers[currentQ] = answerIndex;

    localStorage.setItem(
        "examProgress",
        JSON.stringify(userAnswers)
    );

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach((btn, index) => {

        btn.classList.remove(
            "selected",
            "correct",
            "wrong"
        );

        if (index === answerIndex) {

            btn.classList.add("selected");

        }

    });

    buildQuestionNav();

}

// =============================
// FLAG QUESTION
// =============================
function toggleFlag() {
    if (flaggedQuestions.includes(currentQ)) {
        flaggedQuestions = flaggedQuestions.filter(q => q !== currentQ);
        alert("Flag removed");
    } else {
        flaggedQuestions.push(currentQ);
        alert("Question flagged for review");
    }

    buildQuestionNav();
}

// =============================
// QUESTION NAV
// =============================
function buildQuestionNav() {
    const nav = document.getElementById("question-nav");
    if (!nav) return;

    nav.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");
        btn.innerText = index + 1;
        btn.classList.add("nav-btn");

        if (index === currentQ) {
            btn.classList.add("current");
        }

        if (userAnswers[index] !== null && userAnswers[index] !== undefined) {
            btn.classList.add("answered");
        }

        if (flaggedQuestions.includes(index)) {
            btn.classList.add("flagged");
        }

        btn.onclick = () => goToQuestion(index);
        nav.appendChild(btn);
    });
}

// =============================
// CHANGE QUESTION
// =============================
function changeQuestion(step) {
    const nextIndex = currentQ + step;

    if (nextIndex >= questions.length) {
        showReviewScreen();
        return;
    }

    if (nextIndex < 0) {
        currentQ = 0;
    } else {
        currentQ = nextIndex;
    }

    localStorage.setItem("currentQuestionIndex", currentQ);
    loadQuestion();
}

// =============================
// GO TO QUESTION
// =============================
function goToQuestion(index) {
    currentQ = index;
    loadQuestion();
}

// =============================
// REVIEW SCREEN
// =============================
function showReviewScreen() {
    const quizBox = document.getElementById("quiz-box");
    if (!quizBox) return;

    let reviewHTML = "";

    questions.forEach((q, index) => {
        const flagged = flaggedQuestions.includes(index) ? "⚑ " : "";
        const answered =
            userAnswers[index] !== null && userAnswers[index] !== undefined
                ? "Answered"
                : "Not Answered";

        reviewHTML += `
            <div style="margin:10px;padding:12px;border:1px solid #1e293b;border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
                <div>
                    <strong>Question ${index + 1}</strong>
                    <span style="margin-left:8px;color:#94a3b8;">${flagged}${answered}</span>
                </div>

                <button class="btn-secondary" onclick="goToQuestion(${index})">
                    Review
                </button>
            </div>
        `;
    });

    quizBox.innerHTML = `
        <div style="padding:20px;">
            <h2 style="margin-bottom:10px;">Review Your Practice Exam</h2>
            <p style="color:#94a3b8;margin-bottom:20px;">
                Review flagged or unanswered questions before submitting.
            </p>

            ${reviewHTML}

            <div style="margin-top:25px;display:flex;gap:12px;flex-wrap:wrap;">
                <button class="btn-primary" onclick="submitExam()">Submit Exam</button>
            </div>
        </div>
    `;
}

// =============================
// SUBMIT EXAM
// =============================
async function submitExam() {
    try {

        clearInterval(timerInterval);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user._id) {
            window.location.href = "login.html";
            return;
        }

        const payload = {
            type: "practice",
            answers: userAnswers,
            questions
        };

        const res = await fetch(
            "https://akwire-api.onrender.com/api/exam/submit",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || result.error || "Exam submission failed");
        }

        showFinalScore(result);
    } catch (err) {
        console.error("Submit failed:", err);
        alert(err.message || "Failed to submit exam.");
    }
}

// =============================
// RESULTS
// =============================
function showFinalScore(result) {
    let user = JSON.parse(localStorage.getItem("currentUser")) || {};
    user.lastExamScore = result.score;
    localStorage.setItem("currentUser", JSON.stringify(user));

    let reviewHTML = "";

    questions.forEach((q, index) => {
        const selectedIndex = userAnswers[index];
        const selectedAnswer =
            selectedIndex !== null && selectedIndex !== undefined
                ? q.options[selectedIndex]
                : null;

        const isCorrect = selectedAnswer === q.answer;

        if (!isCorrect) {
            reviewHTML += `
                <div class="review-item"
                    style="margin-bottom:20px;padding:15px;background:rgba(239,68,68,0.1);
                    border-left:4px solid #ef4444;text-align:left;">

                    <p style="font-weight:bold;color:white;margin:0;">
                        Question ${index + 1}: ${q.q}
                    </p>

                    <p style="color:#ef4444;margin:5px 0;">
                        Your Answer: ${selectedAnswer || "Skipped"}
                    </p>

                    <p style="color:#10b981;margin:5px 0;">
                        Correct Answer: ${q.answer}
                    </p>

                    <p style="font-style:italic;color:#94a3b8;font-size:.85rem;margin-top:5px;">
                        Rationale: ${q.explanation}
                    </p>
                </div>
            `;
        }
    });

    localStorage.removeItem("examProgress");
    localStorage.removeItem("currentQuestionIndex");

    const quizBox = document.getElementById("quiz-box");

    quizBox.innerHTML = `
        <div style="text-align:center;padding:40px;background:#0f172a;
        border-radius:12px;border:1px solid #1e293b;">

            <h2 style="color:white;margin-bottom:10px;">Practice Exam Results</h2>

            <h1 style="font-size:4rem;color:#38bdf8;margin:0;">
                ${result.score}%
            </h1>

            <p style="color:#94a3b8;margin-bottom:30px;">
                You answered ${result.correct} out of ${result.total} correctly.
            </p>

            <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
                <button class="btn-primary" onclick="location.reload()">Retake Exam</button>
                <button class="btn-secondary" onclick="showReview()">Review Errors</button>
                <button class="btn-secondary" onclick="goToDashboard()">Dashboard</button>
            </div>

            <div id="review-area"
                style="display:none;margin-top:30px;border-top:1px solid #1e293b;padding-top:20px;">

                <h3 style="color:#94a3b8;margin-bottom:15px;">Error Log:</h3>

                ${reviewHTML || "<p style='color:#10b981;'>No errors detected.</p>"}
            </div>
        </div>
    `;
}

// =============================
// REVIEW TOGGLE
// =============================
function showReview() {
    const reviewArea = document.getElementById("review-area");
    if (!reviewArea) return;

    reviewArea.style.display =
        reviewArea.style.display === "none" ? "block" : "none";
}

// =============================
// DASHBOARD
// =============================
function goToDashboard() {
    window.location.href = "dashboard.html";
}

// =============================
// START
// =============================
document.addEventListener("DOMContentLoaded", () => {
    fetchExam();
    startExamTimer();

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const flagBtn = document.getElementById("flag-btn");

    if (nextBtn) {
        nextBtn.addEventListener("click", () => changeQuestion(1));
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => changeQuestion(-1));
    }

    if (flagBtn) {
        flagBtn.addEventListener("click", toggleFlag);
    }
});