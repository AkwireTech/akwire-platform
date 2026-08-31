/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 03 — SCENE 09
   SECURITY ARCHITECTURE FUNDAMENTALS
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
       SCENE CONTENT
    ========================================== */

    const content = [

        "#architectureIntro",
        "#componentsScene",
        "#defenseScene",
        "#controlsScene",
        "#designScene",
        "#memoryScene",
        "#sceneSummary",
        "#finalConcept"

    ];


    function hideContent() {

        content.forEach(section => hide(section));

    }


    function showOnly(section) {

        hideContent();

        show(section);

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
       INTRO
    ========================================== */

    function runArchitectureIntro() {

        activate("#architectureCore");


        schedule(() => {

            activate(".ring-1");

        }, 400);


        schedule(() => {

            activate(".ring-2");

        }, 700);


        schedule(() => {

            activate(".ring-3");

        }, 1000);


        schedule(() => {

            activate("#designBenefit");

        }, 2300);


        schedule(() => {

            activate("#defenseBenefit");

        }, 4400);

    }


    /* ==========================================
       GENERIC SEQUENCE
    ========================================== */

    function runSequence(items, interval = 1400) {

        items.forEach((item, index) => {

            schedule(() => {

                activate(item);

            }, 700 + (index * interval));

        });

    }


    /* ==========================================
       DEFENSE IN DEPTH
    ========================================== */

    function runDefense() {

        schedule(() => {

            activate("#defenseIcon");

        }, 700);


        schedule(() => {

            activate("#defenseFact");

        }, 2400);

    }


    /* ==========================================
       SECURE DESIGN
    ========================================== */

    function runDesign() {

        schedule(() => {

            activate("#designIcon");

        }, 700);


        schedule(() => {

            activate("#designFact");

        }, 2400);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory() {

        runSequence([

            "#memoryDesign",
            "#memoryLayer",
            "#memoryProtect",
            "#memoryAdapt"

        ], 1150);

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
           01 — ARCHITECTURE INTRO
        ======================================= */

        schedule(() => {

            showOnly("#architectureIntro");

            runArchitectureIntro();

        }, 4000);


        /* ======================================
           02 — ARCHITECTURE COMPONENTS
        ======================================= */

        schedule(() => {

            showOnly("#componentsScene");

            runSequence([

                "#peopleCard",
                "#processCard",
                "#technologyCard"

            ], 1500);

        }, 18000);


        /* ======================================
           03 — DEFENSE IN DEPTH
        ======================================= */

        schedule(() => {

            showOnly("#defenseScene");

            runDefense();

        }, 35000);


        /* ======================================
           04 — SECURITY CONTROLS
        ======================================= */

        schedule(() => {

            showOnly("#controlsScene");

            runSequence([

                "#preventiveCard",
                "#detectiveCard",
                "#correctiveCard"

            ], 1500);

        }, 52000);


        /* ======================================
           05 — SECURE DESIGN
        ======================================= */

        schedule(() => {

            showOnly("#designScene");

            runDesign();

        }, 70000);


        /* ======================================
           06 — MEMORY REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#memoryScene");

            runMemory();

        }, 87000);


        /* ======================================
           07 — SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 104000);


        /* ======================================
           08 — FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 114000);


        /* ======================================
           COMPLETE
        ======================================= */

        schedule(() => {

            if (timeline) {

                timeline.style.transition = "none";
                timeline.style.width = "100%";

            }

        }, SCENE_DURATION);

    }


    /* ==========================================
       CONTROLS
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

    });


    /* ==========================================
       RECORDING MODE
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