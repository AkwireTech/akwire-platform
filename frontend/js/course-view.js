
/* ==========================================
   COURSE VIEWER
========================================== */

// ==========================================
// GET COURSE ID
// ==========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const courseId =
    params.get("id");

// ==========================================
// LOAD COURSE
// ==========================================

async function loadCourse() {

    const title =
        document.getElementById(
            "courseTitle"
        );

    const description =
        document.getElementById(
            "courseDescription"
        );

    const progress =
        document.getElementById(
            "courseProgress"
        );

    const modulesContainer =
        document.getElementById(
            "courseModules"
        );

    try {

        // ==========================
        // LOAD COURSE
        // ==========================

        const response =
            await fetch(
                `https://akwire-api.onrender.com/api/courses/${courseId}`
            );

        const course =
            await response.json();

        console.log(
            "Course:",
            course
        );

        title.textContent =
            course.title;

        description.textContent =
            course.description;

        modulesContainer.innerHTML = "";

        if (
            !course.modules ||
            !course.modules.length
        ) {

            modulesContainer.innerHTML = `

                <div class="academy-card">

                    <h3>
                        No modules available
                    </h3>

                </div>

            `;

            return;

        }

        // ==========================
        // LOAD LESSON PROGRESS
        // ==========================

        const token =
            localStorage.getItem(
                "token"
            );

        let completedLessons = [];

        try {

            const progressResponse =
                await fetch(

                    "https://akwire-api.onrender.com/api/progress/lessons",

                    {
                        headers: {
                            Authorization:
                                "Bearer " + token
                        }
                    }

                );

            const lessonProgress =
                await progressResponse.json();

            console.log(
                "Lesson Progress:",
                lessonProgress
            );

            const courseProgress =
                lessonProgress.find(

                    p =>
                        p.courseId === courseId

                );

            completedLessons =

                courseProgress
                    ?.completedLessons

                || [];

        } catch (error) {

            console.error(
                "Failed to load lesson progress:",
                error
            );

        }

        // ==========================
        // CALCULATE PROGRESS
        // ==========================

        let totalLessons = 0;

        let completedCount = 0;

        course.modules.forEach(

            (module, moduleIndex) => {

                module.lessons.forEach(

                    (lesson, lessonIndex) => {

                        totalLessons++;

                        const lessonKey =

                            `${courseId}-${moduleIndex}-${lessonIndex}`;

                        if (

                            completedLessons.includes(
                                lessonKey
                            )

                        ) {

                            completedCount++;

                        }

                    }

                );

            }

        );

        const percentage =

            totalLessons > 0

                ? Math.round(
                    (completedCount / totalLessons) * 100
                )

                : 0;

        if (progress) {

            progress.textContent =
                `Progress: ${percentage}% Complete`;

        }

        if (percentage === 100) {

            document.getElementById(
                "certificateSection"
            ).innerHTML = `

                <button
                    class="academy-btn"
                    onclick="downloadCertificate()"
                >
                    🏆 Download Certificate
                </button>

            `;

        }

        // ==========================
        // RENDER MODULES
        // ==========================

        course.modules.forEach(

            (module, moduleIndex) => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.classList.add(
                    "module-view-card"
                );

                card.innerHTML = `

                    <h3>
                        ${module.title}
                    </h3>

                    <div>

                        ${module.lessons.map(

                            (lesson, lessonIndex) => {

                                const lessonKey =

                                    `${courseId}-${moduleIndex}-${lessonIndex}`;

                                const isCompleted =

                                    completedLessons.includes(
                                        lessonKey
                                    );

                                return `

                                    <div class="lesson-item">

                                        <span>

                                            ${isCompleted ? "✓" : "○"}

                                            ${lesson.title}

                                        </span>

                                        <button
                                            class="lesson-btn"

                                            onclick="
                                                openLesson(
                                                    ${moduleIndex},
                                                    ${lessonIndex}
                                                )
                                            "
                                        >
                                            ${isCompleted
                                                ? "Review Lesson"
                                                : "Start Lesson"}

                                        </button>

                                    </div>

                                `;

                            }

                        ).join("")}

                    </div>

                `;

                modulesContainer.appendChild(
                    card
                );

            }

        );

    } catch (error) {

        console.error(
            "Course load error:",
            error
        );

        modulesContainer.innerHTML = `

            <div class="academy-card">

                <h3>
                    Failed to load course
                </h3>

            </div>

        `;

    }

}

// ==========================================
// OPEN LESSON
// ==========================================

function openLesson(

    moduleIndex,
    lessonIndex

) {

    window.location.href =

        `lesson.html?course=${courseId}&module=${moduleIndex}&lesson=${lessonIndex}`;

}


// ==========================================
// DOWNLOAD CERTIFICATE
// ==========================================

function downloadCertificate() {

    const title =

        document.getElementById(
            "courseTitle"
        ).textContent;

    const user =

        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const studentName =

        user?.username ||
        "Student";

    const date =

        new Date()
        .toLocaleDateString();

    const certificateWindow =

        window.open(
            "",
            "_blank"
        );

    certificateWindow.document.write(`

        <html>

        <head>

            <title>
                Certificate of Completion
            </title>

            <style>

                body {

                    font-family:
                        Arial,
                        sans-serif;

                    text-align:
                        center;

                    padding:
                        60px;

                }

                .certificate {

                    border:
                        8px solid #2563eb;

                    padding:
                        50px;

                }

                h1 {

                    color:
                        #2563eb;

                }

            </style>

        </head>

        <body>

            <div class="certificate">

                <h1>
                    Certificate of Completion
                </h1>

                <h2>
                    Akwire Academy
                </h2>

                <p>
                    This certifies that
                </p>

                <h2>
                    ${studentName}
                </h2>

                <p>
                    has successfully completed
                </p>

                <h2>
                    ${title}
                </h2>

                <p>
                    Completion Date:
                    ${date}
                </p>

            </div>

        </body>

        </html>

    `);

    certificateWindow.document.close();

    certificateWindow.print();

}

// ==========================================
// START
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        if (!courseId) {

            alert(
                "Course not found"
            );

            return;

        }

        await loadCourse();

    }

);