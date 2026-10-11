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

        const timer = setTimeout(callback, delay);

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

        "#continuityIntro",
        "#continuityDifferences",
        "#continuityWorkflow",
        "#businessImpact",
        "#recoveryObjectives",
        "#continuityCoordination",
        "#examMemory",
        "#sceneSummary",
        "#finalConcept"

    ];

    function hideContent() {

        contentElements.forEach(hide);

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

        const brand = $(".scene-brand");

        if (brand) {

            brand.classList.remove("is-visible");

        }

        const title = $(".scene-title");

        if (title) {

            title.classList.remove("is-visible");

        }

        $$(".background-glow").forEach(element => {

            element.classList.remove("is-visible");

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

        schedule(() => {

            $$(".background-glow").forEach(element => {

                element.classList.add("is-visible");

            });

        }, 100);


        /* ======================================
           BRAND
        ====================================== */

        schedule(() => {

            const brand = $(".scene-brand");

            if (brand) {

                brand.classList.add("is-visible");

            }

        }, 300);


        /* ======================================
           TITLE
        ====================================== */

        schedule(() => {

            const title = $(".scene-title");

            if (title) {

                title.classList.add("is-visible");

            }

        }, 700);


        /* ======================================
           ACT 01 — INTRODUCTION
        ====================================== */

        schedule(() => {

            showOnly("#continuityIntro");

            activate("#continuityIntro");

        }, 1500);


        /* ======================================
           ACT 02 — KEY DIFFERENCES
        ====================================== */

        schedule(() => {

            showOnly("#continuityDifferences");

        }, 10500);


        schedule(() => {

            activate("#businessContinuity");

        }, 10800);


        schedule(() => {

            activate("#disasterRecovery");

        }, 12300);


        schedule(() => {

            activate("#differenceNote");

        }, 13800);


        /* ======================================
           ACT 03 — RESPONSE WORKFLOW
        ====================================== */

        schedule(() => {

            showOnly("#continuityWorkflow");

        }, 22000);


        schedule(() => {

            activate("#responseDisruption");

        }, 22300);


        schedule(() => {

            activate($$(".workflow-arrow")[0]);

        }, 22800);


        schedule(() => {

            activate("#responseContinuity");

        }, 23200);


        schedule(() => {

            activate($$(".workflow-arrow")[1]);

        }, 23800);


        schedule(() => {

            activate("#responseRecovery");

        }, 24200);


        schedule(() => {

            activate($$(".workflow-arrow")[2]);

        }, 24800);


        schedule(() => {

            activate("#responseReturn");

        }, 25300);


        /* ======================================
           ACT 04 — BUSINESS IMPACT ANALYSIS
        ====================================== */

        schedule(() => {

            showOnly("#businessImpact");

        }, 36500);


        schedule(() => {

            activate("#impactIdentify");

        }, 36800);


        schedule(() => {

            activate("#impactAssess");

        }, 38300);


        schedule(() => {

            activate("#impactPrioritize");

        }, 39800);


        schedule(() => {

            activate("#impactResources");

        }, 41300);


        schedule(() => {

            activate("#impactNote");

        }, 42800);


        /* ======================================
           ACT 05 — RECOVERY OBJECTIVES
        ====================================== */

        schedule(() => {

            showOnly("#recoveryObjectives");

        }, 51500);


        schedule(() => {

            activate("#objectiveRto");

        }, 51800);


        schedule(() => {

            activate("#objectiveRpo");

        }, 53800);


        schedule(() => {

            activate("#objectiveReminder");

        }, 55800);


        /* ======================================
           ACT 06 — COORDINATION
        ====================================== */

        schedule(() => {

            showOnly("#continuityCoordination");

        }, 66500);


        schedule(() => {

            activate("#coordinateRoles");

        }, 66800);


        schedule(() => {

            activate("#coordinateResources");

        }, 68300);


        schedule(() => {

            activate("#coordinateCommunication");

        }, 69800);


        schedule(() => {

            activate("#coordinateTesting");

        }, 71300);


        schedule(() => {

            activate("#coordinationWarning");

        }, 72800);


        /* ======================================
           ACT 07 — EXAM MEMORY
        ====================================== */

        schedule(() => {

            showOnly("#examMemory");

            activate("#examMemory");

        }, 81000);


        /* ======================================
           ACT 08 — SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#sceneSummary");

            const summaryItems =
                $$(".summary-grid > div");

            summaryItems.forEach((item, index) => {

                schedule(() => {

                    item.classList.add("is-active");

                }, index * 450);

            });

        }, 95000);


        /* ======================================
           ACT 09 — FINAL CONCEPT
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

            activate("#finalConcept");

        }, 108000);


        /* ======================================
           SCENE COMPLETE
        ====================================== */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

    }


    /* ==========================================
       START BUTTON
    ========================================== */

    if (startButton) {

        startButton.addEventListener("click", () => {

            if (sceneStarted) return;

            beginScene();

        });

    }


    /* ==========================================
       RESTART BUTTON
    ========================================== */

    if (restartButton) {

        restartButton.addEventListener("click", () => {

            beginScene();

        });

    }


    /* ==========================================
       INITIAL STATE
    ========================================== */

    resetScene();

});