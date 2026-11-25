
const API_URL = "https://akwire-api.onrender.com/api/labs";

let editingLabId = null;

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        alert("Access denied.");
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("labForm")
        ?.addEventListener("submit", saveLab);

    document.getElementById("refreshLabsBtn")
        ?.addEventListener("click", loadLabs);

    loadLabs();
});


// ==========================================
// READ FORM CONFIGURATION
// ==========================================

function getLabFormData() {
    const tasksText = document.getElementById("tasks").value.trim();
    const filesystemText = document.getElementById("filesystem").value.trim();
    const scenariosText = document.getElementById("scenarios").value.trim();

    let tasks = [];
    let filesystem = {};
    let scenarios = {};

    try {
        tasks = tasksText ? JSON.parse(tasksText) : [];
        filesystem = filesystemText ? JSON.parse(filesystemText) : {};
        scenarios = scenariosText ? JSON.parse(scenariosText) : {};
    } catch {
        throw new Error("Please check your JSON configuration.");
    }

    if (!Array.isArray(tasks)) {
        throw new Error("Tasks must be a JSON array.");
    }

    if (!filesystem || typeof filesystem !== "object" || Array.isArray(filesystem)) {
        throw new Error("Filesystem must be a JSON object.");
    }

    if (!scenarios || typeof scenarios !== "object" || Array.isArray(scenarios)) {
        throw new Error("Scenarios must be a JSON object.");
    }

    return {
        labId: document.getElementById("labId").value.trim(),
        title: document.getElementById("title").value.trim(),

        // NEW: Lab classification
        category: document.getElementById("category").value,
        experienceType: document.getElementById("experienceType").value,
        environment: document.getElementById("environment").value,

        clearance: document.getElementById("clearance").value.trim(),
        order: Number(document.getElementById("order").value),
        level: document.getElementById("level").value,
        isUnlocked: document.getElementById("isUnlocked").value === "true",
        briefing: document.getElementById("briefing").value.trim(),
        objective: document.getElementById("objective").value.trim(),

        tasks,
        filesystem,
        scenarios,

        hints: document.getElementById("hints").value
            .split("\n")
            .map(hint => hint.trim())
            .filter(Boolean)
    };
}


// ==========================================
// CREATE / UPDATE LAB
// ==========================================

async function saveLab(e) {
    e.preventDefault();

    const status = document.getElementById("statusMessage");
    const saveButton = document.getElementById("createLabBtn");

    try {
        const labData = getLabFormData();

        if (!labData.labId || !labData.title || !labData.briefing ||
            !labData.objective || !Number.isInteger(labData.order) ||
            labData.order < 1) {
            throw new Error("Please complete all required fields.");
        }

        saveButton.disabled = true;
        status.textContent = "Saving lab...";
        status.style.color = "#64748b";

        const response = await fetch(
            editingLabId
                ? `${API_URL}/${editingLabId}`
                : API_URL,
            {
                method: editingLabId ? "PUT" : "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(labData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || result.error || "Unable to save lab.");
        }

        status.textContent = editingLabId
            ? "Lab updated successfully."
            : "Lab created successfully.";

        status.style.color = "#22c55e";

        resetLabForm();
        await loadLabs();

    } catch (error) {
        console.error("SAVE LAB ERROR:", error);
        status.textContent = error.message;
        status.style.color = "#ef4444";

    } finally {
        saveButton.disabled = false;
    }
}


// ==========================================
// LOAD LABS
// ==========================================

async function loadLabs() {
    const labsList = document.getElementById("labsList");

    if (!labsList) return;

    labsList.innerHTML = '<p class="empty-state">Loading labs...</p>';

    try {
        const response = await fetch(API_URL, {
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load labs.");
        }

        const labs = Array.isArray(data) ? data : data.labs || [];

        renderLabs(labs);

    } catch (error) {
        console.error("LOAD LABS ERROR:", error);

        labsList.innerHTML =
            '<p class="empty-state error-text">Failed to load labs.</p>';
    }
}


// ==========================================
// RENDER LABS
// ==========================================

function renderLabs(labs) {
    const labsList = document.getElementById("labsList");

    if (!labs.length) {
        labsList.innerHTML =
            '<p class="empty-state">No labs created yet.</p>';
        return;
    }

    labsList.innerHTML = labs.map(lab => {
        const id = lab._id || "";

        return `
            <div class="course-item">
                <div class="course-item-info">

                    <h3>${escapeHtml(lab.title || "Untitled Lab")}</h3>

                    <p>${escapeHtml(lab.briefing || "No briefing provided.")}</p>

                    <div class="course-meta">
                        <span><strong>ID:</strong> ${escapeHtml(lab.labId || "")}</span>
                        <span><strong>Order:</strong> ${Number(lab.order) || 0}</span>
                        <span><strong>Difficulty:</strong> ${escapeHtml(lab.level || "beginner")}</span>
                        <span><strong>Tasks:</strong> ${(lab.tasks || []).length}</span>
                        <span><strong>Access:</strong> ${lab.isUnlocked ? "Unlocked" : "Locked"}</span>
                    </div>

                </div>

                <div class="course-item-actions">
                    <button
                        class="btn btn-secondary edit-lab-btn"
                        type="button"
                        data-lab-id="${escapeHtml(id)}">
                        Edit Lab
                    </button>

                    <button
                        class="btn builder-danger-btn delete-lab-btn"
                        type="button"
                        data-lab-id="${escapeHtml(id)}"
                        data-lab-title="${escapeHtml(lab.title || "Untitled Lab")}">
                        Delete Lab
                    </button>
                </div>
            </div>
        `;
    }).join("");

    bindLabActions(labs);
}


// ==========================================
// EDIT / DELETE ACTIONS
// ==========================================

function bindLabActions(labs) {
    document.querySelectorAll(".edit-lab-btn").forEach(button => {
        button.addEventListener("click", () => {
            const lab = labs.find(item => item._id === button.dataset.labId);

            if (lab) {
                editLab(lab);
            }
        });
    });

    document.querySelectorAll(".delete-lab-btn").forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.labId;
            const title = button.dataset.labTitle;

            if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
                return;
            }

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to delete lab.");
                }

                if (editingLabId === id) {
                    resetLabForm();
                }

                await loadLabs();

            } catch (error) {
                console.error("DELETE LAB ERROR:", error);
                alert(error.message);
            }
        });
    });
}


