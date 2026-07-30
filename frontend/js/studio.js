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

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "login.html";

        return;

    }

}

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

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}