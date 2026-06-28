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

        console.error(error);

        alert("Failed to load course.");

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

        let lessonsHTML = "";

        module.lessons.forEach(lesson => {

            lessonsHTML += `
                <li>${lesson.title}</li>
            `;

        });

        card.innerHTML = `

            <h3>${module.title}</h3>

            <ul>
                ${lessonsHTML}
            </ul>

            <input
                type="text"
                id="lesson-${module._id}"
                placeholder="Lesson Title"
            >

            <textarea
                id="content-${module._id}"
                placeholder="Lesson Content"
            ></textarea>

            <input
                type="text"
                id="video-${module._id}"
                placeholder="Video URL"
            >

            <button
                onclick="addLesson('${module._id}')"
                class="submit-feedback-btn"
            >
                Add Lesson
            </button>

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

        await fetch(

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

        document.getElementById("moduleTitle").value = "";

        loadCourse();

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// ADD LESSON
// ==========================================

async function addLesson(moduleId) {

    const title =
        document.getElementById(`lesson-${moduleId}`).value;

    const content =
        document.getElementById(`content-${moduleId}`).value;

    const videoUrl =
        document.getElementById(`video-${moduleId}`).value;

    if (!title.trim()) {

        alert("Enter a lesson title.");

        return;

    }

    try {

        await fetch(

            `https://akwire-api.onrender.com/api/courses/${courseId}/modules/${moduleId}/lessons`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    Authorization:
                        "Bearer " + token

                },

                body: JSON.stringify({

                    title,
                    content,
                    videoUrl,
                    resources: []

                })

            }

        );

        loadCourse();

    } catch (error) {

        console.error(error);

    }

}