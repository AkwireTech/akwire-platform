const user =
    JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {

    alert("Access denied");

    window.location.href = "dashboard.html";

}

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}