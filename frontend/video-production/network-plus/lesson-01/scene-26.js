/* ==========================================
   AKWIRE NETWORK+ VIDEO PRODUCTION
   SCENE 26 — SNMP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const scene = document.getElementById("scene26");

    const startBtn = document.getElementById("startSceneBtn");
    const restartBtn = document.getElementById("restartSceneBtn");
    const timeline = document.getElementById("timelineProgress");

    const DURATION = 76000;

    let timers = [];
    let animationFrame = null;
    let startTime = null;
    let running = false;


    /* ==========================================
       ELEMENTS
    ========================================== */

    const $ = id => document.getElementById(id);

    const elements = {

        brand:
            document.querySelector(".scene-brand"),

        title:
            document.querySelector(".scene-title"),

        glows:
            document.querySelectorAll(".background-glow"),

        managerNode: $("managerNode"),
        agentNode: $("agentNode"),
        mibNode: $("mibNode"),

        routerNode: $("routerNode"),
        switchNode: $("switchNode"),
        serverNode: $("serverNode"),

        monitoringProblemCard:
            $("monitoringProblemCard"),

        snmpPurposeCard:
            $("snmpPurposeCard"),

        managerCard:
            $("managerCard"),

        agentCard:
            $("agentCard"),

        getCard:
            $("getCard"),

        responseCard:
            $("responseCard"),

        getNextCard:
            $("getNextCard"),

        setCard:
            $("setCard"),

        operationsCard:
            $("operationsCard"),

        mibCard:
            $("mibCard"),

        oidCard:
            $("oidCard"),

        pollingCard:
            $("pollingCard"),

        metricsCard:
            $("metricsCard"),

        udp161Card:
            $("udp161Card"),

        deviceProblemCard:
            $("deviceProblemCard"),

        trapCard:
            $("trapCard"),

        informCard:
            $("informCard"),

        udp162Card:
            $("udp162Card"),

        portSummaryCard:
            $("portSummaryCard"),

        versionIntroCard:
            $("versionIntroCard"),

        versionCard:
            $("versionCard"),

        communityCard:
            $("communityCard"),

        snmpv3Card:
            $("snmpv3Card"),

        snmpFlowCard:
            $("snmpFlowCard"),

        snmpSummary:
            $("snmpSummary"),

        finalConcept:
            $("finalConcept"),

        managerAgentPath:
            $("managerAgentPath"),

        agentManagerPath:
            $("agentManagerPath"),

        agentMibPath:
            $("agentMibPath"),

        agentRouterPath:
            $("agentRouterPath"),

        agentSwitchPath:
            $("agentSwitchPath"),

        agentServerPath:
            $("agentServerPath"),

        trapPath:
            $("trapPath"),

        movingPacket:
            $("movingPacket")
    };


    const cards = [

        elements.monitoringProblemCard,
        elements.snmpPurposeCard,
        elements.managerCard,
        elements.agentCard,
        elements.getCard,
        elements.responseCard,
        elements.getNextCard,
        elements.setCard,
        elements.operationsCard,
        elements.mibCard,
        elements.oidCard,
        elements.pollingCard,
        elements.metricsCard,
        elements.udp161Card,
        elements.deviceProblemCard,
        elements.trapCard,
        elements.informCard,
        elements.udp162Card,
        elements.portSummaryCard,
        elements.versionIntroCard,
        elements.versionCard,
        elements.communityCard,
        elements.snmpv3Card,
        elements.snmpFlowCard

    ].filter(Boolean);


    const nodes = [

        elements.managerNode,
        elements.agentNode,
        elements.mibNode,
        elements.routerNode,
        elements.switchNode,
        elements.serverNode

    ].filter(Boolean);


    const paths = [

        elements.managerAgentPath,
        elements.agentManagerPath,
        elements.agentMibPath,
        elements.agentRouterPath,
        elements.agentSwitchPath,
        elements.agentServerPath,
        elements.trapPath

    ].filter(Boolean);


    /* ==========================================
       TIMER
    ========================================== */

    function schedule(callback, delay) {

        const timer =
            window.setTimeout(callback, delay);

        timers.push(timer);

        return timer;
    }


    function clearTimers() {

        timers.forEach(timer => {

            window.clearTimeout(timer);

        });

        timers = [];
    }


    /* ==========================================
       VISIBILITY
    ========================================== */

    function show(element) {

        if (!element) return;

        element.classList.add("is-visible");
    }


    function hide(element) {

        if (!element) return;

        element.classList.remove("is-visible");
        element.classList.remove("is-active");
    }


    function hideCards() {

        cards.forEach(card => {

            hide(card);

        });
    }


    function clearActiveNodes() {

        nodes.forEach(node => {

            node.classList.remove("is-active");

        });
    }


    function activateNode(node) {

        clearActiveNodes();

        if (node) {

            node.classList.add("is-active");

        }
    }


    /* ==========================================
       PATHS
    ========================================== */

    function showPath(path) {

        if (!path) return;

        path.classList.add("is-visible");
    }


    function activatePath(path) {

        paths.forEach(item => {

            item.classList.remove("is-active");

        });

        if (path) {

            path.classList.add("is-visible");
            path.classList.add("is-active");

        }
    }


    function hidePaths() {

        paths.forEach(path => {

            path.classList.remove("is-visible");
            path.classList.remove("is-active");

        });
    }


    /* ==========================================
       PACKET ANIMATION
    ========================================== */

    function movePacket(path, duration = 1200, color = "#38bdf8") {

        if (!path || !elements.movingPacket) return;

        const packet = elements.movingPacket;

        const pathLength = path.getTotalLength();

        const packetStart = performance.now();

        packet.style.fill = color;
        packet.style.opacity = "1";

        function animatePacket(now) {

            const elapsed = now - packetStart;

            const progress =
                Math.min(elapsed / duration, 1);

            const point =
                path.getPointAtLength(
                    pathLength * progress
                );

            packet.setAttribute("cx", point.x);
            packet.setAttribute("cy", point.y);

            if (progress < 1 && running) {

                requestAnimationFrame(
                    animatePacket
                );

            } else {

                packet.style.opacity = "0";

            }

        }

        requestAnimationFrame(
            animatePacket
        );

    }


    /* ==========================================
       TIMELINE
    ========================================== */

    function startTimeline() {

        startTime = performance.now();

        function update(now) {

            if (!running) return;

            const elapsed =
                now - startTime;

            const progress =
                Math.min(
                    elapsed / DURATION,
                    1
                );

            timeline.style.width =
                `${progress * 100}%`;

            if (progress < 1) {

                animationFrame =
                    requestAnimationFrame(
                        update
                    );

            } else {

                running = false;

            }

        }

        animationFrame =
            requestAnimationFrame(update);

    }


    /* ==========================================
       RESET
    ========================================== */

    function resetScene() {

        running = false;

        clearTimers();

        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;
        }

        timeline.style.width = "0%";

        hide(elements.brand);
        hide(elements.title);

        elements.glows.forEach(glow => {

            glow.classList.remove(
                "is-visible"
            );

        });

        hideCards();

        nodes.forEach(node => {

            hide(node);

        });

        hidePaths();

        hide(elements.snmpSummary);
        hide(elements.finalConcept);

        if (elements.movingPacket) {

            elements.movingPacket.style.opacity =
                "0";
        }

    }


    /* ==========================================
       SCENE
    ========================================== */

    function startScene() {

        resetScene();

        running = true;

        startTimeline();


        /* --------------------------------------
           INTRO
        -------------------------------------- */

        schedule(() => {

            show(elements.brand);

            elements.glows.forEach(glow => {

                show(glow);

            });

        }, 300);


        schedule(() => {

            show(elements.title);

        }, 900);


        /* --------------------------------------
           MONITORING PROBLEM
        -------------------------------------- */

        schedule(() => {

            show(
                elements.monitoringProblemCard
            );

        }, 3000);


        schedule(() => {

            hideCards();

            show(
                elements.snmpPurposeCard
            );

        }, 6200);


        /* --------------------------------------
           MANAGER
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(elements.managerNode);

            activateNode(
                elements.managerNode
            );

            show(
                elements.managerCard
            );

        }, 9500);


        /* --------------------------------------
           AGENT
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(elements.agentNode);

            activateNode(
                elements.agentNode
            );

            show(
                elements.agentCard
            );

            showPath(
                elements.managerAgentPath
            );

        }, 12500);


        /* --------------------------------------
           MANAGED DEVICES
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(elements.routerNode);
            show(elements.switchNode);
            show(elements.serverNode);

            showPath(
                elements.agentRouterPath
            );

            showPath(
                elements.agentSwitchPath
            );

            showPath(
                elements.agentServerPath
            );

            activateNode(
                elements.agentNode
            );

        }, 15200);


        /* --------------------------------------
           SNMP GET
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.managerNode
            );

            activatePath(
                elements.managerAgentPath
            );

            show(
                elements.getCard
            );

            movePacket(
                elements.managerAgentPath,
                1400,
                "#38bdf8"
            );

        }, 18000);


        /* --------------------------------------
           RESPONSE
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.agentNode
            );

            activatePath(
                elements.agentManagerPath
            );

            showPath(
                elements.agentManagerPath
            );

            show(
                elements.responseCard
            );

            movePacket(
                elements.agentManagerPath,
                1400,
                "#34d399"
            );

        }, 21000);


        /* --------------------------------------
           GETNEXT
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.managerNode
            );

            activatePath(
                elements.managerAgentPath
            );

            show(
                elements.getNextCard
            );

            movePacket(
                elements.managerAgentPath,
                1250,
                "#a78bfa"
            );

        }, 24000);


        /* --------------------------------------
           SET
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.setCard
            );

            activatePath(
                elements.managerAgentPath
            );

            movePacket(
                elements.managerAgentPath,
                1250,
                "#fbbf24"
            );

        }, 26800);


        /* --------------------------------------
           OPERATIONS
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.operationsCard
            );

            clearActiveNodes();

        }, 29600);


        /* --------------------------------------
           MIB
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(elements.mibNode);

            activateNode(
                elements.mibNode
            );

            showPath(
                elements.agentMibPath
            );

            activatePath(
                elements.agentMibPath
            );

            show(
                elements.mibCard
            );

            movePacket(
                elements.agentMibPath,
                1100,
                "#a78bfa"
            );

        }, 32600);


        /* --------------------------------------
           OID
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.mibNode
            );

            show(
                elements.oidCard
            );

        }, 35600);


        /* --------------------------------------
           POLLING
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.managerNode
            );

            activatePath(
                elements.managerAgentPath
            );

            show(
                elements.pollingCard
            );

            movePacket(
                elements.managerAgentPath,
                1000,
                "#38bdf8"
            );

        }, 38600);


        schedule(() => {

            hideCards();

            show(
                elements.metricsCard
            );

            movePacket(
                elements.agentManagerPath,
                1000,
                "#34d399"
            );

        }, 41200);


        /* --------------------------------------
           UDP 161
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.udp161Card
            );

            activatePath(
                elements.managerAgentPath
            );

        }, 43800);


        /* --------------------------------------
           DEVICE FAILURE
        -------------------------------------- */

        schedule(() => {

            hideCards();

            activateNode(
                elements.routerNode
            );

            show(
                elements.deviceProblemCard
            );

        }, 46800);


        /* --------------------------------------
           TRAP
        -------------------------------------- */

        schedule(() => {

            hideCards();

            showPath(
                elements.trapPath
            );

            activatePath(
                elements.trapPath
            );

            show(
                elements.trapCard
            );

            movePacket(
                elements.trapPath,
                1800,
                "#fbbf24"
            );

        }, 49400);


        /* --------------------------------------
           INFORM
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.informCard
            );

            activateNode(
                elements.managerNode
            );

        }, 52200);


        /* --------------------------------------
           UDP 162
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.udp162Card
            );

            activatePath(
                elements.trapPath
            );

        }, 54800);


        /* --------------------------------------
           PORT SUMMARY
        -------------------------------------- */

        schedule(() => {

            hideCards();

            clearActiveNodes();

            show(
                elements.portSummaryCard
            );

        }, 57400);


        /* --------------------------------------
           SNMP VERSIONS
        -------------------------------------- */

        schedule(() => {

            hideCards();

            hidePaths();

            show(
                elements.versionIntroCard
            );

        }, 60000);


        schedule(() => {

            hideCards();

            show(
                elements.versionCard
            );

        }, 62600);


        /* --------------------------------------
           COMMUNITY STRINGS
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.communityCard
            );

        }, 65000);


        /* --------------------------------------
           SNMPv3
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.snmpv3Card
            );

        }, 67400);


        /* --------------------------------------
           COMPLETE FLOW
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.snmpFlowCard
            );

        }, 70000);


        /* --------------------------------------
           FINAL SUMMARY
        -------------------------------------- */

        schedule(() => {

            hideCards();

            show(
                elements.snmpSummary
            );

        }, 72400);


        /* --------------------------------------
           FINAL CONCEPT
        -------------------------------------- */

        schedule(() => {

            show(
                elements.finalConcept
            );

        }, 74200);


        /* --------------------------------------
           END
        -------------------------------------- */

        schedule(() => {

            running = false;

            timeline.style.width = "100%";

        }, DURATION);

    }


    /* ==========================================
       CONTROLS
    ========================================== */

    startBtn.addEventListener(
        "click",
        startScene
    );


    restartBtn.addEventListener(
        "click",
        startScene
    );


    /* ==========================================
       RECORDING MODE

       Add:
       ?recording=true

       Example:
       scene-26.html?recording=true
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    if (
        params.get("recording") === "true"
    ) {

        document.body.classList.add(
            "recording-mode"
        );

        schedule(() => {

            startScene();

        }, 500);

    }


    /* ==========================================
       INITIAL STATE
    ========================================== */

    resetScene();

});