const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user._id) {
    window.location.href = "login.html";
}

let editingCourseId = null;

// ==========================================
// START
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const courseForm = document.getElementById("courseForm");
    const refreshBtn = document.getElementById("refreshCoursesBtn");

    if (courseForm) {
        courseForm.addEventListener("submit", createCourse);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener("click", loadCourses);
    }

    bindCourseModalActions();
    loadCourses();
});

// ==========================================
// CREATE COURSE
// ==========================================
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
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
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

// ==========================================
// LOAD COURSES
// ==========================================
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

// ==========================================
// RENDER COURSES
// ==========================================
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
                    <h3>${escapeHtml(course.title || "Untitled Course")}</h3>
                    <p>${escapeHtml(course.description || "No description provided.")}</p>

                    <div class="course-meta">
                        <span><strong>Domain:</strong> ${escapeHtml(course.domain || "N/A")}</span>
                        <span><strong>Modules:</strong> ${moduleCount}</span>
                    </div>
                </div>

                <div class="course-item-actions">
                    <a href="course-builder.html?id=${courseId}" class="btn">
                        Open Builder
                    </a>

                    <button
                        class="btn btn-secondary edit-course-btn"
                        type="button"
                        data-course='${encodeCourseData(course)}'
                    >
                        Edit Course
                    </button>

                    <button
                        class="btn builder-danger-btn delete-course-btn"
                        type="button"
                        data-course-id="${courseId}"
                        data-course-title="${escapeHtml(course.title || "Untitled Course")}"
                    >
                        Delete Course
                    </button>
                </div>
            </div>
        `;
    }).join("");

    bindCourseActions();
}

// ==========================================
// COURSE ACTIONS
// ==========================================
function bindCourseActions() {
    document.querySelectorAll(".edit-course-btn").forEach(button => {
        button.addEventListener("click", () => {
            const raw = button.dataset.course;
            if (!raw) return;

            try {
                const course = JSON.parse(decodeURIComponent(raw));
                openEditCourseModal(course);
            } catch (error) {
                console.error("Failed to parse course data:", error);
                alert("Could not open course editor.");
            }
        });
    });

    document.querySelectorAll(".delete-course-btn").forEach(button => {
        button.addEventListener("click", async () => {
            const courseId = button.dataset.courseId;
            const courseTitle = button.dataset.courseTitle || "this course";

            if (!courseId) return;

            const confirmed = confirm(
                `Delete "${courseTitle}"?\n\nThis will also remove all modules and lessons inside it.`
            );

            if (!confirmed) return;

            await deleteCourse(courseId);
        });
    });
}

// ==========================================
// DELETE COURSE
// ==========================================
async function deleteCourse(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        alert("Please log in again.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete course.");
        }

        await loadCourses();
    } catch (error) {
        console.error("DELETE COURSE ERROR:", error);
        alert(error.message || "Failed to delete course.");
    }
}

// ==========================================
// EDIT COURSE MODAL
// ==========================================
function bindCourseModalActions() {
    const closeBtn = document.getElementById("editCourseModalClose");
    const cancelBtn = document.getElementById("editCourseCancelBtn");
    const saveBtn = document.getElementById("editCourseSaveBtn");
    const backdrop = document.getElementById("editCourseModalBackdrop");

    if (closeBtn) closeBtn.addEventListener("click", closeEditCourseModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeEditCourseModal);
    if (backdrop) backdrop.addEventListener("click", closeEditCourseModal);
    if (saveBtn) saveBtn.addEventListener("click", saveCourseEdit);
}

function openEditCourseModal(course) {
    editingCourseId = course._id || course.id || null;

    if (!editingCourseId) {
        alert("Course ID not found.");
        return;
    }

    document.getElementById("editCourseTitle").value = course.title || "";
    document.getElementById("editCourseDescription").value = course.description || "";
    document.getElementById("editCourseDomain").value = course.domain || "";
    document.getElementById("editCourseThumbnail").value = course.thumbnail || "";

    document.getElementById("editCourseModal").classList.remove("hidden");
}

function closeEditCourseModal() {
    editingCourseId = null;
    document.getElementById("editCourseModal").classList.add("hidden");
}

async function saveCourseEdit() {
    if (!editingCourseId) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        alert("Please log in again.");
        window.location.href = "login.html";
        return;
    }

    const title = document.getElementById("editCourseTitle").value.trim();
    const description = document.getElementById("editCourseDescription").value.trim();
    const domain = document.getElementById("editCourseDomain").value.trim();
    const thumbnail = document.getElementById("editCourseThumbnail").value.trim();

    if (!title || !description || !domain) {
        alert("Title, description, and domain are required.");
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${editingCourseId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    domain,
                    thumbnail
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update course.");
        }

        closeEditCourseModal();
        await loadCourses();
    } catch (error) {
        console.error("EDIT COURSE ERROR:", error);
        alert(error.message || "Failed to update course.");
    }
}

// ==========================================
// HELPERS
// ==========================================
function encodeCourseData(course) {
    return encodeURIComponent(JSON.stringify({
        _id: course._id || course.id || "",
        title: course.title || "",
        description: course.description || "",
        domain: course.domain || "",
        thumbnail: course.thumbnail || ""
    }));
}

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}