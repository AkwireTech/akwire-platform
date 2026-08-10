/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 07
   WIRELESS NETWORK DEVICES
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

        const timer =
            setTimeout(callback, delay);

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
       CONTENT SECTIONS
    ========================================== */

    const content = [

        "#deviceIntro",
        "#accessPointScene",
        "#wlcScene",
        "#routerScene",
        "#repeaterScene",
        "#meshScene",
        "#antennaScene",
        "#poeScene",
        "#deploymentScene",
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

        activate("#mainAccessPoint");

        schedule(() => activate(".ring-1"),400);
        schedule(() => activate(".ring-2"),700);
        schedule(() => activate(".ring-3"),1000);

        schedule(() => {

            activate("#coverageBenefit");

        },2200);

        schedule(() => {

            activate("#mobilityBenefit");

        },4200);

    }


    /* ==========================================
       GENERIC DEVICE CARD
    ========================================== */

    function runDevice(icon,feature){

        schedule(() => {

            activate(icon);

        },700);

        schedule(() => {

            activate(feature);

        },2400);

    }


    /* ==========================================
       COMPARISON CARDS
    ========================================== */

    function runComparison(left,right){

        schedule(() => {

            activate(left);

        },700);

        schedule(() => {

            activate(right);

        },3000);

    }


    /* ==========================================
       MEMORY
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryWap",
            "#memoryWlc",
            "#memoryMesh",
            "#memoryPoe"

        ];

        cards.forEach((card,index)=>{

            schedule(()=>{

                activate(card);

            },600 + (index*1200));

        });

    }


    /* ==========================================
   PLAY SCENE
========================================== */

function playScene(){

    resetScene();

    startTimeline();


    /* --------------------------------------
       BRAND
    -------------------------------------- */

    schedule(()=>{

        show(".scene-brand");

    },300);

    schedule(()=>{

        show(".glow-left");
        show(".glow-center");
        show(".glow-right");

    },700);

    schedule(()=>{

        show(".scene-title");

    },1200);


    /* --------------------------------------
       DEVICE INTRO
    -------------------------------------- */

    schedule(()=>{

        showOnly("#deviceIntro");

        runIntro();

    },4000);


    /* --------------------------------------
       ACCESS POINT
    -------------------------------------- */

    schedule(()=>{

        showOnly("#accessPointScene");

        runDevice(
            "#wapIcon",
            "#wapFeature"
        );

    },14000);


    /* --------------------------------------
       WLC
    -------------------------------------- */

    schedule(()=>{

        showOnly("#wlcScene");

        runDevice(
            "#wlcIcon",
            "#wlcFeature"
        );

    },25000);


    /* --------------------------------------
       WIRELESS ROUTER
    -------------------------------------- */

    schedule(()=>{

        showOnly("#routerScene");

        runDevice(
            "#routerIcon",
            "#routerFeature"
        );

    },36000);


    /* --------------------------------------
       REPEATER
    -------------------------------------- */

    schedule(()=>{

        showOnly("#repeaterScene");

        runDevice(
            "#repeaterIcon",
            "#repeaterFeature"
        );

    },47000);


    /* --------------------------------------
       MESH
    -------------------------------------- */

    schedule(()=>{

        showOnly("#meshScene");

        runDevice(
            "#meshIcon",
            "#meshFeature"
        );

    },58000);


    /* --------------------------------------
       ANTENNAS
    -------------------------------------- */

    schedule(()=>{

        showOnly("#antennaScene");

        runComparison(
            "#omniAntenna",
            "#directionalAntenna"
        );

    },69000);


    /* --------------------------------------
       POWER OVER ETHERNET
    -------------------------------------- */

    schedule(()=>{

        showOnly("#poeScene");

        runDevice(
            "#poeIcon",
            "#poeFeature"
        );

    },81000);


    /* --------------------------------------
       DEPLOYMENT MODELS
    -------------------------------------- */

    schedule(()=>{

        showOnly("#deploymentScene");

        runComparison(
            "#standaloneDeployment",
            "#controllerDeployment"
        );

    },93000);


    /* --------------------------------------
       MEMORY REVIEW
    -------------------------------------- */

    schedule(()=>{

        showOnly("#examMemory");

        runMemory();

    },105000);


    /* --------------------------------------
       SUMMARY
    -------------------------------------- */

    schedule(()=>{

        showOnly("#sceneSummary");

    },117000);


    /* --------------------------------------
       FINAL CONCEPT
    -------------------------------------- */

    schedule(()=>{

        showOnly("#finalConcept");

    },122000);

}


/* ==========================================
   BUTTON CONTROLS
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

document.addEventListener(
    "keydown",
    event=>{

        if(
            event.code==="Space" &&
            event.target.tagName!=="INPUT" &&
            event.target.tagName!=="TEXTAREA"
        ){

            event.preventDefault();

            playScene();

        }

        if(
            event.key==="r" ||
            event.key==="R"
        ){

            playScene();

        }

        if(
            event.key==="h" ||
            event.key==="H"
        ){

            document.body.classList.toggle(
                "recording-mode"
            );

        }

        if(
            event.key==="f" ||
            event.key==="F"
        ){

            if(!document.fullscreenElement){

                document.documentElement
                    .requestFullscreen?.();

            }else{

                document.exitFullscreen?.();

            }

        }

    }
);


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