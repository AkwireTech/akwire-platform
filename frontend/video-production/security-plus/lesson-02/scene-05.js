/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 02 — SCENE 05
   AUTHENTICATION & IDENTITY
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

        "#identityIntro",

        "#factorScene",

        "#mfaScene",

        "#passwordScene",

        "#biometricScene",

        "#authDifferenceScene",

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

            activate("#identityBenefit");

        }, 2200);


        schedule(() => {

            activate("#authenticationBenefit");

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
       AUTHENTICATION FACTORS
    ========================================== */

    function runFactors(){

        schedule(() => {

            activate("#knowledgeCard");

        }, 700);


        schedule(() => {

            activate("#possessionCard");

        }, 2500);


        schedule(() => {

            activate("#inherenceCard");

        }, 4300);

    }


    /* ==========================================
       PASSWORD SECURITY
    ========================================== */

    function runPasswordSecurity(){

        schedule(() => {

            activate("#passwordLengthCard");

        }, 700);


        schedule(() => {

            activate("#passwordUniqueCard");

        }, 2500);


        schedule(() => {

            activate("#passwordManagerCard");

        }, 4300);

    }


    /* ==========================================
       AUTHENTICATION VS AUTHORIZATION
    ========================================== */

    function runAuthDifference(){

        schedule(() => {

            activate("#authenticationCard");

        }, 700);


        schedule(() => {

            activate("#authorizationCard");

        }, 2500);


        schedule(() => {

            activate("#accountabilityCard");

        }, 4300);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryKnow",

            "#memoryHave",

            "#memoryAre",

            "#memoryMfa"

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
           01 — IDENTITY INTRO
        ======================================= */

        schedule(() => {

            showOnly("#identityIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — AUTHENTICATION FACTORS
        ======================================= */

        schedule(() => {

            showOnly("#factorScene");

            runFactors();

        }, 17000);


        /* ======================================
           03 — MFA
        ======================================= */

        schedule(() => {

            showOnly("#mfaScene");

            runService(
                "#mfaIcon",
                "#mfaFact"
            );

        }, 35000);


        /* ======================================
           04 — PASSWORD SECURITY
        ======================================= */

        schedule(() => {

            showOnly("#passwordScene");

            runPasswordSecurity();

        }, 52000);


        /* ======================================
           05 — BIOMETRICS
        ======================================= */

        schedule(() => {

            showOnly("#biometricScene");

            runService(
                "#biometricIcon",
                "#biometricFact"
            );

        }, 70000);


        /* ======================================
           06 — AUTHENTICATION VS AUTHORIZATION
        ======================================= */

        schedule(() => {

            showOnly("#authDifferenceScene");

            runAuthDifference();

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