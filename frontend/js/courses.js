
/* ==========================================
   js/courses.js - Original UI Preserved
   ========================================== */

let domains = [];

// ==========================================
// LOAD COURSES FROM BACKEND
// ==========================================

async function loadCourses() {

    try {

        const response =
            await fetch(
                "https://akwire-api.onrender.com/api/courses"
            );

        const courses =
            await response.json();

        console.log(
            "Loaded Courses:",
            courses
        );

        domains = courses.map((course, index) => ({

            id: index + 1,

            title: course.title,

            category:
                course.domain || "General",

            lessons:

                course.modules?.flatMap(
                    module =>

                        module.lessons?.map(
                            lesson =>
                                lesson.title
                        ) || []

                ) || []

        }));

        renderCourses();

        updateProgressBar();

    } catch (error) {

        console.error(
            "Course load error:",
            error
        );

    }

}

// ==========================================
// RENDER COURSES
// ==========================================

function renderCourses() {

    console.log(
        "Starting to render courses..."
    );

    const courseList =
        document.getElementById(
            "course-list"
        );

    if (!courseList) {

        console.error(
            "ERROR: Missing course-list"
        );

        return;

    }

    courseList.innerHTML = "";

    domains.forEach(domain => {

        const card =
            document.createElement("div");

        card.className = "module-card";

        card.setAttribute(
            "data-category",
            domain.category
        );

        card.innerHTML = `

            <div
                class="module-header"

                onclick="toggleModule(${domain.id})"

                style="
                    cursor:pointer;
                    display:flex;
                    justify-content:space-between;
                    padding:20px;
                    background:white;
                    border-bottom:1px solid #eee;
                "
            >

                <h3 style="
                    margin:0;
                    font-size:1.1rem;
                    color:#1e293b;
                ">
                    ${domain.title}
                </h3>

                <span
                    id="icon-${domain.id}"

                    style="
                        font-weight:bold;
                    "
                >
                    +
                </span>

            </div>

            <div
                class="module-content"

                id="module-${domain.id}"

                style="
                    display:none;
                    padding:20px;
                    background:#f8fafc;
                    border-top:1px solid #eee;
                "
            >

                <ul style="
                    list-style:none;
                    padding:0;
                    margin:0;
                ">

                    ${domain.lessons.map(lesson => `

                        <li style="
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            padding:10px 0;
                            border-bottom:1px solid #e2e8f0;
                        ">

                            <span style="
                                font-size:0.95rem;
                                color:#475569;
                            ">
                                ${lesson}
                            </span>

                            <button
                                class="btn-sm"

                                onclick="
                                    event.stopPropagation();
                                    markLessonDone('${lesson}')
                                "

                                style="
                                    background:#10b981;
                                    color:white;
                                    border:none;
                                    padding:5px 10px;
                                    border-radius:4px;
                                    cursor:pointer;
                                    font-size:0.8rem;
                                "
                            >
                                Mark Done
                            </button>

                        </li>

                    `).join("")}

                </ul>

            </div>

        `;

        courseList.appendChild(card);

    });

    console.log(
        "Courses rendered successfully!"
    );

}

// ==========================================
// TOGGLE MODULE
// ==========================================

function toggleModule(id) {

    const content =
        document.getElementById(
            `module-${id}`
        );

    const icon =
        document.getElementById(
            `icon-${id}`
        );

    if (
        content.style.display ===
        "none"
    ) {

        content.style.display =
            "block";

        icon.innerText = "−";

    } else {

        content.style.display =
            "none";

        icon.innerText = "+";

    }

}

// ==========================================
// PROGRESS BAR
// ==========================================

function updateProgressBar() {

    const totalLessons =
        domains.reduce(

            (sum, domain) =>
                sum + domain.lessons.length,

            0

        );

    const completed =
        JSON.parse(
            localStorage.getItem(
                "completedLessons"
            )
        ) || [];

    const percentage =

        totalLessons > 0

            ?

            Math.round(
                (
                    completed.length
                    / totalLessons
                ) * 100
            )

            : 0;

    const fill =
        document.getElementById(
            "progress-fill"
        );

    const text =
        document.getElementById(
            "progress-text"
        );

    if (fill && text) {

        fill.style.width =
            percentage + "%";

        text.innerText =
            percentage + "%";

    }

}

// ==========================================
// MARK LESSON COMPLETE
// ==========================================

function markLessonDone(lesson) {

    let completed =
        JSON.parse(
            localStorage.getItem(
                "completedLessons"
            )
        ) || [];

    if (
        !completed.includes(lesson)
    ) {

        completed.push(lesson);

        localStorage.setItem(

            "completedLessons",

            JSON.stringify(completed)

        );

        updateProgressBar();

    }

}

// ==========================================
// SEARCH
// ==========================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "course-search"
        );

    if (searchInput) {

        searchInput.addEventListener(

            "input",

            (e) => {

                const term =
                    e.target.value
                        .toLowerCase();

                document
                    .querySelectorAll(
                        ".module-card"
                    )

                    .forEach(card => {

                        const text =
                            card.innerText
                                .toLowerCase();

                        card.style.display =

                            text.includes(term)

                                ?

                                "block"

                                :

                                "none";

                    });

            }

        );

    }

}

// ==========================================
// FILTERS
// ==========================================

function filterByCategory(category) {

    document
        .querySelectorAll(
            ".module-card"
        )

        .forEach(card => {

            const match =

                category === "all"

                ||

                card.dataset.category ===
                category;

            card.style.display =

                match

                    ?

                    "block"

                    :

                    "none";

        });

}

window.filterByCategory =
    filterByCategory;

// ==========================================
// START
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await loadCourses();

        setupSearch();

        updateProgressBar();

    }

);