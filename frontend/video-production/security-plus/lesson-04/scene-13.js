 /* ==========================================
    AKWIRE SECURITY+ VIDEO PRODUCTION
    SCENE 13 — CRYPTOGRAPHIC FUNDAMENTALS
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
       DOM HELPERS
    ========================================== */

    const $ = selector =>
        document.querySelector(selector);

    const $$ = selector =>
        [...document.querySelectorAll(selector)];


    /* ==========================================
       TIMER HELPERS
    ========================================== */

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


    /* ==========================================
       VISIBILITY HELPERS
    ========================================== */

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

        "#cryptoIntro",
        "#cryptoGoals",
        "#encryptionModel",
        "#cryptoTypes",
        "#hashingConcept",
        "#cryptoScenario",
        "#examMemory",
        "#sceneSummary",
        "#finalConcept"

    ];


    /* ==========================================
       CONTENT CONTROL
    ========================================== */

    function hideContent() {

        contentElements.forEach(hide);
    }


    function showOnly(selector) {

        hideContent();

        show(selector);
    }


    function clearActiveStates() {

        $$(".is-active").forEach(element => {
            deactivate(`#${element.id}`);
        });

        $$(".scenario-arrow").forEach(element => {
            element.classList.remove("is-active");
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
            brand.classList.remove("is-visible");
        }


        const heading =
            $(".scene-heading");

        if (heading) {
            heading.classList.remove("is-visible");
        }


        const title =
            $(".scene-title");

        if (title) {
            title.classList.remove("is-visible");
        }


        $$(".background-glow").forEach(element => {

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
        ====================================== */

        schedule(
            () => {

                $$(".background-glow").forEach(element => {

                    element.classList.add(
                        "is-visible"
                    );

                });

            },
            100
        );


        /* ======================================
           BRAND
        ====================================== */

        schedule(
            () => show(".scene-brand"),
            300
        );


        /* ======================================
           TITLE
        ====================================== */

        schedule(
            () => {

                show(".scene-title");

            },
            700
        );


        /* ======================================
           ACT 01 — INTRO
        ====================================== */

        schedule(
            () => {

                showOnly("#cryptoIntro");

                activate("#cryptoIntro");

            },
            1500
        );


        /* ======================================
           ACT 02 — SECURITY GOALS
        ====================================== */

        schedule(
            () => {

                showOnly("#cryptoGoals");


                schedule(
                    () => activate("#confidentialityGoal"),
                    300
                );


                schedule(
                    () => activate("#integrityGoal"),
                    800
                );


                schedule(
                    () => activate("#authenticityGoal"),
                    1300
                );


                schedule(
                    () => activate("#nonrepudiationGoal"),
                    1800
                );

            },
            10500
        );


        /* ======================================
           ACT 03 — ENCRYPTION
        ====================================== */

        schedule(
            () => {

                showOnly("#encryptionModel");


                schedule(
                    () => activate("#plaintextNode"),
                    300
                );


                schedule(
                    () => activate("#ciphertextNode"),
                    1400
                );


                schedule(
                    () => activate("#recoveredNode"),
                    2500
                );

            },
            22000
        );


        /* ======================================
           ACT 04 — CRYPTOGRAPHIC TYPES
        ====================================== */

        schedule(
            () => {

                showOnly("#cryptoTypes");


                schedule(
                    () => activate("#symmetricType"),
                    300
                );


                schedule(
                    () => activate("#asymmetricType"),
                    1800
                );

            },
            36500
        );


        /* ======================================
           ACT 05 — HASHING
        ====================================== */

        schedule(
            () => {

                showOnly("#hashingConcept");


                schedule(
                    () => activate("#hashInput"),
                    300
                );


                schedule(
                    () => activate("#hashOutput"),
                    1500
                );


                schedule(
                    () => activate("#hashIntegrity"),
                    2700
                );

            },
            51500
        );


        /* ======================================
           ACT 06 — SCENARIO
        ====================================== */

        schedule(
            () => {

                showOnly("#cryptoScenario");


                schedule(
                    () => activate("#scenarioData"),
                    300
                );


                schedule(
                    () => activate(".scenario-arrow"),
                    1100
                );


                schedule(
                    () => activate("#scenarioControl"),
                    1800
                );

            },
            66500
        );


        /* ======================================
           ACT 07 — EXAM MEMORY
        ====================================== */

        schedule(
            () => showOnly("#examMemory"),
            81000
        );


        /* ======================================
           ACT 08 — SUMMARY
        ====================================== */

        schedule(
            () => {

                showOnly("#sceneSummary");


                const summaryItems =
                    $$("#sceneSummary .summary-grid > div");


                summaryItems.forEach(
                    (element, index) => {

                        schedule(
                            () => {

                                element.classList.add(
                                    "is-active"
                                );

                            },
                            index * 450
                        );

                    }
                );

            },
            95000
        );


        /* ======================================
           ACT 09 — FINAL CONCEPT
        ====================================== */

        schedule(
            () => showOnly("#finalConcept"),
            108000
        );


        /* ======================================
           SCENE COMPLETE
        ====================================== */

        schedule(
            () => {
                sceneStarted = false;
            },
            124000
        );

    }


    /* ==========================================
       BUTTON EVENTS
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