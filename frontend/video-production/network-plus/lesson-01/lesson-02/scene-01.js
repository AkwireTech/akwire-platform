/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 01
   NETWORK MEDIA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SCENE SETTINGS
    ========================================== */

    const SCENE_DURATION = 76000;

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

        if (!element) {
            return;
        }

        element.classList.add("is-visible");
    }


    function hide(selector) {

        const element = $(selector);

        if (!element) {
            return;
        }

        element.classList.remove(
            "is-visible",
            "is-active"
        );
    }


    function activate(selector) {

        const element = $(selector);

        if (!element) {
            return;
        }

        element.classList.add("is-active");
    }


    function deactivate(selector) {

        const element = $(selector);

        if (!element) {
            return;
        }

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

        "#networkOverview",
        "#physicalConnection",
        "#mediaFamilies",
        "#copperSignal",
        "#fiberSignal",
        "#wirelessSignal",
        "#mediaComparison",
        "#physicalLayer",
        "#keyDistinction",
        "#lessonRoadmap",
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

        if (!timeline) {
            return;
        }

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
           NETWORK OVERVIEW CHILDREN
        -------------------------------------- */

        $("#workstationNode")
            ?.classList.remove(
                "is-visible",
                "is-active"
            );

        $("#switchNode")
            ?.classList.remove(
                "is-visible",
                "is-active"
            );

        $(".connection-line")
            ?.classList.remove("is-visible");

        $("#signalPulse")
            ?.classList.remove("is-active");


        /* --------------------------------------
           MEDIA CARDS
        -------------------------------------- */

        $$(".media-card")
            .forEach(element => {

                element.classList.remove(
                    "is-visible",
                    "is-active"
                );
            });


        /* --------------------------------------
           SIGNAL VISUALS
        -------------------------------------- */

        $$(".signal-visual")
            .forEach(element => {

                element.classList.remove(
                    "is-active"
                );
            });


        /* --------------------------------------
           TIMELINE
        -------------------------------------- */

        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";
        }
    }


    /* ==========================================
       SCENE PLAYBACK
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
           4–10 SEC
           DEVICE TO DEVICE CONNECTION
        ====================================== */

        schedule(() => {

            showOnly("#networkOverview");

        }, 4000);


        schedule(() => {

            show("#workstationNode");
            activate("#workstationNode");

        }, 4500);


        schedule(() => {

            show(".connection-line");

        }, 5200);


        schedule(() => {

            activate("#signalPulse");

        }, 5700);


        schedule(() => {

            show("#switchNode");

        }, 6500);


        schedule(() => {

            activate("#switchNode");

        }, 7200);


        schedule(() => {

            deactivate("#workstationNode");
            deactivate("#switchNode");

        }, 9000);


        /* ======================================
           10–17 SEC
           NETWORKS NEED A MEDIUM
        ====================================== */

        schedule(() => {

            showOnly("#physicalConnection");

        }, 10000);


        schedule(() => {

            activate(
                "#physicalConnection .concept-flow > div:nth-of-type(1)"
            );

        }, 10800);


        schedule(() => {

            activate(
                "#physicalConnection .concept-flow > div:nth-of-type(2)"
            );

        }, 12000);


        schedule(() => {

            activate(
                "#physicalConnection .concept-flow > div:nth-of-type(3)"
            );

        }, 13200);


        schedule(() => {

            activate(
                "#physicalConnection .concept-flow > div:nth-of-type(4)"
            );

        }, 14400);


        /* ======================================
           17–25 SEC
           THREE MEDIA FAMILIES
        ====================================== */

        schedule(() => {

            showOnly("#mediaFamilies");

        }, 17000);


        schedule(() => {

            show("#copperMedia");

        }, 17600);


        schedule(() => {

            activate("#copperMedia");

        }, 18100);


        schedule(() => {

            show("#fiberMedia");

        }, 19000);


        schedule(() => {

            activate("#fiberMedia");

        }, 19500);


        schedule(() => {

            show("#wirelessMedia");

        }, 20400);


        schedule(() => {

            activate("#wirelessMedia");

        }, 20900);


        /* ======================================
           25–31 SEC
           COPPER
        ====================================== */

        schedule(() => {

            showOnly("#copperSignal");

        }, 25000);


        schedule(() => {

            activate(
                "#copperSignal .copper-visual"
            );

        }, 25800);


        /* ======================================
           31–37 SEC
           FIBER
        ====================================== */

        schedule(() => {

            showOnly("#fiberSignal");

        }, 31000);


        schedule(() => {

            activate(
                "#fiberSignal .fiber-visual"
            );

        }, 31800);


        /* ======================================
           37–43 SEC
           WIRELESS
        ====================================== */

        schedule(() => {

            showOnly("#wirelessSignal");

        }, 37000);


        schedule(() => {

            activate(
                "#wirelessSignal .wireless-visual"
            );

        }, 37800);


        /* ======================================
           43–51 SEC
           MEDIA SELECTION FACTORS
        ====================================== */

        schedule(() => {

            showOnly("#mediaComparison");

        }, 43000);


        schedule(() => {

            activate(
                "#mediaComparison .comparison-grid > div:nth-child(1)"
            );

        }, 43800);


        schedule(() => {

            activate(
                "#mediaComparison .comparison-grid > div:nth-child(2)"
            );

        }, 44900);


        schedule(() => {

            activate(
                "#mediaComparison .comparison-grid > div:nth-child(3)"
            );

        }, 46000);


        schedule(() => {

            activate(
                "#mediaComparison .comparison-grid > div:nth-child(4)"
            );

        }, 47100);


        schedule(() => {

            activate(
                "#mediaComparison .comparison-grid > div:nth-child(5)"
            );

        }, 48200);


        /* ======================================
           51–58 SEC
           OSI PHYSICAL LAYER
        ====================================== */

        schedule(() => {

            showOnly("#physicalLayer");

        }, 51000);


        schedule(() => {

            activate(
                "#physicalLayer .layer-items > div:nth-child(1)"
            );

        }, 51800);


        schedule(() => {

            activate(
                "#physicalLayer .layer-items > div:nth-child(2)"
            );

        }, 52800);


        schedule(() => {

            activate(
                "#physicalLayer .layer-items > div:nth-child(3)"
            );

        }, 53800);


        schedule(() => {

            activate(
                "#physicalLayer .layer-items > div:nth-child(4)"
            );

        }, 54800);


        /* ======================================
           58–64 SEC
           LOGICAL DATA VS PHYSICAL SIGNAL
        ====================================== */

        schedule(() => {

            showOnly("#keyDistinction");

        }, 58000);


        /* ======================================
           64–69 SEC
           LESSON ROADMAP
        ====================================== */

        schedule(() => {

            showOnly("#lessonRoadmap");

        }, 64000);


        schedule(() => {

            activate(
                "#lessonRoadmap .roadmap-flow > div:nth-of-type(1)"
            );

        }, 64600);


        schedule(() => {

            activate(
                "#lessonRoadmap .roadmap-flow > div:nth-of-type(2)"
            );

        }, 65200);


        schedule(() => {

            activate(
                "#lessonRoadmap .roadmap-flow > div:nth-of-type(3)"
            );

        }, 65800);


        schedule(() => {

            activate(
                "#lessonRoadmap .roadmap-flow > div:nth-of-type(4)"
            );

        }, 66400);


        schedule(() => {

            activate(
                "#lessonRoadmap .roadmap-flow > div:nth-of-type(5)"
            );

        }, 67000);


        /* ======================================
           69–72.5 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 69000);


        /* ======================================
           72.5–76 SEC
           FINAL CONCEPT
        ====================================== */

        schedule(() => {

            showOnly("#finalConcept");

        }, 72500);

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