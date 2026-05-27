console.log("DASHBOARD JS LOADED");
document.addEventListener("DOMContentLoaded", async () => {

    // ==========================
    // AUTH CHECK
    // ==========================

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    if (!user || !user._id || !token) {

        console.error("User not authenticated");

        window.location.href = "login.html";

        return;

    }

    // ==========================
    // THEME INITIALIZATION
    // ==========================

    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "matrix-mode") {

        document.body.classList.add("matrix-mode");

        setTimeout(startMatrixRain, 50);

    }

    // ==========================
    // THREAT INTEL FEED
    // ==========================

    const intelCard = document.querySelector(".intel-card");

    if (intelCard) {

        const vuls = [
            "Critical: Zero-day found in VPN concentrator.",
            "Alert: Buffer Overflow detected in DNS resolver.",
            "Notice: New SQL Injection string identified in logs.",
            "System: Security database synchronization complete."
        ];

        const randomVul =
            vuls[Math.floor(Math.random() * vuls.length)];

        const newEntry = document.createElement("div");

        newEntry.className = "intel-entry";

        newEntry.innerHTML = `
            <span class="timestamp">
                [${new Date().toLocaleTimeString()}]
            </span>

            <span class="label warning">
                INTEL_UPDT:
            </span>

            <span class="intel-text">
                ${randomVul}
            </span>
        `;

        intelCard.prepend(newEntry);

    }

    // ==========================
    // LOAD DASHBOARD DATA
    // ==========================

    await loadDashboard(user._id);

    await loadLabProgress(user._id);

    await loadExamHistory();

});


// ==========================
// MATRIX BACKGROUND ENGINE
// ==========================

function startMatrixRain() {

    const canvas = document.getElementById("matrix-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = "0101101101";

    const fontSize = 16;

    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {

        ctx.fillStyle = "rgba(2, 6, 23, 0.05)";

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#10b981";

        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            const text =
                binary.charAt(
                    Math.floor(Math.random() * binary.length)
                );

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {

                drops[i] = 0;

            }

            drops[i]++;

        }

    }

    window.addEventListener("resize", () => {

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    });

    setInterval(draw, 33);

}


// ===============================
// EXAM HISTORY + READINESS
// ===============================

async function loadExamHistory() {

    try {
        console.log("loadDashboard running");

        const token = localStorage.getItem("token");

        const res = await fetch(
            "https://akwire-api.onrender.com/api/exam/history",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        console.log(data);

        const data = await res.json();

        const attempts =
            data.attempts || data.examAttempts || [];

        if (!attempts.length) return;

        const scores = attempts.map(a => a.score);

        const labels =
            attempts.map((a, i) => `Attempt ${i + 1}`);

        // ===============================
        // MAIN SCORE
        // ===============================

        const latestScore =
            attempts[attempts.length - 1].score;

        const scoreText =
            document.getElementById("dash-score");

        const scoreBar =
            document.getElementById("dash-score-bar");

        const statusText =
            document.getElementById("status-text");

        if (scoreText && scoreBar && statusText) {

            scoreText.innerText = latestScore + "%";

            scoreBar.style.width = latestScore + "%";

            if (latestScore >= 85) {

                statusText.innerText = "MISSION_READY";

                statusText.style.color = "#10b981";

            } else if (latestScore >= 70) {

                statusText.innerText = "OPERATIONAL";

                statusText.style.color = "#38bdf8";

            } else if (latestScore > 0) {

                statusText.innerText =
                    "REMEDIATION_REQUIRED";

                statusText.style.color = "#f59e0b";

            } else {

                statusText.innerText =
                    "AWAITING_DEPLOYMENT";

                statusText.style.color = "#94a3b8";

            }

        }

        // ===============================
        // CHART
        // ===============================

        const ctx =
            document.getElementById("progressChart");

        if (ctx) {

            new Chart(ctx, {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [{

                        label: "Exam Score",

                        data: scores,

                        borderColor: "#38bdf8",

                        backgroundColor:
                            "rgba(56,189,248,0.2)",

                        fill: true,

                        tension: 0.3

                    }]

                },

                options: {

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100

                        }

                    }

                }

            });

        }

        // ===============================
        // READINESS
        // ===============================

        const readiness = Math.round(

            scores.reduce((a, b) => a + b, 0)
            / scores.length

        );

        const readinessText =
            document.getElementById("readiness-score");

        const readinessBar =
            document.getElementById("readiness-bar");

        if (readinessText && readinessBar) {

            readinessText.innerText = readiness + "%";

            readinessBar.style.width = readiness + "%";

        }

    } catch (err) {

        console.error(
            "Dashboard history error:",
            err
        );

    }

}


