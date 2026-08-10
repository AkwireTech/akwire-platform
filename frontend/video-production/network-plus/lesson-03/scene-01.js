/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 03 — SCENE 01
   NETWORK PROTOCOLS & PORTS
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

        "#protocolIntro",
        "#overviewScene",
        "#httpScene",
        "#httpsScene",
        "#ftpScene",
        "#sshScene",
        "#portsScene",
        "#wellKnownPorts",
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

            timeline.style.transition="none";
            timeline.style.width="0%";

        }

    }


    /* ==========================================
       INTRO
    ========================================== */

    function runIntro(){

        activate("#protocolCore");

        schedule(()=>activate(".ring-1"),400);
        schedule(()=>activate(".ring-2"),700);
        schedule(()=>activate(".ring-3"),1000);

        schedule(()=>{

            activate("#ruleBenefit");

        },2200);

        schedule(()=>{

            activate("#communicationBenefit");

        },4200);

    }


    /* ==========================================
       OVERVIEW
    ========================================== */

    function runOverview(){

        const cards=[

            "#httpCard",
            "#httpsCard",
            "#ftpCard",
            "#sshCard"

        ];

        cards.forEach((card,index)=>{

            schedule(()=>{

                activate(card);

            },600+(index*1200));

        });

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
       PORT COMPARISON
    ========================================== */

    function runComparison(){

        schedule(()=>{

            activate("#ipAddressCard");

        },700);

        schedule(()=>{

            activate("#portCard");

        },3000);

    }


    /* ==========================================
       WELL-KNOWN PORTS
    ========================================== */

    function runPorts(){

        const ports=[

            "#port80",
            "#port443",
            "#port20",
            "#port22"

        ];

        ports.forEach((item,index)=>{

            schedule(()=>{

                activate(item);

            },600+(index*1000));

        });

    }


    /* ==========================================
       MEMORY REVIEW
    ========================================== */

    function runMemory(){

        const cards=[

            "#memoryHttp",
            "#memoryHttps",
            "#memoryFtp",
            "#memorySsh"

        ];

        cards.forEach((card,index)=>{

            schedule(()=>{

                activate(card);

            },600+(index*1200));

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
       INTRO
    -------------------------------------- */

    schedule(()=>{

        showOnly("#protocolIntro");

        runIntro();

    },4000);

    /* --------------------------------------
       PROTOCOL OVERVIEW
    -------------------------------------- */

    schedule(()=>{

        showOnly("#overviewScene");

        runOverview();

    },14000);

    /* --------------------------------------
       HTTP
    -------------------------------------- */

    schedule(()=>{

        showOnly("#httpScene");

        runService(
            "#httpIcon",
            "#httpFact"
        );

    },26000);

    /* --------------------------------------
       HTTPS
    -------------------------------------- */

    schedule(()=>{

        showOnly("#httpsScene");

        runService(
            "#httpsIcon",
            "#httpsFact"
        );

    },38000);

    /* --------------------------------------
       FTP
    -------------------------------------- */

    schedule(()=>{

        showOnly("#ftpScene");

        runService(
            "#ftpIcon",
            "#ftpFact"
        );

    },50000);

    /* --------------------------------------
       SSH
    -------------------------------------- */

    schedule(()=>{

        showOnly("#sshScene");

        runService(
            "#sshIcon",
            "#sshFact"
        );

    },62000);

    /* --------------------------------------
       PORT NUMBERS
    -------------------------------------- */

    schedule(()=>{

        showOnly("#portsScene");

        runComparison();

    },76000);

    /* --------------------------------------
       WELL-KNOWN PORTS
    -------------------------------------- */

    schedule(()=>{

        showOnly("#wellKnownPorts");

        runPorts();

    },90000);

    /* --------------------------------------
       MEMORY REVIEW
    -------------------------------------- */

    schedule(()=>{

        showOnly("#examMemory");

        runMemory();

    },104000);

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