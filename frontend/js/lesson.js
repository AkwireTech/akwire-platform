/* ==========================================
   LESSON VIEWER
========================================== */

// ==========================================
// GET URL PARAMS
// ==========================================

let aiCourse = null;
let aiModule = null;
let aiLesson = null;

const params =
    new URLSearchParams(
        window.location.search
    );

const courseId =
    params.get("course");

const moduleIndex =
    params.get("module");

const quizBtn =
    document.getElementById(
        "quizBtn"
    );

if (quizBtn) {
    const quizNumber = Number(moduleIndex) + 1;

    quizBtn.href =
        `module-quiz.html?course=${courseId}&module=${quizNumber}`;

    quizBtn.textContent =
        `Take Quiz ${quizNumber} →`;
}

const lessonIndex =
    params.get("lesson");

// ==========================================
// LOAD LESSON
// ==========================================

async function loadLesson() {

    try {

        const response =
            await fetch(

                `https://akwire-api.onrender.com/api/courses/${courseId}`

            );

        const course =
            await response.json();

        console.log(
            "Lesson Course:",
            course
        );

        const module =
            course.modules[moduleIndex];

        const lesson =
            module.lessons[lessonIndex];
            console.log("Lesson object:");
            console.log(JSON.stringify(lesson, null, 2));
            console.log("Course ID:", courseId);

            aiCourse = course;
            aiModule = module;
            aiLesson = lesson;


        const totalLessons =
            module.lessons.length;

        const currentLesson =
            Number(lessonIndex) + 1;

        const percent =

            Math.round(

                (currentLesson / totalLessons) * 100

            );

        document.getElementById(
            "lessonPosition"
        ).textContent =

            `Lesson ${currentLesson} of ${totalLessons}`;

        document.getElementById(
            "lessonPercent"
        ).textContent =

            `${percent}%`;

        document.getElementById(
            "lessonProgressFill"
        ).style.width =

            `${percent}%`;

        // ==========================
        // TITLE
        // ==========================

        document.getElementById(
            "lessonTitle"
        ).textContent =
            lesson.title;

        // ==========================
        // DESCRIPTION
        // ==========================

        document.getElementById(
            "lessonDescription"
        ).textContent =

            module.title;

        // ==========================
        // CONTENT
        // ==========================
    
        let html = "";

        // Overview
        if (lesson.overview) {

            html += `
                <div class="lesson-content-card">

                    <h2>
                        Overview
                    </h2>

                    <p>
                        ${lesson.overview}
                    </p>

                </div>
            `;

        }

        // Learning Objectives
        if (
            lesson.objectives &&
            lesson.objectives.length
        ) {

            html += `
                <div class="lesson-content-card">

                    <h2>
                        Learning Objectives
                    </h2>

                    <ul>
                        ${lesson.objectives
                            .map(
                                objective =>
                                    `<li>${objective}</li>`
                            )
                            .join("")}
                    </ul>

                </div>
            `;

        }

        // Main Lesson Content

        html += `
            <div class="lesson-content-card">

                <h2>
                    Lesson
                </h2>

                ${lesson.content}

            </div>
        `;


       // Key Terms
        if (lesson.keyTerms && lesson.keyTerms.length) {

            html += `
                <div class="lesson-content-card">

                    <h2>Key Terms</h2>

                    <ul>
                        ${lesson.keyTerms
                            .map(
                                item => `
                                    <li>
                                        <strong>${item.term}</strong>
                                        ${item.definition ? ` - ${item.definition}` : ""}
                                    </li>
                                `
                            )
                            .join("")}
                    </ul>

                </div>
            `;

        }


        // Summary

        if (lesson.summary) {

            html += `
                <div class="lesson-content-card">

                    <h2>
                        Lesson Summary
                    </h2>

                    <p>
                        ${lesson.summary}
                    </p>

                </div>
            `;

        }

        // ======================================
        // KNOWLEDGE CHECK
        // ======================================

        if (
            lesson.knowledgeCheck &&
            lesson.knowledgeCheck.length
        ) {

            html += `

                <div class="lesson-content-card">

                    <h2>
                        Knowledge Check
                    </h2>

            `;

            lesson.knowledgeCheck.forEach(

                (question, index) => {

                    html += `

                        <div class="knowledge-question">

                            <p>

                                <strong>

                                    ${index + 1}. ${question.question}

                                </strong>

                            </p>

                    `;

                    question.options.forEach(

                        option => {

                            html += `

                                <label
                                    class="knowledge-option"
                                >

                                    <input
                                        type="radio"
                                        name="question${index}"
                                    >

                                    ${option}

                                </label>

                                <br>

                            `;

                        }

                    );

                    html += `

                        </div>

                        <hr>

                    `;

                }

            );

            html += `

                </div>

            `;

        }

        console.log("Overview:", lesson.overview);
        console.log("Objectives:", lesson.objectives);
        console.log("Summary:", lesson.summary);


document.getElementById("lessonContent").innerHTML = html;


        // ==========================
        // VIDEO
        // ==========================

        if (lesson.videoUrl) {

            document.getElementById(
                "videoSection"
            ).innerHTML = `

                <iframe
                    width="100%"
                    height="500"

                    src="${convertYoutubeUrl(
                        lesson.videoUrl
                    )}"

                    title="Lesson Video"

                    frameborder="0"

                    allowfullscreen
                ></iframe>

            `;

        }

    } catch (error) {

        console.error(
            "Lesson load error:",
            error
        );

        document.getElementById(
            "lessonContent"
        ).innerHTML = `

            <div class="academy-card">

                <h3>
                    Failed to load lesson
                </h3>

            </div>

        `;

    }

}

