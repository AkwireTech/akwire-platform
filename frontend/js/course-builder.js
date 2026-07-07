const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

let currentCourse = null;

// ==========================================
// START
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (!courseId) {
        alert("Course not found.");
        window.location.href = "create-course.html";
        return;
    }

    const addBtn = document.getElementById("addModuleBtn");
    if (addBtn) {
        addBtn.addEventListener("click", addModule);
    }

    loadCourse();
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

        currentCourse = course;

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

    modules.forEach((module, moduleIndex) => {
        const lessonCount = Array.isArray(module.lessons)
            ? module.lessons.length
            : 0;

        const card = document.createElement("div");
        card.className = "module-builder-card";

        card.innerHTML = `
            <div class="module-builder-header">
                <div class="module-builder-title">
                    <div class="module-builder-badge">Module ${moduleIndex + 1}</div>
                    <h3>${escapeHtml(module.title || "Untitled Module")}</h3>
                    <p>${lessonCount} lesson(s)</p>
                </div>

                <div class="module-builder-actions">
                    <button
                        class="btn btn-secondary builder-action-btn edit-module-btn"
                        data-module-index="${moduleIndex}"
                        type="button"
                    >
                        Edit Module
                    </button>

                    <button
                        class="btn builder-danger-btn delete-module-btn"
                        data-module-index="${moduleIndex}"
                        type="button"
                    >
                        Delete Module
                    </button>
                </div>
            </div>

            <div class="builder-lesson-form">
                <h4 class="builder-subtitle">Add Lesson</h4>

                <input
                    type="text"
                    id="lessonTitle-${moduleIndex}"
                    class="admin-search-input"
                    placeholder="Lesson Title"
                />

                <textarea
                    id="lessonContent-${moduleIndex}"
                    class="course-textarea lesson-structured-textarea"
                    placeholder="Use this format:

            What Is Phishing?
            Phishing is a cyberattack that tricks users into revealing sensitive information.

            Common Phishing Techniques:
            - Email Phishing
            - Spear Phishing
            - Whaling

            Warning Signs:
            - Urgent requests
            - Suspicious links
            - Poor grammar"
                ></textarea>

                <div class="builder-format-note">
                    <strong>Lesson format:</strong> Use section headings, short paragraphs, and bullets with <code>-</code> just like the Security+ lessons.
                </div>

                <input
                    type="text"
                    id="lessonVideo-${moduleIndex}"
                    class="admin-search-input"
                    placeholder="Video URL (optional)"
                />

                <div class="builder-inline-actions">
                    <button
                        class="btn add-lesson-btn"
                        data-module-index="${moduleIndex}"
                        type="button"
                    >
                        Add Lesson
                    </button>

                    <button
                        class="btn btn-secondary builder-template-btn"
                        data-module-index="${moduleIndex}"
                        type="button"
                    >
                        Insert Lesson Template
                    </button>
                </div>
            </div>

            <div class="module-lessons-list">
                ${
                    lessonCount
                        ? module.lessons.map((lesson, lessonIndex) => `
                            <div class="builder-lesson-card">
                                <div class="builder-lesson-top">
                                    <div>
                                        <div class="builder-lesson-label">
                                            Lesson ${lessonIndex + 1}
                                        </div>
                                        <h4>${escapeHtml(lesson.title || "Untitled Lesson")}</h4>
                                    </div>

                                    <div class="builder-lesson-actions">
                                        <button
                                            class="btn btn-secondary edit-lesson-btn"
                                            data-module-index="${moduleIndex}"
                                            data-lesson-index="${lessonIndex}"
                                            type="button"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            class="btn builder-danger-btn delete-lesson-btn"
                                            data-module-index="${moduleIndex}"
                                            data-lesson-index="${lessonIndex}"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <p>${escapeHtml(lesson.content || "No lesson content added yet.")}</p>

                                ${
                                    lesson.videoUrl
                                        ? `
                                            <a
                                                href="${lesson.videoUrl}"
                                                target="_blank"
                                                class="builder-lesson-link"
                                            >
                                                Watch Video
                                            </a>
                                        `
                                        : ""
                                }
                            </div>
                        `).join("")
                        : `
                            <div class="empty-state builder-inner-empty">
                                <p>No lessons yet in this module.</p>
                            </div>
                        `
                }
            </div>
        `;

        container.appendChild(card);
    });

    bindBuilderActions();
}

