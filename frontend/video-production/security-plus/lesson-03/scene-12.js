/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 12 — CLOUD SECURITY CONTROLS
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

        "#controlsIntro",

        "#responsibilityModel",

        "#serviceControls",

        "#identityControls",

        "#dataControls",

        "#configurationControls",

        "#misconfigurationScenario",

        "#cloudContainment",

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


        /* Background */

        schedule(() => {

            $$(".background-glow")
                .forEach(element => {

                    element.classList.add(
                        "is-visible"
                    );

                });

        }, 100);


        /* Brand */

        schedule(() => {

            $(".scene-brand")
                ?.classList.add("is-visible");

        }, 300);


        /* Title */

        schedule(() => {

            $(".scene-title")
                ?.classList.add("is-visible");

        }, 700);


        /* ======================================
           ACT 01
           THE SECURITY QUESTION
        ======================================= */

        schedule(() => {

            showOnly("#controlsIntro");

            activate("#controlsIntro");

        }, 1500);


        /* ======================================
           ACT 02
           SHARED RESPONSIBILITY
        ======================================= */

        schedule(() => {

            showOnly("#responsibilityModel");

        }, 10500);


        schedule(() => {

            activate(
                ".provider-side"
            );

        }, 12000);


        schedule(() => {

            activate(
                ".customer-side"
            );

        }, 14500);


        schedule(() => {

            deactivate(
                ".provider-side"
            );

            deactivate(
                ".customer-side"
            );

        }, 18500);


        /* ======================================
           ACT 03
           SERVICE MODELS
        ======================================= */

        schedule(() => {

            showOnly("#serviceControls");

        }, 21000);


        schedule(() => {

            activate("#iaasControls");

        }, 22500);


        schedule(() => {

            deactivate("#iaasControls");

            activate("#paasControls");

        }, 26000);


        schedule(() => {

            deactivate("#paasControls");

            activate("#saasControls");

        }, 30000);


        schedule(() => {

            deactivate("#saasControls");

        }, 34000);


        /* ======================================
           ACT 04
           IDENTITY & ACCESS
        ======================================= */

        schedule(() => {

            showOnly("#identityControls");

        }, 36500);


        const identityNodes = $$
            ("#identityControls .control-node");


        schedule(() => {

            if (identityNodes[0])
                identityNodes[0]
                    .classList.add("is-active");

        }, 38000);


        schedule(() => {

            if (identityNodes[0])
                identityNodes[0]
                    .classList.remove("is-active");

            if (identityNodes[1])
                identityNodes[1]
                    .classList.add("is-active");

        }, 40500);


        schedule(() => {

            if (identityNodes[1])
                identityNodes[1]
                    .classList.remove("is-active");

            if (identityNodes[2])
                identityNodes[2]
                    .classList.add("is-active");

        }, 43000);


        schedule(() => {

            if (identityNodes[2])
                identityNodes[2]
                    .classList.remove("is-active");

            if (identityNodes[3])
                identityNodes[3]
                    .classList.add("is-active");

        }, 45500);


        schedule(() => {

            identityNodes.forEach(node => {
                node.classList.remove(
                    "is-active"
                );
            });

        }, 48000);


        /* ======================================
           ACT 05
           DATA PROTECTION
        ======================================= */

        schedule(() => {

            showOnly("#dataControls");

        }, 50500);


        schedule(() => {

            activate("#dataAtRest");

        }, 52000);


        schedule(() => {

            deactivate("#dataAtRest");

            activate("#dataInTransit");

        }, 55000);


        schedule(() => {

            deactivate("#dataInTransit");

            activate("#dataInUse");

        }, 58000);


        schedule(() => {

            deactivate("#dataInUse");

        }, 61000);


        /* ======================================
           ACT 06
           SECURE CONFIGURATION
        ======================================= */

        schedule(() => {

            showOnly("#configurationControls");

        }, 63000);


        const configurationItems =
            $$("#configurationControls .configuration-grid > div");


        schedule(() => {

            if (configurationItems[0])
                configurationItems[0]
                    .classList.add("is-active");

        }, 64500);


        schedule(() => {

            if (configurationItems[0])
                configurationItems[0]
                    .classList.remove("is-active");

            if (configurationItems[1])
                configurationItems[1]
                    .classList.add("is-active");

        }, 67000);


        schedule(() => {

            if (configurationItems[1])
                configurationItems[1]
                    .classList.remove("is-active");

            if (configurationItems[2])
                configurationItems[2]
                    .classList.add("is-active");

        }, 69500);


        schedule(() => {

            if (configurationItems[2])
                configurationItems[2]
                    .classList.remove("is-active");

            if (configurationItems[3])
                configurationItems[3]
                    .classList.add("is-active");

        }, 72000);


        schedule(() => {

            configurationItems.forEach(item => {

                item.classList.remove(
                    "is-active"
                );

            });

        }, 75000);


        /* ======================================
           ACT 07
           MISCONFIGURATION
        ======================================= */

        schedule(() => {

            showOnly(
                "#misconfigurationScenario"
            );

        }, 77000);


        const scenarioStates =
            $$("#misconfigurationScenario .scenario-state");


        schedule(() => {

            if (scenarioStates[0])
                scenarioStates[0]
                    .classList.add("is-active");

        }, 78500);


        schedule(() => {

            if (scenarioStates[0])
                scenarioStates[0]
                    .classList.remove("is-active");

            if (scenarioStates[1])
                scenarioStates[1]
                    .classList.add("is-active");

        }, 81000);


        schedule(() => {

            if (scenarioStates[1])
                scenarioStates[1]
                    .classList.remove("is-active");

            if (scenarioStates[2])
                scenarioStates[2]
                    .classList.add("is-active");

        }, 84000);


        schedule(() => {

            scenarioStates.forEach(state => {

                state.classList.remove(
                    "is-active"
                );

            });

        }, 87500);


        /* ======================================
           ACT 08
           CONTAINMENT & RECOVERY
        ======================================= */

        schedule(() => {

            showOnly("#cloudContainment");

        }, 89000);


        const containmentSteps =
            $$("#cloudContainment .containment-flow > div");


        schedule(() => {

            if (containmentSteps[0])
                containmentSteps[0]
                    .classList.add("is-active");

        }, 90500);


        schedule(() => {

            if (containmentSteps[0])
                containmentSteps[0]
                    .classList.remove("is-active");

            if (containmentSteps[1])
                containmentSteps[1]
                    .classList.add("is-active");

        }, 93000);


        schedule(() => {

            if (containmentSteps[1])
                containmentSteps[1]
                    .classList.remove("is-active");

            if (containmentSteps[2])
                containmentSteps[2]
                    .classList.add("is-active");

        }, 95500);


        schedule(() => {

            if (containmentSteps[2])
                containmentSteps[2]
                    .classList.remove("is-active");

            if (containmentSteps[3])
                containmentSteps[3]
                    .classList.add("is-active");

        }, 98000);


        schedule(() => {

            containmentSteps.forEach(step => {

                step.classList.remove(
                    "is-active"
                );

            });

        }, 101000);


        /* ======================================
           ACT 09
           EXAM MEMORY
        ======================================= */

        schedule(() => {

            showOnly("#examMemory");

        }, 103000);


        schedule(() => {

            activate("#examMemory");

        }, 104500);


        /* ======================================
           ACT 10
           SUMMARY
        ======================================= */

        schedule(() => {

            deactivate("#examMemory");

            showOnly("#sceneSummary");

        }, 110000);


        const summaryItems =
            $$("#sceneSummary .summary-grid > div");


        schedule(() => {

            if (summaryItems[0])
                summaryItems[0]
                    .classList.add("is-active");

        }, 111500);


        schedule(() => {

            if (summaryItems[0])
                summaryItems[0]
                    .classList.remove("is-active");

            if (summaryItems[1])
                summaryItems[1]
                    .classList.add("is-active");

        }, 113000);


        schedule(() => {

            if (summaryItems[1])
                summaryItems[1]
                    .classList.remove("is-active");

            if (summaryItems[2])
                summaryItems[2]
                    .classList.add("is-active");

        }, 114500);


        schedule(() => {

            if (summaryItems[2])
                summaryItems[2]
                    .classList.remove("is-active");

            if (summaryItems[3])
                summaryItems[3]
                    .classList.add("is-active");

        }, 116000);


        schedule(() => {

            summaryItems.forEach(item => {

                item.classList.remove(
                    "is-active"
                );

            });

        }, 117500);


        /* ======================================
           ACT 11
           FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

            activate("#finalConcept");

        }, 119000);


        /* ======================================
           SCENE COMPLETE
        ======================================= */

        schedule(() => {

            activate("#finalConcept");

        }, 124000);


        schedule(() => {

            sceneStarted = false;

        }, SCENE_DURATION);

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