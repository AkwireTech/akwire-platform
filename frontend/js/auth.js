console.log("AUTH JS LOADED");

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

                const res = await fetch(
                    "http://localhost:5000/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const data = await res.json();

                if (!res.ok) {

                    alert(data.message || "Login failed");

                    return;

                }

                // Save token
                localStorage.setItem("token", data.token);

                // Save user
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        _id: data._id,
                        email: data.email
                    })
                );

                alert("Login successful");

                window.location.href = "dashboard.html";

            } catch (err) {

                console.error("Login error:", err);

                alert("Server error");

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

                const res = await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({ 
                                username: `${firstName}${lastName}`.toLowerCase(),
                                name: `${firstName} ${lastName}`,
                                email,
                                password
                        
                        })
                    }
                );

                const data = await res.json();

                console.log("REGISTER RESPONSE:", data);

                if (!res.ok) {

                    alert(data.message || "Registration failed");

                    return;

                }

                // Save token
                localStorage.setItem("token", data.token);

                // Save user
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        _id: data._id,
                        email: data.email
                    })
                );

                alert("Registration successful");

                // Auto login
                window.location.href = "dashboard.html";

            } catch (err) {

                console.error("Register error:", err);

                alert("Server error");

            }

        });

    }

});