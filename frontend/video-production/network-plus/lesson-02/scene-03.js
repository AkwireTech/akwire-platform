/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 03
   ETHERNET CONNECTORS & T568A/T568B WIRING
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SCENE SETTINGS
    ========================================== */

    const SCENE_DURATION = 118000;

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


    function deactivate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove("is-active");
    }


    /* ==========================================
       MAIN CONTENT
    ========================================== */

    const contentElements = [

        "#connectorIntro",
        "#rj45Terminology",
        "#pinOverview",
        "#standardsIntro",
        "#t568aCard",
        "#t568bCard",
        "#abComparison",
        "#straightThrough",
        "#crossoverCable",
        "#deviceRule",
        "#autoMdix",
        "#terminationProcess",
        "#cableTester",
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
       REMOVE ACTIVE STATES
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
       RESET
    ========================================== */

    function resetScene() {

        clearTimers();

        hideContent();

        clearActiveStates();


        /* --------------------------------------
           BRAND / TITLE
        -------------------------------------- */

        $(".scene-brand")
            ?.classList.remove("is-visible");

        $(".scene-title")
            ?.classList.remove("is-visible");


        /* --------------------------------------
           BACKGROUND
        -------------------------------------- */

        $$(".background-glow")
            .forEach(element => {

                element.classList.remove(
                    "is-visible"
                );

            });


        /* --------------------------------------
           TESTER
        -------------------------------------- */

        const testerStatus =
            $("#testerStatus");

        if (testerStatus) {

            testerStatus.textContent =
                "READY";

        }


        /* --------------------------------------
           TIMELINE
        -------------------------------------- */

        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       ACTIVATE CONNECTOR CONTACTS
    ========================================== */

    function activateConnectorContacts() {

        const contacts =
            $$(".plug-contacts span");

        contacts.forEach(
            (contact, index) => {

                schedule(() => {

                    contact.classList.add(
                        "is-active"
                    );

                }, index * 180);

            }
        );

    }


    /* ==========================================
       ACTIVATE PIN OVERVIEW
    ========================================== */

    function activatePins() {

        for (
            let pin = 1;
            pin <= 8;
            pin++
        ) {

            schedule(() => {

                activate(`#pin${pin}`);

            }, (pin - 1) * 220);

        }

    }


    /* ==========================================
       ACTIVATE PINOUT TABLE
    ========================================== */

    function activatePinout(prefix) {

        for (
            let pin = 1;
            pin <= 8;
            pin++
        ) {

            schedule(() => {

                activate(
                    `#${prefix}Pin${pin}`
                );

            }, (pin - 1) * 420);

        }

    }


    /* ==========================================
       CABLE TESTER SEQUENCE
    ========================================== */

    function runCableTester() {

        const pins =
            $$(".tester-pins span");

        const status =
            $("#testerStatus");


        pins.forEach(
            (pin, index) => {

                schedule(() => {

                    pin.classList.add(
                        "is-active"
                    );

                }, index * 280);

            }
        );


        schedule(() => {

            if (status) {

                status.textContent =
                    "PASS";

            }

            activate("#testContinuity");

        }, 2600);


        schedule(() => {

            activate("#testPinout");

        }, 3300);


        schedule(() => {

            activate("#testFaults");

        }, 4000);

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
           4–12 SEC
           8P8C CONNECTOR
        ====================================== */

        schedule(() => {

            showOnly("#connectorIntro");

        }, 4000);


        schedule(() => {

            activateConnectorContacts();

        }, 5100);


        schedule(() => {

            activate("#eightPositions");

        }, 7200);


        schedule(() => {

            activate("#eightContacts");

        }, 8800);


        /* ======================================
           12–18 SEC
           RJ45 TERMINOLOGY
        ====================================== */

        schedule(() => {

            showOnly("#rj45Terminology");

        }, 12000);


        schedule(() => {

            activate("#term8p8c");

        }, 13000);


        schedule(() => {

            activate("#termRj45");

        }, 15100);


        /* ======================================
           18–25 SEC
           EIGHT PINS
        ====================================== */

        schedule(() => {

            showOnly("#pinOverview");

        }, 18000);


        schedule(() => {

            activatePins();

        }, 19500);


        /* ======================================
           25–32 SEC
           T568A / T568B INTRO
        ====================================== */

        schedule(() => {

            showOnly("#standardsIntro");

        }, 25000);


        schedule(() => {

            activate("#standardAIntro");

        }, 26300);


        schedule(() => {

            activate("#standardBIntro");

        }, 28700);


        /* ======================================
           32–41 SEC
           T568A PINOUT
        ====================================== */

        schedule(() => {

            showOnly("#t568aCard");

        }, 32000);


        schedule(() => {

            activatePinout("a");

        }, 33500);


        /* ======================================
           41–50 SEC
           T568B PINOUT
        ====================================== */

        schedule(() => {

            showOnly("#t568bCard");

        }, 41000);


        schedule(() => {

            activatePinout("b");

        }, 42500);


        /* ======================================
           50–58 SEC
           A VS B
        ====================================== */

        schedule(() => {

            showOnly("#abComparison");

        }, 50000);


        schedule(() => {

            activate("#comparisonA");

        }, 51300);


        schedule(() => {

            activate("#comparisonB");

        }, 54100);


        /* ======================================
           58–66 SEC
           STRAIGHT-THROUGH
        ====================================== */

        schedule(() => {

            showOnly("#straightThrough");

        }, 58000);


        schedule(() => {

            activate("#straightEndOne");

        }, 59100);


        schedule(() => {

            activate("#straightSignal");

        }, 60500);


        schedule(() => {

            activate("#straightEndTwo");

        }, 62200);


        schedule(() => {

            activate(
                "#straightThrough .cable-rule"
            );

        }, 64000);


        /* ======================================
           66–74 SEC
           CROSSOVER
        ====================================== */

        schedule(() => {

            showOnly("#crossoverCable");

        }, 66000);


        schedule(() => {

            activate("#crossEndOne");

        }, 67100);


        schedule(() => {

            activate(
                "#crossoverCable .crossover-path"
            );

        }, 68600);


        schedule(() => {

            activate("#crossEndTwo");

        }, 70400);


        schedule(() => {

            activate(
                "#crossoverCable .cable-rule"
            );

        }, 72200);


        /* ======================================
           74–82 SEC
           TRADITIONAL DEVICE RULE
        ====================================== */

        schedule(() => {

            showOnly("#deviceRule");

        }, 74000);


        schedule(() => {

            activate("#differentDevices");

        }, 75200);


        schedule(() => {

            activate("#similarDevices");

        }, 78200);


        /* ======================================
           82–89 SEC
           AUTO-MDI/MDIX
        ====================================== */

        schedule(() => {

            showOnly("#autoMdix");

        }, 82000);


        schedule(() => {

            activate(
                "#autoMdix .auto-icon"
            );

        }, 83100);


        schedule(() => {

            activate("#autoResult");

        }, 85300);


        /* ======================================
           89–99 SEC
           TERMINATION PROCESS
        ====================================== */

        schedule(() => {

            showOnly("#terminationProcess");

        }, 89000);


        schedule(() => {

            activate("#terminationStep1");

        }, 90000);


        schedule(() => {

            activate("#terminationStep2");

        }, 91600);


        schedule(() => {

            activate("#terminationStep3");

        }, 93200);


        schedule(() => {

            activate("#terminationStep4");

        }, 94800);


        schedule(() => {

            activate("#terminationStep5");

        }, 96400);


        /* ======================================
           99–107 SEC
           CABLE TESTER
        ====================================== */

        schedule(() => {

            showOnly("#cableTester");

        }, 99000);


        schedule(() => {

            runCableTester();

        }, 100200);


        /* ======================================
           107–113 SEC
           EXAM MEMORY
        ====================================== */

        schedule(() => {

            showOnly("#examMemory");

        }, 107000);


        schedule(() => {

            activate("#memoryA");

        }, 107800);


        schedule(() => {

            activate("#memoryB");

        }, 108900);


        schedule(() => {

            activate("#memoryStraight");

        }, 110000);


        schedule(() => {

            activate("#memoryCross");

        }, 111100);


        /* ======================================
           113–116 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 113000);


        /* ======================================
           116–118 SEC
           FINAL CONCEPT
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

        }, 116000);

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