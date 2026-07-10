// =============================
// 1. STATE
// =============================
let examTime = 30 * 60;
let timerInterval;
let questions = [];
let currentQ = 0;
let userAnswers = [];
let flaggedQuestions = [];

let currentCourseId = "";
let currentModuleId = "1";
let currentCourseTitle = "Course";
let currentQuizTitle = "Module Quiz";

// =============================
// 2. HELPERS
// =============================
function shuffleArray(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function prepareQuestions(rawQuestions) {
    const normalized = rawQuestions.map(q => {
        const originalOptions = Array.isArray(q.options)
            ? [...q.options]
            : [];

        const shuffledOptions = shuffleArray(originalOptions);

        return {
            q: q.question || q.q || "",
            options: shuffledOptions,
            answer: q.answer,
            explanation: q.explanation || "",
            domain: q.domain || "General Security Concepts"
        };
    });

    return shuffleArray(normalized);
}

function updateQuizHeader() {
    const headerTitle = document.querySelector(".quiz-header h2");
    const headerText = document.querySelector(".quiz-header p");

    if (headerTitle) {
        headerTitle.textContent = currentQuizTitle;
    }

    if (headerText) {
        headerText.textContent =
            `Module ${currentModuleId} assessment for ${currentCourseTitle}. Select the best answer for each question.`;
    }
}

function resetQuizState() {
    clearInterval(timerInterval);

    examTime = 30 * 60;
    questions = [];
    currentQ = 0;
    userAnswers = [];
    flaggedQuestions = [];

    const timerElement = document.getElementById("exam-timer");
    if (timerElement) {
        timerElement.innerText = "30:00";
    }
}

// =============================
// EXAM TIMER
// =============================
function startExamTimer() {
    const timerElement = document.getElementById("exam-timer");

    clearInterval(timerInterval);

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
// LOAD EXAM FROM BACKEND
// =============================
async function fetchExam() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please login.");
            window.location.href = "login.html";
            return;
        }

        const params = new URLSearchParams(window.location.search);
        currentModuleId = params.get("module") || "1";
        currentCourseId = params.get("course") || "";

        console.log("Module ID:", currentModuleId);

        const res = await fetch(
            `https://akwire-api.onrender.com/api/exam/module/${currentModuleId}?course=${currentCourseId}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!res.ok) {
            console.error("Server returned:", res.status);
            return;
        }

        const data = await res.json();

        if (!data || !data.questions) {
            console.error("No exam questions found.");
            return;
        }

        currentQuizTitle =
            data.title || `Module ${currentModuleId} Quiz`;

        currentCourseTitle =
            data.title
                ? data.title.replace(` - Module ${currentModuleId} Quiz`, "")
                : "Course";

        updateQuizHeader();

        questions = prepareQuestions(data.questions);

        userAnswers = new Array(questions.length).fill(null);
        currentQ = 0;
        flaggedQuestions = [];

        loadQuestion();

    } catch (err) {
        console.error("Exam fetch error:", err);
    }
}

// =============================
// LOAD QUESTION
// =============================
function loadQuestion() {
    buildQuestionNav();

    const qData = questions[currentQ];
    if (!qData) return;

    document.getElementById("question-number").innerText =
        `Question ${currentQ + 1} of ${questions.length}`;

    document.getElementById("question-text").innerHTML = `
        <div class="question-domain">
            ${qData.domain || "General Security Concepts"}
        </div>

        <div class="question-title">
            ${qData.q}
        </div>
    `;

    const feedbackBox = document.getElementById("feedback-box");
    if (feedbackBox) feedbackBox.style.display = "none";

    const optionsDiv = document.getElementById("options-container");
    optionsDiv.innerHTML = "";

    qData.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;

        if (userAnswers[currentQ] === opt) {
            btn.classList.add(
                opt === qData.answer ? "correct" : "wrong"
            );
            showFeedback(opt);
        }

        btn.onclick = () => selectAnswer(opt);
        optionsDiv.appendChild(btn);
    });

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (prevBtn) {
        prevBtn.style.visibility =
            currentQ === 0 ? "hidden" : "visible";
    }

    if (nextBtn) {
        nextBtn.innerText =
            currentQ === questions.length - 1
                ? "Finish Exam"
                : "Next";
    }
}

// =============================
// FLAGGED QUESTIONS
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
// SELECT ANSWER
// =============================
function selectAnswer(opt) {
    if (userAnswers[currentQ] !== null) return;

    userAnswers[currentQ] = opt;

    showFeedback(opt);

    localStorage.setItem("examProgress", JSON.stringify(userAnswers));

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(btn => {
        if (btn.innerText === opt) {
            btn.classList.add(
                opt === questions[currentQ].answer
                    ? "correct"
                    : "wrong"
            );
        }
    });

    buildQuestionNav();
}

// =============================
// FEEDBACK
// =============================
function showFeedback(opt) {
    const qData = questions[currentQ];

    const feedbackBox = document.getElementById("feedback-box");
    const feedbackResult = document.getElementById("feedback-result");
    const feedbackExp = document.getElementById("feedback-explanation");

    if (!feedbackBox) return;

    feedbackBox.style.display = "block";

    if (opt === qData.answer) {
        feedbackResult.innerText = "Correct!";
        feedbackResult.style.color = "#065f46";
        feedbackBox.style.backgroundColor = "#d1fae5";
        feedbackBox.style.borderColor = "#10b981";
    } else {
        feedbackResult.innerText = "Incorrect";
        feedbackResult.style.color = "#991b1b";
        feedbackBox.style.backgroundColor = "#fee2e2";
        feedbackBox.style.borderColor = "#ef4444";
    }

    feedbackExp.innerText = qData.explanation;
    feedbackExp.style.color = "#000206";
}

// =============================
// QUESTION NAV
// =============================
function buildQuestionNav() {
    const nav = document.getElementById("question-nav");
    nav.innerHTML = "";

    questions.forEach((q, index) => {
        const btn = document.createElement("button");

        btn.innerText = index + 1;
        btn.classList.add("nav-btn");

        if (index === currentQ) {
            btn.classList.add("current");
        }

        if (
            userAnswers[index] !== null &&
            userAnswers[index] !== undefined
        ) {
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
// QUESTION NAVIGATION
// =============================
function changeQuestion(step) {
    currentQ += step;

    if (currentQ >= questions.length) {
        showReviewScreen();
    } else if (currentQ < 0) {
        currentQ = 0;
        loadQuestion();
    } else {
        loadQuestion();
    }

    localStorage.setItem("currentQuestionIndex", currentQ);
}

// =============================
// REVIEW SCREEN
// =============================
function showReviewScreen() {
    const quizBox = document.getElementById("quiz-box");

    let reviewHTML = "";

    questions.forEach((q, index) => {
        const flagged = flaggedQuestions.includes(index) ? "⚑" : "";

        reviewHTML += `
            <div style="margin:10px;padding:10px;border:1px solid #1e293b;">
                Question ${index + 1} ${flagged}
                <button onclick="goToQuestion(${index})">Review</button>
            </div>
        `;
    });

    quizBox.innerHTML = `
        <h2>Review Your ${currentQuizTitle}</h2>
        ${reviewHTML}
        <button onclick="submitExam()">Submit Exam</button>
    `;
}

// =============================
// JUMP TO QUESTION
// =============================
function goToQuestion(index) {
    currentQ = index;
    loadQuestion();
}

// =============================
// SUBMIT EXAM
// =============================
async function submitExam() {
    try {
        const token = localStorage.getItem("token");

        const payload = {
            answers: userAnswers.map((selected, index) => {
                if (selected === null) return null;
                return questions[index].options.indexOf(selected);
            }),
            questions: questions
        };

        const res = await fetch(
            "https://akwire-api.onrender.com/api/exam/submit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await res.json();

        clearInterval(timerInterval);

        showFinalScore(result);

    } catch (err) {
        console.error("Submit failed:", err);
    }
}

// =============================
// SHOW FINAL SCORE
// =============================
function showFinalScore(result) {
    let user = JSON.parse(localStorage.getItem("currentUser")) || {};
    user.lastExamScore = result.score;
    localStorage.setItem("currentUser", JSON.stringify(user));

    let reviewHTML = "";

    questions.forEach((q, index) => {
        if (userAnswers[index] !== q.answer) {
            reviewHTML += `
                <div class="review-item"
                     style="margin-bottom:20px;padding:15px;background:rgba(239,68,68,0.1);
                     border-left:4px solid #ef4444;text-align:left;">

                    <p style="font-weight:bold;color:white;margin:0;">
                        Question ${index + 1}: ${q.q}
                    </p>

                    <p style="color:#ef4444;margin:5px 0;">
                        Your Answer: ${userAnswers[index] || "Skipped"}
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

    const passed = result.score >= 80;
    const quizBox = document.getElementById("quiz-box");

    const resultTitle = passed
        ? `${currentCourseTitle} — Module ${currentModuleId} Passed`
        : `${currentCourseTitle} — Module ${currentModuleId} Retry Required`;

    quizBox.innerHTML = `
        <div style="text-align:center;padding:40px;background:#0f172a;
        border-radius:12px;border:1px solid #1e293b;">

            <h2 style="color:${passed ? "#22c55e" : "#ef4444"};margin-bottom:10px;">
                ${resultTitle}
            </h2>

            <h1 style="font-size:4rem;color:#38bdf8;margin:0;">
                ${result.score}%
            </h1>

            <p style="color:#94a3b8;margin-bottom:30px;">
                You answered ${result.correct} out of ${result.total} correctly.
            </p>

            <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
                <button class="btn-primary" onclick="retakeCurrentQuiz()">Retake Exam</button>
                <button class="btn-secondary" onclick="showReview()">Review Errors</button>
                <button class="btn-secondary" onclick="goToDashboard()">Dashboard</button>
                <button onclick="window.location.href='academy.html'" class="btn-primary">Return To Academy</button>
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
// RETAKE QUIZ
// =============================
async function retakeCurrentQuiz() {
    const quizBox = document.getElementById("quiz-box");

    quizBox.innerHTML = `
        <div class="quiz-header">
            <h2>${currentQuizTitle}</h2>
            <p>Reloading quiz...</p>
        </div>

        <hr>

        <div class="question-section">
            <h3 id="question-number">Question 1</h3>
            <p id="question-text"></p>

            <div id="options-container"></div>

            <div id="feedback-box" style="display:none; margin-top:20px; padding:15px; border-radius:8px; border-left:5px solid;">
                <strong id="feedback-result"></strong>
                <p id="feedback-explanation" style="margin-top:5px;"></p>
            </div>

            <div class="exam-timer-container">
                <span>Time Remaining:</span>
                <span id="exam-timer">30:00</span>
            </div>

            <div class="exam-controls">
                <button id="prev-btn" class="btn-secondary">Previous</button>
                <button id="flag-btn" class="btn-primary">Flag Question</button>
                <button id="next-btn" class="btn-primary">Next</button>
            </div>
        </div>

        <div class="quiz-footer" style="margin-top: 30px; font-size: 0.9rem; color: #797878;">
            <p>Tip: Read each answer carefully before selecting the best choice.</p>
        </div>
    `;

    resetQuizState();
    await fetchExam();
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
}

// =============================
// REVIEW TOGGLE
// =============================
function showReview() {
    const reviewArea = document.getElementById("review-area");

    reviewArea.style.display =
        reviewArea.style.display === "none"
            ? "block"
            : "none";
}

// =============================
// DASHBOARD
// =============================
function goToDashboard() {
    window.location.href = "dashboard.html";
}

// =============================
// START EXAM
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