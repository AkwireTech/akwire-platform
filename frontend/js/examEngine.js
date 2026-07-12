/* ==========================================
   AKWIRE EXAM ENGINE
   Part 1 - Core Engine
========================================== */

export default class ExamEngine {

    constructor(config = {}) {

        this.mode =
            config.mode || "practice";

        this.endpoint =
            config.endpoint;

        this.submitEndpoint =
            config.submitEndpoint ||
            "/api/exam/submit";

        this.instantFeedback =
            config.instantFeedback || false;

        this.passScore =
            config.passScore || 80;

        this.examTitle =
            config.examTitle || "Practice Exam";

        this.timeLimit =
            config.timeLimit || (30 * 60);

        this.questions = [];

        this.answers = [];

        this.flagged = [];

        this.currentQuestion = 0;

        this.remainingTime =
            this.timeLimit;

        this.timer = null;

        this.reviewMode = false;

        this.completed = false;

        this.token =
            localStorage.getItem("token");

        this.elements = {};

        this.cacheElements();

        this.attachEvents();

        this.restoreSession();

        this.loadExam();

    }

    /* ==========================================
       CACHE DOM
    ========================================== */

    cacheElements() {

        this.elements.quizBox =
            document.getElementById(
                "quiz-box"
            );

        this.elements.questionNav =
            document.getElementById(
                "question-nav"
            );

        this.elements.questionNumber =
            document.getElementById(
                "question-number"
            );

        this.elements.questionText =
            document.getElementById(
                "question-text"
            );

        this.elements.options =
            document.getElementById(
                "options-container"
            );

        this.elements.feedback =
            document.getElementById(
                "feedback-box"
            );

        this.elements.timer =
            document.getElementById(
                "exam-timer"
            );

        this.elements.prev =
            document.getElementById(
                "prev-btn"
            );

        this.elements.next =
            document.getElementById(
                "next-btn"
            );

        this.elements.flag =
            document.getElementById(
                "flag-btn"
            );

    }

    /* ==========================================
       EVENTS
    ========================================== */

    attachEvents() {

        if (this.elements.prev) {

            this.elements.prev.addEventListener(

                "click",

                () => this.previousQuestion()

            );

        }

        if (this.elements.next) {

            this.elements.next.addEventListener(

                "click",

                () => this.nextQuestion()

            );

        }

        if (this.elements.flag) {

            this.elements.flag.addEventListener(

                "click",

                () => this.toggleFlag()

            );

        }

        window.addEventListener(

            "beforeunload",

            () => this.saveSession()

        );

    }

    /* ==========================================
       LOAD EXAM
    ========================================== */

