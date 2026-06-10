
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

    const certificateId =

    "AKW-" +

    new Date().getFullYear() +

    "-" +

    Math.floor(
        10000 +
        Math.random() * 90000
    );

    const certificateWindow =

        window.open(
            "",
            "_blank"
        );

    certificateWindow.document.write(`

        <html>

        <head>

        <title>
        Akwire Certificate
        </title>

        <style>

        body {

            font-family:
                Georgia,
                serif;

            background:
                #f8fafc;

            padding:
                40px;

        }

        .certificate {

            max-width:
                1000px;

            margin:
                auto;

            background:
                white;

            border:
                12px solid #2563eb;

            padding:
                60px;

            text-align:
                center;

        }

        .logo {

            font-size:
                2rem;

            font-weight:
                bold;

            color:
                #2563eb;

        }

        .title {

            font-size:
                3rem;

            margin-top:
                20px;

        }

        .student {

            font-size:
                2rem;

            margin:
                25px 0;

            font-weight:
                bold;

        }

        .course {

            font-size:
                1.6rem;

            color:
                #1e293b;

        }

        .footer {

            margin-top:
                50px;

            display:
                flex;

            justify-content:
                space-between;

        }

        .signature {

            border-top:
                2px solid #000;

            width:
                250px;

            padding-top:
                10px;

        }

        .id {

            margin-top:
                30px;

            color:
                #64748b;

        }

        </style>

        </head>

        <body>

        <div class="certificate">

        <div class="logo">
        AKWIRE ACADEMY
        </div>

        <h1 class="title">
        Certificate of Completion
        </h1>

        <p>
        This certificate is proudly awarded to
        </p>

        <div class="student">
        ${studentName}
        </div>

        <p>
        for successfully completing
        </p>

        <div class="course">
        ${title}
        </div>

        <p>
        Issued on ${date}
        </p>

        <div class="id">
        Certificate ID:
        ${certificateId}
        </div>

        <div class="footer">

        <div class="signature">
        Training Director
        </div>

        <div class="signature">
        Akwire Academy
        </div>

        </div>

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