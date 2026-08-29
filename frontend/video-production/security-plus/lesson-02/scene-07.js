/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 02 — SCENE 07
   IDENTITY MANAGEMENT & ACCOUNT SECURITY
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

        const timer = setTimeout(
            callback,
            delay
        );

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

        "#identityIntro",

        "#lifecycleScene",

        "#jmlScene",

        "#accountTypesScene",

        "#protectionScene",

        "#reviewScene",

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
       IDENTITY INTRO
    ========================================== */

    function runIntro(){

        activate("#identityCore");


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

            activate("#identityLifecycleBenefit");

        }, 2200);


        schedule(() => {

            activate("#identitySecurityBenefit");

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
       THREE-CARD SEQUENCE
    ========================================== */

    function runThreeCards(
        first,
        second,
        third
    ){

        schedule(() => {

            activate(first);

        }, 700);


        schedule(() => {

            activate(second);

        }, 2500);


        schedule(() => {

            activate(third);

        }, 4300);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryCreate",

            "#memoryUse",

            "#memoryReview",

            "#memoryRemove"

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
           01 — IDENTITY MANAGEMENT INTRO
        ======================================= */

        schedule(() => {

            showOnly("#identityIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — ACCOUNT LIFECYCLE
        ======================================= */

        schedule(() => {

            showOnly("#lifecycleScene");

            runThreeCards(
                "#createCard",
                "#modifyCard",
                "#removeCard"
            );

        }, 17000);


        /* ======================================
           03 — JOINER / MOVER / LEAVER
        ======================================= */

        schedule(() => {

            showOnly("#jmlScene");

            runService(
                "#jmlIcon",
                "#jmlFact"
            );

        }, 35000);


        /* ======================================
           04 — ACCOUNT TYPES
        ======================================= */

        schedule(() => {

            showOnly("#accountTypesScene");

            runThreeCards(
                "#standardAccountCard",
                "#privilegedAccountCard",
                "#serviceAccountCard"
            );

        }, 52000);


        /* ======================================
           05 — ACCOUNT PROTECTION
        ======================================= */

        schedule(() => {

            showOnly("#protectionScene");

            runService(
                "#protectionIcon",
                "#protectionFact"
            );

        }, 70000);


        /* ======================================
           06 — ACCESS REVIEW
        ======================================= */

        schedule(() => {

            showOnly("#reviewScene");

            runThreeCards(
                "#verifyCard",
                "#evaluateCard",
                "#correctCard"
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