// ==========================================
// BIND ACTIONS
// ==========================================
function bindBuilderActions() {
    document.querySelectorAll(".add-lesson-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            addLesson(moduleIndex);
        });
    });

    document.querySelectorAll(".builder-template-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            insertLessonTemplate(moduleIndex);
        });
    });

    document.querySelectorAll(".edit-module-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            openEditModule(moduleIndex);
        });
    });

    document.querySelectorAll(".delete-module-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            deleteModule(moduleIndex);
        });
    });

    document.querySelectorAll(".edit-lesson-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            const lessonIndex = button.dataset.lessonIndex;
            openEditLesson(moduleIndex, lessonIndex);
        });
    });

    document.querySelectorAll(".delete-lesson-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            const lessonIndex = button.dataset.lessonIndex;
            deleteLesson(moduleIndex, lessonIndex);
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
// EDIT MODULE
// ==========================================
async function openEditModule(moduleIndex) {
    const module = currentCourse?.modules?.[moduleIndex];

    if (!module) {
        alert("Module not found.");
        return;
    }

    const newTitle = prompt("Edit module title:", module.title || "");

    if (newTitle === null) return;

    const trimmed = newTitle.trim();

    if (!trimmed) {
        alert("Module title cannot be empty.");
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    title: trimmed
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update module.");
        }

        await loadCourse();
    } catch (error) {
        console.error("EDIT MODULE ERROR:", error);
        alert(error.message || "Failed to update module.");
    }
}

// ==========================================
// DELETE MODULE
// ==========================================
async function deleteModule(moduleIndex) {
    const module = currentCourse?.modules?.[moduleIndex];

    if (!module) {
        alert("Module not found.");
        return;
    }

    const confirmed = confirm(
        `Delete module "${module.title}" and all its lessons?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete module.");
        }

        await loadCourse();
    } catch (error) {
        console.error("DELETE MODULE ERROR:", error);
        alert(error.message || "Failed to delete module.");
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

// ==========================================
// EDIT LESSON
// ==========================================
async function openEditLesson(moduleIndex, lessonIndex) {
    const lesson = currentCourse?.modules?.[moduleIndex]?.lessons?.[lessonIndex];

    if (!lesson) {
        alert("Lesson not found.");
        return;
    }

    const title = prompt("Edit lesson title:", lesson.title || "");
    if (title === null) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        alert("Lesson title cannot be empty.");
        return;
    }

    const content = prompt("Edit lesson content:", lesson.content || "");
    if (content === null) return;

    const videoUrl = prompt("Edit lesson video URL (optional):", lesson.videoUrl || "");
    if (videoUrl === null) return;

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons/${lessonIndex}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    title: trimmedTitle,
                    content: content.trim(),
                    videoUrl: videoUrl.trim()
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update lesson.");
        }

        await loadCourse();
    } catch (error) {
        console.error("EDIT LESSON ERROR:", error);
        alert(error.message || "Failed to update lesson.");
    }
}

// ==========================================
// DELETE LESSON
// ==========================================
async function deleteLesson(moduleIndex, lessonIndex) {
    const lesson = currentCourse?.modules?.[moduleIndex]?.lessons?.[lessonIndex];

    if (!lesson) {
        alert("Lesson not found.");
        return;
    }

    const confirmed = confirm(
        `Delete lesson "${lesson.title}"?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons/${lessonIndex}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete lesson.");
        }

        await loadCourse();
    } catch (error) {
        console.error("DELETE LESSON ERROR:", error);
        alert(error.message || "Failed to delete lesson.");
    }
}

function insertLessonTemplate(moduleIndex) {
    const contentInput = document.getElementById(`lessonContent-${moduleIndex}`);

    if (!contentInput) return;

    if (contentInput.value.trim()) {
        const overwrite = confirm("Replace the current lesson content with the lesson template?");
        if (!overwrite) return;
    }

    contentInput.value = `What Is This Topic?
    Write a short explanation of the lesson topic here.

    Key Concepts:
    - Concept 1
    - Concept 2
    - Concept 3

    How It Works:
    Explain how the process, tool, or security concept works.

    Why It Matters:
    Explain why this topic matters in cybersecurity or networking.

    Examples:
    - Example 1
    - Example 2

    Best Practices:
    - Best practice 1
    - Best practice 2`;
    }

// ==========================================
// HELPERS
// ==========================================
function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}