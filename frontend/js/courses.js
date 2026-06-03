/* ==========================================
   js/courses.js - Bulletproof Version
   ========================================== */

const domains = [
    { id: 1, title: "Domain 1: General Security Concepts", category: "Architecture", lessons: ["CIA Triad", "Security Controls", "Auth vs Auth"] },
    { id: 2, title: "Domain 2: Threats, Vulnerabilities, and Mitigations", category: "Threats", lessons: ["Malware", "Social Engineering", "Vulnerability Mgmt"] },
    { id: 3, title: "Domain 3: Security Architecture", category: "Architecture", lessons: ["Cloud Models", "Zero Trust", "Cryptography"] },
    { id: 4, title: "Domain 4: Security Operations", category: "Operations", lessons: ["Incident Response", "Forensics", "Logging"] },
    { id: 5, title: "Domain 5: Security Program Management", category: "Management", lessons: ["Risk Assessment", "Privacy/GDPR", "Auditing"] }
];

function renderCourses() {
    console.log("Starting to render courses...");
    const courseList = document.getElementById('course-list');
    
    if (!courseList) {
        console.error("ERROR: Could not find an element with id='course-list' in your HTML!");
        return;
    }

    courseList.innerHTML = ''; // Clear existing content

    domains.forEach(domain => {
        const card = document.createElement('div');
        card.className = 'module-card';
        card.setAttribute('data-category', domain.category);
        
        card.innerHTML = `
            <div class="module-header" onclick="toggleModule(${domain.id})" style="cursor:pointer; display:flex; justify-content:space-between; padding:20px; background:white; border-bottom:1px solid #eee;">
                <h3 style="margin:0; font-size:1.1rem; color:#1e293b;">${domain.title}</h3>
                <span id="icon-${domain.id}" style="font-weight:bold;">+</span>
            </div>
            <div class="module-content" id="module-${domain.id}" style="display:none; padding:20px; background:#f8fafc; border-top:1px solid #eee;">
                <ul style="list-style:none; padding:0; margin:0;">
                    ${domain.lessons.map(lesson => `
                        <li style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e2e8f0;">
                            <span style="font-size:0.95rem; color:#475569;">${lesson}</span>
                            <button class="btn-sm" onclick="event.stopPropagation(); markLessonDone('${lesson}')" style="background:#10b981; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:0.8rem;">Mark Done</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        courseList.appendChild(card);
    });
    console.log("Courses rendered successfully!");
}

function toggleModule(id) {
    const content = document.getElementById(`module-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    if (content.style.display === "none") {
        content.style.display = "block";
        icon.innerText = "−";
    } else {
        content.style.display = "none";
        icon.innerText = "+";
    }
}

function updateProgressBar() {
    const totalLessons = 15; 
    const completed = JSON.parse(localStorage.getItem('completedLessons')) || [];
    const percentage = Math.round((completed.length / totalLessons) * 100);
    
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    if (fill && text) {
        fill.style.width = percentage + "%";
        text.innerText = percentage + "%";
    }
}

function markLessonDone(lesson) {
    let completed = JSON.parse(localStorage.getItem('completedLessons')) || [];
    if (!completed.includes(lesson)) {
        completed.push(lesson);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
        updateProgressBar();
    }
}

// Search Logic
function setupSearch() {
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.module-card').forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(term) ? "block" : "none";
            });
        });
    }
}

// Launch
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    setupSearch();
    updateProgressBar();
});