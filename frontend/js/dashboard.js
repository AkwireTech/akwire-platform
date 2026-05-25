document.addEventListener('DOMContentLoaded', () => {

    loadExamHistory();

    // ==========================
    // 1. THEME INITIALIZATION
    // ==========================

    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'matrix-mode') {
        document.body.classList.add('matrix-mode');
        setTimeout(startMatrixRain, 50);
    }


    // ==========================
    // 2. USER DATA
    // ==========================

    const user = JSON.parse(localStorage.getItem('currentUser')) || { lastExamScore: 0 };

    const scoreText = document.getElementById("dash-score");
    const scoreBar = document.getElementById("dash-score-bar");
    const statusText = document.getElementById("status-text");

    if (scoreText && scoreBar && statusText) {

        const score = user.lastExamScore || 0;

        scoreText.innerText = score + "%";
        scoreBar.style.width = score + "%";


        // ==========================
        // 3. STATUS LOGIC
        // ==========================

        if (score >= 85) {

            statusText.innerText = "MISSION_READY";
            statusText.style.color = "#10b981";

        }
        else if (score >= 70) {

            statusText.innerText = "OPERATIONAL";
            statusText.style.color = "#38bdf8";

        }
        else if (score > 0) {

            statusText.innerText = "REMEDIATION_REQUIRED";
            statusText.style.color = "#f59e0b";

        }
        else {

            statusText.innerText = "AWAITING_DEPLOYMENT";
            statusText.style.color = "#94a3b8";

        }

    }


    // ==========================
    // 4. THREAT INTEL FEED
    // ==========================

    const intelCard = document.querySelector('.intel-card');

    if (intelCard) {

        const vuls = [
            "Critical: Zero-day found in VPN concentrator.",
            "Alert: Buffer Overflow detected in DNS resolver.",
            "Notice: New SQL Injection string identified in logs.",
            "System: Security database synchronization complete."
        ];

        const randomVul = vuls[Math.floor(Math.random() * vuls.length)];

        const newEntry = document.createElement('div');

        newEntry.className = 'intel-entry';

        newEntry.innerHTML = `
            <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
            <span class="label warning">INTEL_UPDT:</span> 
            <span class="intel-text">${randomVul}</span>
        `;

        intelCard.prepend(newEntry);

    }

});


// ==========================
// MATRIX BACKGROUND ENGINE
// ==========================

function startMatrixRain() {

    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

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

            const text = binary.charAt(Math.floor(Math.random() * binary.length));

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;

        }

    }

    window.addEventListener('resize', () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    });

    setInterval(draw, 33);

}


// ===============================
// EXAM PROGRESS GRAPH + READINESS
// ===============================

async function loadExamHistory(){

try{

const token = localStorage.getItem("token");

const res = await fetch("https://akwire-api.onrender.com/api/exam/history",{
headers:{
"Authorization":"Bearer "+token
}
});

const data = await res.json();

const attempts = data.attempts || data.examAttempts || [];

if(!attempts.length) return;

const scores = attempts.map(a=>a.score);

const labels = attempts.map((a,i)=>`Attempt ${i+1}`);

const ctx = document.getElementById("progressChart");

if(!ctx) return;

new Chart(ctx,{
type:"line",
data:{
labels:labels,
datasets:[{
label:"Exam Score",
data:scores,
borderColor:"#38bdf8",
backgroundColor:"rgba(56,189,248,0.2)",
fill:true,
tension:0.3
}]
},
options:{
scales:{
y:{
beginAtZero:true,
max:100
}
}
}
});


// ===============================
// CERTIFICATION READINESS
// ===============================

const readiness = Math.round(
scores.reduce((a,b)=>a+b,0)/scores.length
);

const readinessText = document.getElementById("readiness-score");
const readinessBar = document.getElementById("readiness-bar");

if(readinessText && readinessBar){

readinessText.innerText = readiness + "%";
readinessBar.style.width = readiness + "%";

}

}catch(err){

console.error("Dashboard history error:",err);


}

}


//=========================
// Dashbord code
//=========================

async function loadDashboard(userId) {
    try {
        const res = await fetch(`https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${userId}`);
        const data = await res.json();

        console.log("Dashboard data:", data);

        // 🔥 STATS
        document.getElementById('totalLabs').textContent = data.totalLabs;
        document.getElementById('avgScore').textContent = data.avgScore.toFixed(1);
        document.getElementById('completedLabs').textContent = data.completedLabs;
        document.getElementById('progress').textContent = Math.round(data.progress) + "%";

        // 🔥 PROGRESS BAR
        const progressPercent = Math.round(data.progress || 0);

        document.getElementById("overallProgressBar").style.width = progressPercent + "%";
        document.getElementById("progressText").textContent =
            `${progressPercent}% (${data.completedLabs}/${data.totalLabs} Labs)`;

        // 🔥 LOAD LAB CARDS
        loadLabProgress(userId);

        // 🔥 FIX: ADD RECOMMENDATIONS HERE
        generateInsights(data);

    } catch (err) {
        console.error("Dashboard error:", err);
    }
}

function renderCharts(results) {
    const dates = results.map(r => new Date(r.createdAt).toLocaleDateString());
    const scores = results.map(r => r.score);

    new Chart(document.getElementById('scoreChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Score Over Time',
                data: scores
            }]
        }
    });

    renderBarChart(results);
}


