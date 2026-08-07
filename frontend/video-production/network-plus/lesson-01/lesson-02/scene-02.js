/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 02
   COPPER ETHERNET & TWISTED-PAIR CABLING
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SCENE SETTINGS
    ========================================== */

    const SCENE_DURATION = 92000;

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


    function deactivateAll() {

        $$(".is-active").forEach(element => {

            element.classList.remove(
                "is-active"
            );
        });
    }


    /* ==========================================
       MAIN CONTENT
    ========================================== */

    const contentElements = [

        "#ethernetOverview",
        "#twistedPairIntro",
        "#whyTwisted",
        "#shieldingComparison",
        "#emiExample",
        "#categoryIntro",
        "#categoryTable",
        "#distanceLimit",
        "#conductorTypes",
        "#jacketTypes",
        "#copperDecision",
        "#sceneSummary",
        "#finalConcept"

    ];


    function hideContent() {

        contentElements.forEach(selector => {
            hide(selector);
        });

        deactivateAll();
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
           OPENING CONNECTION
        -------------------------------------- */

        $("#computerNode")
            ?.classList.remove(
                "is-visible",
                "is-active"
            );

        $("#switchNode")
            ?.classList.remove(
                "is-visible",
                "is-active"
            );

        $("#ethernetCable")
            ?.classList.remove("is-visible");

        $("#dataPulse")
            ?.classList.remove("is-active");


        /* --------------------------------------
           UTP / STP
        -------------------------------------- */

        $$(".shield-type")
            .forEach(element => {

                element.classList.remove(
                    "is-visible",
                    "is-active"
                );
            });


        /* --------------------------------------
           CATEGORY ITEMS
        -------------------------------------- */

        $$(".category-item")
            .forEach(element => {

                element.classList.remove(
                    "is-active"
                );
            });


        /* --------------------------------------
           CATEGORY TABLE
        -------------------------------------- */

        $$(".spec-row")
            .forEach(element => {

                if (
                    !element.classList.contains(
                        "spec-heading"
                    )
                ) {

                    element.classList.remove(
                        "is-active"
                    );
                }
            });


        /* --------------------------------------
           DISTANCE
        -------------------------------------- */

        $(".distance-line")
            ?.classList.remove("is-active");


        /* --------------------------------------
           EMI
        -------------------------------------- */

        $(".environment-visual")
            ?.classList.remove("is-active");


        /* --------------------------------------
           TIMELINE
        -------------------------------------- */

        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";
        }
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

        }, 700);


        schedule(() => {

            show(".scene-title");

        }, 1100);


        /* ======================================
           4–11 SEC
           COPPER ETHERNET CONNECTION
        ====================================== */

        schedule(() => {

            showOnly("#ethernetOverview");

        }, 4000);


        schedule(() => {

            show("#computerNode");
            activate("#computerNode");

        }, 4500);


        schedule(() => {

            show("#ethernetCable");

        }, 5400);


        schedule(() => {

            activate("#dataPulse");

        }, 6100);


        schedule(() => {

            show("#switchNode");

        }, 7000);


        schedule(() => {

            activate("#switchNode");

        }, 7600);


        schedule(() => {

            deactivate("#computerNode");
            deactivate("#switchNode");

        }, 9800);


        /* ======================================
           11–19 SEC
           TWISTED-PAIR STRUCTURE
        ====================================== */

        schedule(() => {

            showOnly("#twistedPairIntro");

        }, 11000);


        schedule(() => {

            activate(
                "#twistedPairIntro .pair-count"
            );

        }, 12500);


        schedule(() => {

            activate(
                "#twistedPairIntro .wire-count"
            );

        }, 14300);


        /* ======================================
           19–27 SEC
           WHY THE WIRES ARE TWISTED
        ====================================== */

        schedule(() => {

            showOnly("#whyTwisted");

        }, 19000);


        schedule(() => {

            activate(
                "#whyTwisted .noise-source"
            );

        }, 19800);


        schedule(() => {

            activate(
                "#whyTwisted .twisted-demo"
            );

        }, 21600);


        schedule(() => {

            activate(
                "#whyTwisted .clean-signal"
            );

        }, 23500);


        /* ======================================
           27–35 SEC
           UTP VS STP
        ====================================== */

        schedule(() => {

            showOnly("#shieldingComparison");

        }, 27000);


        schedule(() => {

            show("#utpCard");

        }, 27600);


        schedule(() => {

            activate("#utpCard");

        }, 28300);


        schedule(() => {

            show("#stpCard");

        }, 30300);


        schedule(() => {

            activate("#stpCard");

        }, 31000);


        /* ======================================
           35–42 SEC
           EMI ENVIRONMENT
        ====================================== */

        schedule(() => {

            showOnly("#emiExample");

        }, 35000);


        schedule(() => {

            activate(
                "#emiExample .environment-visual"
            );

        }, 36000);


        /* ======================================
           42–51 SEC
           CABLE CATEGORIES
        ====================================== */

        schedule(() => {

            showOnly("#categoryIntro");

        }, 42000);


        schedule(() => {

            activate("#cat5e");

        }, 43000);


        schedule(() => {

            activate("#cat6");

        }, 44500);


        schedule(() => {

            activate("#cat6a");

        }, 46000);


        schedule(() => {

            activate("#cat8");

        }, 47500);


        /* ======================================
           51–61 SEC
           CATEGORY REFERENCE TABLE
        ====================================== */

        schedule(() => {

            showOnly("#categoryTable");

        }, 51000);


        schedule(() => {

            activate("#cat5eRow");

        }, 52000);


        schedule(() => {

            activate("#cat6Row");

        }, 53800);


        schedule(() => {

            activate("#cat6aRow");

        }, 55600);


        schedule(() => {

            activate("#cat8Row");

        }, 57400);


        /* ======================================
           61–69 SEC
           100-METER CHANNEL
        ====================================== */

        schedule(() => {

            showOnly("#distanceLimit");

        }, 61000);


        schedule(() => {

            activate(
                "#distanceLimit .distance-line"
            );

        }, 62000);


        schedule(() => {

            activate(
                "#distanceLimit .distance-breakdown > div:nth-of-type(1)"
            );

        }, 63800);


        schedule(() => {

            activate(
                "#distanceLimit .distance-breakdown > div:nth-of-type(2)"
            );

        }, 65200);


        schedule(() => {

            activate(
                "#distanceLimit .distance-breakdown > div:nth-of-type(3)"
            );

        }, 66600);


        /* ======================================
           69–76 SEC
           SOLID VS STRANDED
        ====================================== */

        schedule(() => {

            showOnly("#conductorTypes");

        }, 69000);


        schedule(() => {

            activate("#solidCable");

        }, 70000);


        schedule(() => {

            activate("#strandedCable");

        }, 72400);


        /* ======================================
           76–82 SEC
           PLENUM VS PVC
        ====================================== */

        schedule(() => {

            showOnly("#jacketTypes");

        }, 76000);


        schedule(() => {

            activate("#pvcCable");

        }, 77000);


        schedule(() => {

            activate("#plenumCable");

        }, 79000);


        /* ======================================
           82–87 SEC
           CHOOSING COPPER CABLING
        ====================================== */

        schedule(() => {

            showOnly("#copperDecision");

        }, 82000);


        schedule(() => {

            activate(
                "#copperDecision .decision-flow > div:nth-of-type(1)"
            );

        }, 82700);


        schedule(() => {

            activate(
                "#copperDecision .decision-flow > div:nth-of-type(2)"
            );

        }, 83800);


        schedule(() => {

            activate(
                "#copperDecision .decision-flow > div:nth-of-type(3)"
            );

        }, 84900);


        schedule(() => {

            activate(
                "#copperDecision .decision-flow > div:nth-of-type(4)"
            );

        }, 86000);


        /* ======================================
           87–89.5 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 87000);


        /* ======================================
           89.5–92 SEC
           FINAL CONCEPT
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

        }, 89500);

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