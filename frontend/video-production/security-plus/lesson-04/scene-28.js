/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 28 — DATA OWNERSHIP & GOVERNANCE
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

        "#dataGovernanceIntro",

        "#dataGovernanceRoles",

        "#dataGovernanceProcess",

        "#dataRetention",

        "#governanceRisk",

        "#governancePractice",

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

            const brand =
                $(".scene-brand");

            if (brand) {

                brand.classList.add(
                    "is-visible"
                );

            }

        }, 300);


        /* ======================================
           TITLE
        ======================================= */

        schedule(() => {

            const title =
                $(".scene-title");

            if (title) {

                title.classList.add(
                    "is-visible"
                );

            }

        }, 700);


        /* ======================================
           ACT 01
           INTRO
        ======================================= */

        schedule(() => {

            showOnly(
                "#dataGovernanceIntro"
            );

            activate(
                "#dataGovernanceIntro"
            );

        }, 1500);


        /* ======================================
           ACT 02
           DATA ROLES
        ======================================= */

        schedule(() => {

            showOnly(
                "#dataGovernanceRoles"
            );

            schedule(
                () =>
                    activate("#dataOwner"),
                300
            );

            schedule(
                () =>
                    activate("#dataCustodian"),
                800
            );

            schedule(
                () =>
                    activate("#dataProcessor"),
                1300
            );

            schedule(
                () =>
                    activate("#dataController"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           GOVERNANCE PROCESS
        ======================================= */

        schedule(() => {

            showOnly(
                "#dataGovernanceProcess"
            );

            const arrows =
                $$("#dataGovernanceProcess .key-arrow");

            schedule(
                () =>
                    activate("#governanceAssign"),
                300
            );

            schedule(
                () => {

                    if (arrows[0]) {

                        arrows[0]
                            .classList.add(
                                "is-active"
                            );

                    }

                },
                900
            );

            schedule(
                () =>
                    activate("#governancePolicy"),
                1400
            );

            schedule(
                () => {

                    if (arrows[1]) {

                        arrows[1]
                            .classList.add(
                                "is-active"
                            );

                    }

                },
                2000
            );

            schedule(
                () =>
                    activate("#governanceMonitor"),
                2500
            );

            schedule(
                () => {

                    if (arrows[2]) {

                        arrows[2]
                            .classList.add(
                                "is-active"
                            );

                    }

                },
                3100
            );

            schedule(
                () =>
                    activate("#governanceImprove"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           DATA RETENTION
        ======================================= */

        schedule(() => {

            showOnly(
                "#dataRetention"
            );

            const connectors =
                $$("#dataRetention .protection-connector");

            schedule(
                () =>
                    activate("#retentionRequirement"),
                300
            );

            schedule(
                () => {

                    if (connectors[0]) {

                        connectors[0]
                            .classList.add(
                                "is-active"
                            );

                    }

                },
                1000
            );

            schedule(
                () =>
                    activate("#retentionStorage"),
                1600
            );

            schedule(
                () => {

                    if (connectors[1]) {

                        connectors[1]
                            .classList.add(
                                "is-active"
                            );

                    }

                },
                2200
            );

            schedule(
                () =>
                    activate("#retentionDisposal"),
                2800
            );

            schedule(
                () =>
                    activate("#retentionReminder"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           GOVERNANCE RISK
        ======================================= */

        schedule(() => {

            showOnly(
                "#governanceRisk"
            );

            schedule(
                () =>
                    activate("#uncontrolledData"),
                300
            );

            schedule(
                () =>
                    activate("#governedData"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           PRACTICE
        ======================================= */

        schedule(() => {

            showOnly(
                "#governancePractice"
            );

            schedule(
                () =>
                    activate(
                        "#governancePracticeOne"
                    ),
                300
            );

            schedule(
                () =>
                    activate(
                        "#governancePracticeTwo"
                    ),
                800
            );

            schedule(
                () =>
                    activate(
                        "#governancePracticeThree"
                    ),
                1300
            );

            schedule(
                () =>
                    activate(
                        "#governancePracticeFour"
                    ),
                1800
            );

        }, 66500);


        /* ======================================
           ACT 07
           EXAM MEMORY
        ======================================= */

        schedule(() => {

            showOnly(
                "#examMemory"
            );

        }, 81000);


        /* ======================================
           ACT 08
           SUMMARY
        ======================================= */

        schedule(() => {

            showOnly(
                "#sceneSummary"
            );

            const summaryItems =
                $$("#sceneSummary .summary-grid > div");

            summaryItems.forEach(
                (element, index) => {

                    schedule(
                        () =>
                            element.classList.add(
                                "is-active"
                            ),
                        index * 450
                    );

                }
            );

        }, 95000);


        /* ======================================
           ACT 09
           FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly(
                "#finalConcept"
            );

            activate(
                "#finalConcept"
            );

        }, 108000);


        /* ======================================
           SCENE COMPLETE
        ======================================= */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

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
       INITIAL STATE
    ========================================== */

    resetScene();

});