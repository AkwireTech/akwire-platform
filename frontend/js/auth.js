console.log("AUTH JS LOADED");

const API_BASE = "https://akwire-api.onrender.com/api/auth";

// =====================================
// LOGIN
// =====================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            loginForm.querySelector('input[type="email"]').value.trim();

        const password =
            loginForm.querySelector('input[type="password"]').value.trim();

        try {

            const response = await fetch(`${API_BASE}/login`, {

                method: "POST",

                credentials: "include",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message || "Login failed");

                return;

            }

            // Store user ONLY

            localStorage.setItem(

                "user",

                JSON.stringify(data.user)

            );

            window.location.href = "dashboard.html";

        }

        catch (err) {

            console.error(err);

            alert("Unable to connect to server.");

        }

    });

}

// =====================================
// REGISTER
// =====================================

const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const firstName = inputs[0].value.trim();

        const lastName = inputs[1].value.trim();

        const email = inputs[2].value.trim();

        const password = inputs[3].value.trim();

        const confirmPassword = inputs[4].value.trim();

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        try {

            const response = await fetch(`${API_BASE}/register`, {

                method: "POST",

                credentials: "include",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username: `${firstName}${lastName}`
                        .replace(/\s+/g, "")
                        .toLowerCase(),

                    email,

                    password

                })

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message || "Registration failed");

                return;

            }

            localStorage.setItem(

                "user",

                JSON.stringify(data.user)

            );

            window.location.href = "dashboard.html";

        }

        catch (err) {

            console.error(err);

            alert("Unable to connect to server.");

        }

    });

}

// =====================================
// LOGOUT
// =====================================

async function logout() {

    try {

        await fetch(`${API_BASE}/logout`, {

            method: "POST",

            credentials: "include"

        });

    }

    catch (err) {

        console.error(err);

    }

    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// Make logout available globally

window.logout = logout;

// =====================================
// AUTH CHECK
// =====================================

function getCurrentUser() {

    const user = localStorage.getItem("user");

    if (!user) {

        return null;

    }

    return JSON.parse(user);

}

window.getCurrentUser = getCurrentUser;