function renderBarChart(results) {
    const labIds = results.map(r => r.labId);
    const scores = results.map(r => r.score);

    new Chart(document.getElementById('labChart'), {
        type: 'bar',
        data: {
            labels: labIds,
            datasets: [{
                label: 'Score per Lab',
                data: scores
            }]
        }
    });
}

function generateInsights(data) {

    const container = document.getElementById("recommendationsContainer");

    if (!container) {
        console.error("recommendationsContainer not found");
        return;
    }

    container.innerHTML = "";

    const exam = data.latestExam;

    // No exam yet
    if (!exam || !exam.domainScores) {

        container.innerHTML = `
            <div class="recommendation-card">
                <h4>No Recommendations Yet</h4>
                <p>Complete an exam to receive adaptive training recommendations.</p>
            </div>
        `;

        return;
    }

    const weakDomains = [];

    // Find weak domains
    for (const domain in exam.domainScores) {

        if (exam.domainScores[domain] < 70) {
            weakDomains.push(domain);
        }

    }

    // Excellent performance
    if (weakDomains.length === 0) {

        container.innerHTML = `
            <div class="recommendation-card">
                <h4>Excellent Performance</h4>
                <p>You are performing well across all assessed domains.</p>
            </div>
        `;

        return;
    }

    // Render recommendations
    weakDomains.forEach(domain => {

        const card = document.createElement("div");

        card.className = "recommendation-card";

        card.innerHTML = `
            <h4>${domain}</h4>
            <p>Additional practice recommended for this domain.</p>
        `;

        container.appendChild(card);

    });

}


    // 📈 Trend (last vs first)
    const trend = scores[scores.length - 1] - scores[0];
    let trendText = trend > 5 ? "Improving 📈" :
                    trend < -5 ? "Declining 📉" :
                    "Stable ➖";

    // 📊 Consistency (standard deviation)
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    let consistency = stdDev < 10 ? "Very Consistent" :
                      stdDev < 20 ? "Moderate" :
                      "Inconsistent";

    // 🤖 Recommendation (simple AI logic)
    let recommendation = "";

    if (weak.length > 0) {
        recommendation = `Focus on improving: ${weak[0]}`;
    } else if (trend < 0) {
        recommendation = "Review previous labs to stabilize performance";
    } else {
        recommendation = "Try a more advanced lab 🚀";
    }

    document.getElementById('insights').innerHTML = `
    <h3>AI Insights</h3>
    <div class="recommendation-card">
        <h4>Strong Areas</h4>
        <p>${strong.join(', ') || 'None'}</p>
    </div>

    <div class="recommendation-card">
        <h4>Needs Improvement</h4>
        <p>${weak.join(', ') || 'None'}</p>
    </div>

    <div class="recommendation-card">
        <h4>Trend</h4>
        <p>${trendText}</p>
    </div>

    <div class="recommendation-card">
        <h4>Consistency</h4>
        <p>${consistency}</p>
    </div>

    <div class="recommendation-card">
        <h4>Next Recommendation</h4>
        <p>${recommendation}</p>
    </div>
`;


async function loadLabProgress(userId) {
    try {
        const labsRes = await fetch("https://akwire-api.onrender.com/api/labs", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const labs = await labsRes.json();

        const resultsRes = await fetch(`https://akwire-api.onrender.com/api/dashboard/lab-dashboard/${userId}`);
        const data = await resultsRes.json();

        const completedLabIds = [
            ...new Set(
                data.results
                    .filter(r => r.score >= 70) // ✅ ONLY completed labs
                    .map(r => r.labId)
            )
        ];

        renderLabProgress(labs, data);

    } catch (err) {
        console.error("Lab progress error:", err);
    }
}


function renderLabProgress(labs, data) {

    const container = document.getElementById("labProgressContainer");
container.innerHTML = "";

labs.sort((a, b) => a.order - b.order);

let sequentialCompletedCount = 0;

labs.forEach((lab, index) => {

    const card = document.createElement("div");
    card.classList.add("lab-card");

    let status = "";
    let statusClass = "";

    // 🔥 Get BEST score for this lab
    const labResults = (data.results || []).filter(r => r.labId === lab.labId);
    const bestScore = labResults.length > 0
        ? Math.max(...labResults.map(r => r.score))
        : 0;

    // 🔥 Sequential logic
    if (bestScore >= 70 && index === sequentialCompletedCount) {
        status = "Completed";
        statusClass = "status-complete";
        sequentialCompletedCount++;

    } else if (index === sequentialCompletedCount) {
        status = "Available";
        statusClass = "status-available";

    } else {
        status = "Locked";
        statusClass = "status-locked";
        card.classList.add("locked");
    }

    card.innerHTML = `
        <span>${lab.title}</span>
        <span class="lab-status ${statusClass}">${status}</span>
    `;

    container.appendChild(card);

    // 🔥 Only clickable if available
    if (status === "Available") {
        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            window.location.href = `labs.html?labId=${lab.labId}`;
        });
    }
});
}


// ==========================
// MOBILE SIDEBAR
// ==========================

function toggleSidebar() {

    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-toggle');

    if (sidebar) sidebar.classList.toggle('active');
    if (menuBtn) menuBtn.classList.toggle('open');

}

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
        console.error("User not found in localStorage");

        // 🔥 TEMP fallback (use your real MongoDB userId)
        loadDashboard("PASTE_YOUR_USER_ID_HERE");
        return;
    }

    loadDashboard(user._id);
    loadLabProgress(user._id);
});