// ==========================================
// YOUTUBE EMBED CONVERTER
// ==========================================

document.getElementById(
    "completeLessonBtn"
).addEventListener(

    "click",

    async () => {

        const lessonKey =
            `${courseId}-${moduleIndex}-${lessonIndex}`;

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user || !user._id) {
            window.location.href = "login.html";
            return;
        }

        try {

            // ==========================
            // SAVE LESSON PROGRESS
            // ==========================

            await fetch(

                "https://akwire-api.onrender.com/api/progress/lesson",

                {

                    method: "POST",

                    credentials: "include",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        courseId,

                        lessonKey

                    })

                }

            );


   } catch (error) {

        console.error(
            "Progress update failed:",
            error
        );

    }



        alert(
            "Lesson completed!"
        );

            }

        );

// ==========================================
// START
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await loadLesson();

    }

);


document.addEventListener(

    "DOMContentLoaded",

    () => {

        const prevBtn =
            document.getElementById(
                "prevLessonBtn"
            );

        const nextBtn =
            document.getElementById(
                "nextLessonBtn"
            );

        prevBtn.addEventListener(

            "click",

            () => {

                const prev =
                    Number(lessonIndex) - 1;

                if (prev >= 0) {

                    window.location.href =

                        `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${prev}`;

                }

            }

        );

        nextBtn.addEventListener(

            "click",

            () => {

                const next =
                    Number(lessonIndex) + 1;

                window.location.href =

                    `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${next}`;

            }

        );

    }

);

const mentorChat =
    document.getElementById(
        "mentorChat"
    );

const askBtn =
    document.getElementById(
        "askMentorBtn"
    );

const input =
    document.getElementById(
    "aiQuestion"
    );

    input.addEventListener(
    "input",
    () => {

    input.style.height = "auto";

    input.style.height =
    input.scrollHeight + "px";

    }
);

askBtn.addEventListener(

    "click",

    askMentor

);

document
    .getElementById("aiQuestion")
    .addEventListener(

        "keydown",

        e => {

            if (
                e.key === "Enter" &&
                !e.shiftKey
            ) {

                e.preventDefault();

                askMentor();

            }

        }

    );

async function askMentor() {

    const input =
        document.getElementById(
            "aiQuestion"
        );

    const question =
        input.value.trim();

    if (!question)
        return;

    mentorChat.innerHTML += `

    <div class="message-group user">

        <div class="mentor-message user">

            ${question}

        </div>

        <div class="message-time">

            ${new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })}

        </div>

    </div>

    `;

    input.value = "";

   mentorChat.innerHTML += `

    <div class="message-group ai" id="typingGroup">

        <div class="mentor-message ai">

            <div class="typing-indicator">

                <span></span>

                <span></span>

                <span></span>

            </div>

        </div>

    </div>

    `;

    mentorChat.scrollTop =
        mentorChat.scrollHeight;

    try {

        const response =
            await fetch(

                "https://akwire-api.onrender.com/api/ai/mentor",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        mode: "lesson",

                        course:
                            aiCourse.title,

                        module:
                            aiModule.title,

                        lesson:
                            aiLesson.title,

                        progress:
                            document.getElementById(
                                "lessonPercent"
                            ).textContent,

                        message: question

                    })

                }

            );

        const data =
            await response.json();

        document
            .getElementById("typingGroup")
            ?.remove();


        mentorChat.innerHTML += `

        <div class="mentor-message ai">

        ${marked.parse(data.answer)}

        </div>

        <div class="message-time">

        ${new Date().toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
        })}

        </div>

        `;


        mentorChat.scrollTop =
            mentorChat.scrollHeight;

    }

    catch {

        document
            .getElementById("typingGroup")
            ?.remove();

        mentorChat.innerHTML += `

            <div class="mentor-message ai">

                Sorry, I couldn't connect.

            </div>

        `;

    }

}