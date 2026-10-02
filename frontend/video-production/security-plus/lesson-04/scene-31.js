document.addEventListener("DOMContentLoaded", () => {


    /* ==========================================
       SCENE CONFIGURATION
    ========================================== */

    const SCENE_DURATION =
        126000;


    const timeline =
        document.querySelector(
            "#timelineProgress"
        );


    const startButton =
        document.querySelector(
            "#startSceneBtn"
        );


    const restartButton =
        document.querySelector(
            "#restartSceneBtn"
        );


    let timers = [];


    let sceneStarted =
        false;


    /* ==========================================
       HELPERS
    ========================================== */

    const $ = selector =>
        document.querySelector(selector);


    const $$ = selector =>
        [...document.querySelectorAll(selector)];


    function schedule(callback, delay) {

        const timer =
            setTimeout(
                callback,
                delay
            );

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
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#privacyIntro",

        "#privacyPrinciples",

        "#privacyProcess",

        "#complianceControls",

        "#privacyRisk",

        "#privacyPractice",

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
       RESET
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
        ======================================= */

        schedule(() => {

            showOnly(
                "#privacyIntro"
            );

            activate(
                "#privacyIntro"
            );

        }, 1500);


        /* ======================================
           ACT 02
        ======================================= */

        schedule(() => {

            showOnly(
                "#privacyPrinciples"
            );

        }, 10500);


        schedule(() => {

            activate(
                "#dataMinimization"
            );

        }, 10800);


        schedule(() => {

            activate(
                "#purposeLimitation"
            );

        }, 11300);


        schedule(() => {

            activate(
                "#consent"
            );

        }, 11800);


        schedule(() => {

            activate(
                "#transparency"
            );

        }, 12300);


        /* ======================================
           ACT 03
        ======================================= */

        schedule(() => {

            showOnly(
                "#privacyProcess"
            );

        }, 22000);


        schedule(() => {

            activate(
                "#privacyCollect"
            );

        }, 22300);


        schedule(() => {

            activate(
                "#privacyUse"
            );

        }, 22900);


        schedule(() => {

            activate(
                "#privacyShare"
            );

        }, 23400);


        schedule(() => {

            activate(
                "#privacyDispose"
            );

        }, 24000);


        const lifecycleArrows =
            $$("#privacyProcess .key-arrow");


        lifecycleArrows.forEach(
            (arrow, index) => {

                schedule(() => {

                    arrow.classList.add(
                        "is-active"
                    );

                }, 22600 + (index * 700));

            }
        );


        /* ======================================
           ACT 04
        ======================================= */

        schedule(() => {

            showOnly(
                "#complianceControls"
            );

        }, 36500);


        schedule(() => {

            activate(
                "#privacyPolicy"
            );

        }, 36800);


        schedule(() => {

            activate(
                "#privacyControl"
            );

        }, 37300);


        schedule(() => {

            activate(
                "#privacyAudit"
            );

        }, 37800);


        const complianceConnectors =
            $$("#complianceControls .protection-connector");


        complianceConnectors.forEach(
            (connector, index) => {

                schedule(() => {

                    connector.classList.add(
                        "is-active"
                    );

                }, 37100 + (index * 700));

            }
        );


        schedule(() => {

            activate(
                "#complianceWarning"
            );

        }, 39700);


        /* ======================================
           ACT 05
        ======================================= */

        schedule(() => {

            showOnly(
                "#privacyRisk"
            );

        }, 51500);


        schedule(() => {

            activate(
                "#poorPrivacy"
            );

        }, 51800);


        schedule(() => {

            activate(
                "#responsiblePrivacy"
            );

        }, 53300);


        /* ======================================
           ACT 06
        ======================================= */

        schedule(() => {

            showOnly(
                "#privacyPractice"
            );

        }, 66500);


        schedule(() => {

            activate(
                "#privacyPracticeOne"
            );

        }, 66800);


        schedule(() => {

            activate(
                "#privacyPracticeTwo"
            );

        }, 67300);


        schedule(() => {

            activate(
                "#privacyPracticeThree"
            );

        }, 67800);


        schedule(() => {

            activate(
                "#privacyPracticeFour"
            );

        }, 68300);


        /* ======================================
           ACT 07
        ======================================= */

        schedule(() => {

            showOnly(
                "#examMemory"
            );

            activate(
                "#examMemory"
            );

        }, 81000);


        /* ======================================
           ACT 08
        ======================================= */

        schedule(() => {

            showOnly(
                "#sceneSummary"
            );

        }, 95000);


        const summaryItems =
            $$("#sceneSummary .summary-grid > div");


        summaryItems.forEach(
            (item, index) => {

                schedule(() => {

                    item.classList.add(
                        "is-active"
                    );

                }, 95300 + (index * 450));

            }
        );


        /* ======================================
           ACT 09
        ======================================= */

        schedule(() => {

            showOnly(
                "#finalConcept"
            );

        }, 108000);


        schedule(() => {

            activate(
                "#finalConcept"
            );

        }, 108300);


        /* ======================================
           SCENE COMPLETE
        ======================================= */

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