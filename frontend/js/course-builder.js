const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user._id) {
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

let currentCourse = null;

// store collapsed/expanded state per module
const moduleOpenState = {};

// modal state
let editState = {
    type: null,
    moduleIndex: null,
    lessonIndex: null
};

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

    bindModalActions();
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

        if (moduleOpenState[moduleIndex] === undefined) {
            moduleOpenState[moduleIndex] = false;
        }

        const isOpen = moduleOpenState[moduleIndex];

        const card = document.createElement("div");
        card.className = "module-builder-card";

        card.innerHTML = `
            <div class="module-builder-header">
                <button
                    class="module-toggle-btn"
                    data-module-index="${moduleIndex}"
                    type="button"
                >
                    <span class="module-toggle-icon">
                        ${isOpen ? "−" : "+"}
                    </span>

                    <div class="module-builder-title">
                        <div class="module-builder-badge">Module ${moduleIndex + 1}</div>
                        <h3>${escapeHtml(module.title || "Untitled Module")}</h3>
                        <p>${lessonCount} lesson(s)</p>
                    </div>
                </button>

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

            <div class="module-builder-body ${isOpen ? "open" : ""}">
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
                        placeholder="Paste lesson content here"
                    ></textarea>

                    <div class="builder-format-note">
                        <strong>Tip:</strong> Use HTML lesson content for headings, paragraphs, and bullet points so lessons match the styled course layout.
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
    document.querySelectorAll(".module-toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const moduleIndex = button.dataset.moduleIndex;
            moduleOpenState[moduleIndex] = !moduleOpenState[moduleIndex];
            renderModules(currentCourse?.modules || []);
        });
    });

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
// MODAL BINDINGS
// ==========================================
function bindModalActions() {
    const closeBtn = document.getElementById("builderModalClose");
    const cancelBtn = document.getElementById("builderModalCancel");
    const backdrop = document.getElementById("builderModalBackdrop");
    const saveBtn = document.getElementById("builderModalSave");

    if (closeBtn) closeBtn.addEventListener("click", closeBuilderModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeBuilderModal);
    if (backdrop) backdrop.addEventListener("click", closeBuilderModal);
    if (saveBtn) saveBtn.addEventListener("click", saveBuilderEdit);
}

function openBuilderModal() {
    const modal = document.getElementById("builderEditModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeBuilderModal() {
    const modal = document.getElementById("builderEditModal");
    if (modal) {
        modal.classList.add("hidden");
    }

    editState = {
        type: null,
        moduleIndex: null,
        lessonIndex: null
    };

    hideAllModalFields();
}

function hideAllModalFields() {
    document.getElementById("moduleEditFields")?.classList.add("hidden");
    document.getElementById("lessonEditFields")?.classList.add("hidden");
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

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        alert("Please log in again.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
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
function openEditModule(moduleIndex) {
    const module = currentCourse?.modules?.[moduleIndex];

    if (!module) {
        alert("Module not found.");
        return;
    }

    editState = {
        type: "module",
        moduleIndex,
        lessonIndex: null
    };

    hideAllModalFields();

    document.getElementById("builderModalTitle").textContent = "Edit Module";
    document.getElementById("moduleEditFields").classList.remove("hidden");
    document.getElementById("editModuleTitle").value = module.title || "";

    openBuilderModal();
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
                credentials: "include"
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

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        alert("Please log in again.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
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

        moduleOpenState[moduleIndex] = true;
        await loadCourse();
    } catch (error) {
        console.error("ADD LESSON ERROR:", error);
        alert(error.message || "Failed to add lesson.");
    }
}

// ==========================================
// EDIT LESSON
// ==========================================
function openEditLesson(moduleIndex, lessonIndex) {
    const lesson = currentCourse?.modules?.[moduleIndex]?.lessons?.[lessonIndex];

    if (!lesson) {
        alert("Lesson not found.");
        return;
    }

    editState = {
        type: "lesson",
        moduleIndex,
        lessonIndex
    };

    hideAllModalFields();

    document.getElementById("builderModalTitle").textContent = "Edit Lesson";
    document.getElementById("lessonEditFields").classList.remove("hidden");

    document.getElementById("editLessonTitle").value =
    lesson.title || "";

    document.getElementById("editLessonOverview").value =
        lesson.overview || "";

    document.getElementById("editLessonObjectives").value =
        (lesson.objectives || []).join("\n");

    document.getElementById("editLessonContent").value =
        lesson.content || "";

    document.getElementById("editLessonKeyTerms").value =
        (lesson.keyTerms || []).join("\n");

    document.getElementById("editLessonSummary").value =
        lesson.summary || "";

    document.getElementById("editLessonVideo").value =
        lesson.videoUrl || "";

        openBuilderModal();
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
                credentials: "include"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete lesson.");
        }

        moduleOpenState[moduleIndex] = true;
        await loadCourse();
    } catch (error) {
        console.error("DELETE LESSON ERROR:", error);
        alert(error.message || "Failed to delete lesson.");
    }
}

// ==========================================
// SAVE MODAL EDIT
// ==========================================
async function saveBuilderEdit() {

    if (!editState.type) return;

    if (editState.type === "module") {
        await saveModuleEdit();
        return;
    }

    if (editState.type === "lesson") {
        await saveLessonEdit();
    }
}

async function saveModuleEdit() {
    const moduleIndex = editState.moduleIndex;
    const title = document.getElementById("editModuleTitle").value.trim();

    if (!title) {
        alert("Module title cannot be empty.");
        return;
    }

    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update module.");
        }

        closeBuilderModal();
        await loadCourse();
    } catch (error) {
        console.error("EDIT MODULE ERROR:", error);
        alert(error.message || "Failed to update module.");
    }
}

async function saveLessonEdit() {
    console.log("saveLessonEdit() called");
    const moduleIndex = editState.moduleIndex;
    const lessonIndex = editState.lessonIndex;

    const title =
        document.getElementById("editLessonTitle").value.trim();

    const overview =
        document.getElementById("editLessonOverview").value.trim();

    const objectives =
        document
            .getElementById("editLessonObjectives")
            .value
            .split("\n")
            .map(item => item.trim())
            .filter(Boolean);

    const content =
        document.getElementById("editLessonContent").value.trim();

    const keyTerms =
        document
            .getElementById("editLessonKeyTerms")
            .value
            .split("\n")
            .map(item => item.trim())
            .filter(Boolean)
            .map(term => ({
                term,
                definition: ""
            }));

    const summary =
        document.getElementById("editLessonSummary").value.trim();

    const videoUrl =
        document.getElementById("editLessonVideo").value.trim();

    if (!title) {
        alert("Lesson title cannot be empty.");
        return;
    }

    try {

        console.log({
    title,
    overview,
    objectives,
    content,
    keyTerms,
    summary,
    videoUrl
});

console.log(
    `PUT https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons/${lessonIndex}`
);
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleIndex}/lessons/${lessonIndex}`,
            {
                
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    title,
                    overview,
                    objectives,
                    content,
                    keyTerms,
                    summary,
                    videoUrl

                })
            }
        );

        console.log("Response status:", response.status);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update lesson.");
        }

        moduleOpenState[moduleIndex] = true;
        closeBuilderModal();
        await loadCourse();
    } catch (error) {
        console.error("EDIT LESSON ERROR:", error);
        alert(error.message || "Failed to update lesson.");
    }
}

// ==========================================
// LESSON TEMPLATE
// ==========================================
function insertLessonTemplate(moduleIndex) {
    const contentInput = document.getElementById(`lessonContent-${moduleIndex}`);

    if (!contentInput) return;

    if (contentInput.value.trim()) {
        const overwrite = confirm("Replace the current lesson content with the lesson template?");
        if (!overwrite) return;
    }

    contentInput.value = `<h2>Lesson Overview</h2>
<p>
Write a short introduction for this lesson here.
</p>

<h2>Main Concepts</h2>
<ul>
    <li>Concept 1</li>
    <li>Concept 2</li>
    <li>Concept 3</li>
</ul>

<h2>Why It Matters</h2>
<p>
Explain why this lesson matters in networking or cybersecurity.
</p>

<h2>Key Takeaways</h2>
<ul>
    <li>Takeaway 1</li>
    <li>Takeaway 2</li>
</ul>`;
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