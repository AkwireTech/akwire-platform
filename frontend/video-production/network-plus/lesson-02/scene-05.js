/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 05
   WIRELESS NETWORKING FUNDAMENTALS
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


    function schedule(callback, delay) {

        const timer =
            setTimeout(callback, delay);

        timers.push(timer);

    }


    function clearTimers() {

        timers.forEach(timer => {

            clearTimeout(timer);

        });

        timers = [];

    }


    function show(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.add("is-visible");

    }


    function hide(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove(
            "is-visible",
            "is-active"
        );

    }


    function activate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.add("is-active");

    }


    /* ==========================================
       CONTENT
    ========================================== */

    const content = [

        "#wirelessIntro",
        "#ieeeStandards",
        "#frequencyBands",
        "#channelOverlap",
        "#ssidConcepts",
        "#networkModes",
        "#clientAssociation",
        "#wirelessRoaming",
        "#wirelessPerformance",
        "#examMemory",
        "#sceneSummary",
        "#finalConcept"

    ];


    function hideContent() {

        content.forEach(section => {

            hide(section);

        });

    }


    function showOnly(section) {

        hideContent();

        show(section);

    }


    function clearActiveStates() {

        $$(".is-active").forEach(element => {

            element.classList.remove("is-active");

        });

    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline() {

        if (!timeline) return;

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

    function resetScene() {

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

        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       WIRELESS INTRO
    ========================================== */

    function runWirelessIntro() {

        activate("#accessPoint");

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

            activate("#mobilityBenefit");

        }, 2200);

        schedule(() => {

            activate("#flexibilityBenefit");

        }, 4200);

    }


    /* ==========================================
       IEEE STANDARDS
    ========================================== */

    function runStandards() {

        const standards = [

            "#wifiA",
            "#wifiB",
            "#wifiG",
            "#wifiN",
            "#wifiAC",
            "#wifiAX"

        ];

        standards.forEach((item, index) => {

            schedule(() => {

                activate(item);

            }, 600 + index * 900);

        });

    }


    /* ==========================================
       FREQUENCY BANDS
    ========================================== */

    function runBands() {

        schedule(() => {

            activate("#band24");

        }, 600);

        schedule(() => {

            activate("#band5");

        }, 2600);

        schedule(() => {

            activate("#band6");

        }, 4700);

    }


    /* ==========================================
       CHANNELS
    ========================================== */

    function runChannels() {

        schedule(() => {

            activate("#channel1");

        }, 600);

        schedule(() => {

            activate("#channel6");

        }, 2200);

        schedule(() => {

            activate("#channel11");

        }, 3800);

    }

    /* ==========================================
   SSID / BSSID / ESS
========================================== */

function runSSIDConcepts() {

    const items = [

        "#ssidCard",
        "#bssidCard",
        "#essCard"

    ];

    items.forEach((item, index) => {

        schedule(() => {

            activate(item);

        }, 600 + (index * 1800));

    });

}


/* ==========================================
   INFRASTRUCTURE VS AD HOC
========================================== */

function runNetworkModes() {

    schedule(() => {

        activate("#infraMode");

    }, 700);

    schedule(() => {

        activate("#adhocMode");

    }, 3400);

}


/* ==========================================
   CLIENT ASSOCIATION
========================================== */

function runAssociation() {

    schedule(() => {

        activate("#clientDevice");

    }, 500);

    schedule(() => {

        activate("#associationAP");

    }, 2500);

    schedule(() => {

        activate("#networkResource");

    }, 4700);

}


/* ==========================================
   ROAMING
========================================== */

function runRoaming() {

    schedule(() => {

        activate("#roamingAP1");

    }, 400);

    schedule(() => {

        activate("#roamingAP2");

    }, 800);

    schedule(() => {

        const device =
            $("#roamingDevice");

        if (device) {

            device.style.animation =
                "roamingMove 4s linear forwards";

        }

    }, 1800);

}


/* ==========================================
   PERFORMANCE
========================================== */

function runPerformance() {

    const items = [

        "#distanceFactor",
        "#interferenceFactor",
        "#obstacleFactor",
        "#bandFactor"

    ];

    items.forEach((item, index) => {

        schedule(() => {

            activate(item);

        }, 600 + (index * 1200));

    });

}


/* ==========================================
   MEMORY
========================================== */

function runMemory() {

    const cards = [

        "#memory80211",
        "#memorySSID",
        "#memoryBands",
        "#memoryRoaming"

    ];

    cards.forEach((card, index) => {

        schedule(() => {

            activate(card);

        }, 600 + (index * 1200));

    });

}


/* ==========================================
   PLAY SCENE
========================================== */

function playScene() {

    resetScene();

    startTimeline();


    /* --------------------------------------
       INTRO
    -------------------------------------- */

    schedule(() => {

        show(".scene-brand");

    }, 300);

    schedule(() => {

        show(".glow-left");
        show(".glow-center");
        show(".glow-right");

    }, 700);

    schedule(() => {

        show(".scene-title");

    }, 1200);


    /* --------------------------------------
       WIRELESS INTRO
    -------------------------------------- */

    schedule(() => {

        showOnly("#wirelessIntro");

        runWirelessIntro();

    }, 4000);


    /* --------------------------------------
       IEEE 802.11
    -------------------------------------- */

    schedule(() => {

        showOnly("#ieeeStandards");

        runStandards();

    }, 13000);


    /* --------------------------------------
       FREQUENCY BANDS
    -------------------------------------- */

    schedule(() => {

        showOnly("#frequencyBands");

        runBands();

    }, 23000);


    /* --------------------------------------
       CHANNELS
    -------------------------------------- */

    schedule(() => {

        showOnly("#channelOverlap");

        runChannels();

    }, 33000);


    /* --------------------------------------
       SSID / BSSID / ESS
    -------------------------------------- */

    schedule(() => {

        showOnly("#ssidConcepts");

        runSSIDConcepts();

    }, 43000);


    /* --------------------------------------
       MODES
    -------------------------------------- */

    schedule(() => {

        showOnly("#networkModes");

        runNetworkModes();

    }, 54000);


    /* --------------------------------------
       ASSOCIATION
    -------------------------------------- */

    schedule(() => {

        showOnly("#clientAssociation");

        runAssociation();

    }, 65000);


    /* --------------------------------------
       ROAMING
    -------------------------------------- */

    schedule(() => {

        showOnly("#wirelessRoaming");

        runRoaming();

    }, 76000);


    /* --------------------------------------
       PERFORMANCE
    -------------------------------------- */

    schedule(() => {

        showOnly("#wirelessPerformance");

        runPerformance();

    }, 87000);


    /* --------------------------------------
       MEMORY
    -------------------------------------- */

    schedule(() => {

        showOnly("#examMemory");

        runMemory();

    }, 99000);


    /* --------------------------------------
       SUMMARY
    -------------------------------------- */

    schedule(() => {

        showOnly("#sceneSummary");

    }, 114000);


    /* --------------------------------------
       FINAL CONCEPT
    -------------------------------------- */

    schedule(() => {

        showOnly("#finalConcept");

    }, 121000);

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
    event => {

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            playScene();

        }


        if (
            event.key === "r" ||
            event.key === "R"
        ) {

            playScene();

        }


        if (
            event.key === "h" ||
            event.key === "H"
        ) {

            document.body.classList.toggle(
                "recording-mode"
            );

        }


        if (
            event.key === "f" ||
            event.key === "F"
        ) {

            if (!document.fullscreenElement) {

                document.documentElement
                    .requestFullscreen?.();

            } else {

                document.exitFullscreen?.();

            }

        }

    }
);


/* ==========================================
   RECORDING MODE
   ?record=1
========================================== */

const params =
    new URLSearchParams(
        window.location.search
    );

if (params.get("record") === "1") {

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