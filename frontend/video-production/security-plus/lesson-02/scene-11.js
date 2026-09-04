/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 03 — SCENE 11
   CLOUD & VIRTUALIZATION SECURITY ARCHITECTURE
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

        "#cloudIntro",
        "#serviceModelScene",
        "#virtualizationScene",
        "#cloudNetworkScene",
        "#storageScene",
        "#cloudContainmentScene",
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
       CLOUD INTRO
    ========================================== */

    function runCloudIntro() {

        activate("#cloudCore");


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

            activate("#cloudVisibility");

        }, 2400);


        schedule(() => {

            activate("#cloudConfiguration");

        }, 4500);

    }


    /* ==========================================
       SERVICE MODELS
    ========================================== */

    function runServiceModels() {

        runSequence([

            "#iaasCard",
            "#paasCard",
            "#saasCard"

        ], 1400);


        schedule(() => {

            activate("#sharedResponsibility");

        }, 5100);

    }


    /* ==========================================
       VIRTUALIZATION
    ========================================== */

    function runVirtualization() {

        schedule(() => {

            activate("#hypervisorIcon");

        }, 700);


        schedule(() => {

            activate("#hypervisorFact");

        }, 2600);

    }


    /* ==========================================
       CLOUD NETWORK
    ========================================== */

    function runCloudNetwork() {

        runSequence([

            "#publicCloudZone",
            "#securityBoundary",
            "#privateCloudZone"

        ], 1350);


        schedule(() => {

            activate("#cloudNetworkRule");

        }, 4900);

    }


    /* ==========================================
       STORAGE
    ========================================== */

    function runStorage() {

        schedule(() => {

            activate("#storageIcon");

        }, 700);


        schedule(() => {

            activate("#storageFact");

        }, 2600);

    }


    /* ==========================================
       CLOUD CONTAINMENT
    ========================================== */

    function runCloudContainment() {

        schedule(() => {

            activate("#compromisedWorkload");

        }, 700);


        schedule(() => {

            activate("#cloudIsolation");

        }, 2200);


        schedule(() => {

            activate("#cloudProtectedData");

        }, 3900);

    }


    /* ==========================================
       MEMORY
    ========================================== */

    function runMemory() {

        runSequence([

            "#memoryModel",
            "#memoryResponsibility",
            "#memoryConfigure",
            "#memoryProtect"

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
           01 — CLOUD INTRO
        ======================================= */

        schedule(() => {

            showOnly("#cloudIntro");

            runCloudIntro();

        }, 4000);


        /* ======================================
           02 — SERVICE MODELS
        ======================================= */

        schedule(() => {

            showOnly("#serviceModelScene");

            runServiceModels();

        }, 18000);


        /* ======================================
           03 — VIRTUALIZATION
        ======================================= */

        schedule(() => {

            showOnly("#virtualizationScene");

            runVirtualization();

        }, 35000);


        /* ======================================
           04 — CLOUD NETWORK
        ======================================= */

        schedule(() => {

            showOnly("#cloudNetworkScene");

            runCloudNetwork();

        }, 51000);


        /* ======================================
           05 — STORAGE
        ======================================= */

        schedule(() => {

            showOnly("#storageScene");

            runStorage();

        }, 69000);


        /* ======================================
           06 — THREAT CONTAINMENT
        ======================================= */

        schedule(() => {

            showOnly("#cloudContainmentScene");

            runCloudContainment();

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