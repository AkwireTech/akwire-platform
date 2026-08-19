/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 01 — SCENE 01
   CIA TRIAD & CORE SECURITY PRINCIPLES
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


    function schedule(callback, delay){

        const timer = setTimeout(callback, delay);

        timers.push(timer);

    }


    function clearTimers(){

        timers.forEach(timer => {

            clearTimeout(timer);

        });

        timers = [];

    }


    function show(selector){

        const element = $(selector);

        if(!element) return;

        element.classList.add("is-visible");

    }


    function hide(selector){

        const element = $(selector);

        if(!element) return;

        element.classList.remove(
            "is-visible",
            "is-active"
        );

    }


    function activate(selector){

        const element = $(selector);

        if(!element) return;

        element.classList.add("is-active");

    }


    /* ==========================================
       SCENE CONTENT
    ========================================== */

    const content = [

        "#securityIntro",

        "#ciaScene",

        "#principlesScene",

        "#aaaScene",

        "#zeroTrustScene",

        "#memoryScene",

        "#sceneSummary",

        "#finalConcept"

    ];


    function hideContent(){

        content.forEach(section => {

            hide(section);

        });

    }


    function showOnly(section){

        hideContent();

        show(section);

    }


    function clearActiveStates(){

        $$(".is-active").forEach(item => {

            item.classList.remove("is-active");

        });

    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline(){

        if(!timeline) return;

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

    function resetScene(){

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


        if(timeline){

            timeline.style.transition = "none";

            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       INTRO
    ========================================== */

    function runIntro(){

        activate("#securityCore");


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

            activate("#securityBenefit");

        }, 2200);


        schedule(() => {

            activate("#securityGoal");

        }, 4200);

    }


    /* ==========================================
       SERVICE CARD ANIMATION
    ========================================== */

    function runService(icon, fact){

        schedule(() => {

            activate(icon);

        }, 700);


        schedule(() => {

            activate(fact);

        }, 2400);

    }


    /* ==========================================
       CIA TRIAD ANIMATION
    ========================================== */

    function runCIA(){

        schedule(() => {

            activate("#confidentialityCard");

        }, 700);


        schedule(() => {

            activate("#integrityCard");

        }, 2600);


        schedule(() => {

            activate("#availabilityCard");

        }, 4500);

    }


    /* ==========================================
       AAA ANIMATION
    ========================================== */

    function runAAA(){

        schedule(() => {

            activate("#authenticationCard");

        }, 700);


        schedule(() => {

            activate("#authorizationCard");

        }, 2500);


        schedule(() => {

            activate("#accountingCard");

        }, 4300);

    }


    /* ==========================================
       MEMORY ANIMATION
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryConfidentiality",

            "#memoryIntegrity",

            "#memoryAvailability",

            "#memoryAAA"

        ];


        cards.forEach((card, index) => {

            schedule(() => {

                activate(card);

            }, 700 + (index * 1100));

        });

    }


    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene(){

        resetScene();

        startTimeline();


        /* BRAND */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        /* BACKGROUND */

        schedule(() => {

            show(".glow-left");

            show(".glow-center");

            show(".glow-right");

        }, 700);


        /* TITLE */

        schedule(() => {

            show(".scene-title");

        }, 1200);


        /* ======================================
           01 — INTRODUCTION
        ======================================= */

        schedule(() => {

            showOnly("#securityIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — CIA TRIAD
        ======================================= */

        schedule(() => {

            showOnly("#ciaScene");

            runCIA();

        }, 17000);


        /* ======================================
           03 — CORE PRINCIPLES
        ======================================= */

        schedule(() => {

            showOnly("#principlesScene");

            runService(
                "#principlesIcon",
                "#principlesFact"
            );

        }, 35000);


        /* ======================================
           04 — AAA
        ======================================= */

        schedule(() => {

            showOnly("#aaaScene");

            runAAA();

        }, 52000);


        /* ======================================
           05 — ZERO TRUST
        ======================================= */

        schedule(() => {

            showOnly("#zeroTrustScene");

            runService(
                "#zeroTrustIcon",
                "#zeroTrustFact"
            );

        }, 70000);


        /* ======================================
           06 — MEMORY REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#memoryScene");

            runMemory();

        }, 88000);


        /* ======================================
           07 — SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 106000);


        /* ======================================
           08 — FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 119000);

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

        /* SPACE — PLAY */

        if(
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ){

            event.preventDefault();

            playScene();

        }


        /* R — RESTART */

        if(event.key === "r" || event.key === "R"){

            playScene();

        }


        /* H — RECORDING MODE */

        if(event.key === "h" || event.key === "H"){

            document.body.classList.toggle(
                "recording-mode"
            );

        }


        /* F — FULLSCREEN */

        if(event.key === "f" || event.key === "F"){

            if(!document.fullscreenElement){

                document.documentElement
                    .requestFullscreen?.();

            }else{

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


    if(params.get("record") === "1"){

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