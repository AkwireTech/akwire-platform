const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    const courseForm = document.getElementById("courseForm");
    const refreshBtn = document.getElementById("refreshCoursesBtn");

    if (courseForm) {
        courseForm.addEventListener("submit", createCourse);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener("click", loadCourses);
    }

    loadCourses();
});

async function createCourse(e) {
    e.preventDefault();

    const status = document.getElementById("statusMessage");

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const domain = document.getElementById("domain").value.trim();
    const thumbnail = document.getElementById("thumbnail").value.trim();

    if (!title || !description || !domain) {
        status.textContent = "Please fill in title, description, and domain.";
        status.style.color = "#ef4444";
        return;
    }

    try {
        const response = await fetch(
            "https://akwire-api.onrender.com/api/courses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    title,
                    description,
                    domain,
                    thumbnail,
                    modules: []
                })
            }
        );

        const data = await response.json();
        console.log("CREATE COURSE RESPONSE:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to create course");
        }

        const newCourseId =
            data._id ||
            data.course?._id ||
            data.newCourse?._id ||
            data.id;

        if (!newCourseId) {
            throw new Error("Course was created, but no course ID was returned by the API.");
        }

        status.textContent = "Course created successfully.";
        status.style.color = "#22c55e";

        document.getElementById("courseForm").reset();

        await loadCourses();

        setTimeout(() => {
            window.location.href = `course-builder.html?id=${newCourseId}`;
        }, 700);

    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        status.textContent = error.message || "Failed to create course.";
        status.style.color = "#ef4444";
    }
}

async function loadCourses() {
    const coursesList = document.getElementById("coursesList");

    if (!coursesList) return;

    coursesList.innerHTML = `<p class="empty-state">Loading courses...</p>`;

    try {
        const response = await fetch(
            "https://akwire-api.onrender.com/api/courses"
        );

        const data = await response.json();
        console.log("LOAD COURSES RESPONSE:", data);

        if (!response.ok) {
            throw new Error(data.message || "Failed to load courses");
        }

        const courses = Array.isArray(data)
            ? data
            : data.courses || [];

        renderCourses(courses);

    } catch (error) {
        console.error("LOAD COURSES ERROR:", error);
        coursesList.innerHTML = `
            <p class="empty-state error-text">
                Failed to load courses.
            </p>
        `;
    }
}

function renderCourses(courses) {
    const coursesList = document.getElementById("coursesList");

    if (!coursesList) return;

    if (!courses.length) {
        coursesList.innerHTML = `
            <p class="empty-state">No courses created yet.</p>
        `;
        return;
    }

    coursesList.innerHTML = courses.map(course => {
        const courseId = course._id || course.id || "";
        const moduleCount = Array.isArray(course.modules)
            ? course.modules.length
            : 0;

        return `
            <div class="course-item">
                <div class="course-item-info">
                    <h3>${course.title || "Untitled Course"}</h3>
                    <p>${course.description || "No description provided."}</p>

                    <div class="course-meta">
                        <span><strong>Domain:</strong> ${course.domain || "N/A"}</span>
                        <span><strong>Modules:</strong> ${moduleCount}</span>
                    </div>
                </div>

                <div class="course-item-actions">
                    <a href="course-builder.html?id=${courseId}" class="btn">
                        Open Builder
                    </a>
                </div>
            </div>
        `;
    }).join("");
}