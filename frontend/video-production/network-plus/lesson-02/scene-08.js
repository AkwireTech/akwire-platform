/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 08
   WIRELESS TROUBLESHOOTING
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
       CONTENT
    ========================================== */

    const content = [

        "#troubleshootingIntro",
        "#weakSignalScene",
        "#interferenceScene",
        "#deadZoneScene",
        "#channelScene",
        "#authenticationScene",
        "#dhcpScene",
        "#roamingScene",
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

        activate("#troubleshootingCenter");

        schedule(()=>activate(".ring-1"),400);
        schedule(()=>activate(".ring-2"),700);
        schedule(()=>activate(".ring-3"),1000);

        schedule(()=>{

            activate("#identifyBenefit");

        },2200);

        schedule(()=>{

            activate("#resolveBenefit");

        },4200);

    }


    /* ==========================================
       ISSUE CARD
    ========================================== */

    function runIssue(icon, solution){

        schedule(()=>{

            activate(icon);

        },700);

        schedule(()=>{

            activate(solution);

        },2400);

    }


    /* ==========================================
       MEMORY
    ========================================== */

    function runMemory(){

        const cards = [

            "#memorySignal",
            "#memoryChannel",
            "#memoryAuth",
            "#memoryDhcp"

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

            showOnly("#troubleshootingIntro");

            runIntro();

        },4000);

        schedule(()=>{

            showOnly("#weakSignalScene");

            runIssue(
                "#weakSignalIcon",
                "#weakSignalSolution"
            );

        },14000);

        schedule(()=>{

            showOnly("#interferenceScene");

            runIssue(
                "#interferenceIcon",
                "#interferenceSolution"
            );

        },25000);

        schedule(()=>{

            showOnly("#deadZoneScene");

            runIssue(
                "#deadZoneIcon",
                "#deadZoneSolution"
            );

        },36000);

        schedule(()=>{

            showOnly("#channelScene");

            runIssue(
                "#channelIcon",
                "#channelSolution"
            );

        },47000);

        schedule(()=>{

            showOnly("#authenticationScene");

            runIssue(
                "#authenticationIcon",
                "#authenticationSolution"
            );

        },58000);

        schedule(()=>{

            showOnly("#dhcpScene");

            runIssue(
                "#dhcpIcon",
                "#dhcpSolution"
            );

        },70000);

        schedule(()=>{

            showOnly("#roamingScene");

            runIssue(
                "#roamingIcon",
                "#roamingSolution"
            );

        },82000);

        schedule(()=>{

            showOnly("#examMemory");

            runMemory();

        },104000);

        schedule(()=>{

            showOnly("#sceneSummary");

        },117000);

        schedule(()=>{

            showOnly("#finalConcept");

        },122000);

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

        if(event.key === "r" || event.key === "R"){

            playScene();

        }

        if(event.key === "h" || event.key === "H"){

            document.body.classList.toggle(
                "recording-mode"
            );

        }

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