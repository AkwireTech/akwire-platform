import { VirtualFileSystem } from "./labs/lab-filesystem.js";
import { fileSystems } from "./labs/lab-filesystems.js";
import { TerminalEngine } from "./labs/lab-terminal.js";
import { CommandHistory } from "./labs/lab-history.js";
import { MissionScoring } from "./labs/lab-scoring.js";
import { AIMentor } from "./labs/lab-ai.js";
import { NetworkMap } from "./labs/lab-network.js";
import { LabUtils } from "./labs/lab-utils.js";


// ==============================
// GLOBAL STATE
// ==============================

let masterLabs = {};
let currentLabID = '';
let score = 100;
let completedTasks = 0;
let hintIndex = 0;


// ===================================
// LAB ENGINE MODULES
// ===================================

const vfs = new VirtualFileSystem();

const history = new CommandHistory();

const scoring = new MissionScoring();

const mentor = new AIMentor();

const network = new NetworkMap();

let terminalEngine = null;


// ==============================
// SYSTEM CLOCK
// ==============================

function startSystemClock() {
    const update = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const el = document.getElementById('system-clock');
        if (el) el.innerText = timeStr;
    };
    update();
    setInterval(update, 1000);
}


// ===============================
// Lab UI State
// ===============================

let currentObjectiveIndex = 0;

let missionObjectives = [];

let missionProgress = 0;

const terminal =
    document.getElementById("lab-terminal");

const progressFill =
    document.getElementById("mission-progress");

const progressPercent =
    document.getElementById("progress-percent");


// ===============================
// Terminal Output
// ===============================

function printTerminal(text) {

    const line = document.createElement("div");
    line.className = "log-entry";
    line.textContent = text;

    const inputLine = terminal.querySelector(".terminal-input-line");

    if (inputLine) {
        terminal.insertBefore(line, inputLine);
    } else {
        terminal.appendChild(line);
    }

    terminal.scrollTop = terminal.scrollHeight;
}

// ===============================
// Boot Sequence
// ===============================

async function bootSequence() {

    terminal.innerHTML = "";

    const bootMessages = [

        "====================================================",
        " AKWIRE CYBER RANGE v2.0",
        " Secure Operations Environment",
        "====================================================",
        "",
        "Loading secure environment...",
        "Initializing virtual network...",
        "Connecting to Security Operations Center...",
        "Loading mission...",
        "Mission Ready.",
        ""

    ];

    for (const msg of bootMessages) {

        printTerminal(msg);

        await new Promise(resolve =>
            setTimeout(resolve, 300)
        );
    }

}


function loadMissionObjectives(tasks) {

    missionObjectives = tasks;

    currentObjectiveIndex = 0;

    renderObjectives();

    updateMissionProgress();
}


function renderObjectives() {

    const container = document.querySelector(".task-card");

    container.innerHTML = "";

    missionObjectives.forEach((task, index) => {

        const row = document.createElement("div");
        row.className = "task-item";

        row.innerHTML = `
            <label style="display:flex;align-items:center;gap:8px;">
                <input
                    type="checkbox"
                    id="${task.id}"
                    disabled
                    ${index < currentObjectiveIndex ? "checked" : ""}
                >
                <span>${task.label}</span>
            </label>
        `;

        container.appendChild(row);

    });

}

function updateMissionProgress() {

    const percent =
        masterLabs[currentLabID]
            ? (completedTasks / masterLabs[currentLabID].tasks.length) * 100
            : 0;

    const bar = document.getElementById("mission-progress");
    const text = document.getElementById("progress-percent");

    if (bar) {
        bar.style.width = percent + "%";
    }

    if (text) {
        text.textContent = Math.round(percent) + "%";
    }
}


function completeObjective() {

    currentObjectiveIndex++;

    renderObjectives();

    updateMissionProgress();

}



// ==============================
// FETCH LAB FROM BACKEND
// ==============================

async function fetchLabFromBackend(labID) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        window.location.href = "login.html";
        return;
    }

    const res = await fetch(
        `https://akwire-api.onrender.com/api/labs/${labID}`,
        {
            credentials: "include"
        }
    );

    const data = await res.json();

    console.log("LAB DATA:", data);

    masterLabs[labID] = data;
    currentLabID = labID;

    // Render the lab after it has been loaded
    loadLab(labID);

