/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 15 — PUBLIC KEY INFRASTRUCTURE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==========================================
       SCENE SETTINGS
    ========================================== */

    const SCENE_DURATION = 126000;

    const timeline =
        document.querySelector("#timelineProgress");

    const startButton =
        document.querySelector("#startSceneBtn");

    const restartButton =
        document.querySelector("#restartSceneBtn");

    let timers = [];

    let sceneStarted = false;


    /* ==========================================
       HELPERS
    ========================================== */

    const $ = selector =>
        document.querySelector(selector);

    const $$ = selector =>
        [...document.querySelectorAll(selector)];


    function schedule(callback, delay) {

        const timer =
            setTimeout(callback, delay);

        timers.push(timer);
    }


    function clearTimers() {

        timers.forEach(timer => {

            clearTimeout(timer);

        });

        timers = [];
    }


    function show(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.add("is-visible");
    }


    function hide(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove(
            "is-visible",
            "is-active"
        );
    }


    function activate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.add("is-active");
    }


    function deactivate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove("is-active");
    }


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#pkiIntro",

        "#pkiComponents",

        "#certificateLifecycle",

        "#certificateTrust",

        "#certificateRevocation",

        "#pkiPractice",

        "#examMemory",

        "#sceneSummary",

        "#finalConcept"

    ];


    function hideContent() {

        contentElements.forEach(selector => {

            hide(selector);

        });

    }


    function showOnly(selector) {

        hideContent();

        show(selector);

    }


    /* ==========================================
       CLEAR ACTIVE STATES
    ========================================== */

    function clearActiveStates() {

        $$(".is-active").forEach(element => {

            element.classList.remove(
                "is-active"
            );

        });

    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline() {

        if (!timeline) return;

        timeline.style.transition = "none";

        timeline.style.width = "0%";

        void timeline.offsetWidth;

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                timeline.style.transition =
                    `width ${SCENE_DURATION}ms linear`;

                timeline.style.width = "100%";

            });

        });

    }


    /* ==========================================
       RESET SCENE
    ========================================== */

    function resetScene() {

        clearTimers();

        hideContent();

        clearActiveStates();

        sceneStarted = false;


        $(".scene-brand")
            ?.classList.remove("is-visible");


        $(".scene-title")
            ?.classList.remove("is-visible");


        $$(".background-glow")
            .forEach(element => {

                element.classList.remove(
                    "is-visible"
                );

            });


        if (timeline) {

            timeline.style.transition = "none";

            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       SCENE INTRO
    ========================================== */

    function beginScene() {

        resetScene();

        sceneStarted = true;

        startTimeline();


        /* ======================================
           BACKGROUND
        ======================================= */

        schedule(() => {

            $$(".background-glow")
                .forEach(element => {

                    element.classList.add(
                        "is-visible"
                    );

                });

        }, 100);


        /* ======================================
           BRAND
        ======================================= */

        schedule(() => {

            $(".scene-brand")
                ?.classList.add("is-visible");

        }, 300);


        /* ======================================
           TITLE
        ======================================= */

        schedule(() => {

            $(".scene-title")
                ?.classList.add("is-visible");

        }, 700);


        /* ======================================
           ACT 01
           PKI INTRODUCTION
        ======================================= */

        schedule(() => {

            showOnly("#pkiIntro");

            activate("#pkiIntro");

        }, 1500);


        /* ======================================
           ACT 02
           PKI COMPONENTS
        ======================================= */

        schedule(() => {

            showOnly("#pkiComponents");


            schedule(
                () =>
                    activate("#certificateAuthority"),
                300
            );


            schedule(
                () =>
                    activate("#registrationAuthority"),
                800
            );


            schedule(
                () =>
                    activate("#digitalCertificate"),
                1300
            );


            schedule(
                () =>
                    activate("#certificateRepository"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           CERTIFICATE LIFECYCLE
        ======================================= */

        schedule(() => {

            showOnly("#certificateLifecycle");


            schedule(
                () =>
                    activate("#certificateRequest"),
                300
            );


            schedule(
                () =>
                    activate(".key-arrow:nth-of-type(1)"),
                900
            );


            schedule(
                () =>
                    activate("#certificateValidate"),
                1400
            );


            schedule(
                () =>
                    activate(".key-arrow:nth-of-type(2)"),
                2000
            );


            schedule(
                () =>
                    activate("#certificateIssue"),
                2500
            );


            schedule(
                () =>
                    activate(".key-arrow:nth-of-type(3)"),
                3100
            );


            schedule(
                () =>
                    activate("#certificateRenew"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           CERTIFICATE TRUST CHAIN
        ======================================= */

        schedule(() => {

            showOnly("#certificateTrust");


            schedule(
                () =>
                    activate("#endEntity"),
                300
            );


            schedule(
                () =>
                    activate(".protection-connector:nth-of-type(1)"),
                1000
            );


            schedule(
                () =>
                    activate("#intermediateCA"),
                1600
            );


            schedule(
                () =>
                    activate(".protection-connector:nth-of-type(2)"),
                2200
            );


            schedule(
                () =>
                    activate("#rootCA"),
                2800
            );


            schedule(
                () =>
                    activate("#trustEstablished"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           CERTIFICATE REVOCATION
        ======================================= */

        schedule(() => {

            showOnly("#certificateRevocation");


            schedule(
                () =>
                    activate("#crlComparison"),
                300
            );


            schedule(
                () =>
                    activate("#ocspComparison"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           PKI IN PRACTICE
        ======================================= */

        schedule(() => {

            showOnly("#pkiPractice");


            schedule(
                () =>
                    activate("#tlsPractice"),
                300
            );


            schedule(
                () =>
                    activate("#emailPractice"),
                800
            );


            schedule(
                () =>
                    activate("#authenticationPractice"),
                1300
            );


            schedule(
                () =>
                    activate("#devicePractice"),
                1800
            );

        }, 66500);


        /* ======================================
           ACT 07
           EXAM MEMORY
        ======================================= */

        schedule(() => {

            showOnly("#examMemory");

        }, 81000);


        /* ======================================
           ACT 08
           SCENE SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");


            $$("#sceneSummary .summary-grid > div")
                .forEach((element, index) => {

                    schedule(
                        () =>
                            element.classList.add(
                                "is-active"
                            ),
                        index * 450
                    );

                });

        }, 95000);


        /* ======================================
           ACT 09
           FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 108000);


        /* ======================================
           SCENE COMPLETE
        ======================================= */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

    }


    /* ==========================================
       CONTROLS
    ========================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                if (sceneStarted) return;

                beginScene();

            }
        );

    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                beginScene();

            }
        );

    }


    /* ==========================================
       INITIAL RESET
    ========================================== */

    resetScene();

});