// ==========================================
// EDIT LAB
// ==========================================

function editLab(lab) {
    editingLabId = lab._id;

    document.getElementById("labId").value = lab.labId || "";
    document.getElementById("labId").readOnly = true;
    document.getElementById("title").value = lab.title || "";

    // NEW: Restore lab classification
    document.getElementById("category").value = lab.category || "general";
    document.getElementById("experienceType").value = lab.experienceType || "guided-lab";
    document.getElementById("environment").value = lab.environment || "linux-terminal";

    document.getElementById("clearance").value = lab.clearance || "";
    document.getElementById("order").value = lab.order ?? "";
    document.getElementById("level").value = lab.level || "beginner";
    document.getElementById("isUnlocked").value = String(!!lab.isUnlocked);
    document.getElementById("briefing").value = lab.briefing || "";
    document.getElementById("objective").value = lab.objective || "";

    document.getElementById("tasks").value =
        JSON.stringify(lab.tasks || [], null, 2);

    document.getElementById("filesystem").value =
        JSON.stringify(lab.filesystem || {}, null, 2);

    document.getElementById("scenarios").value =
        JSON.stringify(lab.scenarios || {}, null, 2);

    document.getElementById("hints").value =
        (lab.hints || []).join("\n");

    document.getElementById("createLabBtn").textContent = "Save Changes";

    addCancelEditButton();

    document.getElementById("statusMessage").textContent =
        `Editing ${lab.title}`;

    document.getElementById("labForm").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// CANCEL EDIT
// ==========================================

function addCancelEditButton() {
    if (document.getElementById("cancelLabEditBtn")) return;

    const button = document.createElement("button");

    button.id = "cancelLabEditBtn";
    button.type = "button";
    button.className = "btn btn-secondary";
    button.textContent = "Cancel Edit";

    button.addEventListener("click", resetLabForm);

    document.querySelector("#labForm .form-actions").appendChild(button);
}


// ==========================================
// RESET FORM
// ==========================================

function resetLabForm() {
    editingLabId = null;

    const form = document.getElementById("labForm");

    form.reset();

    document.getElementById("labId").readOnly = false;
    document.getElementById("createLabBtn").textContent = "Create Lab";
    document.getElementById("cancelLabEditBtn")?.remove();
    document.getElementById("statusMessage").textContent = "";
}


// ==========================================
// HTML ESCAPING
// ==========================================

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
