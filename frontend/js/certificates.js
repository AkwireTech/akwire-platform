/* ==========================================
   MY CERTIFICATES
========================================== */

async function loadCertificates() {

    const container =
        document.getElementById(
            "certificateContainer"
        );

    const token =
        localStorage.getItem(
            "token"
        );

    try {

        const response =
            await fetch(

                "https://akwire-api.onrender.com/api/progress",

                {
                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }

            );

        const courses =
            await response.json();

        container.innerHTML = "";

        if (!courses.length) {

            container.innerHTML = `

                <div class="academy-card">

                    <h3>
                        No Certificates Yet
                    </h3>

                    <p>
                        Complete a course
                        to unlock certificates.
                    </p>

                </div>

            `;

            return;

        }

        courses.forEach(course => {

            const card =
                document.createElement(
                    "div"
                );

            card.classList.add(
                "academy-card"
            );


        card.innerHTML = `

            <h3>
                🏆 ${course.title}
            </h3>

            <p>

                Successfully completed
                through Akwire Academy

            </p>

            <p>

                Status:
                <strong>
                    Certified
                </strong>

            </p>

            <div
                style="
                    display:flex;
                    gap:10px;
                    margin-top:15px;
                "
            >

                <button
                    class="academy-btn"

                    onclick="
                        window.location.href='course-view.html?id=${course._id}'
                    "
                >

                    View Course

                </button>

            </div>

        `;

            container.appendChild(
                card
            );

        });

    } catch (error) {

        console.error(
            error
        );

    }

}

document.addEventListener(

    "DOMContentLoaded",

    loadCertificates

);