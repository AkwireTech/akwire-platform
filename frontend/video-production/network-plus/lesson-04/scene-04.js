/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 04 — SCENE 04
   CONFIGURATION MANAGEMENT & CHANGE CONTROL
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

        timers.forEach(timer => clearTimeout(timer));

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

        "#configIntro",
        "#configScene",
        "#backupScene",
        "#versionScene",
        "#changeScene",
        "#maintenanceScene",
        "#rollbackScene",
        "#examMemory",
        "#sceneSummary",
        "#finalConcept"

    ];

    function hideContent(){

        content.forEach(section => hide(section));

    }

    function showOnly(section){

        hideContent();

        show(section);

    }

    function clearActiveStates(){

        $$(".is-active").forEach(item=>{

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

        requestAnimationFrame(()=>{

            requestAnimationFrame(()=>{

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

        $$(".background-glow").forEach(glow=>{

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

        activate("#configCore");

        schedule(()=>activate(".ring-1"),400);
        schedule(()=>activate(".ring-2"),700);
        schedule(()=>activate(".ring-3"),1000);

        schedule(()=>{

            activate("#consistencyBenefit");

        },2200);

        schedule(()=>{

            activate("#recoveryBenefit");

        },4200);

    }

    /* ==========================================
       SERVICE CARD
    ========================================== */

    function runService(icon,fact){

        schedule(()=>{

            activate(icon);

        },700);

        schedule(()=>{

            activate(fact);

        },2400);

    }

    /* ==========================================
       COMPARISON CARD
    ========================================== */

    function runComparison(left,right){

        schedule(()=>{

            activate(left);

        },700);

        schedule(()=>{

            activate(right);

        },3000);

    }

    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards=[

            "#memoryRunning",
            "#memoryBackup",
            "#memoryChange",
            "#memoryRollback"

        ];

        cards.forEach((card,index)=>{

            schedule(()=>{

                activate(card);

            },600 + (index * 1200));

        });

    }

    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene(){

        resetScene();

        startTimeline();

        schedule(()=>show(".scene-brand"),300);

        schedule(()=>{

            show(".glow-left");
            show(".glow-center");
            show(".glow-right");

        },700);

        schedule(()=>show(".scene-title"),1200);

        schedule(()=>{

            showOnly("#configIntro");

            runIntro();

        },4000);

        schedule(()=>{

            showOnly("#configScene");

            runComparison(
                "#runningCard",
                "#startupCard"
            );

        },17000);

        schedule(()=>{

            showOnly("#backupScene");

            runService(
                "#backupIcon",
                "#backupFact"
            );

        },34000);

        schedule(()=>{

            showOnly("#versionScene");

            runService(
                "#versionIcon",
                "#versionFact"
            );

        },52000);

        schedule(()=>{

            showOnly("#changeScene");

            runService(
                "#changeIcon",
                "#changeFact"
            );

        },70000);

        schedule(()=>{

            showOnly("#maintenanceScene");

            runService(
                "#maintenanceIcon",
                "#maintenanceFact"
            );

        },88000);

        schedule(()=>{

            showOnly("#rollbackScene");

            runService(
                "#rollbackIcon",
                "#rollbackFact"
            );

        },104000);

        schedule(()=>{

            showOnly("#examMemory");

            runMemory();

        },116000);

        schedule(()=>{

            showOnly("#sceneSummary");

        },121000);

        schedule(()=>{

            showOnly("#finalConcept");

        },123500);

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

    document.addEventListener("keydown",event=>{

        if(
            event.code==="Space" &&
            event.target.tagName!=="INPUT" &&
            event.target.tagName!=="TEXTAREA"
        ){

            event.preventDefault();

            playScene();

        }

        if(event.key==="r" || event.key==="R"){

            playScene();

        }

        if(event.key==="h" || event.key==="H"){

            document.body.classList.toggle(
                "recording-mode"
            );

        }

        if(event.key==="f" || event.key==="F"){

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

    if(params.get("record")==="1"){

        document.body.classList.add(
            "recording-mode"
        );

        schedule(()=>{

            playScene();

        },700);

    }

    /* ==========================================
       INITIALIZE
    ========================================== */

    resetScene();

});