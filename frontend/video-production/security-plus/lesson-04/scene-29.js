/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 29 — DATA CLASSIFICATION & HANDLING
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

        const element =
            $(selector);

        if (!element) return;

        element.classList.add(
            "is-visible"
        );

    }


    function hide(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.remove(
            "is-visible",
            "is-active"
        );

    }


    function activate(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.add(
            "is-active"
        );

    }


    function deactivate(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.remove(
            "is-active"
        );

    }


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#dataClassificationIntro",

        "#classificationLevels",

        "#dataHandlingProcess",

        "#handlingControls",

        "#classificationRisk",

        "#classificationPractice",

        "#examMemory",

        "#sceneSummary",

        "#finalConcept"

    ];


    function hideContent() {

        contentElements.forEach(
            selector => {

                hide(selector);

            }
        );

    }


    function showOnly(selector) {

        hideContent();

        show(selector);

    }


    /* ==========================================
       CLEAR ACTIVE STATES
    ========================================== */

    function clearActiveStates() {

        $$(".is-active").forEach(
            element => {

                element.classList.remove(
                    "is-active"
                );

            }
        );

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

        sceneStarted =
            false;

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

        sceneStarted =
            true;

        startTimeline();


        /* ======================================
           BACKGROUND
        ====================================== */

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
           ACT 01
           DATA CLASSIFICATION INTRO
        ====================================== */

        schedule(() => {

            showOnly(
                "#dataClassificationIntro"
            );

            activate(
                "#dataClassificationIntro"
            );

        }, 1500);


        /* ======================================
           ACT 02
           CLASSIFICATION LEVELS
        ====================================== */

        schedule(() => {

            showOnly(
                "#classificationLevels"
            );


            schedule(() => {

                activate(
                    "#publicData"
                );

            }, 300);


            schedule(() => {

                activate(
                    "#internalData"
                );

            }, 800);


            schedule(() => {

                activate(
                    "#confidentialData"
                );

            }, 1300);


            schedule(() => {

                activate(
                    "#restrictedData"
                );

            }, 1800);

        }, 10500);


        /* ======================================
           ACT 03
           DATA HANDLING PROCESS
        ====================================== */

        schedule(() => {

            showOnly(
                "#dataHandlingProcess"
            );


            const arrows =
                $$("#dataHandlingProcess .key-arrow");


            schedule(() => {

                activate(
                    "#handlingClassify"
                );

            }, 300);


            schedule(() => {

                if (arrows[0]) {

                    arrows[0].classList.add(
                        "is-active"
                    );

                }

            }, 900);


            schedule(() => {

                activate(
                    "#handlingLabel"
                );

            }, 1400);


            schedule(() => {

                if (arrows[1]) {

                    arrows[1].classList.add(
                        "is-active"
                    );

                }

            }, 2000);


            schedule(() => {

                activate(
                    "#handlingProtect"
                );

            }, 2500);


            schedule(() => {

                if (arrows[2]) {

                    arrows[2].classList.add(
                        "is-active"
                    );

                }

            }, 3100);


            schedule(() => {

                activate(
                    "#handlingDispose"
                );

            }, 3600);

        }, 22000);


        /* ======================================
           ACT 04
           HANDLING CONTROLS
        ====================================== */

        schedule(() => {

            showOnly(
                "#handlingControls"
            );


            const connectors =
                $$("#handlingControls .protection-connector");


            schedule(() => {

                activate(
                    "#handlingAccess"
                );

            }, 300);


            schedule(() => {

                if (connectors[0]) {

                    connectors[0]
                        .classList.add(
                            "is-active"
                        );

                }

            }, 1100);


            schedule(() => {

                activate(
                    "#handlingEncryption"
                );

            }, 1700);


            schedule(() => {

                if (connectors[1]) {

                    connectors[1]
                        .classList.add(
                            "is-active"
                        );

                }

            }, 2400);


            schedule(() => {

                activate(
                    "#handlingMonitoring"
                );

            }, 3000);


            schedule(() => {

                activate(
                    "#handlingWarning"
                );

            }, 4000);

        }, 36500);


        /* ======================================
           ACT 05
           RISK COMPARISON
        ====================================== */

        schedule(() => {

            showOnly(
                "#classificationRisk"
            );


            schedule(() => {

                activate(
                    "#unclassifiedData"
                );

            }, 300);


            schedule(() => {

                activate(
                    "#classifiedData"
                );

            }, 1800);

        }, 51500);


        /* ======================================
           ACT 06
           PRACTICE
        ====================================== */

        schedule(() => {

            showOnly(
                "#classificationPractice"
            );


            schedule(() => {

                activate(
                    "#classificationPracticeOne"
                );

            }, 300);


            schedule(() => {

                activate(
                    "#classificationPracticeTwo"
                );

            }, 800);


            schedule(() => {

                activate(
                    "#classificationPracticeThree"
                );

            }, 1300);


            schedule(() => {

                activate(
                    "#classificationPracticeFour"
                );

            }, 1800);

        }, 66500);


        /* ======================================
           ACT 07
           EXAM MEMORY
        ====================================== */

        schedule(() => {

            showOnly(
                "#examMemory"
            );

        }, 81000);


        /* ======================================
           ACT 08
           SCENE SUMMARY
        ====================================== */

        schedule(() => {

            showOnly(
                "#sceneSummary"
            );


            const summaryItems =
                $$("#sceneSummary .summary-grid > div");


            summaryItems.forEach(
                (element, index) => {

                    schedule(() => {

                        element.classList.add(
                            "is-active"
                        );

                    }, index * 450);

                }
            );

        }, 95000);


        /* ======================================
           ACT 09
           FINAL CONCEPT
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

            sceneStarted =
                false;

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
       INITIAL RESET
    ========================================== */

    resetScene();

});