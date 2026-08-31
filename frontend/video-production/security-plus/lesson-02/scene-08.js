/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 02 — SCENE 08
   IDENTITY & ACCESS FUNDAMENTALS
   FINAL REVIEW
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

        const timer = setTimeout(
            callback,
            delay
        );

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
       SCENE CONTENT
    ========================================== */

    const content = [

        "#reviewIntro",
        "#foundationsScene",
        "#decisionScene",
        "#principlesScene",
        "#knowledgeCheck",
        "#memoryScene",
        "#sceneSummary",
        "#finalConcept"

    ];


    function hideContent() {

        content.forEach(section => {

            hide(section);

        });

    }


    function showOnly(section) {

        hideContent();

        show(section);

    }


    function clearActiveStates() {

        $$(".is-active").forEach(item => {

            item.classList.remove("is-active");

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
       INTRODUCTION
    ========================================== */

    function runIntro() {

        activate("#reviewCoreIcon");


        schedule(() => {

            activate(".ring-1");

        }, 400);


        schedule(() => {

            activate(".ring-2");

        }, 700);


        schedule(() => {

            activate(".ring-3");

        }, 1000);

    }


    /* ==========================================
       SEQUENCE HELPERS
    ========================================== */

    function runSequence(items, interval = 1400) {

        items.forEach((item, index) => {

            schedule(() => {

                activate(item);

            }, 700 + (index * interval));

        });

    }


    /* ==========================================
       FOUNDATIONS
    ========================================== */

    function runFoundations() {

        runSequence([

            "#identityCard",
            "#authenticationCard",
            "#authorizationCard",
            "#managementCard"

        ], 1250);

    }


    /* ==========================================
       ACCESS DECISION
    ========================================== */

    function runDecisionFlow() {

        runSequence([

            "#requestStep",
            "#authenticateStep",
            "#authorizeStep",
            "#accessStep"

        ], 1200);

    }


    /* ==========================================
       PRINCIPLES
    ========================================== */

    function runPrinciples() {

        runSequence([

            "#leastPrivilegeCard",
            "#needToKnowCard",
            "#accountabilityCard"

        ], 1700);

    }


    /* ==========================================
       KNOWLEDGE CHECK
    ========================================== */

    function runKnowledgeCheck() {

        runSequence([

            "#questionOne",
            "#questionTwo",
            "#questionThree"

        ], 1800);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory() {

        runSequence([

            "#memoryWho",
            "#memoryProof",
            "#memoryAccess",
            "#memoryLifecycle"

        ], 1100);

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
           01 — LESSON REVIEW INTRO
        ======================================= */

        schedule(() => {

            showOnly("#reviewIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — FOUR FOUNDATIONS
        ======================================= */

        schedule(() => {

            showOnly("#foundationsScene");

            runFoundations();

        }, 16000);


        /* ======================================
           03 — ACCESS DECISION FLOW
        ======================================= */

        schedule(() => {

            showOnly("#decisionScene");

            runDecisionFlow();

        }, 34000);


        /* ======================================
           04 — SECURITY PRINCIPLES
        ======================================= */

        schedule(() => {

            showOnly("#principlesScene");

            runPrinciples();

        }, 52000);


        /* ======================================
           05 — KNOWLEDGE CHECK
        ======================================= */

        schedule(() => {

            showOnly("#knowledgeCheck");

            runKnowledgeCheck();

        }, 70000);


        /* ======================================
           06 — MEMORY MAP
        ======================================= */

        schedule(() => {

            showOnly("#memoryScene");

            runMemory();

        }, 88000);


        /* ======================================
           07 — FINAL SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 105000);


        /* ======================================
           08 — FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 114000);

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
       KEYBOARD SHORTCUTS
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