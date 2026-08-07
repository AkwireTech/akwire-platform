/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   SCENE 28 — NETWORK MONITORING PROTOCOLS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const SCENE_DURATION = 72000;

    const timeline =
        document.querySelector("#timelineProgress");

    const startButton =
        document.querySelector("#startSceneBtn");

    const restartButton =
        document.querySelector("#restartSceneBtn");

    const packet =
        document.querySelector("#movingPacket");

    let sceneTimers = [];
    let packetFrame = null;


    /* ==========================================
       HELPERS
    ========================================== */

    const $ = selector =>
        document.querySelector(selector);

    const $$ = selector =>
        document.querySelectorAll(selector);


    function schedule(callback, delay) {

        const timer =
            setTimeout(callback, delay);

        sceneTimers.push(timer);

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

        sceneTimers.forEach(timer => {
            clearTimeout(timer);
        });

        sceneTimers = [];

    }


    /* ==========================================
       CARD MANAGEMENT
    ========================================== */

    const cards = [

        "#visibilityProblem",

        "#snmpCard",
        "#snmpDetail",

        "#syslogCard",
        "#syslogDetail",

        "#flowCard",
        "#flowDetail",

        "#netflowCard",
        "#sflowCard",
        "#ipfixCard",

        "#comparisonCard",
        "#exampleCard",

        "#baselineCard",
        "#alertCard",

        "#dashboardCard",
        "#monitorFlow"

    ];


    function hideCards() {

        cards.forEach(selector => {
            hide(selector);
        });

    }


    function showCard(selector) {

        hideCards();
        show(selector);

    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline() {

        if (!timeline) return;

        timeline.style.transition = "none";
        timeline.style.width = "0%";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                timeline.style.transition =
                    `width ${SCENE_DURATION}ms linear`;

                timeline.style.width =
                    "100%";

            });

        });

    }


    /* ==========================================
       CONNECTION PATHS
    ========================================== */

    function showAllPaths() {

        $$(".connection-path").forEach(path => {

            path.classList.add(
                "is-visible"
            );

        });

    }


    function activatePath(selector) {

        deactivatePaths();

        const path = $(selector);

        if (!path) return;

        path.classList.add(
            "is-visible",
            "is-active"
        );

    }


    function deactivatePaths() {

        $$(".connection-path").forEach(path => {

            path.classList.remove(
                "is-active"
            );

        });

    }


    /* ==========================================
       PACKET ANIMATION
    ========================================== */

    function stopPacket() {

        if (packetFrame) {

            cancelAnimationFrame(
                packetFrame
            );

            packetFrame = null;

        }

        if (packet) {

            packet.style.opacity = "0";

        }

    }


    function movePacket(pathSelector, duration = 1500) {

        const path =
            $(pathSelector);

        if (!path || !packet) return;

        stopPacket();

        const pathLength =
            path.getTotalLength();

        const startTime =
            performance.now();

        packet.style.opacity = "1";


        function animate(now) {

            const progress =
                Math.min(
                    (now - startTime) /
                    duration,
                    1
                );

            const point =
                path.getPointAtLength(
                    pathLength * progress
                );

            packet.setAttribute(
                "cx",
                point.x
            );

            packet.setAttribute(
                "cy",
                point.y
            );


            if (progress < 1) {

                packetFrame =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                packet.style.opacity =
                    "0";

                packetFrame = null;

            }

        }


        packetFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* ==========================================
       RESET
    ========================================== */

    function resetScene() {

        clearTimers();
        stopPacket();


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

    }


    /* ==========================================
       SCENE SEQUENCE
    ========================================== */

    function playScene() {

        resetScene();

        startTimeline();


        /* --------------------------------------
           OPENING
        -------------------------------------- */

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

        }, 1200);


        /* --------------------------------------
           NETWORK DEVICES
        -------------------------------------- */

        schedule(() => {

            show("#routerNode");

        }, 3000);


        schedule(() => {

            show("#switchNode");

        }, 3400);


        schedule(() => {

            show("#monitorNode");

        }, 3800);


        schedule(() => {

            show("#serverNode");

        }, 4200);


        schedule(() => {

            show("#firewallNode");

        }, 4600);


        schedule(() => {

            showAllPaths();

        }, 5200);


        /* --------------------------------------
           WHY MONITOR?
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#visibilityProblem"
            );

            activate(
                "#monitorNode"
            );

        }, 6500);


        schedule(() => {

            hide(
                "#visibilityProblem"
            );

            deactivate(
                "#monitorNode"
            );

        }, 10500);


        /* --------------------------------------
           SNMP
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#snmpCard"
            );

            activate(
                "#routerNode"
            );

            activate(
                "#monitorNode"
            );

            activatePath(
                "#snmpPath"
            );

            movePacket(
                "#snmpPath"
            );

        }, 11000);


        schedule(() => {

            showCard(
                "#snmpDetail"
            );

            movePacket(
                "#snmpPath",
                1300
            );

        }, 14500);


        schedule(() => {

            deactivatePaths();

            deactivate(
                "#routerNode"
            );

            deactivate(
                "#monitorNode"
            );

        }, 18000);


        /* --------------------------------------
           SYSLOG
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#syslogCard"
            );

            activate(
                "#switchNode"
            );

            activate(
                "#monitorNode"
            );

            activatePath(
                "#syslogPath"
            );

            movePacket(
                "#syslogPath"
            );

        }, 18500);


        schedule(() => {

            showCard(
                "#syslogDetail"
            );

            movePacket(
                "#syslogPath",
                1300
            );

        }, 22000);


        schedule(() => {

            deactivatePaths();

            deactivate(
                "#switchNode"
            );

            deactivate(
                "#monitorNode"
            );

        }, 25500);


        /* --------------------------------------
           FLOW MONITORING
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#flowCard"
            );

            activate(
                "#serverNode"
            );

            activate(
                "#monitorNode"
            );

            activatePath(
                "#flowPath"
            );

            movePacket(
                "#flowPath"
            );

        }, 26000);


        schedule(() => {

            showCard(
                "#flowDetail"
            );

            movePacket(
                "#flowPath",
                1300
            );

        }, 29500);


        schedule(() => {

            deactivatePaths();

            deactivate(
                "#serverNode"
            );

            deactivate(
                "#monitorNode"
            );

        }, 32500);


        /* --------------------------------------
           NETFLOW
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#netflowCard"
            );

        }, 33000);


        /* --------------------------------------
           sFLOW
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#sflowCard"
            );

        }, 36000);


        /* --------------------------------------
           IPFIX
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#ipfixCard"
            );

        }, 39000);


        /* --------------------------------------
           COMPARISON
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#comparisonCard"
            );

        }, 42000);


        /* --------------------------------------
           INCIDENT EXAMPLE
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#exampleCard"
            );

            activate(
                "#serverNode"
            );

            activate(
                "#firewallNode"
            );

            activate(
                "#monitorNode"
            );

        }, 46500);


        schedule(() => {

            activatePath(
                "#analysisPath"
            );

            movePacket(
                "#analysisPath"
            );

        }, 48000);


        schedule(() => {

            deactivatePaths();

            deactivate(
                "#serverNode"
            );

            deactivate(
                "#firewallNode"
            );

            deactivate(
                "#monitorNode"
            );

        }, 51000);


        /* --------------------------------------
           BASELINING
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#baselineCard"
            );

        }, 51500);


        /* --------------------------------------
           ALERTING
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#alertCard"
            );

        }, 54500);


        /* --------------------------------------
           MONITORING DASHBOARD
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#dashboardCard"
            );

            activate(
                "#monitorNode"
            );

        }, 57500);


        /* --------------------------------------
           COMPLETE MONITORING FLOW
        -------------------------------------- */

        schedule(() => {

            showCard(
                "#monitorFlow"
            );

            $$(".device-node").forEach(node => {

                node.classList.add(
                    "is-active"
                );

            });

            $$(".connection-path").forEach(path => {

                path.classList.add(
                    "is-visible",
                    "is-active"
                );

            });

        }, 62000);


        /* --------------------------------------
           SUMMARY
        -------------------------------------- */

        schedule(() => {

            hideCards();

            $$(".device-node").forEach(node => {

                node.classList.remove(
                    "is-active"
                );

            });

            deactivatePaths();

            show(
                "#monitorSummary"
            );

        }, 66500);


        /* --------------------------------------
           FINAL CONCEPT
        -------------------------------------- */

        schedule(() => {

            show(
                "#finalConcept"
            );

        }, 68500);

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
       KEYBOARD
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.code === "Space") {

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