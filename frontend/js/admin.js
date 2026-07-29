const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {

    alert("Access denied");

    window.location.href = "dashboard.html";

}

async function logout() {

    try {

        await fetch(
            "https://akwire-api.onrender.com/api/auth/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

    } catch (error) {

        console.error("Logout failed:", error);

    }

    localStorage.removeItem("user");

    window.location.href = "login.html";

}