// ------------------------------
// Initialize Lab Modules
// ------------------------------

    // Load this lab's filesystem.
    // Reset it when the lab has no configured filesystem.
    vfs.load(fileSystems[labID] || {});

    if (!terminalEngine) {
        terminalEngine = new TerminalEngine(
            vfs,
            document.getElementById("lab-terminal")
        );
    }

    mentor.loadLab(data);

    if (data.network) {
        network.load(data.network);
    }

    scoring.start(data.tasks.length);

}


// ==============================
// LOAD LAB MENU
// ==============================

async function loadLabMenu() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        window.location.href = "login.html";
        return;
    }

    const res = await fetch(
        "https://akwire-api.onrender.com/api/labs",
        {
            credentials: "include"
        }
    );

    const labs = await res.json();

    const dropdown = document.getElementById("lab-select");

    if (!dropdown) return;

    dropdown.innerHTML = "";

    labs.forEach(lab => {

    const option = document.createElement("option");

    option.value = lab.labId;

    if (!lab.isUnlocked) {
        option.textContent = `🔒 ${lab.title}`;
        option.disabled = true;
    } else {
        option.textContent = `🟢 ${lab.title}`;
    }

    dropdown.appendChild(option);
    });

    return labs;
}


// ==============================
// LOAD LAB INTO UI
// ==============================

function loadLab(labID) {

    const lab = masterLabs[labID];
    if (!lab) return;

    currentLabID = labID;
    score = 100;
    completedTasks = 0;
    hintIndex = 0;

    document.getElementById('briefing-header').innerText = `OPERATION: ${lab.title.toUpperCase()}`;
    document.getElementById('briefing-body').innerHTML = lab.briefing;
    const objectiveText = document.getElementById("objective-text");

        if (objectiveText) {
            objectiveText.innerText =
                lab.tasks.length > 0
                    ? lab.tasks[0].label
                    : lab.objective;
        }

// ===============================
// Render Mission Objectives
// ===============================

    const objectivesContainer =
        document.getElementById("mission-objectives");

    if (objectivesContainer) {

        objectivesContainer.innerHTML = "";

        lab.tasks.forEach((task, index) => {

            objectivesContainer.innerHTML += `
                <div
                    id="objective-${index}"
                    class="objective-item">

                    <span class="objective-check">☐</span>

                    <span>${task.label}</span>

                </div>
            `;

        });

    }
    
    currentObjectiveIndex = 0;

    missionProgress = 0;

    updateMissionProgress();

}


// ==============================
// TASK COMPLETION
// ==============================

function markComplete(task) {

    console.log("markComplete:", task.id);

    const lab = masterLabs[currentLabID];

    const taskIndex = lab.tasks.findIndex(t => t.id === task.id);

    const item = document.getElementById(`objective-${taskIndex}`);

    if (!item || item.dataset.completed === "true") {
        return;
    }

    item.dataset.completed = "true";

    const check = item.querySelector(".objective-check");

    if (check) {
        check.textContent = "☑";
        check.style.color = "#22c55e";
    }

    item.style.color = "#22c55e";

    completedTasks++;

    updateMissionProgress();

    if (task.nextObjective) {
        document.getElementById("objective-text").textContent =
            task.nextObjective;
    }

    const briefingBody = document.getElementById("briefing-body");

    briefingBody.innerHTML = `
        <p>${lab.briefing}</p>

        <div style="
            background: rgba(250,204,21,.1);
            border:1px solid #facc15;
            padding:10px;
            margin-top:10px;
        ">

            <strong style="color:#facc15">
                ANALYSIS QUESTION
            </strong>

            <br><br>

            ${task.question}

            <br><br>

            <input
                id="analysis-ans"
                type="text"
                style="
                    background:#000;
                    color:#fff;
                    border:1px solid #555;
                    padding:6px;
                ">

            <button onclick="checkAns('${task.answer}')">
                Submit
            </button>

            <div id="ans-feedback"></div>

        </div>
    `;
}


// ==============================
// ANSWER CHECK
// ==============================


