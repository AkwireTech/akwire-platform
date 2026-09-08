document.addEventListener("DOMContentLoaded", () => {

    const SCENE_DURATION = 126000;

    const timeline =
        document.querySelector("#timelineProgress");

    const startButton =
        document.querySelector("#startSceneBtn");

    const restartButton =
        document.querySelector("#restartSceneBtn");

    let timers = [];

    let sceneStarted = false;

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

    const contentElements = [
        "#algorithmIntro",
        "#algorithmTypes",
        "#keyManagement",
        "#keyProtection",
        "#algorithmComparison",
        "#cryptoPractice",
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

    function clearActiveStates() {
        $$(".is-active").forEach(element => {
            element.classList.remove("is-active");
        });
    }

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

        const heading =
            $(".scene-heading");

        if (heading) {
            heading.classList.remove(
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
            timeline.style.transition = "none";
            timeline.style.width = "0%";
        }
    }

    function beginScene() {

        resetScene();

        sceneStarted = true;

        startTimeline();

        /* ----------------------------------------
           SCENE INTRO
        ---------------------------------------- */

        schedule(() => {

            $$(".background-glow").forEach(
                element => {
                    element.classList.add(
                        "is-visible"
                    );
                }
            );

        }, 100);

        schedule(() => {

            const brand =
                $(".scene-brand");

            if (brand) {
                brand.classList.add(
                    "is-visible"
                );
            }

        }, 300);

        schedule(() => {

            const title =
                $(".scene-title");

            if (title) {
                title.classList.add(
                    "is-visible"
                );
            }

        }, 700);


        /* ----------------------------------------
           ACT 01 — INTRODUCTION
        ---------------------------------------- */

        schedule(() => {

            showOnly("#algorithmIntro");

            activate("#algorithmIntro");

        }, 1500);


        /* ----------------------------------------
           ACT 02 — ALGORITHM TYPES
        ---------------------------------------- */

        schedule(() => {

            showOnly("#algorithmTypes");

        }, 10500);

        schedule(() => {

            activate("#encryptionAlgorithm");

        }, 10800);

        schedule(() => {

            activate("#hashAlgorithm");

        }, 11300);

        schedule(() => {

            activate("#signatureAlgorithm");

        }, 11800);

        schedule(() => {

            activate("#keyExchangeAlgorithm");

        }, 12300);


        /* ----------------------------------------
           ACT 03 — KEY MANAGEMENT
        ---------------------------------------- */

        schedule(() => {

            showOnly("#keyManagement");

        }, 22000);

        schedule(() => {

            activate("#keyGenerate");

        }, 22300);

        schedule(() => {

            activate(
                $$(".key-arrow")[0]
                    ? ".key-arrow:nth-of-type(1)"
                    : ".key-arrow"
            );

        }, 22900);

        schedule(() => {

            activate("#keyStore");

        }, 23400);

        schedule(() => {

            const arrows =
                $$(".key-arrow");

            if (arrows[1]) {
                arrows[1].classList.add(
                    "is-active"
                );
            }

        }, 24000);

        schedule(() => {

            activate("#keyUse");

        }, 24500);

        schedule(() => {

            const arrows =
                $$(".key-arrow");

            if (arrows[2]) {
                arrows[2].classList.add(
                    "is-active"
                );
            }

        }, 25100);

        schedule(() => {

            activate("#keyRotate");

        }, 25600);


        /* ----------------------------------------
           ACT 04 — KEY PROTECTION
        ---------------------------------------- */

        schedule(() => {

            showOnly("#keyProtection");

        }, 36500);

        schedule(() => {

            activate("#protectedData");

        }, 36800);

        schedule(() => {

            activate(
                ".protection-connector"
            );

        }, 37700);

        schedule(() => {

            activate("#protectedKey");

        }, 38500);

        schedule(() => {

            activate("#keyWarning");

        }, 39700);


        /* ----------------------------------------
           ACT 05 — SYMMETRIC VS ASYMMETRIC
        ---------------------------------------- */

        schedule(() => {

            showOnly("#algorithmComparison");

        }, 51500);

        schedule(() => {

            activate(
                "#symmetricComparison"
            );

        }, 51800);

        schedule(() => {

            activate(
                "#asymmetricComparison"
            );

        }, 53300);


        /* ----------------------------------------
           ACT 06 — CRYPTOGRAPHIC PRACTICE
        ---------------------------------------- */

        schedule(() => {

            showOnly("#cryptoPractice");

        }, 66500);

        schedule(() => {

            activate(
                "#practiceAlgorithm"
            );

        }, 66800);

        schedule(() => {

            activate(
                "#practiceKey"
            );

        }, 67300);

        schedule(() => {

            activate(
                "#practiceLifecycle"
            );

        }, 67800);

        schedule(() => {

            activate(
                "#practicePolicy"
            );

        }, 68300);


        /* ----------------------------------------
           ACT 07 — EXAM MEMORY
        ---------------------------------------- */

        schedule(() => {

            showOnly("#examMemory");

            activate("#examMemory");

        }, 81000);


        /* ----------------------------------------
           ACT 08 — SCENE SUMMARY
        ---------------------------------------- */

        schedule(() => {

            showOnly("#sceneSummary");

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


        /* ----------------------------------------
           ACT 09 — FINAL CONCEPT
        ---------------------------------------- */

        schedule(() => {

            showOnly("#finalConcept");

            activate("#finalConcept");

        }, 108000);


        /* ----------------------------------------
           SCENE COMPLETE
        ---------------------------------------- */

        schedule(() => {

            sceneStarted = false;

        }, 124000);
    }


    /* ----------------------------------------
       START BUTTON
    ---------------------------------------- */

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                if (sceneStarted) return;

                beginScene();
            }
        );
    }


    /* ----------------------------------------
       RESTART BUTTON
    ---------------------------------------- */

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                beginScene();
            }
        );
    }


    /* ----------------------------------------
       INITIAL STATE
    ---------------------------------------- */

    resetScene();

});