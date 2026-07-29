document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || { progress: [], lastExamScore: 0 };
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // 1. Theme Logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'matrix-mode') {
        document.body.classList.add('matrix-mode');
        if (toggleSwitch) toggleSwitch.checked = true;
    }

    // Determine colors based on active theme
    const isMatrix = document.body.classList.contains('matrix-mode');
    const primaryColor = isMatrix ? '#10b981' : '#38bdf8';
    const rgbaColor = isMatrix ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)';

    const domainLabels = ["General Security", "Threats & Vulnerabilities", "Architecture", "Operations", "Governance"];
    const domainData = [80, 45, 60, 30, 90]; 

    // 2. Initialize the Radar Chart
    const ctx = document.getElementById('readinessChart').getContext('2d');
    const readinessChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: domainLabels,
            datasets: [{
                label: 'Readiness %',
                data: domainData,
                fill: true,
                backgroundColor: rgbaColor,
                borderColor: primaryColor,
                pointBackgroundColor: primaryColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: primaryColor
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: '#1e293b' },
                    grid: { color: '#1e293b' },
                    pointLabels: { color: '#94a3b8', font: { size: 12 } },
                    suggestMin: 0,
                    suggestMax: 100,
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });

    // 3. Theme Switch Event Listener
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('matrix-mode');
                localStorage.setItem('theme', 'matrix-mode');
            } else {
                document.body.classList.remove('matrix-mode');
                localStorage.setItem('theme', 'cyber-blue');
            }
            // Reload page to re-render chart with new colors
            location.reload();
        });
    }

    // 4. Update Text Stats
    const statsDiv = document.getElementById('stats-output');
    const completionPercent = Math.min(user.progress.length * 10, 100);

    statsDiv.innerHTML = `
        <div class="stat-row">
            <span>Lessons Completed:</span>
            <span class="stat-value">${user.progress.length}</span>
        </div>
        <div class="stat-row">
            <span>Last Exam Score:</span>
            <span class="stat-value">${user.lastExamScore || 0}%</span>
        </div>
        <div class="stat-row">
            <span>Training Progress:</span>
            <span class="stat-value">${completionPercent}%</span>
        </div>
        <div class="progress-container-profile">
            <div class="progress-bar-profile" style="width: ${completionPercent}%"></div>
        </div>
    `;
});

// Export/Import functions
function exportProgress() {

    const data = localStorage.getItem("user");

    if (!data) {
        return alert("No data found to export.");
    }

    const blob = new Blob(
        [data],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "akwire_user.json";
    a.click();

    URL.revokeObjectURL(url);

}