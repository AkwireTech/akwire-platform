// 1. Registration Logic
function registerUser(e) {
    e.preventDefault(); // Stop the page from refreshing

    const username = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;

    // Check if the user already exists
    if (localStorage.getItem('user_' + email)) {
        alert("An account with this email already exists. Please login.");
        window.location.href = 'login.html';
        return;
    }

    // Create the User Object (Our "Database" entry)
    const newUser = {
        username: username,
        email: email,
        password: password, // Note: In a real app, this would be hashed/encrypted
        progress: [],
        lastExamScore: 0
    };

    // Save to LocalStorage
    localStorage.setItem('user_' + email, JSON.stringify(newUser));
    
    alert("Account created successfully! Redirecting to login...");
    window.location.href = 'login.html';
}

// 2. Login Logic
function loginUser(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve user from LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('user_' + email));

    if (storedUser && storedUser.password === password) {
        // Set the "Session" (tells the site who is currently logged in)
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        window.location.href = 'dashboard.html';
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

// 3. Logout Logic
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// 4. Session Check (Runs on every page to show "Welcome User")
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authNav = document.getElementById('auth-link'); // Make sure your nav has this ID

    if (currentUser && authNav) {
        authNav.innerHTML = `<span>Hi, ${currentUser.username}</span> | <a href="#" onclick="logout()">Logout</a>`;
    }
});

const recoveryForm = document.getElementById('recovery-form');
const recoveryMessage = document.getElementById('recovery-message');

if (recoveryForm) {
    recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the page from refreshing
        
        // Hide the form and show the success message
        recoveryForm.style.display = 'none';
        recoveryMessage.style.display = 'block';
        
        console.log("Recovery protocol initiated for: " + document.getElementById('recovery-email').value);
    });
}