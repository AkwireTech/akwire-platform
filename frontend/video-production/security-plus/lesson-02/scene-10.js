/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 03 — SCENE 10
   NETWORK SECURITY ARCHITECTURE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

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

        const timer = setTimeout(callback, delay);

        timers.push(timer);

    }


    function clearTimers() {

        timers.forEach(timer => clearTimeout(timer));

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
       CONTENT PANELS
    ========================================== */

    const content = [

        "#networkIntro",
        "#segmentationScene",
        "#vlanScene",
        "#dmzScene",
        "#zeroTrustScene",
        "#containmentScene",
        "#memoryScene",
        "#sceneSummary",
        "#finalConcept"

    ];


    function hideContent() {

        content.forEach(section => {

            hide(section);

        });

    }


    function showOnly(selector) {

        hideContent();

        show(selector);

    }


    function clearActiveStates() {

        $$(".is-active").forEach(element => {

            element.classList.remove("is-active");

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


        $(".scene-brand")
            ?.classList.remove("is-visible");


        $(".scene-title")
            ?.classList.remove("is-visible");


        $$(".background-glow").forEach(glow => {

            glow.classList.remove("is-visible");

        });


        if (timeline) {

            timeline.style.transition = "none";

            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       GENERIC SEQUENCE
    ========================================== */

    function runSequence(
        selectors,
        interval = 1300,
        initialDelay = 700
    ) {

        selectors.forEach((selector, index) => {

            schedule(() => {

                activate(selector);

            }, initialDelay + (index * interval));

        });

    }


    /* ==========================================
       NETWORK INTRO
    ========================================== */

    function runNetworkIntro() {

        activate("#networkCore");


        schedule(() => {

            activate(".ring-1");

        }, 400);


        schedule(() => {

            activate(".ring-2");

        }, 750);


        schedule(() => {

            activate(".ring-3");

        }, 1100);


        schedule(() => {

            activate("#segmentationBenefit");

        }, 2400);


        schedule(() => {

            activate("#containmentBenefit");

        }, 4500);

    }


    /* ==========================================
       SEGMENTATION
    ========================================== */

    function runSegmentation() {

        runSequence([

            "#userSegment",
            "#serverSegment",
            "#databaseSegment",
            "#managementSegment"

        ], 1250);


        schedule(() => {

            activate("#segmentationRule");

        }, 5700);

    }


    /* ==========================================
       VLAN
    ========================================== */

    function runVLAN() {

        schedule(() => {

            activate("#vlanIcon");

        }, 700);


        schedule(() => {

            activate("#vlanFact");

        }, 2500);

    }


    /* ==========================================
       DMZ
    ========================================== */

    function runDMZ() {

        runSequence([

            "#internetZone",
            "#dmzZone",
            "#internalZone"

        ], 1350);


        schedule(() => {

            activate("#dmzRule");

        }, 4900);

    }


    /* ==========================================
       ZERO TRUST
    ========================================== */

    function runZeroTrust() {

        schedule(() => {

            activate("#zeroTrustIcon");

        }, 700);


        schedule(() => {

            activate("#zeroTrustFact");

        }, 2600);

    }


    /* ==========================================
       CONTAINMENT
    ========================================== */

    function runContainment() {

        schedule(() => {

            activate("#attackStart");

        }, 700);


        schedule(() => {

            activate("#blockedPath");

        }, 2200);


        schedule(() => {

            activate("#protectedAssets");

        }, 3900);

    }


    /* ==========================================
       MEMORY
    ========================================== */

    function runMemory() {

        runSequence([

            "#memoryDivide",
            "#memoryControl",
            "#memoryVerify",
            "#memoryContain"

        ], 1200);

    }


    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene() {

        resetScene();

        startTimeline();


        /* ======================================
           BRAND
        ======================================= */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        /* ======================================
           BACKGROUND
        ======================================= */

        schedule(() => {

            show(".glow-left");
            show(".glow-center");
            show(".glow-right");

        }, 700);


        /* ======================================
           TITLE
        ======================================= */

        schedule(() => {

            show(".scene-title");

        }, 1200);


        /* ======================================
           01 — NETWORK ARCHITECTURE INTRO
        ======================================= */

        schedule(() => {

            showOnly("#networkIntro");

            runNetworkIntro();

        }, 4000);


        /* ======================================
           02 — SEGMENTATION
        ======================================= */

        schedule(() => {

            showOnly("#segmentationScene");

            runSegmentation();

        }, 18000);


        /* ======================================
           03 — VLANs
        ======================================= */

        schedule(() => {

            showOnly("#vlanScene");

            runVLAN();

        }, 35000);


        /* ======================================
           04 — DMZ
        ======================================= */

        schedule(() => {

            showOnly("#dmzScene");

            runDMZ();

        }, 51000);


        /* ======================================
           05 — ZERO TRUST
        ======================================= */

        schedule(() => {

            showOnly("#zeroTrustScene");

            runZeroTrust();

        }, 69000);


        /* ======================================
           06 — THREAT CONTAINMENT
        ======================================= */

        schedule(() => {

            showOnly("#containmentScene");

            runContainment();

        }, 86000);


        /* ======================================
           07 — MEMORY REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#memoryScene");

            runMemory();

        }, 101000);


        /* ======================================
           08 — SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 113000);


        /* ======================================
           09 — FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 119000);


        /* ======================================
           COMPLETE
        ======================================= */

        schedule(() => {

            if (!timeline) return;

            timeline.style.transition = "none";

            timeline.style.width = "100%";

        }, SCENE_DURATION);

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

    document.addEventListener("keydown", event => {

        const tag =
            event.target?.tagName?.toUpperCase();

        const typing =
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT";


        if (
            event.code === "Space" &&
            !typing
        ) {

            event.preventDefault();

            playScene();

        }


        if (
            event.key === "r" ||
            event.key === "R"
        ) {

            if (!typing) {

                playScene();

            }

        }


        if (
            event.key === "h" ||
            event.key === "H"
        ) {

            if (!typing) {

                document.body.classList.toggle(
                    "recording-mode"
                );

            }

        }


        if (
            event.key === "f" ||
            event.key === "F"
        ) {

            if (typing) return;


            if (!document.fullscreenElement) {

                document.documentElement
                    .requestFullscreen?.()
                    .catch(() => {});

            } else {

                document.exitFullscreen?.()
                    .catch(() => {});

            }

        }

    });


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