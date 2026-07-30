// ===============================================
// AKWIRE STUDIO
// studio.js
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    initializeStudio();

});

function initializeStudio() {

    protectPage();

    loadStudio();

}

// ===============================================
// AUTHENTICATION
// ===============================================

function protectPage() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {

        window.location.href = "login.html";
        return;

    }

}

const res = await fetch(
    "https://akwire-api.onrender.com/api/login",
    {
        credentials: "include"
    }
);

// ===============================================
// STUDIO
// ===============================================

function loadStudio() {

    console.log("Akwire Studio Loaded");

}

// ===============================================
// NAVIGATION
// ===============================================

function openCourseBuilder() {

    window.location.href = "create-course.html";

}

function openExamBuilder() {

    window.location.href = "create-exam.html";

}

function openLabBuilder() {

    window.location.href = "create-lab.html";

}

function openDashboard() {

    window.location.href = "admin-dashboard.html";

}

function openReports() {

    window.location.href = "reports.html";

}

function openSettings() {

    window.location.href = "settings.html";

}

// ===============================================
// PLACEHOLDERS
// These will become active during future phases.
// ===============================================

function openProjects() {

    alert(
        "Projects Manager will be available in Phase 2."
    );

}

function openPublishing() {

    alert(
        "Publishing Center will be available in a future update."
    );

}

function openAIAssistant() {

    alert(
        "AI Lesson Assistant will be available in a future update."
    );

}

// ===============================================
// LOGOUT
// ===============================================

const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user._id) {
    window.location.href = "login.html";
    return;
}