// ==========================
// DASHBOARD STATS
// ==========================

async function loadDashboard(userId) {

    try {

        const res = await fetch(
            `https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${userId}`
        );

        const data = await res.json();

        console.log("Dashboard data:", data);

        document.getElementById("totalLabs").textContent =
            data.totalLabs || 0;

        document.getElementById("avgScore").textContent =
            data.avgScore
                ? data.avgScore.toFixed(1)
                : "0";

        document.getElementById("completedLabs").textContent =
            data.completedLabs || 0;

        document.getElementById("progress").textContent =
            Math.round(data.progress || 0) + "%";

        const progressPercent =
            Math.round(data.progress || 0);

        const overallBar =
            document.getElementById("overallProgressBar");

        if (overallBar) {

            overallBar.style.width =
                progressPercent + "%";

        }

        const progressText =
            document.getElementById("progressText");

        if (progressText) {

            progressText.textContent =
                `${progressPercent}% (${data.completedLabs}/${data.totalLabs} Labs)`;

        }

        generateInsights(data);

    } catch (err) {

        console.error("Dashboard error:", err);

    }

}


// ==========================
// RECOMMENDATIONS
// ==========================

function generateInsights(data) {

    const container =
        document.getElementById(
            "recommendationsContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    const exam = data.latestExam;

    if (!exam || !exam.domainScores) {

        container.innerHTML = `
            <div class="recommendation-card">
                <h4>No Recommendations Yet</h4>
                <p>
                    Complete an exam to receive
                    adaptive recommendations.
                </p>
            </div>
        `;

        return;

    }

    const weakDomains = [];

    for (const domain in exam.domainScores) {

        if (exam.domainScores[domain] < 70) {

            weakDomains.push(domain);

        }

    }

    if (weakDomains.length === 0) {

        container.innerHTML = `
            <div class="recommendation-card">
                <h4>Excellent Performance</h4>
                <p>
                    You are performing well across
                    all assessed domains.
                </p>
            </div>
        `;

        return;

    }

    weakDomains.forEach(domain => {

        const card = document.createElement("div");

        card.className = "recommendation-card";

        card.innerHTML = `
            <h4>${domain}</h4>
            <p>
                Additional practice recommended
                for this domain.
            </p>
        `;

        container.appendChild(card);

    });

}


// ==========================
// LAB PROGRESS
// ==========================

async function loadLabProgress(userId) {

    try {

        const labsRes = await fetch(
            "https://akwire-api.onrender.com/api/labs",
            {
                headers: {
                    "Authorization":
                        `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const labs = await labsRes.json();

        const resultsRes = await fetch(
            `https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${userId}`
        );

        const data = await resultsRes.json();

        renderLabProgress(labs, data);

    } catch (err) {

        console.error("Lab progress error:", err);

    }

}


function renderLabProgress(labs, data) {

    const container =
        document.getElementById("labProgressContainer");

    if (!container) return;

    container.innerHTML = "";

    labs.sort((a, b) => a.order - b.order);

    let sequentialCompletedCount = 0;

    labs.forEach((lab, index) => {

        const card = document.createElement("div");

        card.classList.add("lab-card");

        let status = "";

        let statusClass = "";

        const labResults =
            (data.results || [])
                .filter(r => r.labId === lab.labId);

        const bestScore =
            labResults.length > 0
                ? Math.max(...labResults.map(r => r.score))
                : 0;

        if (
            bestScore >= 70 &&
            index === sequentialCompletedCount
        ) {

            status = "Completed";

            statusClass = "status-complete";

            sequentialCompletedCount++;

        } else if (
            index === sequentialCompletedCount
        ) {

            status = "Available";

            statusClass = "status-available";

        } else {

            status = "Locked";

            statusClass = "status-locked";

            card.classList.add("locked");

        }

        card.innerHTML = `
            <span>${lab.title}</span>

            <span class="lab-status ${statusClass}">
                ${status}
            </span>
        `;

        container.appendChild(card);

        if (status === "Available") {

            card.style.cursor = "pointer";

            card.addEventListener("click", () => {

                window.location.href =
                    `labs.html?labId=${lab.labId}`;

            });

        }

    });

}


// ==========================
// MOBILE SIDEBAR
// ==========================

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const menuBtn =
        document.querySelector(".mobile-menu-toggle");

    if (sidebar)
        sidebar.classList.toggle("active");

    if (menuBtn)
        menuBtn.classList.toggle("open");

}