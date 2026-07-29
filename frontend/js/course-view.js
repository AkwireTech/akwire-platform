/* ==========================================
   COURSE VIEWER
========================================== */

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

// ==========================================
// LOAD COURSE
// ==========================================
async function loadCourse() {
    const title = document.getElementById("courseTitle");
    const description = document.getElementById("courseDescription");
    const progress = document.getElementById("courseProgress");
    const modulesContainer = document.getElementById("courseModules");
    const certificateSection = document.getElementById("certificateSection");

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}`
        );

        const course = await response.json();

        if (!response.ok) {
            throw new Error(course.message || "Failed to load course");
        }

        title.textContent = course.title || "Untitled Course";
        description.textContent =
            course.description || "No course description available.";

        modulesContainer.innerHTML = "";

        if (!Array.isArray(course.modules) || !course.modules.length) {
            modulesContainer.innerHTML = `
                <div class="academy-card">
                    <h3>No modules available</h3>
                </div>
            `;
            return;
        }

        // ==========================
        // LOAD LESSON PROGRESS
        // ==========================
        const token = localStorage.getItem("token");
        let completedLessons = [];

        if (token) {
            try {
                const progressResponse = await fetch(
                    "https://akwire-api.onrender.com/api/progress/lessons",
                    {
                        credentials: "include"
                    }
                );

                const lessonProgress = await progressResponse.json();

                const courseProgress = Array.isArray(lessonProgress)
                    ? lessonProgress.find(p => p.courseId === courseId)
                    : null;

                completedLessons =
                    courseProgress?.completedLessons || [];
            } catch (error) {
                console.error("Failed to load lesson progress:", error);
            }
        }

        // ==========================
        // CALCULATE PROGRESS
        // ==========================
        let totalLessons = 0;
        let completedCount = 0;

        course.modules.forEach((module, moduleIndex) => {
            const lessons = Array.isArray(module.lessons)
                ? module.lessons
                : [];

            lessons.forEach((lesson, lessonIndex) => {
                totalLessons++;

                const lessonKey = `${courseId}-${moduleIndex}-${lessonIndex}`;

                if (completedLessons.includes(lessonKey)) {
                    completedCount++;
                }
            });
        });

        const percentage =
            totalLessons > 0
                ? Math.round((completedCount / totalLessons) * 100)
                : 0;

        if (progress) {
            progress.textContent = `Progress: ${percentage}% Complete`;
        }

        if (certificateSection) {
            certificateSection.innerHTML = percentage === 100
                ? `
                    <button
                        class="academy-btn"
                        onclick="downloadCertificate()"
                    >
                        🏆 Download Certificate
                    </button>
                `
                : "";
        }

        // ==========================
        // RENDER MODULES
        // ==========================
        course.modules.forEach((module, moduleIndex) => {
            const lessons = Array.isArray(module.lessons)
                ? module.lessons
                : [];

            const moduleCard = document.createElement("div");
            moduleCard.className = "module-view-card";

            moduleCard.innerHTML = `
                <div class="module-view-header">
                    <div>
                        <div class="module-view-badge">Module ${moduleIndex + 1}</div>
                        <h3>${escapeHtml(module.title || `Module ${moduleIndex + 1}`)}</h3>
                        <p class="module-view-meta">${lessons.length} lesson(s)</p>
                    </div>
                </div>

                <div class="module-view-lessons">
                    ${
                        lessons.length
                            ? lessons.map((lesson, lessonIndex) => {
                                const lessonKey = `${courseId}-${moduleIndex}-${lessonIndex}`;
                                const isCompleted = completedLessons.includes(lessonKey);

                                return `
                                    <div class="lesson-view-row">
                                        <div class="lesson-view-left">
                                            <span class="lesson-status ${isCompleted ? "completed" : "pending"}">
                                                ${isCompleted ? "✓" : "○"}
                                            </span>

                                            <div class="lesson-view-text">
                                                <h4>${escapeHtml(lesson.title || `Lesson ${lessonIndex + 1}`)}</h4>
                                                <p>${buildLessonPreview(lesson.content)}</p>
                                            </div>
                                        </div>

                                        <button
                                            class="lesson-btn"
                                            onclick="openLesson(${moduleIndex}, ${lessonIndex})"
                                        >
                                            ${isCompleted ? "Review Lesson" : "Start Lesson"}
                                        </button>
                                    </div>
                                `;
                            }).join("")
                            : `
                                <div class="empty-state builder-inner-empty">
                                    <p>No lessons in this module yet.</p>
                                </div>
                            `
                    }
                </div>
            `;

            modulesContainer.appendChild(moduleCard);
        });

    } catch (error) {
        console.error("Course load error:", error);

        modulesContainer.innerHTML = `
            <div class="academy-card">
                <h3>Failed to load course</h3>
            </div>
        `;
    }
}

// ==========================================
// OPEN LESSON
// ==========================================
function openLesson(moduleIndex, lessonIndex) {
    window.location.href =
        `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${lessonIndex}`;
}

// ==========================================
// DOWNLOAD CERTIFICATE
// ==========================================
function downloadCertificate() {
    const title = document.getElementById("courseTitle").textContent;

    const user = JSON.parse(localStorage.getItem("user"));
    const studentName = user?.username || "Student";
    const date = new Date().toLocaleDateString();

    const certificateId =
        "AKW-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(10000 + Math.random() * 90000);

    const certificateWindow = window.open("", "_blank");

    certificateWindow.document.write(`
        <html>
        <head>
        <title>Akwire Certificate</title>
        <style>
            body {
                font-family: Georgia, serif;
                background: #f8fafc;
                padding: 40px;
            }
            .certificate {
                max-width: 1000px;
                margin: auto;
                background: white;
                border: 12px solid #2563eb;
                padding: 60px;
                text-align: center;
            }
            .logo {
                font-size: 2rem;
                font-weight: bold;
                color: #2563eb;
            }
            .title {
                font-size: 3rem;
                margin-top: 20px;
            }
            .student {
                font-size: 2rem;
                margin: 25px 0;
                font-weight: bold;
            }
            .course {
                font-size: 1.6rem;
                color: #1e293b;
            }
            .footer {
                margin-top: 50px;
                display: flex;
                justify-content: space-between;
            }
            .signature {
                border-top: 2px solid #000;
                width: 250px;
                padding-top: 10px;
            }
            .id {
                margin-top: 30px;
                color: #64748b;
            }
        </style>
        </head>
        <body>
            <div class="certificate">
                <div class="logo">
                    <img
                        src="images/logo.png"
                        alt="Akwire Logo"
                        style="width:220px;height:auto;margin-bottom:20px;"
                    >
                </div>

                <h1 class="title">Certificate of Completion</h1>

                <p>This certificate is awarded to</p>

                <div class="student">${studentName}</div>

                <p>for successfully completing</p>

                <div class="course">${title}</div>

                <p>Issued on ${date}</p>

                <div class="id">Certificate ID: ${certificateId}</div>

                <div class="footer">
                    <div class="signature">Training Director</div>
                    <div class="signature">Akwire Academy</div>
                </div>
            </div>
        </body>
        </html>
    `);

    certificateWindow.document.close();

    setTimeout(() => {
        certificateWindow.print();
    }, 1500);
}

// ==========================================
// HELPERS
// ==========================================
function buildLessonPreview(content = "") {
    const clean = String(content).replace(/<[^>]*>/g, "").trim();

    if (!clean) return "Open this lesson to start learning.";

    return clean.length > 120
        ? `${clean.slice(0, 120)}...`
        : clean;
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
// START
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    if (!courseId) {
        alert("Course not found");
        return;
    }

    await loadCourse();
});