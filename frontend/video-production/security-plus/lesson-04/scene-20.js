/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 20 — CRYPTOGRAPHY REVIEW
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

        "#cryptoReviewIntro",

        "#cryptoCoreConcepts",

        "#cryptoSecurityProcess",

        "#cryptoSecurityObjectives",

        "#cryptoWeaknessReview",

        "#cryptoExamChecklist",

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


        const brand =
            $(".scene-brand");

        if (brand) {

            brand.classList.remove(
                "is-visible"
            );

        }


        const title =
            $(".scene-title");

        if (title) {

            title.classList.remove(
                "is-visible"
            );

        }


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
       BEGIN SCENE
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
           LESSON REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#cryptoReviewIntro");

            activate("#cryptoReviewIntro");

        }, 1500);


        /* ======================================
           ACT 02
           CORE CONCEPTS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoCoreConcepts");

            schedule(
                () =>
                    activate("#cryptoAlgorithms"),
                300
            );

            schedule(
                () =>
                    activate("#cryptoKeys"),
                800
            );

            schedule(
                () =>
                    activate("#cryptoTrust"),
                1300
            );

            schedule(
                () =>
                    activate("#cryptoProtocols"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           CRYPTOGRAPHIC PROCESS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoSecurityProcess");

            schedule(
                () =>
                    activate("#identifyObjective"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityProcess .key-arrow:nth-of-type(1)"
                    ),
                900
            );

            schedule(
                () =>
                    activate("#selectControl"),
                1400
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityProcess .key-arrow:nth-of-type(2)"
                    ),
                2000
            );

            schedule(
                () =>
                    activate("#protectInformation"),
                2500
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityProcess .key-arrow:nth-of-type(3)"
                    ),
                3100
            );

            schedule(
                () =>
                    activate("#maintainControl"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           SECURITY OBJECTIVES
        ======================================= */

        schedule(() => {

            showOnly("#cryptoSecurityObjectives");

            schedule(
                () =>
                    activate("#confidentialityObjective"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityObjectives .protection-connector:nth-of-type(1)"
                    ),
                1000
            );

            schedule(
                () =>
                    activate("#integrityObjective"),
                1600
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityObjectives .protection-connector:nth-of-type(2)"
                    ),
                2200
            );

            schedule(
                () =>
                    activate("#authenticityObjective"),
                2800
            );

            schedule(
                () =>
                    activate("#objectiveProtection"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           COMMON WEAKNESSES
        ======================================= */

        schedule(() => {

            showOnly("#cryptoWeaknessReview");

            schedule(
                () =>
                    activate("#cryptoWeaknesses"),
                300
            );

            schedule(
                () =>
                    activate("#cryptoProtection"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           EXAM CHECKLIST
        ======================================= */

        schedule(() => {

            showOnly("#cryptoExamChecklist");

            schedule(
                () =>
                    activate("#examObjective"),
                300
            );

            schedule(
                () =>
                    activate("#examMechanism"),
                800
            );

            schedule(
                () =>
                    activate("#examWeakness"),
                1300
            );

            schedule(
                () =>
                    activate("#examLifecycle"),
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
           LESSON SUMMARY
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