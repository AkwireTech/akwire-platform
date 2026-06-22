/* ==========================================
   CERTIFICATE VIEW
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const user =

            JSON.parse(

                localStorage.getItem(
                    "user"
                )

            );

        if (user) {

            document.getElementById(
                "studentName"
            ).textContent =

                user.name ||
                user.fullName ||
                "Student";

        }

        document.getElementById(
            "completionDate"
        ).textContent =

            new Date()
                .toLocaleDateString();

        document.getElementById(
            "certificateId"
        ).textContent =

            "AKW-" +

            Math.random()
                .toString(36)
                .substring(2, 10)
                .toUpperCase();

    }

);