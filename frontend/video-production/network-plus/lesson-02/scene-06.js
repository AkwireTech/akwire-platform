/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   LESSON 02 — SCENE 06
   WIRELESS SECURITY
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

        "#securityIntro",
        "#securityEvolution",
        "#wepScene",
        "#wpaScene",
        "#wpa2Scene",
        "#wpa3Scene",
        "#authenticationModes",
        "#enterpriseAuthentication",
        "#bestPractices",
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

        const roamingAnimation =
            $("#roamingDevice");

        if (roamingAnimation) {

            roamingAnimation.style.animation = "";

        }

        if (timeline) {

            timeline.style.transition = "none";
            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       SECURITY INTRO
    ========================================== */

    function runSecurityIntro() {

        activate("#securityShield");

        schedule(() => activate(".ring-1"), 400);
        schedule(() => activate(".ring-2"), 700);
        schedule(() => activate(".ring-3"), 1000);

        schedule(() => {

            activate("#confidentialityBenefit");

        }, 2200);

        schedule(() => {

            activate("#authenticationBenefit");

        }, 4200);

    }


    /* ==========================================
       SECURITY EVOLUTION
    ========================================== */

    function runEvolution() {

        const levels = [

            "#wepCard",
            "#wpaCard",
            "#wpa2Card",
            "#wpa3Card"

        ];

        levels.forEach((item, index) => {

            schedule(() => {

                activate(item);

            }, 600 + (index * 1300));

        });

    }


    /* ==========================================
       PROTOCOLS
    ========================================== */

    function runProtocol(icon, point) {

        schedule(() => {

            activate(icon);

        }, 700);

        schedule(() => {

            activate(point);

        }, 2600);

    }


    /* ==========================================
       AUTHENTICATION MODES
    ========================================== */

    function runModes() {

        schedule(() => {

            activate("#personalMode");

        }, 700);

        schedule(() => {

            activate("#enterpriseMode");

        }, 3400);

    }


    /* ==========================================
       ENTERPRISE FLOW
    ========================================== */

    function runEnterprise() {

        schedule(() => {

            activate("#clientNode");

        }, 600);

        schedule(() => {

            activate("#apNode");

        }, 2500);

        schedule(() => {

            activate("#radiusNode");

        }, 4300);

    }


    /* ==========================================
   BEST PRACTICES
========================================== */

function runBestPractices() {

    const items = [

        "#practice1",
        "#practice2",
        "#practice3",
        "#practice4"

    ];

    items.forEach((item, index) => {

        schedule(() => {

            activate(item);

        }, 600 + (index * 1200));

    });

}


/* ==========================================
   MEMORY REVIEW
========================================== */

function runMemory() {

    const cards = [

        "#memoryWep",
        "#memoryWpa2",
        "#memoryWpa3",
        "#memoryRadius"

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
       SECURITY INTRO
    -------------------------------------- */

    schedule(() => {

        showOnly("#securityIntro");

        runSecurityIntro();

    }, 4000);


    /* --------------------------------------
       SECURITY EVOLUTION
    -------------------------------------- */

    schedule(() => {

        showOnly("#securityEvolution");

        runEvolution();

    }, 14000);


    /* --------------------------------------
       WEP
    -------------------------------------- */

    schedule(() => {

        showOnly("#wepScene");

        runProtocol(
            ".protocol-icon.danger",
            "#wepWeakness"
        );

    }, 25000);


    /* --------------------------------------
       WPA
    -------------------------------------- */

    schedule(() => {

        showOnly("#wpaScene");

        runProtocol(
            ".protocol-icon.warning",
            "#tkipPoint"
        );

    }, 36000);


    /* --------------------------------------
       WPA2
    -------------------------------------- */

    schedule(() => {

        showOnly("#wpa2Scene");

        runProtocol(
            ".protocol-icon.secure",
            "#aesPoint"
        );

    }, 47000);


    /* --------------------------------------
       WPA3
    -------------------------------------- */

    schedule(() => {

        showOnly("#wpa3Scene");

        runProtocol(
            ".protocol-icon.strongest",
            "#saePoint"
        );

    }, 58000);


    /* --------------------------------------
       PERSONAL VS ENTERPRISE
    -------------------------------------- */

    schedule(() => {

        showOnly("#authenticationModes");

        runModes();

    }, 69000);


    /* --------------------------------------
       ENTERPRISE AUTHENTICATION
    -------------------------------------- */

    schedule(() => {

        showOnly("#enterpriseAuthentication");

        runEnterprise();

    }, 81000);


    /* --------------------------------------
       BEST PRACTICES
    -------------------------------------- */

    schedule(() => {

        showOnly("#bestPractices");

        runBestPractices();

    }, 94000);


    /* --------------------------------------
       MEMORY REVIEW
    -------------------------------------- */

    schedule(() => {

        showOnly("#examMemory");

        runMemory();

    }, 106000);


    /* --------------------------------------
       SUMMARY
    -------------------------------------- */

    schedule(() => {

        showOnly("#sceneSummary");

    }, 117000);


    /* --------------------------------------
       FINAL CONCEPT
    -------------------------------------- */

    schedule(() => {

        showOnly("#finalConcept");

    }, 122000);

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