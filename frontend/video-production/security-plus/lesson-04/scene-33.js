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


    const contentElements = [

        "#continuityIntro",

        "#continuityConcepts",

        "#recoveryProcess",

        "#recoveryPlanning",

        "#continuityRisk",

        "#continuityPractice",

        "#examMemory",

        "#sceneSummary",

        "#finalConcept",

        "#businessContinuity",

        "#disasterRecovery",

        "#criticalFunctions",

        "#recoveryStrategy",

        "#recoveryAssess",

        "#recoveryPrioritize",

        "#recoveryRestore",

        "#recoveryValidate",

        "#recoveryRto",

        "#recoveryRpo",

        "#recoveryBackup",

        "#recoveryWarning",

        "#unpreparedRecovery",

        "#preparedRecovery",

        "#continuityPracticeOne",

        "#continuityPracticeTwo",

        "#continuityPracticeThree",

        "#continuityPracticeFour"

    ];


    function hideContent() {

        contentElements.forEach(hide);

        $$(".key-arrow").forEach(
            element =>
                element.classList.remove(
                    "is-visible"
                )
        );

        $$(".protection-connector").forEach(
            element =>
                element.classList.remove(
                    "is-visible"
                )
        );

        $$(".summary-item").forEach(
            element =>
                element.classList.remove(
                    "is-visible"
                )
        );

    }


    function showOnly(selector) {

        hideContent();

        show(selector);

    }


    function clearActiveStates() {

        $$(".is-active").forEach(element => {

            element.classList.remove(
                "is-active"
            );

        });

    }


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
            $(".scene-title h1");

        if (title) {

            title.classList.remove(
                "is-visible"
            );

        }


        $$(".background-glow").forEach(
            element => {

                element.classList.remove(
                    "is-visible"
                );

            }
        );


        if (timeline) {

            timeline.style.transition =
                "none";

            timeline.style.width =
                "0%";

        }

    }


    function beginScene() {

        resetScene();

        sceneStarted = true;

        startTimeline();


        /* =====================================
           BACKGROUND
        ===================================== */

        schedule(() => {

            $$(".background-glow").forEach(
                element => {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

        }, 100);


        /* =====================================
           BRAND
        ===================================== */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        /* =====================================
           TITLE
        ===================================== */

        schedule(() => {

            show(".scene-heading");

        }, 700);


        schedule(() => {

            show(".scene-title h1");

        }, 900);


        /* =====================================
           ACT 01
        ===================================== */

        schedule(() => {

            showOnly(
                "#continuityIntro"
            );

        }, 1500);


        /* =====================================
           ACT 02
        ===================================== */

        schedule(() => {

            showOnly(
                "#continuityConcepts"
            );

        }, 10500);


        schedule(() => {

            show(
                "#businessContinuity"
            );

        }, 10800);


        schedule(() => {

            show(
                "#disasterRecovery"
            );

        }, 11300);


        schedule(() => {

            show(
                "#criticalFunctions"
            );

        }, 11800);


        schedule(() => {

            show(
                "#recoveryStrategy"
            );

        }, 12300);


        /* =====================================
           ACT 03
        ===================================== */

        schedule(() => {

            showOnly(
                "#recoveryProcess"
            );

        }, 22000);


        schedule(() => {

            show(
                "#recoveryAssess"
            );

        }, 22300);


        schedule(() => {

            show(
                "#recoveryPrioritize"
            );

        }, 22900);


        schedule(() => {

            show(
                "#recoveryRestore"
            );

        }, 23400);


        schedule(() => {

            show(
                "#recoveryValidate"
            );

        }, 24000);


        const keyArrows =
            $$("#recoveryProcess .key-arrow");


        keyArrows.forEach(
            (arrow, index) => {

                schedule(() => {

                    arrow.classList.add(
                        "is-visible"
                    );

                }, 22600 + index * 700);

            }
        );


        /* =====================================
           ACT 04
        ===================================== */

        schedule(() => {

            showOnly(
                "#recoveryPlanning"
            );

        }, 36500);


        schedule(() => {

            show(
                "#recoveryRto"
            );

        }, 36800);


        schedule(() => {

            show(
                "#recoveryRpo"
            );

        }, 37300);


        schedule(() => {

            show(
                "#recoveryBackup"
            );

        }, 37800);


        const protectionConnectors =
            $$("#recoveryPlanning .protection-connector");


        protectionConnectors.forEach(
            (connector, index) => {

                schedule(() => {

                    connector.classList.add(
                        "is-visible"
                    );

                }, 37100 + index * 700);

            }
        );


        schedule(() => {

            show(
                "#recoveryWarning"
            );

        }, 39700);


        /* =====================================
           ACT 05
        ===================================== */

        schedule(() => {

            showOnly(
                "#continuityRisk"
            );

        }, 51500);


        schedule(() => {

            show(
                "#unpreparedRecovery"
            );

        }, 51800);


        schedule(() => {

            show(
                "#preparedRecovery"
            );

        }, 53300);


        /* =====================================
           ACT 06
        ===================================== */

        schedule(() => {

            showOnly(
                "#continuityPractice"
            );

        }, 66500);


        schedule(() => {

            show(
                "#continuityPracticeOne"
            );

        }, 66800);


        schedule(() => {

            show(
                "#continuityPracticeTwo"
            );

        }, 67300);


        schedule(() => {

            show(
                "#continuityPracticeThree"
            );

        }, 67800);


        schedule(() => {

            show(
                "#continuityPracticeFour"
            );

        }, 68300);


        /* =====================================
           ACT 07
        ===================================== */

        schedule(() => {

            showOnly(
                "#examMemory"
            );

        }, 81000);


        /* =====================================
           ACT 08
        ===================================== */

        schedule(() => {

            showOnly(
                "#sceneSummary"
            );

        }, 95000);


        const summaryItems =
            $$("#sceneSummary .summary-item");


        summaryItems.forEach(
            (item, index) => {

                schedule(() => {

                    item.classList.add(
                        "is-visible"
                    );

                }, 95300 + index * 450);

            }
        );


        /* =====================================
           ACT 09
        ===================================== */

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


        /* =====================================
           SCENE COMPLETE
        ===================================== */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

    }


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


    resetScene();

});