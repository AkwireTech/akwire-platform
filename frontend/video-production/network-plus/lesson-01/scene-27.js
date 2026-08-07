/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   SCENE 27 — SYSLOG
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const SCENE_DURATION = 72000;

    let sceneTimers = [];
    let packetAnimation = null;

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* ==========================================
       ELEMENTS
    ========================================== */

    const timeline =
        $(".timeline-progress");

    const restartButton =
        $("#restartScene");

    const recordingButton =
        $("#recordingMode");

    const packet =
        $("#movingPacket");


    /* ==========================================
       HELPERS
    ========================================== */

    function schedule(callback, delay) {

        const timer =
            setTimeout(callback, delay);

        sceneTimers.push(timer);

    }


    function show(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.add("is-visible");

    }


    function hide(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.remove("is-visible");

    }


    function activate(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.add("is-active");

    }


    function deactivate(selector) {

        const element =
            $(selector);

        if (!element) return;

        element.classList.remove("is-active");

    }


    function clearTimers() {

        sceneTimers.forEach((timer) => {

            clearTimeout(timer);

        });

        sceneTimers = [];

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

                timeline.style.width = "100%";

            });

        });

    }


    /* ==========================================
       PACKET ANIMATION
    ========================================== */

    function stopPacketAnimation() {

        if (packetAnimation) {

            packetAnimation.cancel();
            packetAnimation = null;

        }

        if (packet) {

            packet.style.opacity = "0";

        }

    }


    function movePacketAlongPath(pathSelector) {

        const path =
            $(pathSelector);

        if (!path || !packet) return;

        stopPacketAnimation();

        const totalLength =
            path.getTotalLength();

        packet.style.opacity = "1";

        const duration = 1500;

        const start =
            performance.now();


        function animate(now) {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );

            const point =
                path.getPointAtLength(
                    totalLength * progress
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

                packetAnimation =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                packet.style.opacity = "0";
                packetAnimation = null;

            }

        }

        packetAnimation =
            requestAnimationFrame(
                animate
            );

    }


    /* ==========================================
       RESET
    ========================================== */

    function resetScene() {

        clearTimers();
        stopPacketAnimation();


        $$(".is-visible").forEach(
            (element) => {

                element.classList.remove(
                    "is-visible"
                );

            }
        );


        $$(".is-active").forEach(
            (element) => {

                element.classList.remove(
                    "is-active"
                );

            }
        );


        if (timeline) {

            timeline.style.transition =
                "none";

            timeline.style.width =
                "0%";

        }

    }


    /* ==========================================
       SCENE
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

            show(".router-node");

        }, 2500);


        schedule(() => {

            show(".switch-node");

        }, 2900);


        schedule(() => {

            show(".server-node");

        }, 3300);


        schedule(() => {

            show(".firewall-node");

        }, 3700);


        schedule(() => {

            show(".ap-node");

        }, 4100);


        schedule(() => {

            show(".endpoint-node");

        }, 4500);


        /* --------------------------------------
           PROBLEM — MANY DEVICES GENERATE EVENTS
        -------------------------------------- */

        schedule(() => {

            show(".problem-card");

        }, 5500);


        schedule(() => {

            hide(".problem-card");

        }, 8500);


        /* --------------------------------------
           SYSLOG PURPOSE
        -------------------------------------- */

        schedule(() => {

            show(".purpose-card");

        }, 9000);


        schedule(() => {

            hide(".purpose-card");

        }, 11500);


        /* --------------------------------------
           SOURCES
        -------------------------------------- */

        schedule(() => {

            show(".source-card");

            activate(".router-node");
            activate(".switch-node");
            activate(".server-node");
            activate(".firewall-node");
            activate(".ap-node");
            activate(".endpoint-node");

        }, 12000);


        schedule(() => {

            hide(".source-card");

            deactivate(".router-node");
            deactivate(".switch-node");
            deactivate(".server-node");
            deactivate(".firewall-node");
            deactivate(".ap-node");
            deactivate(".endpoint-node");

        }, 14500);


        /* --------------------------------------
           CENTRAL SYSLOG SERVER
        -------------------------------------- */

        schedule(() => {

            show(".syslog-node");
            show(".centralization-card");

            activate(".syslog-node");

        }, 15000);


        schedule(() => {

            hide(".centralization-card");

        }, 17500);


        /* --------------------------------------
           SHOW PATHS
        -------------------------------------- */

        schedule(() => {

            $$(".network-path").forEach(
                (path) => {

                    path.classList.add(
                        "is-visible"
                    );

                }
            );

        }, 18000);


        /* --------------------------------------
           PACKETS TO SYSLOG SERVER
        -------------------------------------- */

        schedule(() => {

            activate("#pathRouter");
            movePacketAlongPath(
                "#pathRouter"
            );

        }, 18500);


        schedule(() => {

            deactivate("#pathRouter");

            activate("#pathSwitch");

            movePacketAlongPath(
                "#pathSwitch"
            );

        }, 20200);


        schedule(() => {

            deactivate("#pathSwitch");

            activate("#pathServer");

            movePacketAlongPath(
                "#pathServer"
            );

        }, 21900);


        schedule(() => {

            deactivate("#pathServer");

            activate("#pathFirewall");

            movePacketAlongPath(
                "#pathFirewall"
            );

        }, 23600);


        schedule(() => {

            deactivate("#pathFirewall");

            activate("#pathAP");

            movePacketAlongPath(
                "#pathAP"
            );

        }, 25300);


        schedule(() => {

            deactivate("#pathAP");

            activate("#pathEndpoint");

            movePacketAlongPath(
                "#pathEndpoint"
            );

        }, 27000);


        schedule(() => {

            deactivate("#pathEndpoint");

        }, 28700);


        /* --------------------------------------
           SYSLOG MESSAGE
        -------------------------------------- */

        schedule(() => {

            show(".message-card");

        }, 29000);


        schedule(() => {

            hide(".message-card");

        }, 32000);


        /* --------------------------------------
           UDP 514
        -------------------------------------- */

        schedule(() => {

            show(".udp-card");

        }, 32500);


        schedule(() => {

            hide(".udp-card");

        }, 35000);


        /* --------------------------------------
           TCP 514
        -------------------------------------- */

        schedule(() => {

            show(".tcp-card");

        }, 35500);


        schedule(() => {

            hide(".tcp-card");

        }, 38000);


        /* --------------------------------------
           TLS 6514
        -------------------------------------- */

        schedule(() => {

            show(".tls-card");

        }, 38500);


        schedule(() => {

            hide(".tls-card");

        }, 41000);


        /* --------------------------------------
           SEVERITY INTRO
        -------------------------------------- */

        schedule(() => {

            show(".severity-intro-card");

        }, 41500);


        schedule(() => {

            hide(".severity-intro-card");

        }, 43500);


        /* --------------------------------------
           SEVERITY LEVELS
        -------------------------------------- */

        schedule(() => {

            show(".severity-card");

        }, 44000);


        schedule(() => {

            hide(".severity-card");

        }, 48500);


        /* --------------------------------------
           SEVERITY MEMORY
        -------------------------------------- */

        schedule(() => {

            show(".severity-memory-card");

        }, 49000);


        schedule(() => {

            hide(".severity-memory-card");

        }, 51500);


        /* --------------------------------------
           TROUBLESHOOTING
        -------------------------------------- */

        schedule(() => {

            show(".troubleshooting-card");

        }, 52000);


        schedule(() => {

            hide(".troubleshooting-card");

        }, 54000);


        /* --------------------------------------
           SECURITY
        -------------------------------------- */

        schedule(() => {

            show(".security-card");

        }, 54500);


        schedule(() => {

            hide(".security-card");

        }, 56500);


        /* --------------------------------------
           SIEM
        -------------------------------------- */

        schedule(() => {

            show(".siem-card");

        }, 57000);


        schedule(() => {

            hide(".siem-card");

        }, 59000);


        /* --------------------------------------
           CORRELATION
        -------------------------------------- */

        schedule(() => {

            show(".correlation-card");

        }, 59500);


        schedule(() => {

            hide(".correlation-card");

        }, 62000);


        /* --------------------------------------
           NTP
        -------------------------------------- */

        schedule(() => {

            show(".ntp-card");

        }, 62500);


        schedule(() => {

            hide(".ntp-card");

        }, 64500);


        /* --------------------------------------
           ANALYSIS
        -------------------------------------- */

        schedule(() => {

            show(".timestamp-card");

        }, 64800);


        schedule(() => {

            hide(".timestamp-card");
            show(".hostname-card");

        }, 66000);


        schedule(() => {

            hide(".hostname-card");
            show(".event-card");

        }, 67200);


        schedule(() => {

            hide(".event-card");

        }, 68400);


        /* --------------------------------------
           FINAL FLOW
        -------------------------------------- */

        schedule(() => {

            show(".syslog-flow-card");

        }, 68600);


        schedule(() => {

            hide(".syslog-flow-card");

        }, 70000);


        /* --------------------------------------
           FINAL SUMMARY
        -------------------------------------- */

        schedule(() => {

            show(".syslog-summary");

        }, 70200);


        schedule(() => {

            show(".final-concept");

        }, 70800);

    }


    /* ==========================================
       CONTROLS
    ========================================== */

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                playScene();

            }
        );

    }


    if (recordingButton) {

        recordingButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "recording-mode"
                );

            }
        );

    }


    /* ==========================================
       KEYBOARD SHORTCUTS
    ========================================== */

    document.addEventListener(
        "keydown",
        (event) => {

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
       START
    ========================================== */

    playScene();

});