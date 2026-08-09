/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 04
   FIBER-OPTIC CABLING
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


    /* ==========================================
       MAIN CONTENT
    ========================================== */

    const contentElements = [

        "#fiberIntro",
        "#fiberConstruction",
        "#emiImmunity",
        "#fiberTypes",
        "#multimodeFiber",
        "#singlemodeFiber",
        "#modeComparison",
        "#connectorTypes",
        "#connectorMemory",
        "#transceiverIntro",
        "#opticalLink",
        "#fiberDecision",
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
       FIBER INTRO
    ========================================== */

    function runFiberIntro() {

        activate("#fiberCable");

        schedule(() => {

            activate("#lightPulse");

        }, 500);


        schedule(() => {

            activate("#fiberBenefitSpeed");

        }, 1800);


        schedule(() => {

            activate("#fiberBenefitDistance");

        }, 3800);

    }


    /* ==========================================
       FIBER CONSTRUCTION
    ========================================== */

    function runConstruction() {

        schedule(() => {

            activate("#coreLayer");
            activate("#coreDefinition");

        }, 500);


        schedule(() => {

            activate("#claddingLayer");
            activate("#claddingDefinition");

        }, 2600);


        schedule(() => {

            activate("#jacketLayer");
            activate("#jacketDefinition");

        }, 4700);

    }


    /* ==========================================
       EMI DEMONSTRATION
    ========================================== */

    function runEmiDemo() {

        schedule(() => {

            activate(".emi-source");

        }, 500);


        schedule(() => {

            activate("#emiLightPulse");

        }, 1800);


        schedule(() => {

            activate(".emi-result");

        }, 3900);

    }


    /* ==========================================
       FIBER TYPES
    ========================================== */

    function runFiberTypes() {

        schedule(() => {

            activate("#multimodeIntro");

        }, 700);


        schedule(() => {

            activate("#singlemodeIntro");

        }, 3300);

    }


    /* ==========================================
       MULTIMODE
    ========================================== */

    function runMultimode() {

        schedule(() => {

            activate(".multimode-core");

        }, 500);


        schedule(() => {

            activate("#mmCore");

        }, 1900);


        schedule(() => {

            activate("#mmSource");

        }, 3500);


        schedule(() => {

            activate("#mmDistance");

        }, 5100);

    }


    /* ==========================================
       SINGLE MODE
    ========================================== */

    function runSingleMode() {

        schedule(() => {

            activate(".singlemode-core");

        }, 500);


        schedule(() => {

            activate("#smCore");

        }, 1900);


        schedule(() => {

            activate("#smSource");

        }, 3500);


        schedule(() => {

            activate("#smDistance");

        }, 5100);

    }


    /* ==========================================
       MODE COMPARISON
    ========================================== */

    function runComparison() {

        const rows = [

            "#compareCore",
            "#compareLight",
            "#compareSource",
            "#compareDistance",
            "#compareUse"

        ];


        rows.forEach(
            (selector, index) => {

                schedule(() => {

                    activate(selector);

                }, 500 + index * 1150);

            }
        );

    }


    /* ==========================================
       CONNECTOR TYPES
    ========================================== */

    function runConnectors() {

        const connectors = [

            "#lcConnector",
            "#scConnector",
            "#stConnector",
            "#mpoConnector"

        ];


        connectors.forEach(
            (selector, index) => {

                schedule(() => {

                    activate(selector);

                }, 600 + index * 1500);

            }
        );

    }


    /* ==========================================
       CONNECTOR MEMORY
    ========================================== */

    function runConnectorMemory() {

        const connectors = [

            "#memoryLC",
            "#memorySC",
            "#memoryST",
            "#memoryMPO"

        ];


        connectors.forEach(
            (selector, index) => {

                schedule(() => {

                    activate(selector);

                }, 500 + index * 1350);

            }
        );

    }


    /* ==========================================
       TRANSCEIVER
    ========================================== */

    function runTransceiver() {

        schedule(() => {

            activate("#sfpModule");

        }, 600);


        schedule(() => {

            activate("#sfpFeature");

        }, 2600);


        schedule(() => {

            activate("#sfpPlusFeature");

        }, 4800);

    }


    /* ==========================================
       OPTICAL LINK
    ========================================== */

    function runOpticalLink() {

        schedule(() => {

            activate("#fiberSwitchOne");

        }, 400);


        schedule(() => {

            activate("#fiberSfpOne");

        }, 1500);


        schedule(() => {

            activate("#opticalPulse");

        }, 2600);


        schedule(() => {

            activate("#fiberSfpTwo");

        }, 4100);


        schedule(() => {

            activate("#fiberSwitchTwo");

        }, 5300);

    }


    /* ==========================================
       FIBER DECISION
    ========================================== */

    function runDecision() {

        schedule(() => {

            activate("#decisionShort");

        }, 700);


        schedule(() => {

            activate("#decisionLong");

        }, 3000);


        schedule(() => {

            activate("#decisionEnvironment");

        }, 5400);

    }


    /* ==========================================
       MEMORY CHECK
    ========================================== */

    function runMemory() {

        const memoryItems = [

            "#memoryLight",
            "#memoryMMF",
            "#memorySMF",
            "#memoryEMI"

        ];


        memoryItems.forEach(
            (selector, index) => {

                schedule(() => {

                    activate(selector);

                }, 500 + index * 1200);

            }
        );

    }


    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene() {

        resetScene();

        startTimeline();


        /* ======================================
           0–4 SEC
           INTRO
        ====================================== */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        schedule(() => {

            show(".glow-left");
            show(".glow-center");
            show(".glow-right");

        }, 650);


        schedule(() => {

            show(".scene-title");

        }, 1000);


        /* ======================================
           4–13 SEC
           FIBER INTRO
        ====================================== */

        schedule(() => {

            showOnly("#fiberIntro");

            runFiberIntro();

        }, 4000);


        /* ======================================
           13–22 SEC
           FIBER CONSTRUCTION
        ====================================== */

        schedule(() => {

            showOnly("#fiberConstruction");

            runConstruction();

        }, 13000);


        /* ======================================
           22–30 SEC
           EMI IMMUNITY
        ====================================== */

        schedule(() => {

            showOnly("#emiImmunity");

            runEmiDemo();

        }, 22000);


        /* ======================================
           30–38 SEC
           TWO FIBER TYPES
        ====================================== */

        schedule(() => {

            showOnly("#fiberTypes");

            runFiberTypes();

        }, 30000);


        /* ======================================
           38–47 SEC
           MULTIMODE
        ====================================== */

        schedule(() => {

            showOnly("#multimodeFiber");

            runMultimode();

        }, 38000);


        /* ======================================
           47–56 SEC
           SINGLE-MODE
        ====================================== */

        schedule(() => {

            showOnly("#singlemodeFiber");

            runSingleMode();

        }, 47000);


        /* ======================================
           56–65 SEC
           MMF VS SMF
        ====================================== */

        schedule(() => {

            showOnly("#modeComparison");

            runComparison();

        }, 56000);


        /* ======================================
           65–75 SEC
           CONNECTOR TYPES
        ====================================== */

        schedule(() => {

            showOnly("#connectorTypes");

            runConnectors();

        }, 65000);


        /* ======================================
           75–83 SEC
           CONNECTOR MEMORY
        ====================================== */

        schedule(() => {

            showOnly("#connectorMemory");

            runConnectorMemory();

        }, 75000);


        /* ======================================
           83–93 SEC
           SFP / SFP+
        ====================================== */

        schedule(() => {

            showOnly("#transceiverIntro");

            runTransceiver();

        }, 83000);


        /* ======================================
           93–102 SEC
           COMPLETE OPTICAL LINK
        ====================================== */

        schedule(() => {

            showOnly("#opticalLink");

            runOpticalLink();

        }, 93000);


        /* ======================================
           102–112 SEC
           CHOOSING FIBER
        ====================================== */

        schedule(() => {

            showOnly("#fiberDecision");

            runDecision();

        }, 102000);


        /* ======================================
           112–119 SEC
           EXAM MEMORY
        ====================================== */

        schedule(() => {

            showOnly("#examMemory");

            runMemory();

        }, 112000);


        /* ======================================
           119–123 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 119000);


        /* ======================================
           123–126 SEC
           FINAL CONCEPT
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

        }, 123000);

    }


    /* ==========================================
       BUTTON CONTROLS
    ========================================== */

    startButton?.addEventListener(
        "click",
        playScene
    );


    restartButton?.addEventListener(
        "click",
        playScene
    );


    /* ==========================================
       KEYBOARD CONTROLS
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.code === "Space" &&
                event.target.tagName !== "INPUT" &&
                event.target.tagName !== "TEXTAREA"
            ) {

                event.preventDefault();

                playScene();

            }


            if (
                event.key === "r" ||
                event.key === "R"
            ) {

                playScene();

            }


            if (
                event.key === "h" ||
                event.key === "H"
            ) {

                document.body.classList.toggle(
                    "recording-mode"
                );

            }


            if (
                event.key === "f" ||
                event.key === "F"
            ) {

                if (!document.fullscreenElement) {

                    document.documentElement
                        .requestFullscreen?.();

                } else {

                    document.exitFullscreen?.();

                }

            }

        }
    );


    /* ==========================================
       RECORDING MODE
       ?record=1
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (params.get("record") === "1") {

        document.body.classList.add(
            "recording-mode"
        );


        schedule(() => {

            playScene();

        }, 700);

    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    resetScene();

});