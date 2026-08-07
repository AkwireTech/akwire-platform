/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   SCENE 30 — NETWORK TROUBLESHOOTING METHODOLOGY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const SCENE_DURATION = 88000;

    const timeline =
        document.querySelector("#timelineProgress");

    const startButton =
        document.querySelector("#startSceneBtn");

    const restartButton =
        document.querySelector("#restartSceneBtn");

    let timers = [];


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


    function deactivateAll() {

        $$(".is-active").forEach(element => {
            element.classList.remove("is-active");
        });
    }


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#methodologyOverview",

        "#identifyProblem",
        "#symptomExample",

        "#establishTheory",
        "#layerApproach",

        "#testTheory",
        "#testResult",

        "#theoryConfirmed",
        "#theoryRejected",

        "#implementSolution",
        "#changeExample",

        "#verifyFunctionality",
        "#preventiveMeasures",

        "#documentFindings",
        "#ticketCard",

        "#completeWorkflow",

        "#troubleshootingSummary",
        "#finalConcept"
    ];


    function hideContent() {

        contentElements.forEach(selector => {
            hide(selector);
        });

        deactivateAll();
    }


    function showOnly(selector) {

        hideContent();
        show(selector);
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
       RESET
    ========================================== */

    function resetScene() {

        clearTimers();

        contentElements.forEach(selector => {
            hide(selector);
        });

        deactivateAll();


        $$(".background-glow").forEach(element => {
            element.classList.remove("is-visible");
        });


        const brand =
            $(".scene-brand");

        const title =
            $(".scene-title");


        if (brand) {
            brand.classList.remove("is-visible");
        }


        if (title) {
            title.classList.remove("is-visible");
        }


        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";
        }
    }


    /* ==========================================
       METHODOLOGY STEP ACTIVATION
    ========================================== */

    function activateMethodStep(step) {

        $$(".method-step").forEach(element => {
            element.classList.remove("is-active");
        });

        const target =
            $(`.method-step[data-step="${step}"]`);

        if (target) {
            target.classList.add("is-active");
        }
    }


    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene() {

        resetScene();

        startTimeline();


        /* ======================================
           0–4 SEC
           INTRO
        ====================================== */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        schedule(() => {

            show(".glow-left");
            show(".glow-center");
            show(".glow-right");

        }, 700);


        schedule(() => {

            show(".scene-title");

        }, 1200);


        /* ======================================
           4–10 SEC
           SIX-STEP METHODOLOGY
        ====================================== */

        schedule(() => {

            show("#methodologyOverview");

        }, 4000);


        schedule(() => {

            activateMethodStep(1);

        }, 4700);


        schedule(() => {

            activateMethodStep(2);

        }, 5500);


        schedule(() => {

            activateMethodStep(3);

        }, 6300);


        schedule(() => {

            activateMethodStep(4);

        }, 7100);


        schedule(() => {

            activateMethodStep(5);

        }, 7900);


        schedule(() => {

            activateMethodStep(6);

        }, 8700);


        /* ======================================
           10–15 SEC
           STEP 1 — IDENTIFY
        ====================================== */

        schedule(() => {

            showOnly("#identifyProblem");

        }, 10000);


        schedule(() => {

            activate(
                "#identifyProblem .detail-grid > div:nth-child(1)"
            );

        }, 10700);


        schedule(() => {

            activate(
                "#identifyProblem .detail-grid > div:nth-child(2)"
            );

        }, 11500);


        schedule(() => {

            activate(
                "#identifyProblem .detail-grid > div:nth-child(3)"
            );

        }, 12300);


        schedule(() => {

            activate(
                "#identifyProblem .detail-grid > div:nth-child(4)"
            );

        }, 13100);


        /* ======================================
           15–19 SEC
           USER REPORT
        ====================================== */

        schedule(() => {

            showOnly("#symptomExample");

        }, 15000);


        /* ======================================
           19–24 SEC
           STEP 2 — THEORY
        ====================================== */

        schedule(() => {

            showOnly("#establishTheory");

        }, 19000);


        schedule(() => {

            activate(
                "#establishTheory .theory-flow > div:nth-of-type(1)"
            );

        }, 19800);


        schedule(() => {

            activate(
                "#establishTheory .theory-flow > div:nth-of-type(2)"
            );

        }, 20700);


        schedule(() => {

            activate(
                "#establishTheory .theory-flow > div:nth-of-type(3)"
            );

        }, 21600);


        schedule(() => {

            activate(
                "#establishTheory .theory-flow > div:nth-of-type(4)"
            );

        }, 22500);


        /* ======================================
           24–28 SEC
           LAYER APPROACH
        ====================================== */

        schedule(() => {

            showOnly("#layerApproach");

        }, 24000);


        /* ======================================
           28–34 SEC
           STEP 3 — TEST THEORY
        ====================================== */

        schedule(() => {

            showOnly("#testTheory");

        }, 28000);


        schedule(() => {

            activate(
                "#testTheory .test-grid > div:nth-child(1)"
            );

        }, 28800);


        schedule(() => {

            activate(
                "#testTheory .test-grid > div:nth-child(2)"
            );

        }, 29700);


        schedule(() => {

            activate(
                "#testTheory .test-grid > div:nth-child(3)"
            );

        }, 30600);


        schedule(() => {

            activate(
                "#testTheory .test-grid > div:nth-child(4)"
            );

        }, 31500);


        /* ======================================
           34–38 SEC
           TEST RESULT
        ====================================== */

        schedule(() => {

            showOnly("#testResult");

        }, 34000);


        /* ======================================
           38–41 SEC
           THEORY CONFIRMED
        ====================================== */

        schedule(() => {

            showOnly("#theoryConfirmed");

        }, 38000);


        /* ======================================
           41–44 SEC
           THEORY NOT CONFIRMED
        ====================================== */

        schedule(() => {

            showOnly("#theoryRejected");

        }, 41000);


        /* ======================================
           44–50 SEC
           STEP 4 — PLAN & IMPLEMENT
        ====================================== */

        schedule(() => {

            showOnly("#implementSolution");

        }, 44000);


        schedule(() => {

            activate(
                "#implementSolution .implementation-flow > div:nth-of-type(1)"
            );

        }, 45000);


        schedule(() => {

            activate(
                "#implementSolution .implementation-flow > div:nth-of-type(2)"
            );

        }, 46200);


        schedule(() => {

            activate(
                "#implementSolution .implementation-flow > div:nth-of-type(3)"
            );

        }, 47400);


        /* ======================================
           50–54 SEC
           EXAMPLE FIX
        ====================================== */

        schedule(() => {

            showOnly("#changeExample");

        }, 50000);


        /* ======================================
           54–60 SEC
           STEP 5 — VERIFY
        ====================================== */

        schedule(() => {

            showOnly("#verifyFunctionality");

        }, 54000);


        schedule(() => {

            activate(
                "#verifyFunctionality .verification-grid > div:nth-child(1)"
            );

        }, 54800);


        schedule(() => {

            activate(
                "#verifyFunctionality .verification-grid > div:nth-child(2)"
            );

        }, 55700);


        schedule(() => {

            activate(
                "#verifyFunctionality .verification-grid > div:nth-child(3)"
            );

        }, 56600);


        schedule(() => {

            activate(
                "#verifyFunctionality .verification-grid > div:nth-child(4)"
            );

        }, 57500);


        /* ======================================
           60–64 SEC
           PREVENTIVE MEASURES
        ====================================== */

        schedule(() => {

            showOnly("#preventiveMeasures");

        }, 60000);


        /* ======================================
           64–70 SEC
           STEP 6 — DOCUMENT
        ====================================== */

        schedule(() => {

            showOnly("#documentFindings");

        }, 64000);


        schedule(() => {

            activate(
                "#documentFindings .documentation-grid > div:nth-child(1)"
            );

        }, 64800);


        schedule(() => {

            activate(
                "#documentFindings .documentation-grid > div:nth-child(2)"
            );

        }, 65700);


        schedule(() => {

            activate(
                "#documentFindings .documentation-grid > div:nth-child(3)"
            );

        }, 66600);


        schedule(() => {

            activate(
                "#documentFindings .documentation-grid > div:nth-child(4)"
            );

        }, 67500);


        /* ======================================
           70–74 SEC
           INCIDENT RECORD
        ====================================== */

        schedule(() => {

            showOnly("#ticketCard");

        }, 70000);


        /* ======================================
           74–79 SEC
           COMPLETE WORKFLOW
        ====================================== */

        schedule(() => {

            showOnly("#completeWorkflow");

        }, 74000);


        /* ======================================
           79–83 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#troubleshootingSummary");

        }, 79000);


        /* ======================================
           83–88 SEC
           KEY IDEA
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

        }, 83000);

    }


    /* ==========================================
       BUTTON CONTROLS
    ========================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            playScene
        );
    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            playScene
        );
    }


    /* ==========================================
       KEYBOARD CONTROLS
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.code === "Space") {

                event.preventDefault();

                playScene();
            }


            if (
                event.key === "r" ||
                event.key === "R"
            ) {

                playScene();
            }


            if (
                event.key === "h" ||
                event.key === "H"
            ) {

                document.body.classList.toggle(
                    "recording-mode"
                );
            }

        }
    );


    /* ==========================================
       RECORDING MODE
       ?record=1
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (params.get("record") === "1") {

        document.body.classList.add(
            "recording-mode"
        );


        schedule(() => {

            playScene();

        }, 700);
    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    resetScene();

});