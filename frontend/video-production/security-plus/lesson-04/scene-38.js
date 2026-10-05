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

        "#recoveryMetricsIntro",

        "#recoveryMetricsTypes",

        "#recoveryObjectiveProcess",

        "#recoveryMetricsValidation",

        "#recoveryMetricsRisk",

        "#recoveryMetricsPractice",

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


        const title =
            $(".scene-title");


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

            showOnly(
                "#recoveryMetricsIntro"
            );

            activate(
                "#recoveryMetricsIntro"
            );

        }, 1500);


        /* ----------------------------------------
           ACT 02 — RECOVERY METRICS
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#recoveryMetricsTypes"
            );

        }, 10500);


        schedule(() => {

            activate(
                "#recoveryRtoMetric"
            );

        }, 10800);


        schedule(() => {

            activate(
                "#recoveryRpoMetric"
            );

        }, 11300);


        schedule(() => {

            activate(
                "#recoveryMttrMetric"
            );

        }, 11800);


        schedule(() => {

            activate(
                "#recoveryPerformanceMetric"
            );

        }, 12300);


        /* ----------------------------------------
           ACT 03 — OBJECTIVE PROCESS
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#recoveryObjectiveProcess"
            );

        }, 22000);


        schedule(() => {

            activate(
                "#objectiveDefine"
            );

        }, 22300);


        schedule(() => {

            activate(
                ".key-arrow:nth-of-type(2)"
            );

        }, 22900);


        schedule(() => {

            activate(
                "#objectiveTest"
            );

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

            activate(
                "#objectiveCompare"
            );

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

            activate(
                "#objectiveImprove"
            );

        }, 25600);


        /* ----------------------------------------
           ACT 04 — METRIC VALIDATION
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#recoveryMetricsValidation"
            );

        }, 36500);


        schedule(() => {

            activate(
                "#recoveryTimeMeasure"
            );

        }, 36800);


        schedule(() => {

            activate(
                ".protection-connector:nth-of-type(2)"
            );

        }, 37700);


        schedule(() => {

            activate(
                "#recoveryDataMeasure"
            );

        }, 38500);


        schedule(() => {

            const connectors =
                $$(".protection-connector");

            if (connectors[1]) {

                connectors[1].classList.add(
                    "is-active"
                );

            }

        }, 39100);


        schedule(() => {

            activate(
                "#recoveryRepairMeasure"
            );

        }, 39700);


        schedule(() => {

            activate(
                "#recoveryMetricsWarning"
            );

        }, 40900);


        /* ----------------------------------------
           ACT 05 — RECOVERY RISK
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#recoveryMetricsRisk"
            );

        }, 51500);


        schedule(() => {

            activate(
                "#unmeasuredRecovery"
            );

        }, 51800);


        schedule(() => {

            activate(
                "#measuredRecovery"
            );

        }, 53300);


        /* ----------------------------------------
           ACT 06 — RECOVERY PRACTICE
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#recoveryMetricsPractice"
            );

        }, 66500);


        schedule(() => {

            activate(
                "#metricsPracticeOne"
            );

        }, 66800);


        schedule(() => {

            activate(
                "#metricsPracticeTwo"
            );

        }, 67300);


        schedule(() => {

            activate(
                "#metricsPracticeThree"
            );

        }, 67800);


        schedule(() => {

            activate(
                "#metricsPracticeFour"
            );

        }, 68300);


        /* ----------------------------------------
           ACT 07 — EXAM MEMORY
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#examMemory"
            );

            activate(
                "#examMemory"
            );

        }, 81000);


        /* ----------------------------------------
           ACT 08 — SCENE SUMMARY
        ---------------------------------------- */


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


        /* ----------------------------------------
           ACT 09 — FINAL CONCEPT
        ---------------------------------------- */


        schedule(() => {

            showOnly(
                "#finalConcept"
            );

            activate(
                "#finalConcept"
            );

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