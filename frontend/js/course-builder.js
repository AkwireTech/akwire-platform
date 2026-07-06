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
        console.log("LOAD COURSE RAW RESPONSE:", text);

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
        const card = document.createElement("div");
        card.className = "course-item";

        card.innerHTML = `
            <div class="course-item-info">
                <h3>Module ${index + 1}: ${module.title}</h3>
                <p>${module.lessons?.length || 0} lesson(s)</p>
            </div>
        `;

        container.appendChild(card);
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
        console.log("ADD MODULE RAW RESPONSE:", rawText);

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            throw new Error(
                "Add module API did not return JSON. Check the backend route /api/courses/:id/modules."
            );
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