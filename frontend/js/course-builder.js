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

    document
        .getElementById("addModuleBtn")
        .addEventListener("click", addModule);

});

// ==========================================
// LOAD COURSE
// ==========================================

async function loadCourse() {

    try {

        const response = await fetch(

            `https://akwire-api.onrender.com/api/courses/${courseId}`

        );

        const course = await response.json();

        document.getElementById("courseTitle").textContent =
            course.title;

        renderModules(course.modules);

    } catch (error) {

        console.error("ADD MODULE ERROR:", error);

        alert(error.message);

    }

}

// ==========================================
// RENDER MODULES
// ==========================================

function renderModules(modules) {

    const container =
        document.getElementById("modulesContainer");

    container.innerHTML = "";

    modules.forEach(module => {

        const card =
            document.createElement("div");

        card.className =
            "recommendations-panel";

        card.innerHTML = `

            <h3>${module.title}</h3>

            <p>
                Lessons:
                ${module.lessons.length}
            </p>

        `;

        container.appendChild(card);

    });

}

// ==========================================
// ADD MODULE
// ==========================================

async function addModule() {

    const title =
        document.getElementById("moduleTitle").value;

    if (!title.trim()) {

        alert("Enter a module title.");

        return;

    }

    try {

        const response = await fetch(

            `https://akwire-api.onrender.com/api/courses/${courseId}/modules`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        "Bearer " + token

                },

                body: JSON.stringify({

                    title

                })

            }

        );

        if (!response.ok) {

            const error = await response.json();

            throw new Error(error.message);

        }

        document.getElementById("moduleTitle").value = "";

        loadCourse();

    } catch (error) {

        console.error(error);

        alert("Failed to add module.");

    }

}