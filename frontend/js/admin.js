const user =
    JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {

    alert("Access denied");

    window.location.href = "dashboard.html";

}