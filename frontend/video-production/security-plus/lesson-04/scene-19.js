/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 19 — CRYPTOGRAPHY IN SECURITY OPERATIONS
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

        "#cryptoOperationsIntro",

        "#cryptoUseCases",

        "#protectedDataFlow",

        "#cryptoSecurityDecision",

        "#cryptoControlComparison",

        "#cryptoOperationalChecklist",

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
           FROM THEORY TO SECURITY
        ======================================= */

        schedule(() => {

            showOnly("#cryptoOperationsIntro");

            activate("#cryptoOperationsIntro");

        }, 1500);


        /* ======================================
           ACT 02
           SECURITY USE CASES
        ======================================= */

        schedule(() => {

            showOnly("#cryptoUseCases");

            schedule(
                () =>
                    activate("#dataEncryption"),
                300
            );

            schedule(
                () =>
                    activate("#passwordHashing"),
                800
            );

            schedule(
                () =>
                    activate("#digitalSignatures"),
                1300
            );

            schedule(
                () =>
                    activate("#certificateTrust"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           PROTECTED DATA FLOW
        ======================================= */

        schedule(() => {

            showOnly("#protectedDataFlow");

            schedule(
                () =>
                    activate("#dataCreated"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#protectedDataFlow .key-arrow:nth-of-type(1)"
                    ),
                900
            );

            schedule(
                () =>
                    activate("#dataProtect"),
                1400
            );

            schedule(
                () =>
                    activate(
                        "#protectedDataFlow .key-arrow:nth-of-type(2)"
                    ),
                2000
            );

            schedule(
                () =>
                    activate("#dataTransmit"),
                2500
            );

            schedule(
                () =>
                    activate(
                        "#protectedDataFlow .key-arrow:nth-of-type(3)"
                    ),
                3100
            );

            schedule(
                () =>
                    activate("#dataRetire"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           SECURITY DECISION
        ======================================= */

        schedule(() => {

            showOnly("#cryptoSecurityDecision");

            schedule(
                () =>
                    activate("#securityRequirement"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityDecision .protection-connector:nth-of-type(1)"
                    ),
                1000
            );

            schedule(
                () =>
                    activate("#cryptoMechanism"),
                1600
            );

            schedule(
                () =>
                    activate(
                        "#cryptoSecurityDecision .protection-connector:nth-of-type(2)"
                    ),
                2200
            );

            schedule(
                () =>
                    activate("#securityOutcome"),
                2800
            );

            schedule(
                () =>
                    activate("#decisionProtection"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           SECURITY CONTROLS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoControlComparison");

            schedule(
                () =>
                    activate("#confidentialityControl"),
                300
            );

            schedule(
                () =>
                    activate("#integrityControl"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           OPERATIONAL CHECKLIST
        ======================================= */

        schedule(() => {

            showOnly("#cryptoOperationalChecklist");

            schedule(
                () =>
                    activate("#verifyAlgorithm"),
                300
            );

            schedule(
                () =>
                    activate("#verifyKeys"),
                800
            );

            schedule(
                () =>
                    activate("#verifyTrust"),
                1300
            );

            schedule(
                () =>
                    activate("#verifyLifecycle"),
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