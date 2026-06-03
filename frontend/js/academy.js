
/* ==========================================
   Akwire Academy
========================================== */

let allCourses = [];

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

        `;

        container.appendChild(card);

    });

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

        await loadCourses();

        setupSearch();

    }

);