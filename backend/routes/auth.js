console.log("AUTH JS LOADED");

const API_URL = "https://akwire-api.onrender.com/api/auth";

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // LOGIN
    // =========================

    const loginForm = document.getElementById("login-form");

    if (loginForm) {

        loginForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const email = loginForm
                .querySelector('input[type="email"]')
                .value
                .trim();

            const password = loginForm
                .querySelector('input[type="password"]')
                .value
                .trim();

            try {

                const res = await fetch(`${API_URL}/login`, {

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

                const data = await res.json();

                if (!res.ok) {

                    alert(data.message || "Login failed");
                    return;

                }

                // Save user only (NOT TOKEN)

                localStorage.setItem(

                    "user",

                    JSON.stringify({

                        _id: data.user._id,
                        username: data.user.username,
                        email: data.user.email,
                        role: data.user.role

                    })

                );

                console.log("Login successful");

                window.location.href = "dashboard.html";

            }

            catch (err) {

                console.error(err);

                alert("Unable to connect to server.");

            }

        });

    }

    // =========================
    // REGISTER
    // =========================

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

                const res = await fetch(`${API_URL}/register`, {

                    method: "POST",

                    credentials: "include",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        username:
                            `${firstName}${lastName}`
                                .replace(/\s+/g, "")
                                .toLowerCase(),

                        email,
                        password

                    })

                });

                const data = await res.json();

                if (!res.ok) {

                    alert(data.message || "Registration failed");

                    return;

                }

                localStorage.setItem(

                    "user",

                    JSON.stringify({

                        _id: data.user._id,
                        username: data.user.username,
                        email: data.user.email,
                        role: data.user.role

                    })

                );

                console.log("Registration successful");

                window.location.href = "dashboard.html";

            }

            catch (err) {

                console.error(err);

                alert("Server error");

            }

        });

    }

});

// =========================
// LOGOUT
// =========================

export async function logout() {

    try {

        await fetch(`${API_URL}/logout`, {

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