
console.log("dashboard js loaded");

document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("USER:", user);

    // ==========================
    // AUTH CHECK
    // ==========================

    if (!user || !user._id || !token) {

        window.location.href = "login.html";
        return;

    }

    // ==========================
    // ADMIN VISIBILITY
    // ==========================

    if (user.role !== "admin") {

        const adminLinks =
            document.querySelectorAll(".admin-only");

        adminLinks.forEach(link => {

            link.style.display = "none";

        });

    }

    try {

        // ==========================
        // DASHBOARD DATA
        // ==========================

        const dashboardRes = await fetch(
            `https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${user._id}`
        );

        const dashboardData = await dashboardRes.json();

        console.log("Dashboard:", dashboardData);

        document.getElementById("totalLabs").textContent =
            dashboardData.totalLabs || 0;

        document.getElementById("avgScore").textContent =
            dashboardData.avgScore
                ? dashboardData.avgScore.toFixed(1)
                : "0";

        document.getElementById("completedLabs").textContent =
            dashboardData.completedLabs || 0;

        document.getElementById("progress").textContent =
            Math.round(dashboardData.progress || 0) + "%";

        // ==========================
        // OVERALL PROGRESS BAR
        // ==========================

        const progressPercent =
            Math.round(dashboardData.progress || 0);

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
                `${progressPercent}% Complete`;

        }

        // ==========================
        // LAB PROGRESS
        // ==========================

        const labContainer =
            document.getElementById("labProgressContainer");

        if (labContainer) {

            labContainer.innerHTML = "";

            const completed =
                dashboardData.completedLabs || 0;

            const total =
                dashboardData.totalLabs || 0;

            for (let i = 1; i <= total; i++) {

                const card =
                    document.createElement("div");

                card.classList.add("lab-card");

                let status = "Locked";

                if (i <= completed) {

                    status = "Completed";

                } else if (i === completed + 1) {

                    status = "Available";

                }

                card.innerHTML = `
                    <span>Lab ${i}</span>
                    <span class="lab-status">
                        ${status}
                    </span>
                `;

                labContainer.appendChild(card);

            }

        }

        // ==========================
        // EXAM HISTORY
        // ==========================

        const examRes = await fetch(
            "https://akwire-api.onrender.com/api/exam/history",
            {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );

        const examData =
            await examRes.json();

        console.log("Exam:", examData);

        const attempts =
            examData.attempts || [];

        if (attempts.length > 0) {

            const latestAttempt =
                attempts[attempts.length - 1];

            const latestScore =
                latestAttempt.score || 0;

            console.log(
                "Latest Score:",
                latestScore
            );

            // ==========================
            // LATEST EXAM SCORE
            // ==========================

            const scoreText =
                document.getElementById(
                    "dash-score"
                );

            if (scoreText) {

                scoreText.textContent =
                    latestScore + "%";

            }

            const scoreBar =
                document.getElementById(
                    "dash-score-bar"
                );

            if (scoreBar) {

                scoreBar.style.width =
                    latestScore + "%";

            }

            // ==========================
            // READINESS SCORE
            // ==========================

            const avgReadiness =
                Math.round(

                    attempts.reduce(
                        (sum, a) =>
                            sum + (a.score || 0),
                        0
                    ) / attempts.length

                );

            console.log(
                "Readiness:",
                avgReadiness
            );

            const readinessText =
                document.getElementById(
                    "readiness-score"
                );

            if (readinessText) {

                readinessText.textContent =
                    avgReadiness + "%";

            }

            const readinessBar =
                document.getElementById(
                    "readiness-bar"
                );

            if (readinessBar) {

                readinessBar.style.width =
                    avgReadiness + "%";

            }

            // ==========================
            // CHART
            // ==========================

            const chartCanvas =
                document.getElementById(
                    "progressChart"
                );

            if (chartCanvas) {

                new Chart(chartCanvas, {

                    type: "line",

                    data: {

                        labels: attempts.map(
                            (_, i) =>
                                `Attempt ${i + 1}`
                        ),

                        datasets: [{

                            label: "Exam Score",

                            data: attempts.map(
                                a => a.score || 0
                            ),

                            borderColor:
                                "#38bdf8",

                            backgroundColor:
                                "rgba(56,189,248,0.2)",

                            fill: true,

                            tension: 0.3

                        }]

                    },

                    options: {

                        responsive: true,

                        scales: {

                            y: {

                                beginAtZero: true,
                                max: 100

                            }

                        }

                    }

                });

            }

        }


        // ==========================
        // RECOMMENDATIONS
        // ==========================

        const recRes = await fetch(
            "https://akwire-api.onrender.com/api/exam/recommendations",
            {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            }
        );

        const recData =
            await recRes.json();

        console.log(
            "Recommendations:",
            recData
        );

        const recContainer =
            document.getElementById(
                "recommendationsContainer"
            );

        if (recContainer) {

            recContainer.innerHTML = "";

            if (
                !recData.recommendations ||
                recData.recommendations.length === 0
            ) {

                recContainer.innerHTML = `
                    <div class="recommendation-card">
                        <h4>Excellent Progress</h4>
                        <p>
                            No weak domains detected.
                        </p>
                    </div>
                `;

            } else {

                recData.recommendations.forEach(rec => {

                    const card =
                        document.createElement("div");

                    card.classList.add(
                        "recommendation-card"
                    );

                    card.innerHTML = `
                        <h4>${rec.domain}</h4>
                        <p>${rec.message}</p>
                    `;

                    recContainer.appendChild(card);

                });

            }

        }

    } catch (err) {

        console.error(
            "Dashboard error:",
            err
        );

    }

});