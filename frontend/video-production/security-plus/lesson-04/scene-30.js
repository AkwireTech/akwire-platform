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

        "#dataProtectionIntro",

        "#protectionControls",

        "#dataProtectionLifecycle",

        "#dataStates",

        "#protectionRisk",

        "#protectionPractice",

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
                "#dataProtectionIntro"
            );

            activate(
                "#dataProtectionIntro"
            );

        }, 1500);


        /* ======================================
           ACT 02
        ======================================= */

        schedule(() => {

            showOnly(
                "#protectionControls"
            );

        }, 10500);


        schedule(() => {

            activate(
                "#accessControl"
            );

        }, 10800);


        schedule(() => {

            activate(
                "#encryptionControl"
            );

        }, 11300);


        schedule(() => {

            activate(
                "#backupControl"
            );

        }, 11800);


        schedule(() => {

            activate(
                "#monitoringControl"
            );

        }, 12300);


        /* ======================================
           ACT 03
        ======================================= */

        schedule(() => {

            showOnly(
                "#dataProtectionLifecycle"
            );

        }, 22000);


        schedule(() => {

            activate(
                "#lifecycleCreate"
            );

        }, 22300);


        schedule(() => {

            activate(
                "#lifecycleUse"
            );

        }, 22900);


        schedule(() => {

            activate(
                "#lifecycleStore"
            );

        }, 23400);


        schedule(() => {

            activate(
                "#lifecycleDispose"
            );

        }, 24000);


        const lifecycleArrows =
            $$("#dataProtectionLifecycle .key-arrow");


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
                "#dataStates"
            );

        }, 36500);


        schedule(() => {

            activate(
                "#dataAtRest"
            );

        }, 36800);


        schedule(() => {

            activate(
                "#dataInTransit"
            );

        }, 37300);


        schedule(() => {

            activate(
                "#dataInUse"
            );

        }, 37800);


        const stateConnectors =
            $$("#dataStates .protection-connector");


        stateConnectors.forEach(
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
                "#dataStateWarning"
            );

        }, 39700);


        /* ======================================
           ACT 05
        ======================================= */

        schedule(() => {

            showOnly(
                "#protectionRisk"
            );

        }, 51500);


        schedule(() => {

            activate(
                "#weakProtection"
            );

        }, 51800);


        schedule(() => {

            activate(
                "#strongProtection"
            );

        }, 53300);


        /* ======================================
           ACT 06
        ======================================= */

        schedule(() => {

            showOnly(
                "#protectionPractice"
            );

        }, 66500);


        schedule(() => {

            activate(
                "#protectionPracticeOne"
            );

        }, 66800);


        schedule(() => {

            activate(
                "#protectionPracticeTwo"
            );

        }, 67300);


        schedule(() => {

            activate(
                "#protectionPracticeThree"
            );

        }, 67800);


        schedule(() => {

            activate(
                "#protectionPracticeFour"
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