const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user._id) {
    window.location.href = "login.html";
}

const table = document.getElementById("usersTable");

const search = document.getElementById("searchUser");

let users = [];

async function loadUsers() {

    try {

        const res = await fetch(
            "https://akwire-api.onrender.com/api/users",
            {
                    credentials: "include"
            }
        );

        users = await res.json();

        renderUsers(users);

    } catch (error) {

        console.error(error);

    }

}

function renderUsers(data) {

    table.innerHTML = "";

    data.forEach(user => {

        table.innerHTML += `

        <tr>

            <td>${user.username || "-"}</td>

            <td>${user.email}</td>

            <td>

                <select
                    onchange="changeRole('${user._id}', this.value)"
                >

                    <option
                        value="student"
                        ${user.role === "student" ? "selected" : ""}
                    >
                        Student
                    </option>

                    <option
                        value="admin"
                        ${user.role === "admin" ? "selected" : ""}
                    >
                        Admin
                    </option>

                </select>

            </td>

            <td>

                <button
                    class="btn btn-danger"
                    onclick="deleteUser('${user._id}')"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

async function changeRole(id, role) {

    await fetch(

        `https://akwire-api.onrender.com/api/users/${id}/role`,

        {

            method: "PUT",
            credentials: "include",

            headers: {

                "Content-Type":"application/json",

            },

            body: JSON.stringify({

                role

            })

        }

    );

}

async function deleteUser(id) {

    if (!confirm("Delete this user?")) return;

    await fetch(

        `https://akwire-api.onrender.com/api/users/${id}`,

        {

            method:"DELETE",
            credentials: "include",

        }

    );

    loadUsers();

}

search.addEventListener("input", () => {

    const text = search.value.toLowerCase();

    renderUsers(

        users.filter(user =>

            (user.username || "")
                .toLowerCase()
                .includes(text)

            ||

            user.email
                .toLowerCase()
                .includes(text)

        )

    );

});

loadUsers();

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