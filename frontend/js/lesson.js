/* ==========================================
   LESSON VIEWER
========================================== */

// ==========================================
// GET URL PARAMS
// ==========================================

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

    const quizNumber =
        Number(moduleIndex) + 1;

    quizBtn.href =
        `module-quiz.html?module=${quizNumber}`;

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
        document.getElementById(
            "lessonContent"
        ).innerHTML = `

            <div class="lesson-content-card">

                ${lesson.content}

            </div>

        `;

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

function convertYoutubeUrl(url) {

    if (
        url.includes("watch?v=")
    ) {

        return url.replace(
            "watch?v=",
            "embed/"
        );

    }

    return url;

}

// ==========================================
// LESSON COMPLETE
// ==========================================

    document.getElementById(
        "completeLessonBtn"
    ).addEventListener(

        "click",

        async () => {

        const lessonKey =

        `${courseId}-${moduleIndex}-${lessonIndex}`;

        const token =
            localStorage.getItem(
                "token"
            );


    try {

        // ==========================
        // SAVE LESSON PROGRESS
        // ==========================

        await fetch(

            "https://akwire-api.onrender.com/api/progress/lesson",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        "Bearer " + token

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