    async loadExam() {

        try {

            const response =
                await fetch(

                    `https://akwire-api.onrender.com${this.endpoint}`,

                    {

                        headers: {

                            Authorization:
                                "Bearer " + this.token

                        }

                    }

                );

            if (!response.ok) {

                const err =
                    await response.json();

                throw new Error(

                    err.message ||
                    "Failed to load exam"

                );

            }

            const data =
                await response.json();

            this.questions =
                data.questions || [];

            this.answers =
                new Array(
                    this.questions.length
                ).fill(null);

            this.buildNavigator();

            this.renderQuestion();

            this.startTimer();

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    /* ==========================================
       TIMER
    ========================================== */

    startTimer() {

        this.updateTimer();

        this.timer =
            setInterval(

                () => {

                    this.remainingTime--;

                    this.updateTimer();

                    if (

                        this.remainingTime <= 0

                    ) {

                        clearInterval(
                            this.timer
                        );

                        this.submitExam();

                    }

                },

                1000

            );

    }

    updateTimer() {

        if (!this.elements.timer) return;

        const minutes =
            Math.floor(
                this.remainingTime / 60
            );

        const seconds =
            this.remainingTime % 60;

        this.elements.timer.textContent =

            `${minutes}:${
                seconds < 10
                    ? "0"
                    : ""
            }${seconds}`;

        if (

            this.remainingTime <= 300

        ) {

            this.elements.timer.style.color =
                "#f59e0b";

        }

        if (

            this.remainingTime <= 60

        ) {

            this.elements.timer.style.color =
                "#ef4444";

        }

    }

    /* ==========================================
       SESSION
    ========================================== */

    saveSession() {

        localStorage.setItem(

            "akwire_exam_session",

            JSON.stringify({

                answers:
                    this.answers,

                flagged:
                    this.flagged,

                current:
                    this.currentQuestion,

                remaining:
                    this.remainingTime,

                endpoint:
                    this.endpoint

            })

        );

    }

    restoreSession() {

        const session =

            JSON.parse(

                localStorage.getItem(

                    "akwire_exam_session"

                )

            );

        if (

            !session ||

            session.endpoint !==
            this.endpoint

        ) {

            return;

        }

        if (

            confirm(

                "Resume previous exam?"

            )

        ) {

            this.answers =
                session.answers || [];

            this.flagged =
                session.flagged || [];

            this.currentQuestion =
                session.current || 0;

            this.remainingTime =
                session.remaining ||
                this.timeLimit;

        }

        else {

            localStorage.removeItem(

                "akwire_exam_session"

            );

        }

    }

        /* ==========================================
       QUESTION NAVIGATOR
    ========================================== */

    buildNavigator() {

        if (!this.elements.questionNav) return;

        this.elements.questionNav.innerHTML = "";

        this.questions.forEach((question, index) => {

            const button =
                document.createElement("button");

            button.className = "exam-nav-btn";

            button.textContent = index + 1;

            if (index === this.currentQuestion) {

                button.classList.add(
                    "current"
                );

            }

            if (

                this.answers[index] !== null &&
                this.answers[index] !== undefined

            ) {

                button.classList.add(
                    "answered"
                );

            }

            if (

                this.flagged.includes(index)

            ) {

                button.classList.add(
                    "flagged"
                );

            }

            button.onclick = () => {

                this.currentQuestion = index;

                this.renderQuestion();

            };

            this.elements.questionNav.appendChild(
                button
            );

        });

    }

    /* ==========================================
       RENDER QUESTION
    ========================================== */

    renderQuestion() {

        this.buildNavigator();

        const question =
            this.questions[
                this.currentQuestion
            ];

        if (!question) return;

        if (this.elements.questionNumber) {

            this.elements.questionNumber.textContent =

                `Question ${this.currentQuestion + 1}
                 of ${this.questions.length}`;

        }

        if (this.elements.questionText) {

            this.elements.questionText.innerHTML = `

                <div class="exam-domain">

                    ${question.domain || ""}

                </div>

                <div class="exam-question">

                    ${question.question}

                </div>

            `;

        }

        this.renderOptions();

        if (this.elements.prev) {

            this.elements.prev.disabled =
                this.currentQuestion === 0;

        }

        if (this.elements.next) {

            this.elements.next.textContent =

                this.currentQuestion ===
                this.questions.length - 1

                ? "Review Exam"

                : "Next";

        }

        this.saveSession();

    }

    /* ==========================================
       OPTIONS
    ========================================== */

    renderOptions() {

        if (!this.elements.options) return;

        this.elements.options.innerHTML = "";

        const question =
            this.questions[
                this.currentQuestion
            ];

        question.options.forEach(

            (option, optionIndex) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.className =
                    "option-btn";

                button.innerHTML =

                    `<strong>${
                        String.fromCharCode(
                            65 + optionIndex
                        )
                    }.</strong> ${option}`;

                if (

                    this.answers[
                        this.currentQuestion
                    ] === optionIndex

                ) {

                    button.classList.add(
                        "selected"
                    );

                }

                button.onclick = () =>

                    this.selectAnswer(
                        optionIndex
                    );

                this.elements.options.appendChild(
                    button
                );

            }

        );

    }

    /* ==========================================
       SELECT ANSWER
    ========================================== */

    selectAnswer(optionIndex) {

        this.answers[
            this.currentQuestion
        ] = optionIndex;

        this.saveSession();

        this.renderOptions();

        this.buildNavigator();

        if (

            this.instantFeedback

        ) {

            this.showInstantFeedback();

        }

    }

    /* ==========================================
       FLAG
    ========================================== */

    toggleFlag() {

        const current =
            this.currentQuestion;

        if (

            this.flagged.includes(
                current
            )

        ) {

            this.flagged =

                this.flagged.filter(

                    q => q !== current

                );

        }

        else {

            this.flagged.push(
                current
            );

        }

        this.saveSession();

        this.buildNavigator();

    }

    /* ==========================================
       NAVIGATION
    ========================================== */

    previousQuestion() {

        if (

            this.currentQuestion > 0

        ) {

            this.currentQuestion--;

            this.renderQuestion();

        }

    }

    nextQuestion() {

        if (

            this.currentQuestion ===
            this.questions.length - 1

        ) {

            this.showReview();

            return;

        }

        this.currentQuestion++;

        this.renderQuestion();

    }

    /* ==========================================
       INSTANT FEEDBACK
       (Module Quiz Only)
    ========================================== */

    showInstantFeedback() {

        if (!this.elements.feedback) return;

        const question =
            this.questions[
                this.currentQuestion
            ];

        const selected =
            this.answers[
                this.currentQuestion
            ];

        const selectedText =
            question.options[selected];

        const correct =
            selectedText ===
            question.answer;

        this.elements.feedback.style.display =
            "block";

        this.elements.feedback.innerHTML = `

            <div class="${
                correct
                    ? "feedback-correct"
                    : "feedback-incorrect"
            }">

                <h3>

                    ${
                        correct
                            ? "Correct"
                            : "Incorrect"
                    }

                </h3>

                <p>

                    ${question.explanation || ""}

                </p>

            </div>

        `;

    }

        /* ==========================================
       REVIEW SCREEN
    ========================================== */

    showReview() {

        this.reviewMode = true;

        clearInterval(this.timer);

        const answered =
            this.answers.filter(

                answer =>

                    answer !== null &&
                    answer !== undefined

            ).length;

        const unanswered =
            this.questions.length -
            answered;

        const flagged =
            this.flagged.length;

        let reviewHTML = "";

        this.questions.forEach(

            (question, index) => {

                const isAnswered =

                    this.answers[index] !==
                    null &&
                    this.answers[index] !==
                    undefined;

                const isFlagged =

                    this.flagged.includes(
                        index
                    );

                reviewHTML += `

                    <div class="review-row">

                        <div>

                            <strong>

                                Question ${index + 1}

                            </strong>

                            <div class="review-status">

                                ${

                                    isAnswered

                                    ? "✅ Answered"

                                    : "⬜ Unanswered"

                                }

                                ${

                                    isFlagged

                                    ? " &nbsp; 🚩 Flagged"

                                    : ""

                                }

                            </div>

                        </div>

                        <button

                            class="btn-secondary"

                            onclick="window.examEngine.returnToQuestion(${index})"

                        >

                            Review

                        </button>

                    </div>

                `;

            }

        );

        this.elements.quizBox.innerHTML = `

            <div class="review-screen">

                <h2>

                    ${this.examTitle}

                    Review

                </h2>

                <div class="review-summary">

                    <div>

                        <strong>

                            ${answered}

                        </strong>

                        <span>

                            Answered

                        </span>

                    </div>

                    <div>

                        <strong>

                            ${unanswered}

                        </strong>

                        <span>

                            Remaining

                        </span>

                    </div>

                    <div>

                        <strong>

                            ${flagged}

                        </strong>

                        <span>

                            Flagged

                        </span>

                    </div>

                </div>

                <div class="review-list">

                    ${reviewHTML}

                </div>

                <div class="review-buttons">

                    <button

                        class="btn-secondary"

                        onclick="window.examEngine.resumeExam()"

                    >

                        Continue Exam

                    </button>

                    <button

                        class="btn"

                        onclick="window.examEngine.confirmSubmit()"

                    >

                        Submit Exam

                    </button>

                </div>

            </div>

        `;

    }

    /* ==========================================
       RETURN TO QUESTION
    ========================================== */

    returnToQuestion(index) {

        this.currentQuestion =
            index;

        this.reviewMode =
            false;

        this.cacheElements();

        this.attachEvents();

        this.renderQuestion();

        this.startTimer();

    }

    /* ==========================================
       RESUME EXAM
    ========================================== */

    resumeExam() {

        this.reviewMode =
            false;

        this.cacheElements();

        this.attachEvents();

        this.renderQuestion();

        this.startTimer();

    }

    /* ==========================================
       CONFIRM SUBMIT
    ========================================== */

    confirmSubmit() {

        const answered =
            this.answers.filter(

                answer =>

                    answer !== null &&
                    answer !== undefined

            ).length;

        const unanswered =
            this.questions.length -
            answered;

        const flagged =
            this.flagged.length;

        const proceed = confirm(

`Submit ${this.examTitle}?

Answered:
${answered}

Remaining:
${unanswered}

Flagged:
${flagged}

Time Remaining:
${this.elements.timer.textContent}

Once submitted the exam cannot be changed.`

        );

        if (proceed) {

            this.submitExam();

        }

    }

    /* ==========================================
       SUBMIT
    ========================================== */

    async submitExam() {

        clearInterval(
            this.timer
        );

        try {

            const response =
                await fetch(

                    `https://akwire-api.onrender.com${this.submitEndpoint}`,

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                "Bearer " + this.token

                        },

                        body: JSON.stringify({

                            answers:
                                this.answers,

                            questions:
                                this.questions

                        })

                    }

                );

            if (!response.ok) {

                throw new Error(

                    "Failed to submit exam"

                );

            }

            const result =
                await response.json();

            this.completed = true;

            localStorage.removeItem(
                "akwire_exam_session"
            );

            this.showResults(
                result
            );

        }

