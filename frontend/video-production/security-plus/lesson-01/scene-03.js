/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 01 — SCENE 03
   SECURITY CONTROLS & DEFENSE IN DEPTH
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

        "#controlsIntro",

        "#controlTypesScene",

        "#preventiveScene",

        "#responseControlsScene",

        "#defenseScene",

        "#compensatingScene",

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
       INTRODUCTION
    ========================================== */

    function runIntro(){

        activate("#controlsCore");


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

            activate("#controlsBenefit");

        }, 2200);


        schedule(() => {

            activate("#defenseBenefit");

        }, 4200);

    }


    /* ==========================================
       SERVICE CARD
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
       CONTROL TYPES
    ========================================== */

    function runControlTypes(){

        schedule(() => {

            activate("#administrativeCard");

        }, 700);


        schedule(() => {

            activate("#technicalCard");

        }, 2500);


        schedule(() => {

            activate("#physicalCard");

        }, 4300);

    }


    /* ==========================================
       RESPONSE CONTROLS
    ========================================== */

    function runResponseControls(){

        schedule(() => {

            activate("#detectiveCard");

        }, 700);


        schedule(() => {

            activate("#correctiveCard");

        }, 2500);


        schedule(() => {

            activate("#recoveryCard");

        }, 4300);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryPrevent",

            "#memoryDetect",

            "#memoryCorrect",

            "#memoryRecover"

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
           01 — INTRODUCTION
        ======================================= */

        schedule(() => {

            showOnly("#controlsIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — CONTROL CATEGORIES
        ======================================= */

        schedule(() => {

            showOnly("#controlTypesScene");

            runControlTypes();

        }, 17000);


        /* ======================================
           03 — PREVENTIVE CONTROLS
        ======================================= */

        schedule(() => {

            showOnly("#preventiveScene");

            runService(
                "#preventiveIcon",
                "#preventiveFact"
            );

        }, 35000);


        /* ======================================
           04 — DETECTIVE / CORRECTIVE / RECOVERY
        ======================================= */

        schedule(() => {

            showOnly("#responseControlsScene");

            runResponseControls();

        }, 52000);


        /* ======================================
           05 — DEFENSE IN DEPTH
        ======================================= */

        schedule(() => {

            showOnly("#defenseScene");

            runService(
                "#defenseIcon",
                "#defenseFact"
            );

        }, 70000);


        /* ======================================
           06 — COMPENSATING CONTROLS
        ======================================= */

        schedule(() => {

            showOnly("#compensatingScene");

            runService(
                "#compensatingIcon",
                "#compensatingFact"
            );

        }, 87000);


        /* ======================================
           07 — MEMORY REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#memoryScene");

            runMemory();

        }, 103000);


        /* ======================================
           08 — SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");

        }, 116000);


        /* ======================================
           09 — FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 121000);

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

        if(
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ){

            event.preventDefault();

            playScene();

        }


        if(
            event.key === "r" ||
            event.key === "R"
        ){

            playScene();

        }


        if(
            event.key === "h" ||
            event.key === "H"
        ){

            document.body.classList.toggle(
                "recording-mode"
            );

        }


        if(
            event.key === "f" ||
            event.key === "F"
        ){

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