/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 01 — SCENE 04
   SECURITY PRINCIPLES & ZERO TRUST
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

        "#principlesIntro",

        "#leastPrivilegeScene",

        "#needToKnowScene",

        "#separationScene",

        "#zeroTrustScene",

        "#zeroTrustModelScene",

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

        activate("#principlesCore");


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

            activate("#leastPrivilegeBenefit");

        }, 2200);


        schedule(() => {

            activate("#needToKnowBenefit");

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
       LEAST PRIVILEGE
    ========================================== */

    function runLeastPrivilege(){

        schedule(() => {

            activate("#minimumAccessCard");

        }, 700);


        schedule(() => {

            activate("#reduceImpactCard");

        }, 2500);


        schedule(() => {

            activate("#reviewAccessCard");

        }, 4300);

    }


    /* ==========================================
       SEPARATION OF DUTIES
    ========================================== */

    function runSeparation(){

        schedule(() => {

            activate("#approvalCard");

        }, 700);


        schedule(() => {

            activate("#executionCard");

        }, 2500);


        schedule(() => {

            activate("#separationBenefitCard");

        }, 4300);

    }


    /* ==========================================
       ZERO TRUST MODEL
    ========================================== */

    function runZeroTrustModel(){

        schedule(() => {

            activate("#verifyCard");

        }, 700);


        schedule(() => {

            activate("#leastAccessCard");

        }, 2500);


        schedule(() => {

            activate("#assumeBreachCard");

        }, 4300);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryLeast",

            "#memoryNeed",

            "#memorySeparate",

            "#memoryZero"

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

            showOnly("#principlesIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — LEAST PRIVILEGE
        ======================================= */

        schedule(() => {

            showOnly("#leastPrivilegeScene");

            runLeastPrivilege();

        }, 17000);


        /* ======================================
           03 — NEED TO KNOW
        ======================================= */

        schedule(() => {

            showOnly("#needToKnowScene");

            runService(
                "#needToKnowIcon",
                "#needToKnowFact"
            );

        }, 35000);


        /* ======================================
           04 — SEPARATION OF DUTIES
        ======================================= */

        schedule(() => {

            showOnly("#separationScene");

            runSeparation();

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
           06 — ZERO TRUST MODEL
        ======================================= */

        schedule(() => {

            showOnly("#zeroTrustModelScene");

            runZeroTrustModel();

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