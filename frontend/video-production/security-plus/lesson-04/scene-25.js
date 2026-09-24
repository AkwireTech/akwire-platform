/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 25 — CRYPTOGRAPHY LESSON CONCLUSION
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


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#cryptoConclusionIntro",

        "#cryptoConclusionConcepts",

        "#cryptoConclusionModel",

        "#cryptoConclusionObjectives",

        "#cryptoConclusionImplementation",

        "#cryptoConclusionTakeaways",

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

        sceneStarted = false;

        hideContent();

        clearActiveStates();


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
           INTRO
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionIntro");

            activate("#cryptoConclusionIntro");

        }, 1500);


        /* ======================================
           ACT 02
           CORE CONCEPTS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionConcepts");

            schedule(
                () =>
                    activate("#conclusionAlgorithms"),
                300
            );

            schedule(
                () =>
                    activate("#conclusionKeys"),
                800
            );

            schedule(
                () =>
                    activate("#conclusionPKI"),
                1300
            );

            schedule(
                () =>
                    activate("#conclusionProtocols"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           SECURITY MODEL
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionModel");

            schedule(
                () =>
                    activate("#conclusionObjective"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#cryptoConclusionModel .key-arrow:nth-of-type(1)"
                    ),
                900
            );

            schedule(
                () =>
                    activate("#conclusionControl"),
                1400
            );

            schedule(
                () =>
                    activate(
                        "#cryptoConclusionModel .key-arrow:nth-of-type(2)"
                    ),
                2000
            );

            schedule(
                () =>
                    activate("#conclusionTrust"),
                2500
            );

            schedule(
                () =>
                    activate(
                        "#cryptoConclusionModel .key-arrow:nth-of-type(3)"
                    ),
                3100
            );

            schedule(
                () =>
                    activate("#conclusionLifecycle"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           SECURITY OBJECTIVES
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionObjectives");

            schedule(
                () =>
                    activate("#conclusionConfidentiality"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#cryptoConclusionObjectives .protection-connector:nth-of-type(1)"
                    ),
                1000
            );

            schedule(
                () =>
                    activate("#conclusionIntegrity"),
                1600
            );

            schedule(
                () =>
                    activate(
                        "#cryptoConclusionObjectives .protection-connector:nth-of-type(2)"
                    ),
                2200
            );

            schedule(
                () =>
                    activate("#conclusionAuthenticity"),
                2800
            );

            schedule(
                () =>
                    activate("#conclusionReminder"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           SECURE IMPLEMENTATION
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionImplementation");

            schedule(
                () =>
                    activate("#conclusionRisk"),
                300
            );

            schedule(
                () =>
                    activate("#conclusionProtection"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           FINAL TAKEAWAYS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConclusionTakeaways");

            schedule(
                () =>
                    activate("#conclusionTakeawayOne"),
                300
            );

            schedule(
                () =>
                    activate("#conclusionTakeawayTwo"),
                800
            );

            schedule(
                () =>
                    activate("#conclusionTakeawayThree"),
                1300
            );

            schedule(
                () =>
                    activate("#conclusionTakeawayFour"),
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
           LESSON COMPLETE
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