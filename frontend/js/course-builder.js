const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

// ==========================================
// START
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (!courseId) {
        alert("Course not found.");
        window.location.href = "create-course.html";
        return;
    }

    loadCourse();

    const addBtn = document.getElementById("addModuleBtn");
    if (addBtn) {
        addBtn.addEventListener("click", addModule);
    }
});

// ==========================================
// LOAD COURSE
// ==========================================
async function loadCourse() {
    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}`
        );

        const text = await response.text();

        let course;
        try {
            course = JSON.parse(text);
        } catch {
            throw new Error("Course API did not return JSON.");
        }

        if (!response.ok) {
            throw new Error(course.message || "Failed to load course.");
        }

        document.getElementById("courseTitle").textContent =
            course.title || "Course Builder";

        renderModules(course.modules || []);
    } catch (error) {
        console.error("LOAD COURSE ERROR:", error);
        alert(error.message || "Failed to load course.");
    }
}

// ==========================================
// RENDER MODULES
// ==========================================
function renderModules(modules) {
    const container = document.getElementById("modulesContainer");
    container.innerHTML = "";

    if (!modules || modules.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No modules yet</h3>
                <p>Add your first module for this course.</p>
            </div>
        `;
        return;
    }

    modules.forEach((module, index) => {
        const lessonCount = module.lessons?.length || 0;

        const lessonsHtml = lessonCount
            ? module.lessons.map((lesson, lessonIndex) => `
                <div class="lesson-item">
                    <h4>Lesson ${lessonIndex + 1}: ${lesson.title}</h4>
                    <p>${lesson.content || "No lesson content added yet."}</p>
                    ${lesson.videoUrl ? `
                        <a href="${lesson.videoUrl}" target="_blank">
                            Watch Video
                        </a>
                    ` : ""}
                </div>
            `).join("")
            : `
                <div class="empty-state" style="margin-top:12px;">
                    <p>No lessons yet in this module.</p>
                </div>
            `;

        const card = document.createElement("div");
        card.className = "course-item";
        card.innerHTML = `
            <div class="course-item-info">
                <h3>Module ${index + 1}: ${module.title}</h3>
                <p>${lessonCount} lesson(s)</p>
            </div>

            <div class="builder-lesson-form">
                <input
                    type="text"
                    id="lessonTitle-${index}"
                    class="admin-search-input"
                    placeholder="Lesson Title"
                />

                <textarea
                    id="lessonContent-${index}"
                    class="course-textarea"
                    placeholder="Lesson Content"
                ></textarea>

                <input
                    type="text"
                    id="lessonVideo-${index}"
                    class="admin-search-input"
                    placeholder="Video URL (optional)"
                />

                <button
                    class="btn add-lesson-btn"
                    data-module-index="${index}"
                    type="button"
                >
                    Add Lesson
                </button>
            </div>

            <div class="module-lessons-list">
                ${lessonsHtml}
            </div>
        `;

        container.appendChild(card);
    });

    // attach lesson buttons after cards are rendered
    document.querySelectorAll(".add-lesson-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            addLesson(moduleIndex);
        });
    });
}

// ==========================================
// ADD MODULE
// ==========================================
async function addModule() {
    const title = document.getElementById("moduleTitle").value.trim();

    if (!title) {
        alert("Enter a module title.");
        return;
    }

    if (!token) {
        alert("No token found. Please log in again.");
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({ title })
            }
        );

        const rawText = await response.text();

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            throw new Error("Add module API did not return JSON.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to add module.");
        }

        document.getElementById("moduleTitle").value = "";
        await loadCourse();
    } catch (error) {
        console.error("ADD MODULE ERROR:", error);
        alert(error.message || "Failed to add module.");
    }
}

// ==========================================
// ADD LESSON
// ==========================================
async function addLesson(moduleIndex) {
    const titleInput = document.getElementById(`lessonTitle-${moduleIndex}`);
    const contentInput = document.getElementById(`lessonContent-${moduleIndex}`);
    const videoInput = document.getElementById(`lessonVideo-${moduleIndex}`);

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const videoUrl = videoInput.value.trim();

    if (!title) {
        alert("Enter a lesson title.");
        return;
    }

    if (!token) {
        alert("No token found. Please log in again.");
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    title,
                    content,
                    videoUrl
                })
            }
        );

        const rawText = await response.text();

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            throw new Error("Add lesson API did not return JSON.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to add lesson.");
        }

        await loadCourse();
    } catch (error) {
        console.error("ADD LESSON ERROR:", error);
        alert(error.message || "Failed to add lesson.");
    }
}