window.checkAns = function(correct) {
    const answerInput = document.getElementById("analysis-ans");
    const feedback = document.getElementById("ans-feedback");

    if (!answerInput || !feedback) return;

    const normalize = (value) =>
        String(value || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

    const val = normalize(answerInput.value);
    const expected = normalize(correct);

    if (!val) {
        feedback.textContent = "Please enter an answer.";
        feedback.style.color = "#facc15";
        return;
    }

    // Prevent repeated scoring for the same question.
    if (answerInput.dataset.answered === "correct") {
        feedback.textContent = "This question has already been answered correctly.";
        feedback.style.color = "#22c55e";
        return;
    }

    if (val === expected) {
        answerInput.dataset.answered = "correct";
        answerInput.disabled = true;

        feedback.textContent = "✓ Correct. Analysis confirmed.";
        feedback.style.color = "#22c55e";

        const lab = masterLabs[currentLabID];

        if (
            lab &&
            completedTasks === lab.tasks.length
        ) {
            finalizeLab();
        }
    } else {
        // Deduct points only once per incorrect submission
        // for this question.
        if (answerInput.dataset.penaltyApplied !== "true") {
            score = Math.max(0, score - 5);
            answerInput.dataset.penaltyApplied = "true";
        }

        feedback.textContent = "✗ Incorrect. Review the evidence and try again.";
        feedback.style.color = "#ef4444";
    }
};



// ==============================
// FINAL RESULT
// ==============================


function finalizeLab() {
    const tBody = document.getElementById("lab-terminal");
    const lab = masterLabs[currentLabID];

    if (!tBody || !lab || !Array.isArray(lab.tasks)) {
        console.error("Cannot finalize lab: lab data is missing.");
        return;
    }

    // Prevent duplicate completion and duplicate result submissions.
    if (tBody.dataset.labFinalized === "true") {
        return;
    }

    tBody.dataset.labFinalized = "true";

    const totalTasks = lab.tasks.length;

    const report = currentLabID === "lab-04"
        ? {
            title: "INCIDENT REPORT",
            findings: [
                ["Incident", "Suspected SSH brute-force activity"],
                ["Source IP", "192.168.15.201"],
                ["Target service", "SSH (port 22)"],
                ["Additional exposed service", "FTP (port 21), according to the simulated scan"],
                ["Authentication evidence", "284 failed attempts reported in the lab evidence"],
                ["Credential exposure", "A password entry was found in secret_notes.txt"]
            ],
            recommendations: [
                "Restrict SSH access to authorized source addresses.",
                "Disable root SSH login and review password-based authentication settings.",
                "Disable FTP if it is not required and use a secure alternative where appropriate.",
                "Remove exposed credentials, rotate affected passwords, and store secrets securely.",
                "Review firewall rules and authentication logs for further suspicious activity."
            ]
        }
        : null;

    const container = document.createElement("section");
    container.className = "lab-final-report";
    container.style.cssText = [
        "border:2px solid #22c55e",
        "padding:20px",
        "margin:16px 0",
        "background:rgba(34,197,94,0.08)",
        "color:inherit",
        "text-align:left"
    ].join(";");

    const heading = document.createElement("h3");
    heading.textContent = "MISSION SUCCESS";
    heading.style.color = "#22c55e";
    container.appendChild(heading);

    const scoreText = document.createElement("p");
    scoreText.textContent = `FINAL SCORE: ${score}%`;
    container.appendChild(scoreText);

    if (report) {
        const reportHeading = document.createElement("h4");
        reportHeading.textContent = report.title;
        container.appendChild(reportHeading);

        const findingsList = document.createElement("ul");

        report.findings.forEach(([label, detail]) => {
            const item = document.createElement("li");
            const strong = document.createElement("strong");

            strong.textContent = `${label}: `;
            item.appendChild(strong);
            item.appendChild(document.createTextNode(detail));
            findingsList.appendChild(item);
        });

        container.appendChild(findingsList);

        const recommendationHeading = document.createElement("h4");
        recommendationHeading.textContent = "RECOMMENDED REMEDIATION";
        container.appendChild(recommendationHeading);

        const recommendationsList = document.createElement("ol");

        report.recommendations.forEach((recommendation) => {
            const item = document.createElement("li");
            item.textContent = recommendation;
            recommendationsList.appendChild(item);
        });

        container.appendChild(recommendationsList);

        const note = document.createElement("p");
        note.textContent =
            "Training note: Port scan results are simulated. " +
            "The lab evidence does not independently establish that encryption failed.";
        note.style.color = "#facc15";
        container.appendChild(note);
    }

    const restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.textContent = "RESTART";
    restartButton.addEventListener("click", () => {
        window.location.reload();
    });

    container.appendChild(restartButton);
    tBody.appendChild(container);

    // Preserve the existing backend save and lab menu refresh.
    saveLabResult(totalTasks);
    loadLabMenu();
}


// ==============================
// MAIN INIT (FIXED + HINT FIX)
// ==============================

document.addEventListener('DOMContentLoaded', async () => {

    startSystemClock();

    const dropdown = document.getElementById('lab-select');
    const hBtn = document.getElementById('hint-btn');
    const hText = document.getElementById('hint-text');
    const tInput = document.getElementById('terminal-input');
    const tBody = document.getElementById('lab-terminal');
    
    // Initialize the terminal engine once
    terminalEngine = new TerminalEngine(vfs, tBody);

    // Load labs
    const labs = await loadLabMenu();

    if (labs && labs.length > 0) {

        // Find first unlocked lab
        const firstUnlocked = labs.find(lab => lab.isUnlocked);

        if (firstUnlocked) {
            fetchLabFromBackend(firstUnlocked.labId);
        }

    }

    // Dropdown change
    if (dropdown) {
        dropdown.addEventListener("change", (e) => {
            fetchLabFromBackend(e.target.value);
        });
    }

    // ==========================
    // HINT SYSTEM FIXED
    // ==========================
    if (hBtn) {
        hBtn.addEventListener('click', () => {

            const lab = masterLabs[currentLabID];

            if (!lab) return;

            if (!lab.hints || lab.hints.length === 0) {
                hText.innerHTML = "<span style='color:#facc15;'>No hints available</span>";
                hText.style.display = "block";
                return;
            }

            if (hintIndex >= lab.hints.length) {
                hintIndex = 0;

                // ===================================
                // NEW LAB ENGINE MODULES
                // ===================================

                const vfs = new VirtualFileSystem();

                let terminalEngine = null;
            }

            hText.innerHTML = `
                <code style="background:#1e293b; padding:4px; color:#38bdf8;">
                    ${lab.hints[hintIndex]}
                </code>
            `;

            hText.style.display = 'block';

            hintIndex++;
            score -= 10;
        });
    }


    // ==========================
    // TERMINAL ENGINE
    // ==========================

    if (tInput) {
        tInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;

            e.preventDefault();

            const cmd = tInput.value.trim();
            if (!cmd) return;

            const inputLine = tInput.parentElement;
            const lab = masterLabs[currentLabID];
            const clean = cmd.toLowerCase();

            // Display the entered command safely.
            const commandLine = document.createElement("div");
            commandLine.className = "log-entry";

            const prompt = document.createElement("span");
            prompt.className = "prompt";
            prompt.textContent = "# ";

            commandLine.appendChild(prompt);
            commandLine.appendChild(
                document.createTextNode(cmd)
            );

            tBody.insertBefore(commandLine, inputLine);

            // Clear previous terminal output but preserve the input.
            if (clean === "clear") {
                Array.from(tBody.children).forEach((element) => {
                    if (
                        element !== inputLine &&
                        !element.contains(inputLine)
                    ) {
                        element.remove();
                    }
                });

                tInput.value = "";
                tBody.scrollTop = tBody.scrollHeight;
                return;
            }

            // Preserve existing scenario-based lab behavior.
            if (lab && lab.scenarios && lab.scenarios[clean]) {
                const response = document.createElement("div");
                response.className = "log-entry";
                response.textContent = lab.scenarios[clean];

                tBody.insertBefore(response, inputLine);

                // Preserve existing objective completion checks.
                if (Array.isArray(lab.tasks)) {
                    lab.tasks.forEach((task) => {
                        const commands = Array.isArray(task.cmd)
                            ? task.cmd
                            : [task.cmd];

                        const matched = commands.some((command) =>
                            typeof command === "string" &&
                            clean === command.toLowerCase()
                        );

                        if (matched) {
                            markComplete(task);
                        }
                    });
                }
            } else {
                // Run supported virtual terminal commands.
                const output = terminalEngine
                    ? terminalEngine.execute(cmd)
                    : "Terminal engine is not initialized.";

                if (output) {
                    const response = document.createElement("div");
                    response.className = "log-entry";
                    response.textContent = String(output);

                    tBody.insertBefore(response, inputLine);
                }
            }

            tInput.value = "";
            tBody.scrollTop = tBody.scrollHeight;
        });
    }


});


document.addEventListener("DOMContentLoaded", () => {

    const totalLabs = document.getElementById("totalLabs");

    // Only run dashboard code on pages that have dashboard cards
    if (!totalLabs) {
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        console.error("No user found");
        return;
    }

    loadDashboard(user._id);

});