        catch (error) {

            console.error(error);

            alert(

                "Unable to submit exam."

            );

        }

    }

    /* ==========================================
       DOMAIN ANALYTICS
    ========================================== */

    buildDomainTable(domainScores = {}) {

        let html = "";

        Object.entries(

            domainScores

        ).forEach(

            ([domain, score]) => {

                html += `

                    <tr>

                        <td>

                            ${domain}

                        </td>

                        <td>

                            ${score}%

                        </td>

                    </tr>

                `;

            }

        );

        return html;

    }


        /* ==========================================
       RESULTS
    ========================================== */

    showResults(result) {

        const passed =
            result.score >= this.passScore;

        let reviewHTML = "";

        this.questions.forEach((question, index) => {

            const selectedIndex =
                this.answers[index];

            const selectedAnswer =

                selectedIndex !== null &&
                selectedIndex !== undefined

                    ? question.options[selectedIndex]

                    : "Not Answered";

            const correct =

                selectedAnswer ===
                question.answer;

            if (!correct) {

                reviewHTML += `

                    <div class="review-card">

                        <h3>

                            Question ${index + 1}

                        </h3>

                        <p>

                            ${question.question}

                        </p>

                        <p class="wrong-answer">

                            <strong>Your Answer:</strong>

                            ${selectedAnswer}

                        </p>

                        <p class="correct-answer">

                            <strong>Correct Answer:</strong>

                            ${question.answer}

                        </p>

                        <div class="review-explanation">

                            ${question.explanation || ""}

                        </div>

                    </div>

                `;

            }

        });

        this.elements.quizBox.innerHTML = `

            <div class="exam-results">

                <h1>

                    ${this.examTitle}

                    Results

                </h1>

                <div class="result-circle">

                    ${result.score}%

                </div>

                <div class="result-status ${passed ? "passed" : "failed"}">

                    ${passed ? "PASSED" : "FAILED"}

                </div>

                <div class="result-summary">

                    <div>

                        <strong>

                            ${result.correct}

                        </strong>

                        <span>

                            Correct

                        </span>

                    </div>

                    <div>

                        <strong>

                            ${result.total}

                        </strong>

                        <span>

                            Questions

                        </span>

                    </div>

                    <div>

                        <strong>

                            ${this.passScore}%

                        </strong>

                        <span>

                            Passing Score

                        </span>

                    </div>

                </div>

                <h2>

                    Domain Performance

                </h2>

                <table class="domain-table">

                    <thead>

                        <tr>

                            <th>Domain</th>

                            <th>Score</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${this.buildDomainTable(
                            result.domainScores || {}
                        )}

                    </tbody>

                </table>

                <div class="result-buttons">

                    <button

                        class="btn"

                        onclick="window.examEngine.toggleReview()"

                    >

                        Review Incorrect Answers

                    </button>

                    <button

                        class="btn-secondary"

                        onclick="window.examEngine.restartExam()"

                    >

                        Retake Exam

                    </button>

                    <button

                        class="btn-secondary"

                        onclick="window.examEngine.goDashboard()"

                    >

                        Dashboard

                    </button>

                </div>

                <div

                    id="incorrectReview"

                    style="display:none;"

                >

                    ${reviewHTML ||

                    "<h3>Perfect Score! No incorrect answers.</h3>"}

                </div>

            </div>

        `;

    }

    /* ==========================================
       REVIEW TOGGLE
    ========================================== */

    toggleReview() {

        const panel =

            document.getElementById(
                "incorrectReview"
            );

        if (!panel) return;

        panel.style.display =

            panel.style.display === "block"

                ? "none"

                : "block";

    }

    /* ==========================================
       RESTART
    ========================================== */

    restartExam() {

        localStorage.removeItem(
            "akwire_exam_session"
        );

        window.location.reload();

    }

    /* ==========================================
       DASHBOARD
    ========================================== */

    goDashboard() {

        window.location.href =
            "dashboard.html";

    }

    /* ==========================================
       CERTIFICATE CHECK
    ========================================== */

    isPassed(score) {

        return score >= this.passScore;

    }

    /* ==========================================
       PROGRESS
    ========================================== */

    getAnsweredCount() {

        return this.answers.filter(

            answer =>

                answer !== null &&
                answer !== undefined

        ).length;

    }

    getRemainingCount() {

        return (

            this.questions.length -

            this.getAnsweredCount()

        );

    }

    getFlaggedCount() {

        return this.flagged.length;

    }

    /* ==========================================
       FORMAT TIME
    ========================================== */

    formatTime(seconds) {

        const minutes =

            Math.floor(
                seconds / 60
            );

        const remaining =

            seconds % 60;

        return `${minutes}:${
            remaining < 10
                ? "0"
                : ""
        }${remaining}`;

    }

    /* ==========================================
       DESTROY
    ========================================== */

    destroy() {

        clearInterval(
            this.timer
        );

        localStorage.removeItem(
            "akwire_exam_session"
        );

    }

}

/* ==========================================
   GLOBAL INSTANCE
========================================== */

window.examEngine = null;


