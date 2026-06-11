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

                "https://akwire-api.onrender.com/api/progress/certificates",

                {
                    headers: {
                        Authorization:
                            "Bearer " + token
                    }
                }

            );

        const certificates =
            await response.json();

        console.log(
            "Certificates:",
            certificates
        );

        container.innerHTML = "";

        if (!certificates.length) {

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

        certificates.forEach(cert => {

            const course =
                cert.courseId;

            const completedDate =

                new Date(
                    cert.completedAt
                ).toLocaleDateString();

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

                    <strong>
                        Completed:
                    </strong>

                    ${completedDate}

                </p>

                <p>

                    <strong>
                        Status:
                    </strong>

                    Certified

                </p>

                <button
                    class="academy-btn"

                    onclick="
                        window.location.href='course-view.html?id=${course._id}'
                    "
                >

                    View Course

                </button>

            `;

            container.appendChild(
                card
            );

        });

    } catch (error) {

        console.error(
            "Certificate Error:",
            error
        );

        container.innerHTML = `

            <div class="academy-card">

                <h3>
                    Failed to load certificates
                </h3>

            </div>

        `;

    }

}

document.addEventListener(

    "DOMContentLoaded",

    loadCertificates

);