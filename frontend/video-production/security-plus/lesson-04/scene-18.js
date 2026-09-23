/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 18 — CRYPTOGRAPHIC IMPLEMENTATION
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

        "#cryptoPracticeIntro",

        "#implementationPrinciples",

        "#secureKeyLifecycle",

        "#secureProtocolConfig",

        "#cryptoConfigurationComparison",

        "#cryptoOperationalPractice",

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
           SECURITY OBJECTIVE
        ======================================= */

        schedule(() => {

            showOnly("#cryptoPracticeIntro");

            activate("#cryptoPracticeIntro");

        }, 1500);


        /* ======================================
           ACT 02
           IMPLEMENTATION PRINCIPLES
        ======================================= */

        schedule(() => {

            showOnly("#implementationPrinciples");

            schedule(
                () =>
                    activate("#algorithmSelection"),
                300
            );

            schedule(
                () =>
                    activate("#keyProtection"),
                800
            );

            schedule(
                () =>
                    activate("#secureConfiguration"),
                1300
            );

            schedule(
                () =>
                    activate("#lifecycleManagement"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           KEY LIFECYCLE
        ======================================= */

        schedule(() => {

            showOnly("#secureKeyLifecycle");

            schedule(
                () =>
                    activate("#generateKey"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#secureKeyLifecycle .key-arrow:nth-of-type(1)"
                    ),
                900
            );

            schedule(
                () =>
                    activate("#storeKey"),
                1400
            );

            schedule(
                () =>
                    activate(
                        "#secureKeyLifecycle .key-arrow:nth-of-type(2)"
                    ),
                2000
            );

            schedule(
                () =>
                    activate("#rotateKey"),
                2500
            );

            schedule(
                () =>
                    activate(
                        "#secureKeyLifecycle .key-arrow:nth-of-type(3)"
                    ),
                3100
            );

            schedule(
                () =>
                    activate("#destroyKey"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           SECURE PROTOCOL CONFIGURATION
        ======================================= */

        schedule(() => {

            showOnly("#secureProtocolConfig");

            schedule(
                () =>
                    activate("#protocolClient"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#secureProtocolConfig .protection-connector:nth-of-type(1)"
                    ),
                1000
            );

            schedule(
                () =>
                    activate("#protocolValidation"),
                1600
            );

            schedule(
                () =>
                    activate(
                        "#secureProtocolConfig .protection-connector:nth-of-type(2)"
                    ),
                2200
            );

            schedule(
                () =>
                    activate("#protocolServer"),
                2800
            );

            schedule(
                () =>
                    activate("#protocolProtection"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           CONFIGURATION DECISION
        ======================================= */

        schedule(() => {

            showOnly("#cryptoConfigurationComparison");

            schedule(
                () =>
                    activate("#insecureConfiguration"),
                300
            );

            schedule(
                () =>
                    activate("#secureConfigurationModel"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           OPERATIONAL PRACTICE
        ======================================= */

        schedule(() => {

            showOnly("#cryptoOperationalPractice");

            schedule(
                () =>
                    activate("#auditCrypto"),
                300
            );

            schedule(
                () =>
                    activate("#rotateCrypto"),
                800
            );

            schedule(
                () =>
                    activate("#patchCrypto"),
                1300
            );

            schedule(
                () =>
                    activate("#retireCrypto"),
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