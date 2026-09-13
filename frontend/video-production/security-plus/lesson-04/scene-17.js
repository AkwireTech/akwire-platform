/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 17 — CRYPTOGRAPHIC ATTACKS
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

        "#cryptoAttackIntro",

        "#cryptoAttacks",

        "#keyCompromise",

        "#mitmAttack",

        "#weakCryptography",

        "#cryptoDefense",

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
           CRYPTOGRAPHIC SECURITY PROBLEM
        ======================================= */

        schedule(() => {

            showOnly("#cryptoAttackIntro");

            activate("#cryptoAttackIntro");

        }, 1500);


        /* ======================================
           ACT 02
           COMMON ATTACKS
        ======================================= */

        schedule(() => {

            showOnly("#cryptoAttacks");

            schedule(
                () =>
                    activate("#bruteForceAttack"),
                300
            );

            schedule(
                () =>
                    activate("#collisionAttack"),
                800
            );

            schedule(
                () =>
                    activate("#birthdayAttack"),
                1300
            );

            schedule(
                () =>
                    activate("#downgradeAttack"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           KEY COMPROMISE
        ======================================= */

        schedule(() => {

            showOnly("#keyCompromise");

            schedule(
                () =>
                    activate("#weakKey"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#keyCompromise .key-arrow:nth-of-type(1)"
                    ),
                900
            );

            schedule(
                () =>
                    activate("#exposedKey"),
                1400
            );

            schedule(
                () =>
                    activate(
                        "#keyCompromise .key-arrow:nth-of-type(2)"
                    ),
                2000
            );

            schedule(
                () =>
                    activate("#attackerAccess"),
                2500
            );

            schedule(
                () =>
                    activate(
                        "#keyCompromise .key-arrow:nth-of-type(3)"
                    ),
                3100
            );

            schedule(
                () =>
                    activate("#dataExposure"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           MAN-IN-THE-MIDDLE
        ======================================= */

        schedule(() => {

            showOnly("#mitmAttack");

            schedule(
                () =>
                    activate("#mitmClient"),
                300
            );

            schedule(
                () =>
                    activate(
                        "#mitmAttack .protection-connector:nth-of-type(1)"
                    ),
                1000
            );

            schedule(
                () =>
                    activate("#mitmAttacker"),
                1600
            );

            schedule(
                () =>
                    activate(
                        "#mitmAttack .protection-connector:nth-of-type(2)"
                    ),
                2200
            );

            schedule(
                () =>
                    activate("#mitmServer"),
                2800
            );

            schedule(
                () =>
                    activate("#mitmProtection"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           WEAK CRYPTOGRAPHY
        ======================================= */

        schedule(() => {

            showOnly("#weakCryptography");

            schedule(
                () =>
                    activate("#legacyCrypto"),
                300
            );

            schedule(
                () =>
                    activate("#modernCrypto"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           CRYPTOGRAPHIC DEFENSE
        ======================================= */

        schedule(() => {

            showOnly("#cryptoDefense");

            schedule(
                () =>
                    activate("#strongAlgorithm"),
                300
            );

            schedule(
                () =>
                    activate("#secureKeys"),
                800
            );

            schedule(
                () =>
                    activate("#secureProtocol"),
                1300
            );

            schedule(
                () =>
                    activate("#patchCrypto"),
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