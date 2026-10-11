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

        "#testingIntro",

        "#testingMethods",

        "#testingWorkflow",

        "#recoveryValidation",

        "#testingMetrics",

        "#recoveryGaps",

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


        const brand =
            $(".scene-brand");

        if (brand) {

            brand.classList.remove("is-visible");

        }


        const title =
            $(".scene-title");

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

            const brand =
                $(".scene-brand");

            if (brand) {

                brand.classList.add("is-visible");

            }

        }, 300);


        /* ======================================
           TITLE
        ====================================== */

        schedule(() => {

            const title =
                $(".scene-title");

            if (title) {

                title.classList.add("is-visible");

            }

        }, 700);


        /* ======================================
           ACT 01 — INTRODUCTION
        ====================================== */

        schedule(() => {

            showOnly("#testingIntro");

            activate("#testingIntro");

        }, 1500);


        /* ======================================
           ACT 02 — TESTING METHODS
        ====================================== */

        schedule(() => {

            showOnly("#testingMethods");

        }, 10500);


        schedule(() => {

            activate("#tabletopTest");

        }, 10800);


        schedule(() => {

            activate("#walkthroughTest");

        }, 11300);


        schedule(() => {

            activate("#simulationTest");

        }, 11800);


        schedule(() => {

            activate("#fullInterruptionTest");

        }, 12300);


        schedule(() => {

            activate("#testingRiskNote");

        }, 13200);


        /* ======================================
           ACT 03 — TESTING WORKFLOW
        ====================================== */

        schedule(() => {

            showOnly("#testingWorkflow");

        }, 22000);


        schedule(() => {

            activate("#workflowPlan");

        }, 22300);


        schedule(() => {

            activate($$(".workflow-arrow")[0]);

        }, 22800);


        schedule(() => {

            activate("#workflowExecute");

        }, 23200);


        schedule(() => {

            activate($$(".workflow-arrow")[1]);

        }, 23800);


        schedule(() => {

            activate("#workflowValidate");

        }, 24200);


        schedule(() => {

            activate($$(".workflow-arrow")[2]);

        }, 24800);


        schedule(() => {

            activate("#workflowImprove");

        }, 25300);


        /* ======================================
           ACT 04 — RECOVERY VALIDATION
        ====================================== */

        schedule(() => {

            showOnly("#recoveryValidation");

        }, 36500);


        schedule(() => {

            activate("#validateSystems");

        }, 36800);


        schedule(() => {

            activate("#validateData");

        }, 37800);


        schedule(() => {

            activate("#validateObjectives");

        }, 38800);


        schedule(() => {

            activate("#validationWarning");

        }, 39800);


        /* ======================================
           ACT 05 — RECOVERY METRICS
        ====================================== */

        schedule(() => {

            showOnly("#testingMetrics");

        }, 51500);


        schedule(() => {

            activate("#metricRto");

        }, 51800);


        schedule(() => {

            activate("#metricRpo");

        }, 53300);


        schedule(() => {

            activate("#metricActual");

        }, 54800);


        schedule(() => {

            activate("#metricsComparison");

        }, 56300);


        /* ======================================
           ACT 06 — RECOVERY GAPS
        ====================================== */

        schedule(() => {

            showOnly("#recoveryGaps");

        }, 66500);


        schedule(() => {

            activate("#gapBackup");

        }, 66800);


        schedule(() => {

            activate("#gapDependencies");

        }, 67300);


        schedule(() => {

            activate("#gapTiming");

        }, 67800);


        schedule(() => {

            activate("#gapDocumentation");

        }, 68300);


        schedule(() => {

            activate("#correctiveAction");

        }, 69500);


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

        }, 95000);


        schedule(() => {

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