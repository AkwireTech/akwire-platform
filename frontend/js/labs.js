// ==============================
// GLOBAL STATE
// ==============================

let masterLabs = {};
let currentLabID = '';
let score = 100;
let completedTasks = 0;
let hintIndex = 0;


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

    const container =
        document.querySelector(".task-card");

    container.innerHTML = "";

    missionObjectives.forEach((task, index) => {

        const row =
            document.createElement("div");

        row.className = "task-item";

        row.innerHTML = `

            ${index < currentObjectiveIndex
                ? "✅"
                : "⬜"}

            ${task.label}

        `;

        container.appendChild(row);

    });

}


function updateMissionProgress() {

    if (missionObjectives.length === 0)
        return;

    missionProgress = Math.round(

        (currentObjectiveIndex /
            missionObjectives.length) * 100

    );

    progressFill.style.width =
        missionProgress + "%";

    progressPercent.textContent =
        missionProgress + "%";

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

    const token = localStorage.getItem("token");

    const res = await fetch(`https://akwire-api.onrender.com/api/labs/${labID}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();

    console.log("LAB DATA:", data);

    masterLabs[labID] = data;

    loadLab(labID);

    loadMissionObjectives(data.tasks);

}


// ==============================
// LOAD LAB MENU
// ==============================

async function loadLabMenu() {

    const token = localStorage.getItem("token");

    const res = await fetch("https://akwire-api.onrender.com/api/labs", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

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
    document.getElementById('objective-text').innerText = lab.objective;
    
    currentObjectiveIndex = 0;

    missionProgress = 0;

    updateMissionProgress();

}


// ==============================
// TASK COMPLETION
// ==============================

function markComplete(task) {

    const cb = document.getElementById(task.id);

    if (cb && !cb.checked) {

        cb.checked = true;
        cb.parentElement.style.color = "#22c55e";

        completedTasks++;

        completeObjective();

        document.getElementById('objective-text').innerText = task.nextObjective;

        const lab = masterLabs[currentLabID];
        const briefingBody = document.getElementById('briefing-body');

        briefingBody.innerHTML = `
            <p>${lab.briefing}</p>
            <div style="background: rgba(250, 204, 21, 0.1); padding: 10px; border: 1px solid #facc15; margin-top: 10px;">
                <strong style="color: #facc15;">[ANALYSIS QUESTION]:</strong><br>${task.question}<br>
                <input type="text" id="analysis-ans" style="background:#000; color:#fff; border:1px solid #444; margin-top:5px; padding:5px;">
                <button onclick="checkAns('${task.answer}')">SUBMIT</button>
                <div id="ans-feedback"></div>
            </div>`;
    }
}


// ==============================
// ANSWER CHECK
// ==============================

window.checkAns = function(correct) {

    const val = document.getElementById('analysis-ans').value.toLowerCase().trim();
    const fb = document.getElementById('ans-feedback');

    if (val.includes(correct.toLowerCase())) {

        fb.innerHTML = "<span style='color:#22c55e;'>✓ Logic Confirmed.</span>";

        if (completedTasks === masterLabs[currentLabID].tasks.length) {
            finalizeLab();
        }

    } else {

        fb.innerHTML = "<span style='color:#ef4444;'>✗ Incorrect. Examine data.</span>";
        score -= 5;

    }
};


// ==============================
// FINAL RESULT
// ==============================

function finalizeLab() {

    const tBody = document.getElementById('lab-terminal');

    const lab = masterLabs[currentLabID];
    const totalTasks = lab.tasks.length;

    const res = document.createElement('div');

    res.innerHTML = `
        <div style="border:2px solid #22c55e; padding:20px; text-align:center; background: rgba(34,197,94,0.1);">
            <h3 style="color:#22c55e">MISSION SUCCESS</h3>
            <p>SCORE: ${score}%</p>
            <button onclick="location.reload()">RESTART</button>
        </div>`;

    tBody.appendChild(res);

    // SAVE RESULT (FIXED)
    saveLabResult(totalTasks);
    loadLabMenu(); // 🔥 refresh dropdown after completion
}

async function saveLabResult(totalTasks) {

    const token = localStorage.getItem("token");

    console.log("Saving lab result...");

    try {
        const res = await fetch("https://akwire-api.onrender.com/api/labs/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                labId: currentLabID,
                score: score,
                completedTasks: completedTasks,
                totalTasks: totalTasks
            })
        });

        const data = await res.json();

        console.log("Saved:", data);

    } catch (err) {
        console.error("Save failed:", err);
    }
}

async function loadDashboard(userId) {
    try {
        const res = await fetch(`https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${userId}`)
        const data = await res.json();

        console.log("Dashboard data:", data);

        // 🔥 FORCE UPDATE (VISIBLE CHANGE)
        document.getElementById('totalLabs').textContent = data.totalLabs;
        document.getElementById('avgScore').textContent = data.avgScore.toFixed(1);
        document.getElementById('completedLabs').textContent = data.completedLabs;
        document.getElementById('progress').textContent = data.progress.toFixed(1) + "%";

        // 🔥 DEBUG (to prove it's working)

        if (data.results && data.results.length > 0) {
            renderCharts(data.results);
            generateInsights(data.results);
        }

    } catch (err) {
        console.error("Dashboard error:", err);
    }
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
        tInput.addEventListener('keydown', (e) => {

            if (e.key === 'Enter') {

                const cmd = tInput.value.trim();

                if (cmd) {

                    const line = document.createElement('div');
                    line.innerHTML = `<span class="prompt">#</span> ${cmd}`;
                    tBody.insertBefore(line, tInput.parentElement);

                    const lab = masterLabs[currentLabID];
                    const clean = cmd.toLowerCase();

                
                }else if (lab.scenarios && lab.scenarios[clean]) {

                        const resp = document.createElement('div');
                        resp.className = 'log-entry';
                        resp.innerHTML = lab.scenarios[clean].replace(/\n/g, '<br>');

                        tBody.insertBefore(resp, tInput.parentElement);

                        lab.tasks.forEach(t => {

                            console.log("User entered:", clean);
                            console.log("Task command:", t.cmd);

                            const commands = Array.isArray(t.cmd)
                                ? t.cmd
                                : [t.cmd];

                            const matched = commands.some(command =>
                                clean === command.toLowerCase()
                            );

                            if (matched) {

                                markComplete(t);

                            }

                        });

                    } else {

                        const error = document.createElement('div');
                        error.style.color = "#ef4444";
                        error.innerText = `bash: ${cmd}: command not found`;

                        tBody.insertBefore(error, tInput.parentElement);
                    }
                

                tInput.value = '';
                tBody.scrollTop = tBody.scrollHeight;
            }
        });
    }

});


document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        console.error("No user found");
        return;
    }

    loadDashboard(user._id);
});