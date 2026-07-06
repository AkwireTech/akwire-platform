const token = localStorage.getItem("token");

const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
    if (!courseId) {
        alert("Course not found.");
        window.location.href = "create-course.html";
        return;
    }

    loadCourse();

    document
        .getElementById("addModuleBtn")
        .addEventListener("click", addModule);
});

async function loadCourse() {
    try {
        const response = await fetch(
            `https://akwire-api.onrender.com/api/courses/${courseId}`
        );

        const course = await response.json();

        if (!response.ok) {
            throw new Error(course.message || "Failed to load course");
        }

        document.getElementById("courseTitle").textContent = course.title;
        renderModules(course.modules || []);

    } catch (error) {
        console.error("LOAD COURSE ERROR:", error);
        alert(error.message || "Failed to load course.");
    }
}

function renderModules(modules) {
    const container = document.getElementById("modulesContainer");
    container.innerHTML = "";

    if (!modules.length) {
        container.innerHTML = `
            <div class="module-card">
                <h3>No modules yet</h3>
                <p>Add your first module for this course.</p>
            </div>
        `;
        return;
    }

    modules.forEach((module, index) => {
        const card = document.createElement("div");
        card.className = "module-card";

        card.innerHTML = `
            <h3>Module ${index + 1}: ${module.title}</h3>
            <p>${module.lessons?.length || 0} lesson(s)</p>
        `;

        container.appendChild(card);
    });
}

async function addModule() {
    const input = document.getElementById("moduleTitle");
    const title = input.value.trim();

    if (!title) {
        alert("Enter a module title.");
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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add module");
        }

        input.value = "";
        loadCourse();

    } catch (error) {
        console.error("ADD MODULE ERROR:", error);
        alert(error.message || "Failed to add module.");
    }
}