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

            <p>

                ${lesson.content}

            </p>

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

    () => {

        let completed =
            JSON.parse(

                localStorage.getItem(
                    "completedLessons"
                )

            ) || [];

        const lessonKey =

            `${courseId}-${moduleIndex}-${lessonIndex}`;

        if (
            !completed.includes(
                lessonKey
            )
        ) {

            completed.push(
                lessonKey
            );

            localStorage.setItem(

                "completedLessons",

                JSON.stringify(
                    completed
                )

            );

        }

        const token =
            localStorage.getItem(
                "token"
            );

        try {

            await fetch(

                `https://akwire-api.onrender.com/api/progress/${courseId}`,

                {

                    method: "POST",

                    headers: {

                        Authorization:
                            "Bearer " + token

                    }

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