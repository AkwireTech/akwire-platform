document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    // ==========================
    // ACADEMY PROGRESS
    // ==========================

    try {

        const academyRes = await fetch(
            "https://akwire-api.onrender.com/api/progress",
            {
               credentials: "include"
            }
        );

        const academyData = await academyRes.json();

        const academyCompleted =
            document.getElementById("academyCompleted");

        if (academyCompleted) {
            academyCompleted.textContent =
                academyData.length || 0;
        }

    } catch (error) {

        console.error(
            "Academy progress error:",
            error
        );

    }

    // ==========================
    // CERTIFICATES
    // ==========================

    try {

        const certRes = await fetch(
            "https://akwire-api.onrender.com/api/progress/certificates",
            {
                credentials: "include"
            }
        );

        const certs = await certRes.json();

        const certifiedElement =
            document.getElementById("coursesCertified");

        if (certifiedElement) {
            certifiedElement.textContent =
                certs.length || 0;
        }

        const certCount =
            document.getElementById("certificatesEarned");

        if (certCount) {
            certCount.textContent =
                certs.length || 0;
        }

    } catch (error) {

        console.error(
            "Certificate Count Error:",
            error
        );

    }

    // ==========================
    // AUTH CHECK
    // ==========================

    if (!user || !user._id) {

    window.location.href = "login.html";
    return;

    }

    // ==========================
    // ADMIN VISIBILITY
    // ==========================

    if (user.role !== "admin") {

        document
            .querySelectorAll(".admin-only")
            .forEach(link => {

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

        const dashboardData =
            await dashboardRes.json();

        document.getElementById("totalLabs").textContent =
            dashboardData.totalLabs || 0;

        document.getElementById("completedLabs").textContent =
            dashboardData.completedLabs || 0;

        document.getElementById("avgScore").textContent =
            dashboardData.avgScore
                ? dashboardData.avgScore.toFixed(1)
                : "0";

        document.getElementById("progress").textContent =
            Math.round(dashboardData.progress || 0) + "%";

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
                credentials: "include"
            }
        );

        const examData =
            await examRes.json();

        const attempts =
            examData.attempts || [];

        
        // ==========================
        // EXAM ANALYTICS
        // ==========================

        const practiceAttempts =
            examData.practiceAttempts || [];

        const moduleAttempts =
            examData.moduleAttempts || [];

        const latestFinal =
            examData.latestFinal;

        const practiceAttemptsEl =
            document.getElementById("practiceAttempts");

        if (practiceAttemptsEl) {

            practiceAttemptsEl.textContent =
                practiceAttempts.length;

        }

        const practiceAverageEl =
            document.getElementById("practiceAverage");

        if (practiceAverageEl) {

            practiceAverageEl.textContent =
                (examData.practiceAverage || 0) + "%";

        }

        const practiceHighestEl =
            document.getElementById("practiceHighest");

        if (practiceHighestEl) {

            practiceHighestEl.textContent =
                (examData.practiceHighest || 0) + "%";

        }

        const moduleAttemptsEl =
            document.getElementById("moduleAttempts");

        if (moduleAttemptsEl) {

            moduleAttemptsEl.textContent =
                moduleAttempts.length;

        }

        const moduleAverageEl =
            document.getElementById("moduleAverage");

        if (moduleAverageEl) {

            moduleAverageEl.textContent =
                (examData.moduleAverage || 0) + "%";

        }

        const moduleHighestEl =
            document.getElementById("moduleHighest");

        if (moduleHighestEl) {

            moduleHighestEl.textContent =
                (examData.moduleHighest || 0) + "%";

        }

        const finalScoreEl =
            document.getElementById("finalScore");

        const finalStatusEl =
            document.getElementById("finalStatus");

        if (latestFinal) {

            if (finalScoreEl) {

                finalScoreEl.textContent =
                    latestFinal.score + "%";

            }

            if (finalStatusEl) {

                if (examData.finalPassed) {

                    finalStatusEl.textContent =
                        "PASSED";

                    finalStatusEl.className =
                        "status-pass";

                } else {

                    finalStatusEl.textContent =
                        "FAILED";

                    finalStatusEl.className =
                        "status-fail";

                }

            }

        } else {

            if (finalScoreEl) {

                finalScoreEl.textContent =
                    "Not Taken";

            }

            if (finalStatusEl) {

                finalStatusEl.textContent =
                    "Not Attempted";

                finalStatusEl.className =
                    "status-none";

            }

        }

        if (attempts.length > 0) {

            const latestAttempt =
                attempts[attempts.length - 1];

            const latestScore =
                latestAttempt.score || 0;

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

            const avgReadiness =
                Math.round(

                    attempts.reduce(
                        (sum, a) =>
                            sum + (a.score || 0),
                        0
                    ) / attempts.length

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
            // EXAM CHART
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

                        datasets: [

                            {

                                label: "Exam Score",

                                data: attempts.map(
                                    a => a.score || 0
                                ),

                                borderColor: "#38bdf8",

                                backgroundColor:
                                    "rgba(56,189,248,0.2)",

                                fill: true,

                                tension: 0.3

                            }

                        ]

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
               credentials: "include"
            }
        );

        const recData =
            await recRes.json();

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
                        <p>No weak domains detected.</p>
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