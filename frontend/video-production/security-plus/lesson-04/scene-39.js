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

        element.classList.add(
            "is-visible"
        );

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

        element.classList.add(
            "is-active"
        );

    }


    function deactivate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove(
            "is-active"
        );

    }


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#backupIntro",

        "#backupTypes",

        "#backupProcess",

        "#backupProtection",

        "#backupStrategy",

        "#recoveryPractice",

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
       ACTIVE STATES
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

        timeline.style.transition =
            "none";

        timeline.style.width =
            "0%";

        void timeline.offsetWidth;

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                timeline.style.transition =
                    `width ${SCENE_DURATION}ms linear`;

                timeline.style.width =
                    "100%";

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


        $$(".background-glow").forEach(element => {

            element.classList.remove(
                "is-visible"
            );

        });


        if (timeline) {

            timeline.style.transition =
                "none";

            timeline.style.width =
                "0%";

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

                element.classList.add(
                    "is-visible"
                );

            });

        }, 100);


        /* ======================================
           BRAND
        ====================================== */

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
        ====================================== */

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
           ACT 01 — INTRO
        ====================================== */

        schedule(() => {

            showOnly(
                "#backupIntro"
            );

            activate(
                "#backupIntro"
            );

        }, 1500);


        /* ======================================
           ACT 02 — BACKUP TYPES
        ====================================== */

        schedule(() => {

            showOnly(
                "#backupTypes"
            );

        }, 10500);


        schedule(() => {

            activate(
                "#fullBackup"
            );

        }, 10800);


        schedule(() => {

            activate(
                "#incrementalBackup"
            );

        }, 11300);


        schedule(() => {

            activate(
                "#differentialBackup"
            );

        }, 11800);


        schedule(() => {

            activate(
                "#snapshotBackup"
            );

        }, 12300);


        /* ======================================
           ACT 03 — RECOVERY PROCESS
        ====================================== */

        schedule(() => {

            showOnly(
                "#backupProcess"
            );

        }, 22000);


        schedule(() => {

            activate(
                "#processIdentify"
            );

        }, 22300);


        schedule(() => {

            activate(
                ".process-arrow:nth-of-type(1)"
            );

        }, 22800);


        schedule(() => {

            activate(
                "#processBackup"
            );

        }, 23200);


        schedule(() => {

            activate(
                ".process-arrow:nth-of-type(2)"
            );

        }, 23800);


        schedule(() => {

            activate(
                "#processTest"
            );

        }, 24200);


        schedule(() => {

            activate(
                ".process-arrow:nth-of-type(3)"
            );

        }, 24800);


        schedule(() => {

            activate(
                "#processRestore"
            );

        }, 25300);


        /* ======================================
           ACT 04 — BACKUP PROTECTION
        ====================================== */

        schedule(() => {

            showOnly(
                "#backupProtection"
            );

        }, 36500);


        schedule(() => {

            activate(
                "#protectionOffline"
            );

        }, 36800);


        schedule(() => {

            activate(
                "#protectionImmutable"
            );

        }, 37800);


        schedule(() => {

            activate(
                "#protectionOffsite"
            );

        }, 38800);


        schedule(() => {

            activate(
                "#backupWarning"
            );

        }, 39800);


        /* ======================================
           ACT 05 — 3-2-1 STRATEGY
        ====================================== */

        schedule(() => {

            showOnly(
                "#backupStrategy"
            );

        }, 51500);


        schedule(() => {

            activate(
                "#strategyThree"
            );

        }, 51800);


        schedule(() => {

            activate(
                "#strategyTwo"
            );

        }, 53300);


        schedule(() => {

            activate(
                "#strategyOne"
            );

        }, 54800);


        /* ======================================
           ACT 06 — RECOVERY PRACTICE
        ====================================== */

        schedule(() => {

            showOnly(
                "#recoveryPractice"
            );

        }, 66500);


        schedule(() => {

            activate(
                "#practiceOne"
            );

        }, 66800);


        schedule(() => {

            activate(
                "#practiceTwo"
            );

        }, 67300);


        schedule(() => {

            activate(
                "#practiceThree"
            );

        }, 67800);


        schedule(() => {

            activate(
                "#practiceFour"
            );

        }, 68300);


        /* ======================================
           ACT 07 — EXAM MEMORY
        ====================================== */

        schedule(() => {

            showOnly(
                "#examMemory"
            );

            activate(
                "#examMemory"
            );

        }, 81000);


        /* ======================================
           ACT 08 — SUMMARY
        ====================================== */

        schedule(() => {

            showOnly(
                "#sceneSummary"
            );

        }, 95000);


        schedule(() => {

            const summaryItems =
                $$(".summary-grid > div");


            summaryItems.forEach(
                (item, index) => {

                    schedule(() => {

                        item.classList.add(
                            "is-active"
                        );

                    }, index * 450);

                }
            );

        }, 95000);


        /* ======================================
           ACT 09 — FINAL CONCEPT
        ====================================== */

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
        ====================================== */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

    }


    /* ==========================================
       START BUTTON
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


    /* ==========================================
       RESTART BUTTON
    ========================================== */

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