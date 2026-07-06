const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    const courseForm = document.getElementById("courseForm");

    if (!courseForm) return;

    courseForm.addEventListener("submit", createCourse);
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

        status.textContent = "Course created successfully. Redirecting to builder...";
        status.style.color = "#22c55e";

        setTimeout(() => {
            window.location.href = `course-builder.html?id=${newCourseId}`;
        }, 800);

    } catch (error) {
        console.error("CREATE COURSE ERROR:", error);
        status.textContent = error.message || "Failed to create course.";
        status.style.color = "#ef4444";
    }
}