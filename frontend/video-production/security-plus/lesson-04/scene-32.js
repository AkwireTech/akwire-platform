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

        "#breachIntro",

        "#breachTypes",

        "#incidentResponseProcess",

        "#incidentEvidence",

        "#incidentRisk",

        "#incidentPractice",

        "#examMemory",

        "#sceneSummary",

        "#finalConcept",

        "#credentialCompromise",

        "#malwareBreach",

        "#insiderBreach",

        "#misconfigurationBreach",

        "#incidentIdentify",

        "#incidentContain",

        "#incidentEradicate",

        "#incidentRecover",

        "#evidenceCollection",

        "#evidenceDocumentation",

        "#evidenceAnalysis",

        "#evidenceWarning",

        "#uncontrolledResponse",

        "#structuredResponse",

        "#incidentPracticeOne",

        "#incidentPracticeTwo",

        "#incidentPracticeThree",

        "#incidentPracticeFour"

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
                "#breachIntro"
            );

        }, 1500);


        /* =====================================
           ACT 02
        ===================================== */

        schedule(() => {

            showOnly(
                "#breachTypes"
            );

        }, 10500);


        schedule(() => {

            show(
                "#credentialCompromise"
            );

        }, 10800);


        schedule(() => {

            show(
                "#malwareBreach"
            );

        }, 11300);


        schedule(() => {

            show(
                "#insiderBreach"
            );

        }, 11800);


        schedule(() => {

            show(
                "#misconfigurationBreach"
            );

        }, 12300);


        /* =====================================
           ACT 03
        ===================================== */

        schedule(() => {

            showOnly(
                "#incidentResponseProcess"
            );

        }, 22000);


        schedule(() => {

            show(
                "#incidentIdentify"
            );

        }, 22300);


        schedule(() => {

            show(
                "#incidentContain"
            );

        }, 22900);


        schedule(() => {

            show(
                "#incidentEradicate"
            );

        }, 23400);


        schedule(() => {

            show(
                "#incidentRecover"
            );

        }, 24000);


        const keyArrows =
            $$("#incidentResponseProcess .key-arrow");


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
                "#incidentEvidence"
            );

        }, 36500);


        schedule(() => {

            show(
                "#evidenceCollection"
            );

        }, 36800);


        schedule(() => {

            show(
                "#evidenceDocumentation"
            );

        }, 37300);


        schedule(() => {

            show(
                "#evidenceAnalysis"
            );

        }, 37800);


        const protectionConnectors =
            $$("#incidentEvidence .protection-connector");


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
                "#evidenceWarning"
            );

        }, 39700);


        /* =====================================
           ACT 05
        ===================================== */

        schedule(() => {

            showOnly(
                "#incidentRisk"
            );

        }, 51500);


        schedule(() => {

            show(
                "#uncontrolledResponse"
            );

        }, 51800);


        schedule(() => {

            show(
                "#structuredResponse"
            );

        }, 53300);


        /* =====================================
           ACT 06
        ===================================== */

        schedule(() => {

            showOnly(
                "#incidentPractice"
            );

        }, 66500);


        schedule(() => {

            show(
                "#incidentPracticeOne"
            );

        }, 66800);


        schedule(() => {

            show(
                "#incidentPracticeTwo"
            );

        }, 67300);


        schedule(() => {

            show(
                "#incidentPracticeThree"
            );

        }, 67800);


        schedule(() => {

            show(
                "#incidentPracticeFour"
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