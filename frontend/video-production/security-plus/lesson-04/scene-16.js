/* ==========================================
   AKWIRE SECURITY+ VIDEO PRODUCTION
   SCENE 16 — CRYPTOGRAPHIC PROTOCOLS
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

    let sceneStarted = false;


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


    function deactivate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove("is-active");
    }


    /* ==========================================
       CONTENT ELEMENTS
    ========================================== */

    const contentElements = [

        "#protocolIntro",

        "#secureProtocols",

        "#secureConnection",

        "#tlsTrust",

        "#protocolComparison",

        "#protocolPractice",

        "#examMemory",

        "#sceneSummary",

        "#finalConcept"

    ];


    function hideContent() {

        contentElements.forEach(selector => {

            hide(selector);

        });

    }


    function showOnly(selector) {

        hideContent();

        show(selector);

    }


    /* ==========================================
       CLEAR ACTIVE STATES
    ========================================== */

    function clearActiveStates() {

        $$(".is-active").forEach(element => {

            element.classList.remove(
                "is-active"
            );

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
       RESET SCENE
    ========================================== */

    function resetScene() {

        clearTimers();

        hideContent();

        clearActiveStates();

        sceneStarted = false;


        $(".scene-brand")
            ?.classList.remove("is-visible");


        $(".scene-title")
            ?.classList.remove("is-visible");


        $$(".background-glow")
            .forEach(element => {

                element.classList.remove(
                    "is-visible"
                );

            });


        if (timeline) {

            timeline.style.transition = "none";

            timeline.style.width = "0%";

        }

    }


    /* ==========================================
       SCENE INTRO
    ========================================== */

    function beginScene() {

        resetScene();

        sceneStarted = true;

        startTimeline();


        /* ======================================
           BACKGROUND
        ======================================= */

        schedule(() => {

            $$(".background-glow")
                .forEach(element => {

                    element.classList.add(
                        "is-visible"
                    );

                });

        }, 100);


        /* ======================================
           BRAND
        ======================================= */

        schedule(() => {

            $(".scene-brand")
                ?.classList.add("is-visible");

        }, 300);


        /* ======================================
           TITLE
        ======================================= */

        schedule(() => {

            $(".scene-title")
                ?.classList.add("is-visible");

        }, 700);


        /* ======================================
           ACT 01
           COMMUNICATION PROBLEM
        ======================================= */

        schedule(() => {

            showOnly("#protocolIntro");

            activate("#protocolIntro");

        }, 1500);


        /* ======================================
           ACT 02
           SECURE PROTOCOLS
        ======================================= */

        schedule(() => {

            showOnly("#secureProtocols");


            schedule(
                () =>
                    activate("#tlsProtocol"),
                300
            );


            schedule(
                () =>
                    activate("#sshProtocol"),
                800
            );


            schedule(
                () =>
                    activate("#ipsecProtocol"),
                1300
            );


            schedule(
                () =>
                    activate("#secureEmailProtocol"),
                1800
            );

        }, 10500);


        /* ======================================
           ACT 03
           SECURE CONNECTION
        ======================================= */

        schedule(() => {

            showOnly("#secureConnection");


            schedule(
                () =>
                    activate("#clientNode"),
                300
            );


            schedule(
                () =>
                    activate(
                        "#secureConnection .key-arrow:nth-of-type(1)"
                    ),
                900
            );


            schedule(
                () =>
                    activate("#serverNode"),
                1400
            );


            schedule(
                () =>
                    activate(
                        "#secureConnection .key-arrow:nth-of-type(2)"
                    ),
                2000
            );


            schedule(
                () =>
                    activate("#handshakeNode"),
                2500
            );


            schedule(
                () =>
                    activate(
                        "#secureConnection .key-arrow:nth-of-type(3)"
                    ),
                3100
            );


            schedule(
                () =>
                    activate("#secureSessionNode"),
                3600
            );

        }, 22000);


        /* ======================================
           ACT 04
           TLS TRUST
        ======================================= */

        schedule(() => {

            showOnly("#tlsTrust");


            schedule(
                () =>
                    activate("#browserNode"),
                300
            );


            schedule(
                () =>
                    activate(
                        "#tlsTrust .protection-connector:nth-of-type(1)"
                    ),
                1000
            );


            schedule(
                () =>
                    activate("#certificateNode"),
                1600
            );


            schedule(
                () =>
                    activate(
                        "#tlsTrust .protection-connector:nth-of-type(2)"
                    ),
                2200
            );


            schedule(
                () =>
                    activate("#trustedServerNode"),
                2800
            );


            schedule(
                () =>
                    activate("#tlsTrustEstablished"),
                3800
            );

        }, 36500);


        /* ======================================
           ACT 05
           PROTOCOL COMPARISON
        ======================================= */

        schedule(() => {

            showOnly("#protocolComparison");


            schedule(
                () =>
                    activate("#httpsComparison"),
                300
            );


            schedule(
                () =>
                    activate("#sshComparison"),
                1800
            );

        }, 51500);


        /* ======================================
           ACT 06
           SECURE COMMUNICATIONS
        ======================================= */

        schedule(() => {

            showOnly("#protocolPractice");


            schedule(
                () =>
                    activate("#webPractice"),
                300
            );


            schedule(
                () =>
                    activate("#remotePractice"),
                800
            );


            schedule(
                () =>
                    activate("#vpnPractice"),
                1300
            );


            schedule(
                () =>
                    activate("#emailPractice"),
                1800
            );

        }, 66500);


        /* ======================================
           ACT 07
           EXAM MEMORY
        ======================================= */

        schedule(() => {

            showOnly("#examMemory");

        }, 81000);


        /* ======================================
           ACT 08
           SCENE SUMMARY
        ======================================= */

        schedule(() => {

            showOnly("#sceneSummary");


            $$("#sceneSummary .summary-grid > div")
                .forEach((element, index) => {

                    schedule(
                        () =>
                            element.classList.add(
                                "is-active"
                            ),
                        index * 450
                    );

                });

        }, 95000);


        /* ======================================
           ACT 09
           FINAL CONCEPT
        ======================================= */

        schedule(() => {

            showOnly("#finalConcept");

        }, 108000);


        /* ======================================
           SCENE COMPLETE
        ======================================= */

        schedule(() => {

            sceneStarted = false;

        }, 124000);

    }


    /* ==========================================
       CONTROLS
    ========================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            () => {

                if (sceneStarted) return;

                beginScene();

            }
        );

    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                beginScene();

            }
        );

    }


    /* ==========================================
       INITIAL RESET
    ========================================== */

    resetScene();

});