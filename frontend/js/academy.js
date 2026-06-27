
/* ==========================================
   Akwire Academy
========================================== */

let allCourses = [];

let completedCourses = [];

// ==========================================
// LOAD COURSES
// ==========================================

async function loadCourses() {

    const container =
        document.getElementById(
            "academyCourses"
        );

    try {

        const response =
            await fetch(
                "https://akwire-api.onrender.com/api/courses"
            );

        const courses =
            await response.json();

        console.log(
            "Academy Courses:",
            courses
        );

        allCourses = courses;

        renderCourses(courses);

    } catch (error) {

        console.error(
            "Academy Error:",
            error
        );

        container.innerHTML = `

            <div class="academy-card">

                <h3>
                    Failed to load courses
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}


async function loadProgress() {

    const token =
        localStorage.getItem(
            "token"
        );

    if (!token) return;

    try {

        const response =
            await fetch(

                "https://akwire-api.onrender.com/api/progress",

                {

                    headers: {

                        Authorization:
                            "Bearer " + token

                    }

                }

            );

        completedCourses =
            await response.json();

        console.log(
            "Completed Courses:",
            completedCourses
        );

    } catch (error) {

        console.error(
            "Progress Error:",
            error
        );

    }

}



// ==========================================
// RENDER COURSES
// ==========================================

function renderCourses(courses) {

    const container =
        document.getElementById(
            "academyCourses"
        );

    container.innerHTML = "";

    if (!courses.length) {

        container.innerHTML = `

            <div class="academy-card">

                <h3>
                    No Courses Available
                </h3>

            </div>

        `;

        return;

    }

    courses.forEach(course => {

        const isCompleted = completedCourses.some(
            completed =>
                completed.courseId &&
                completed.courseId._id === course._id
        );


        const card =
            document.createElement("div");

        card.classList.add(
            "academy-card"
        );

        card.innerHTML = `

            <h3>
                ${course.title}
            </h3>

            <p>
                ${course.description}
            </p>

            <p>

                <strong>
                    Domain:
                </strong>

                ${course.domain}

            </p>


        ${isCompleted ? `

            <button
                class="academy-btn"

                onclick="
                    openCourse(
                        '${course._id}'
                    )
                "
            >
                ✓ Completed
            </button>

        ` : `

            <button
                class="academy-btn"

                onclick="
                    openCourse(
                        '${course._id}'
                    )
                "
            >
                Open Course
            </button>

        `}

        `;

        container.appendChild(card);

    });


    const finalExamCard =
    document.createElement("div");

    finalExamCard.classList.add(
        "academy-card"
    );

    const securityCompleted = completedCourses.some(
        item =>
            item.courseId &&
            item.courseId.title === "Security+ Fundamentals"
    );

    finalExamCard.innerHTML = `

        <h3>
            Security+ Final Exam
        </h3>

        <p>
            Comprehensive assessment covering all Security+ Fundamentals modules.
        </p>

        ${securityCompleted ? `

            <a
                href="final-exam.html"
                class="academy-btn"
            >
                Launch Final Exam →
            </a>

        ` : `

            <div
                style="
                    margin-top:15px;
                    color:#f59e0b;
                    font-weight:600;
                "
            >

                🔒 Complete Security+ Fundamentals
                to unlock the Final Exam

            </div>

        `}

    `;

container.appendChild(
    finalExamCard
);

}

// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const input =
        document.getElementById(
            "academySearch"
        );

    input.addEventListener(
        "input",

        (e) => {

            const term =
                e.target.value
                    .toLowerCase();

            const filtered =
                allCourses.filter(course =>

                    course.title
                        .toLowerCase()
                        .includes(term)

                    ||

                    course.description
                        .toLowerCase()
                        .includes(term)

                );

            renderCourses(filtered);

        }

    );

}

// ==========================================
// OPEN COURSE
// ==========================================

function openCourse(id) {

    window.location.href =
        `course-view.html?id=${id}`;

}

// ==========================================
// START
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {


        await loadProgress();

        await loadCourses();

        setupSearch();

    }

);