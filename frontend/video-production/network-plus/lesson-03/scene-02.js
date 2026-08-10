/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 03 — SCENE 02
   DNS • DHCP • NTP
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

    const $ = selector => document.querySelector(selector);

    const $$ = selector => [...document.querySelectorAll(selector)];


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

        "#servicesIntro",
        "#dnsScene",
        "#lookupScene",
        "#dhcpScene",
        "#doraScene",
        "#ntpScene",
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

        activate("#networkServicesCore");

        schedule(()=>activate(".ring-1"),400);
        schedule(()=>activate(".ring-2"),700);
        schedule(()=>activate(".ring-3"),1000);

        schedule(()=>{

            activate("#automationBenefit");

        },2200);

        schedule(()=>{

            activate("#reliabilityBenefit");

        },4200);

    }


    /* ==========================================
       SERVICE CARD
    ========================================== */

    function runService(icon, fact){

        schedule(()=>{

            activate(icon);

        },700);

        schedule(()=>{

            activate(fact);

        },2400);

    }


    /* ==========================================
       LOOKUP COMPARISON
    ========================================== */

    function runLookup(){

        schedule(()=>{

            activate("#forwardLookup");

        },700);

        schedule(()=>{

            activate("#reverseLookup");

        },3000);

    }


    /* ==========================================
       DORA
    ========================================== */

    function runDora(){

        const steps = [

            "#discoverStep",
            "#offerStep",
            "#requestStep",
            "#ackStep"

        ];

        steps.forEach((step,index)=>{

            schedule(()=>{

                activate(step);

            },700 + (index * 1400));

        });

    }


    /* ==========================================
       MEMORY
    ========================================== */

    function runMemory(){

        const cards = [

            "#memoryDns",
            "#memoryDhcp",
            "#memoryDora",
            "#memoryNtp"

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

            showOnly("#servicesIntro");

            runIntro();

        },4000);

        schedule(()=>{

            showOnly("#dnsScene");

            runService(
                "#dnsIcon",
                "#dnsFact"
            );

        },16000);

        schedule(()=>{

            showOnly("#lookupScene");

            runLookup();

        },30000);

        schedule(()=>{

            showOnly("#dhcpScene");

            runService(
                "#dhcpIcon",
                "#dhcpFact"
            );

        },45000);

        schedule(()=>{

            showOnly("#doraScene");

            runDora();

        },60000);

        schedule(()=>{

            showOnly("#ntpScene");

            runService(
                "#ntpIcon",
                "#ntpFact"
            );

        },82000);

        schedule(()=>{

            showOnly("#examMemory");

            runMemory();

        },100000);

        schedule(()=>{

            showOnly("#sceneSummary");

        },116000);

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