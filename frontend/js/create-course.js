document.addEventListener("DOMContentLoaded", () => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const token =
        localStorage.getItem("token");

    // ==========================
    // ADMIN PROTECTION
    // ==========================

    /*if (
        !user ||
        user.role !== "admin"
    ) {

        alert("Access denied");

        window.location.href =
            "dashboard.html";

        return;

    }*/

    // ==========================
    // CREATE COURSE
    // ==========================

    document.getElementById(
        "courseForm"
    ).addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const status =
                document.getElementById(
                    "statusMessage"
                );

            try {

                const response =
                    await fetch(

                    "https://akwire-api.onrender.com/api/courses",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                "Bearer " + token

                        },

                        body: JSON.stringify({

                            title:
                                document.getElementById(
                                    "title"
                                ).value,

                            description:
                                document.getElementById(
                                    "description"
                                ).value,

                            domain:
                                document.getElementById(
                                    "domain"
                                ).value,

                            thumbnail:
                                document.getElementById(
                                    "thumbnail"
                                ).value,


            modules: [

                {

                    title:
                        document.getElementById(
                            "moduleTitle"
                        ).value,

                    lessons: [

                        {

                            title:
                                document.getElementById(
                                    "lessonTitle"
                                ).value,

                            content:
                                document.getElementById(
                                    "lessonContent"
                                ).value,

                            videoUrl:
                                document.getElementById(
                                    "videoUrl"
                                ).value,

                            resources: []

                        }

                    ]

                }

            ]


                        })

                    });

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message
                    );

                }

                status.innerHTML =
                    "✅ Course created successfully";

                status.style.color =
                    "#22c55e";

                document.getElementById(
                    "courseForm"
                ).reset();

            } catch (error) {

                console.error(error);

                status.innerHTML =
                    "❌ Failed to create course";

                status.style.color =
                    "#ef4444";

            }

        });

});