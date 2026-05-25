/* ==========================================
   js/terminal.js - Home Page Typing Effect
   ========================================== */
const textElement = document.getElementById('typing-text');
const phrases = [
    "enter_user_name_and_password...",
    "authenticating_user...",
    "initializing_firewall_protocol...",
    "scanning_for_vulnerabilities...",
    "all_systems_cleared...",
    "access_granted. welcome_student."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    // Safety check: if textElement doesn't exist on this page, exit the function
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Only start the typing animation if the element exists
if (textElement) {
    window.addEventListener('load', type);
}

/* ==========================================
   Password Strength Logic
   ========================================== */
const passwordInput = document.getElementById('reg-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Added safety check: Only run if ALL three elements exist
if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let strength = 0;

        if (val.length > 5) strength++;
        if (val.length > 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        switch (strength) {
            case 0:
            case 1:
                strengthBar.style.width = "20%";
                strengthBar.style.background = "#ef4444";
                strengthText.innerText = "Strength: Dangerous";
                break;
            case 2:
                strengthBar.style.width = "40%";
                strengthBar.style.background = "#f97316";
                strengthText.innerText = "Strength: Weak";
                break;
            case 3:
                strengthBar.style.width = "60%";
                strengthBar.style.background = "#eab308";
                strengthText.innerText = "Strength: Medium";
                break;
            case 4:
                strengthBar.style.width = "80%";
                strengthBar.style.background = "#22c55e";
                strengthText.innerText = "Strength: Strong";
                break;
            case 5:
                strengthBar.style.width = "100%";
                strengthBar.style.background = "#10b981";
                strengthText.innerText = "Strength: Elite (Secure)";
                break;
        }
    });
}