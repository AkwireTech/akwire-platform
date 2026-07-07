/* ==========================================
   LESSON VIEWER
========================================== */

// ==========================================
// GET URL PARAMS
// ==========================================
const params = new URLSearchParams(window.location.search);

const courseId = params.get("course");
const moduleIndex = params.get("module");
const lessonIndex = params.get("lesson");

const quizBtn = document.getElementById("quizBtn");

if (quizBtn && moduleIndex !== null) {
    const quizNumber = Number(moduleIndex) + 1;
    quizBtn.href = `module-quiz.html?module=${quizNumber}`;
    quizBtn.textContent = `Take Quiz ${quizNumber} →`;
}

// ==========================================
// LOAD LESSON
// ==========================================
async function loadLesson() {
    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}`
        );

        const course = await response.json();

        if (!response.ok) {
            throw new Error(course.message || "Failed to load lesson");
        }

        const module = course.modules?.[moduleIndex];
        const lesson = module?.lessons?.[lessonIndex];

        if (!module || !lesson) {
            throw new Error("Lesson not found.");
        }

        const totalLessons = module.lessons.length;
        const currentLesson = Number(lessonIndex) + 1;
        const percent = Math.round((currentLesson / totalLessons) * 100);

        document.getElementById("lessonPosition").textContent =
            `Lesson ${currentLesson} of ${totalLessons}`;

        document.getElementById("lessonPercent").textContent =
            `${percent}%`;

        document.getElementById("lessonProgressFill").style.width =
            `${percent}%`;

        // TITLE
        document.getElementById("lessonTitle").textContent =
            lesson.title || "Untitled Lesson";

        // DESCRIPTION
        document.getElementById("lessonDescription").textContent =
            module.title || "Lesson Module";

        // CONTENT
        document.getElementById("lessonContent").innerHTML = `
            <div class="lesson-content-card formatted-lesson-content">
                ${formatLessonContent(lesson.content || "")}
            </div>
        `;

        // VIDEO
        if (lesson.videoUrl) {
            document.getElementById("videoSection").innerHTML = `
                <iframe
                    width="100%"
                    height="500"
                    src="${convertYoutubeUrl(lesson.videoUrl)}"
                    title="Lesson Video"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            `;
        } else {
            document.getElementById("videoSection").innerHTML = "";
        }

    } catch (error) {
        console.error("Lesson load error:", error);

        document.getElementById("lessonContent").innerHTML = `
            <div class="academy-card">
                <h3>Failed to load lesson</h3>
                <p>${error.message || "Unable to load lesson content."}</p>
            </div>
        `;
    }
}

// ==========================================
// YOUTUBE EMBED CONVERTER
// ==========================================
function convertYoutubeUrl(url = "") {
    if (url.includes("watch?v=")) {
        return url.replace("watch?v=", "embed/");
    }
    return url;
}

// ==========================================
// FORMAT LESSON CONTENT
// Supports:
// Heading
// Paragraph
// Heading:
// - bullet
// - bullet
// ==========================================
function formatLessonContent(content = "") {
    const text = String(content).replace(/\r/g, "").trim();

    if (!text) {
        return `<p>No lesson content available yet.</p>`;
    }

    const lines = text
        .split("\n")
        .map(line => line.trim());

    let html = "";
    let paragraphBuffer = [];
    let listBuffer = [];

    function flushParagraph() {
        if (!paragraphBuffer.length) return;

        const paragraphText = paragraphBuffer.join(" ").trim();
        if (paragraphText) {
            html += `<p>${escapeHtml(paragraphText)}</p>`;
        }

        paragraphBuffer = [];
    }

    function flushList() {
        if (!listBuffer.length) return;

        html += `
            <ul class="lesson-bullet-list">
                ${listBuffer.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
        `;

        listBuffer = [];
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // empty line = close current paragraph/list
        if (!line) {
            flushParagraph();
            flushList();
            continue;
        }

        // bullet line
        if (/^[-•]\s+/.test(line)) {
            flushParagraph();
            listBuffer.push(line.replace(/^[-•]\s+/, "").trim());
            continue;
        }

        // heading with colon
        if (/^[A-Za-z0-9][A-Za-z0-9\s&()\/,'-]{0,100}:$/.test(line)) {
            flushParagraph();
            flushList();

            const headingText = line.replace(/:$/, "").trim();
            html += `<h3>${escapeHtml(headingText)}</h3>`;
            continue;
        }

        // title-like heading line
        const nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
        const looksLikeHeading =
            line.length <= 80 &&
            !line.endsWith(".") &&
            !line.endsWith("!") &&
            !line.endsWith("?") &&
            !line.startsWith("-") &&
            !line.startsWith("•") &&
            (
                nextLine === "" ||
                /^[-•]\s+/.test(nextLine) ||
                nextLine.length > 0
            );

        if (looksLikeHeading && paragraphBuffer.length === 0 && listBuffer.length === 0) {
            html += `<h3>${escapeHtml(line)}</h3>`;
            continue;
        }

        // normal paragraph line
        flushList();
        paragraphBuffer.push(line);
    }

    flushParagraph();
    flushList();

    return html || `<p>No lesson content available yet.</p>`;
}

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// LESSON COMPLETE
// ==========================================
const completeBtn = document.getElementById("completeLessonBtn");

if (completeBtn) {
    completeBtn.addEventListener("click", async () => {
        const lessonKey = `${courseId}-${moduleIndex}-${lessonIndex}`;
        const token = localStorage.getItem("token");

        try {
            await fetch(
                "https://akwire-api.onrender.com/api/progress/lesson",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        courseId,
                        lessonKey
                    })
                }
            );
        } catch (error) {
            console.error("Progress update failed:", error);
        }

        alert("Lesson completed!");
    });
}

// ==========================================
// NAVIGATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prevLessonBtn");
    const nextBtn = document.getElementById("nextLessonBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            const prev = Number(lessonIndex) - 1;

            if (prev >= 0) {
                window.location.href =
                    `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${prev}`;
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const next = Number(lessonIndex) + 1;

            window.location.href =
                `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${next}`;
        });
    }
});

// ==========================================
// START
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    await loadLesson();
});