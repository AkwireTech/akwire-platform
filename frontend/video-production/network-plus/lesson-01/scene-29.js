/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   SCENE 29 — PACKET CAPTURE & PROTOCOL ANALYSIS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const SCENE_DURATION = 76000;

    const timeline =
        document.querySelector("#timelineProgress");

    const startButton =
        document.querySelector("#startSceneBtn");

    const restartButton =
        document.querySelector("#restartSceneBtn");

    const packetDot =
        document.querySelector("#packetDot");

    const packetPath =
        document.querySelector("#clientServerPath");

    let timers = [];
    let packetAnimation = null;


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


    function show(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.add(
            "is-visible"
        );
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

        element.classList.add(
            "is-visible",
            "is-active"
        );
    }


    function deactivate(selector) {

        const element = $(selector);

        if (!element) return;

        element.classList.remove(
            "is-active"
        );
    }


    function clearTimers() {

        timers.forEach(timer => {
            clearTimeout(timer);
        });

        timers = [];
    }


    /* ==========================================
       CONTENT CARDS
    ========================================== */

    const contentCards = [

        "#capturePurpose",
        "#captureProcess",

        "#packetOverview",

        "#frameDetail",
        "#ipDetail",
        "#transportDetail",
        "#payloadDetail",

        "#tcpFlags",
        "#handshakeCard",

        "#filterCard",
        "#ipFilterCard",

        "#dnsExample",

        "#troubleshootingExample",

        "#promiscuousCard",
        "#portMirrorCard",
        "#encryptionCard",
        "#pcapCard",

        "#analysisWorkflow"

    ];


    function hideCards() {

        contentCards.forEach(selector => {
            hide(selector);
        });
    }


    function showCard(selector) {

        hideCards();
        show(selector);
    }


    /* ==========================================
       NETWORK NODES
    ========================================== */

    function showNetwork() {

        show("#clientNode");
        show("#analyzerNode");
        show("#serverNode");

        show("#clientServerPath");
    }


    function hideNetwork() {

        hide("#clientNode");
        hide("#analyzerNode");
        hide("#serverNode");

        hide("#clientServerPath");

        if (packetDot) {
            packetDot.style.opacity = "0";
        }
    }


    function deactivateNodes() {

        [
            "#clientNode",
            "#analyzerNode",
            "#serverNode"
        ].forEach(selector => {
            deactivate(selector);
        });
    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline() {

        if (!timeline) return;

        timeline.style.transition =
            "none";

        timeline.style.width =
            "0%";

        void timeline.offsetWidth;

        requestAnimationFrame(() => {

            timeline.style.transition =
                `width ${SCENE_DURATION}ms linear`;

            timeline.style.width =
                "100%";
        });
    }


    /* ==========================================
       PACKET ANIMATION
    ========================================== */

    function stopPacketAnimation() {

        if (packetAnimation) {

            cancelAnimationFrame(
                packetAnimation
            );

            packetAnimation = null;
        }

        if (packetDot) {
            packetDot.style.opacity = "0";
        }
    }


    function animatePacket(
        duration = 2200,
        reverse = false
    ) {

        if (!packetDot || !packetPath) {
            return;
        }

        stopPacketAnimation();

        const pathLength =
            packetPath.getTotalLength();

        const startTime =
            performance.now();

        packetDot.style.opacity =
            "1";


        function frame(now) {

            const elapsed =
                now - startTime;

            let progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            if (reverse) {
                progress = 1 - progress;
            }

            const point =
                packetPath.getPointAtLength(
                    pathLength * progress
                );

            packetDot.setAttribute(
                "cx",
                point.x
            );

            packetDot.setAttribute(
                "cy",
                point.y
            );


            if (elapsed < duration) {

                packetAnimation =
                    requestAnimationFrame(
                        frame
                    );

            } else {

                packetDot.style.opacity =
                    "0";

                packetAnimation = null;
            }
        }


        packetAnimation =
            requestAnimationFrame(
                frame
            );
    }


    /* ==========================================
       RESET
    ========================================== */

    function resetScene() {

        clearTimers();
        stopPacketAnimation();

        $$(".is-visible").forEach(element => {

            element.classList.remove(
                "is-visible"
            );
        });


        $$(".is-active").forEach(element => {

            element.classList.remove(
                "is-active"
            );
        });


        if (timeline) {

            timeline.style.transition =
                "none";

            timeline.style.width =
                "0%";
        }


        if (packetDot) {

            packetDot.style.opacity =
                "0";
        }
    }


    /* ==========================================
       PLAY SCENE
    ========================================== */

    function playScene() {

        resetScene();

        startTimeline();


        /* ======================================
           0–4 SEC
           INTRODUCTION
        ====================================== */

        schedule(() => {

            show(".scene-brand");

        }, 300);


        schedule(() => {

            show(".scene-title");

        }, 700);


        schedule(() => {

            show(".glow-left");
            show(".glow-center");
            show(".glow-right");

        }, 1100);


        /* ======================================
           4–9 SEC
           WHY PACKET CAPTURE?
        ====================================== */

        schedule(() => {

            showCard(
                "#capturePurpose"
            );

        }, 4000);


        /* ======================================
           9–14 SEC
           CAPTURE PROCESS
        ====================================== */

        schedule(() => {

            showCard(
                "#captureProcess"
            );

        }, 9000);


        /* ======================================
           14–20 SEC
           NETWORK PACKET MOVEMENT
        ====================================== */

        schedule(() => {

            hideCards();

            showNetwork();

            activate(
                "#clientNode"
            );

        }, 14000);


        schedule(() => {

            activate(
                "#clientServerPath"
            );

            animatePacket(
                2200
            );

        }, 15000);


        schedule(() => {

            deactivate(
                "#clientNode"
            );

            activate(
                "#analyzerNode"
            );

        }, 16500);


        schedule(() => {

            animatePacket(
                1800,
                true
            );

        }, 17500);


        schedule(() => {

            deactivate(
                "#analyzerNode"
            );

            activate(
                "#serverNode"
            );

        }, 19000);


        /* ======================================
           20–24 SEC
           PACKET STRUCTURE
        ====================================== */

        schedule(() => {

            hideNetwork();
            deactivateNodes();

            showCard(
                "#packetOverview"
            );

        }, 20500);


        /* ======================================
           24–27 SEC
           ETHERNET
        ====================================== */

        schedule(() => {

            showCard(
                "#frameDetail"
            );

        }, 24500);


        /* ======================================
           27–30 SEC
           IP HEADER
        ====================================== */

        schedule(() => {

            showCard(
                "#ipDetail"
            );

        }, 27500);


        /* ======================================
           30–33 SEC
           TRANSPORT HEADER
        ====================================== */

        schedule(() => {

            showCard(
                "#transportDetail"
            );

        }, 30500);


        /* ======================================
           33–36 SEC
           PAYLOAD
        ====================================== */

        schedule(() => {

            showCard(
                "#payloadDetail"
            );

        }, 33500);


        /* ======================================
           36–40 SEC
           TCP FLAGS
        ====================================== */

        schedule(() => {

            showCard(
                "#tcpFlags"
            );

        }, 36500);


        /* ======================================
           40–44 SEC
           TCP HANDSHAKE
        ====================================== */

        schedule(() => {

            showCard(
                "#handshakeCard"
            );

        }, 40500);


        /* ======================================
           44–47 SEC
           PORT FILTER
        ====================================== */

        schedule(() => {

            showCard(
                "#filterCard"
            );

        }, 44500);


        /* ======================================
           47–50 SEC
           IP FILTER
        ====================================== */

        schedule(() => {

            showCard(
                "#ipFilterCard"
            );

        }, 47500);


        /* ======================================
           50–54 SEC
           DNS ANALYSIS
        ====================================== */

        schedule(() => {

            showCard(
                "#dnsExample"
            );

        }, 50500);


        /* ======================================
           54–59 SEC
           TROUBLESHOOTING EXAMPLE
        ====================================== */

        schedule(() => {

            showCard(
                "#troubleshootingExample"
            );

        }, 54500);


        /* ======================================
           59–62 SEC
           PROMISCUOUS MODE
        ====================================== */

        schedule(() => {

            showCard(
                "#promiscuousCard"
            );

        }, 59500);


        /* ======================================
           62–65 SEC
           PORT MIRRORING
        ====================================== */

        schedule(() => {

            showCard(
                "#portMirrorCard"
            );

        }, 62500);


        /* ======================================
           65–68 SEC
           ENCRYPTION
        ====================================== */

        schedule(() => {

            showCard(
                "#encryptionCard"
            );

        }, 65500);


        /* ======================================
           68–71 SEC
           PCAP
        ====================================== */

        schedule(() => {

            showCard(
                "#pcapCard"
            );

        }, 68000);


        /* ======================================
           71–73 SEC
           ANALYSIS WORKFLOW
        ====================================== */

        schedule(() => {

            showCard(
                "#analysisWorkflow"
            );

        }, 71000);


        /* ======================================
           73–75 SEC
           SUMMARY
        ====================================== */

        schedule(() => {

            hideCards();

            show(
                "#packetSummary"
            );

        }, 73000);


        /* ======================================
           75–76 SEC
           FINAL CONCEPT
        ====================================== */

        schedule(() => {

            hide(
                "#packetSummary"
            );

            show(
                "#finalConcept"
            );

        }, 75000);

    }


    /* ==========================================
       CONTROLS
    ========================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            playScene
        );
    }


    if (restartButton) {

        restartButton.addEventListener(
            "click",
            playScene
        );
    }


    /* ==========================================
       KEYBOARD CONTROLS
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.code === "Space"
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

        }
    );


    /* ==========================================
       RECORDING MODE
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (
        params.get("record") === "1"
    ) {

        document.body.classList.add(
            "recording-mode"
        );

        schedule(() => {

            playScene();

        }, 700);
    }


    /* ==========================================
       INITIAL STATE
    ========================================== */

    resetScene();

});