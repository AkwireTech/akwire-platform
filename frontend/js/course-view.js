
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

        // ==========================
        // COURSE INFO
        // ==========================

        title.textContent =
            course.title;

        description.textContent =
            course.description;

        // ==========================
        // MODULES
        // ==========================

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
