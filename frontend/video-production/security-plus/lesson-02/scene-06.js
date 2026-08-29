/* ==========================================
   AKWIRE SECURITY+ ACADEMY
   MODULE 01 — LESSON 02 — SCENE 06
   ACCESS CONTROL & AUTHORIZATION
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

        "#accessIntro",

        "#accessModelsScene",

        "#abacScene",

        "#permissionsScene",

        "#privilegeScene",

        "#lifecycleScene",

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

        activate("#accessCore");


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

            activate("#accessIdentityBenefit");

        }, 2200);


        schedule(() => {

            activate("#permissionBenefit");

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
       ACCESS CONTROL MODELS
    ========================================== */

    function runAccessModels(){

        schedule(() => {

            activate("#dacCard");

        }, 700);


        schedule(() => {

            activate("#macCard");

        }, 2500);


        schedule(() => {

            activate("#rbacCard");

        }, 4300);

    }


    /* ==========================================
       PERMISSIONS
    ========================================== */

    function runPermissions(){

        schedule(() => {

            activate("#readCard");

        }, 700);


        schedule(() => {

            activate("#writeCard");

        }, 2500);


        schedule(() => {

            activate("#executeCard");

        }, 4300);

    }


    /* ==========================================
       ACCOUNT LIFECYCLE
    ========================================== */

    function runLifecycle(){

        schedule(() => {

            activate("#provisionCard");

        }, 700);


        schedule(() => {

            activate("#reviewCard");

        }, 2500);


        schedule(() => {

            activate("#deprovisionCard");

        }, 4300);

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryIdentity",

            "#memoryPolicy",

            "#memoryPermission",

            "#memoryDecision"

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
           01 — AUTHORIZATION INTRO
        ======================================= */

        schedule(() => {

            showOnly("#accessIntro");

            runIntro();

        }, 4000);


        /* ======================================
           02 — ACCESS CONTROL MODELS
        ======================================= */

        schedule(() => {

            showOnly("#accessModelsScene");

            runAccessModels();

        }, 17000);


        /* ======================================
           03 — ABAC
        ======================================= */

        schedule(() => {

            showOnly("#abacScene");

            runService(
                "#abacIcon",
                "#abacFact"
            );

        }, 35000);


        /* ======================================
           04 — PERMISSIONS
        ======================================= */

        schedule(() => {

            showOnly("#permissionsScene");

            runPermissions();

        }, 52000);


        /* ======================================
           05 — PRIVILEGE MANAGEMENT
        ======================================= */

        schedule(() => {

            showOnly("#privilegeScene");

            runService(
                "#privilegeIcon",
                "#privilegeFact"
            );

        }, 70000);


        /* ======================================
           06 — ACCOUNT LIFECYCLE
        ======================================= */

        schedule(() => {

            showOnly("#lifecycleScene");

            runLifecycle();

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