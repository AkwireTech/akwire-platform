// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 21 — ICMP
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("startSceneBtn")
        .addEventListener("click", playScene);

    document
        .getElementById("restartSceneBtn")
        .addEventListener("click", restartScene);
});


// ===============================================
// SETTINGS
// ===============================================

const SCENE_DURATION = 72000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {
    return {
        brand: document.querySelector(".scene-brand"),
        title: document.querySelector(".scene-title"),

        sourceHost: document.getElementById("sourceHost"),
        router: document.getElementById("router"),
        destinationHost: document.getElementById("destinationHost"),

        ipPacketCard: document.getElementById("ipPacketCard"),
        problemCard: document.getElementById("problemCard"),
        icmpMessageCard: document.getElementById("icmpMessageCard"),
        icmpReturnLabel: document.getElementById("icmpReturnLabel"),
        icmpPurpose: document.getElementById("icmpPurpose"),

        pingTitle: document.getElementById("pingTitle"),
        echoRequest: document.getElementById("echoRequest"),
        echoReply: document.getElementById("echoReply"),
        pingResult: document.getElementById("pingResult"),

        tracerouteCard: document.getElementById("tracerouteCard"),
        unreachableCard: document.getElementById("unreachableCard"),

        mtuIcmpCard: document.getElementById("mtuIcmpCard"),
        ipv6Note: document.getElementById("ipv6Note"),

        noPortsCard: document.getElementById("noPortsCard"),
        icmpStructure: document.getElementById("icmpStructure"),
        icmpProcess: document.getElementById("icmpProcess"),

        icmpSummary: document.getElementById("icmpSummary"),
        finalConcept: document.getElementById("finalConcept"),

        sourceRouterPath: document.getElementById("sourceRouterPath"),
        routerDestinationPath: document.getElementById("routerDestinationPath"),
        icmpReturnPath: document.getElementById("icmpReturnPath"),
        pingRequestPath: document.getElementById("pingRequestPath"),
        pingReplyPath: document.getElementById("pingReplyPath"),

        movingPacket: document.getElementById("movingPacket"),
        timeline: document.getElementById("timelineProgress")
    };
}


// ===============================================
// TIMER
// ===============================================

function schedule(callback, delay) {
    const timer = setTimeout(callback, delay);
    sceneTimers.push(timer);
}


// ===============================================
// CLEAR TIMERS
// ===============================================

function clearSceneTimers() {
    sceneTimers.forEach(timer => {
        clearTimeout(timer);
    });

    sceneTimers = [];

    animationFrameIds.forEach(id => {
        cancelAnimationFrame(id);
    });

    animationFrameIds = [];
}


// ===============================================
// VISIBILITY
// ===============================================

function show(element) {
    if (!element) return;
    element.classList.add("is-visible");
}

function hide(element) {
    if (!element) return;
    element.classList.remove("is-visible");
}


// ===============================================
// NODE STATES
// ===============================================

function clearActiveNodes() {
    document
        .querySelectorAll(".network-node")
        .forEach(node => {
            node.classList.remove("is-active");
        });
}

function activateNode(node) {
    clearActiveNodes();

    if (node) {
        node.classList.add("is-active");
    }
}


// ===============================================
// PATH STATES
// ===============================================

function clearActivePaths() {
    document
        .querySelectorAll(".network-path")
        .forEach(path => {
            path.classList.remove("is-active");
        });
}

function showPath(path) {
    if (!path) return;

    path.classList.add("is-visible");
}

function hidePath(path) {
    if (!path) return;

    path.classList.remove(
        "is-visible",
        "is-active"
    );
}

function activatePath(path) {
    clearActivePaths();

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );
}


// ===============================================
// PACKET
// ===============================================

function setPacketColor(packet, color) {
    if (!packet) return;

    packet.style.fill = color;
    packet.style.filter =
        `drop-shadow(0 0 11px ${color})`;
}

function resetMovingPacket(packet) {
    if (!packet) return;

    packet.style.opacity = "0";
    packet.removeAttribute("cx");
    packet.removeAttribute("cy");
}


// ===============================================
// PACKET PATH ANIMATION
// ===============================================

function animatePacketAlongPath(
    packet,
    path,
    duration,
    progressCallback = null,
    completeCallback = null
) {
    if (!packet || !path) return;

    const totalLength = path.getTotalLength();
    const startTime = performance.now();

    packet.style.opacity = "1";

    function move(currentTime) {
        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
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

        if (progressCallback) {
            progressCallback(progress);
        }

        if (progress < 1) {
            const frameId =
                requestAnimationFrame(move);

            animationFrameIds.push(frameId);
        } else {
            packet.style.opacity = "0";

            if (completeCallback) {
                completeCallback();
            }
        }
    }

    const frameId =
        requestAnimationFrame(move);

    animationFrameIds.push(frameId);
}


// ===============================================
// SEND PACKET
// ===============================================

function sendPacket(
    elements,
    path,
    sourceNode,
    destinationNode,
    color,
    duration = 2200,
    completeCallback = null
) {
    setPacketColor(
        elements.movingPacket,
        color
    );

    activatePath(path);
    activateNode(sourceNode);

    animatePacketAlongPath(
        elements.movingPacket,
        path,
        duration,

        progress => {
            if (
                destinationNode &&
                progress > 0.72
            ) {
                activateNode(
                    destinationNode
                );
            }
        },

        () => {
            clearActivePaths();

            if (destinationNode) {
                activateNode(
                    destinationNode
                );
            }

            if (completeCallback) {
                completeCallback();
            }
        }
    );
}


// ===============================================
// RESET
// ===============================================

function resetScene() {
    clearSceneTimers();

    const elements = getElements();

    hide(elements.brand);
    hide(elements.title);

    hide(elements.sourceHost);
    hide(elements.router);
    hide(elements.destinationHost);

    hide(elements.ipPacketCard);
    hide(elements.problemCard);
    hide(elements.icmpMessageCard);
    hide(elements.icmpReturnLabel);
    hide(elements.icmpPurpose);

    hide(elements.pingTitle);
    hide(elements.echoRequest);
    hide(elements.echoReply);
    hide(elements.pingResult);

    hide(elements.tracerouteCard);
    hide(elements.unreachableCard);

    hide(elements.mtuIcmpCard);
    hide(elements.ipv6Note);

    hide(elements.noPortsCard);
    hide(elements.icmpStructure);
    hide(elements.icmpProcess);

    hide(elements.icmpSummary);
    hide(elements.finalConcept);

    clearActiveNodes();

    document
        .querySelectorAll(".network-path")
        .forEach(path => {
            path.classList.remove(
                "is-visible",
                "is-active"
            );
        });

    resetMovingPacket(
        elements.movingPacket
    );

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {
            glow.style.transition = "none";
            glow.style.opacity = "0";
        });

    elements.timeline.style.transition =
        "none";

    elements.timeline.style.width =
        "0%";
}


// ===============================================
// HIDE TOPOLOGY
// ===============================================

function hideTopology(elements) {
    hide(elements.sourceHost);
    hide(elements.router);
    hide(elements.destinationHost);

    hidePath(elements.sourceRouterPath);
    hidePath(elements.routerDestinationPath);
    hidePath(elements.icmpReturnPath);
    hidePath(elements.pingRequestPath);
    hidePath(elements.pingReplyPath);

    clearActiveNodes();
    clearActivePaths();

    resetMovingPacket(
        elements.movingPacket
    );
}


// ===============================================
// PLAY SCENE
// ===============================================

function playScene() {
    resetScene();

    const elements = getElements();


    // ===========================================
    // TIMELINE
    // ===========================================

    requestAnimationFrame(() => {
        elements.timeline.style.transition =
            `width ${SCENE_DURATION}ms linear`;

        elements.timeline.style.width =
            "100%";
    });


    // ===========================================
    // 0:00 — BRAND
    // ===========================================

    schedule(() => {
        show(elements.brand);

        document
            .querySelectorAll(".background-glow")
            .forEach(glow => {
                glow.style.transition =
                    "opacity 2s ease";

                glow.style.opacity = "1";
            });
    }, 300);


    // ===========================================
    // 0:02 — TITLE
    // ===========================================

    schedule(() => {
        show(elements.title);
    }, 2000);


    // ===========================================
    // 0:05 — NETWORK TOPOLOGY
    // ===========================================

    schedule(() => {
        show(elements.sourceHost);
        show(elements.router);
        show(elements.destinationHost);

        showPath(
            elements.sourceRouterPath
        );

        showPath(
            elements.routerDestinationPath
        );

        activateNode(
            elements.sourceHost
        );
    }, 5000);


    // ===========================================
    // 0:08 — NORMAL IP PACKET
    // ===========================================

    schedule(() => {
        show(elements.ipPacketCard);
    }, 8000);


    // ===========================================
    // 0:10 — SOURCE → ROUTER
    // ===========================================

    schedule(() => {
        hide(elements.ipPacketCard);

        sendPacket(
            elements,
            elements.sourceRouterPath,
            elements.sourceHost,
            elements.router,
            "#38bdf8",
            2200
        );
    }, 10000);


    // ===========================================
    // 0:13 — NETWORK PROBLEM
    // ===========================================

    schedule(() => {
        activateNode(
            elements.router
        );

        show(elements.problemCard);
    }, 13000);


    // ===========================================
    // 0:16 — ICMP CREATED
    // ===========================================

    schedule(() => {
        hide(elements.problemCard);

        show(elements.icmpMessageCard);
    }, 16000);


    // ===========================================
    // 0:19 — ICMP RETURNS TO SOURCE
    // ===========================================

    schedule(() => {
        hide(elements.icmpMessageCard);

        show(
            elements.icmpReturnLabel
        );

        showPath(
            elements.icmpReturnPath
        );

        sendPacket(
            elements,
            elements.icmpReturnPath,
            elements.router,
            elements.sourceHost,
            "#f87171",
            2300
        );
    }, 19000);


    // ===========================================
    // 0:22 — ICMP PURPOSE
    // ===========================================

    schedule(() => {
        hide(
            elements.icmpReturnLabel
        );

        hidePath(
            elements.icmpReturnPath
        );

        show(elements.icmpPurpose);
    }, 22000);


    // ===========================================
    // 0:25 — PING INTRO
    // ===========================================

    schedule(() => {
        hide(elements.icmpPurpose);

        show(elements.pingTitle);

        hidePath(
            elements.sourceRouterPath
        );

        hidePath(
            elements.routerDestinationPath
        );

        showPath(
            elements.pingRequestPath
        );

        showPath(
            elements.pingReplyPath
        );

        activateNode(
            elements.sourceHost
        );
    }, 25000);


    // ===========================================
    // 0:28 — ECHO REQUEST
    // ===========================================

    schedule(() => {
        hide(elements.pingTitle);

        show(elements.echoRequest);

        sendPacket(
            elements,
            elements.pingRequestPath,
            elements.sourceHost,
            elements.destinationHost,
            "#38bdf8",
            2600
        );
    }, 28000);


    // ===========================================
    // 0:32 — ECHO REPLY
    // ===========================================

    schedule(() => {
        hide(elements.echoRequest);

        show(elements.echoReply);

        sendPacket(
            elements,
            elements.pingReplyPath,
            elements.destinationHost,
            elements.sourceHost,
            "#34d399",
            2600
        );
    }, 32000);


    // ===========================================
    // 0:36 — PING RESULT
    // ===========================================

    schedule(() => {
        hide(elements.echoReply);

        show(elements.pingResult);

        activateNode(
            elements.sourceHost
        );
    }, 36000);


    // ===========================================
    // 0:39 — CLEAR PING
    // ===========================================

    schedule(() => {
        hide(elements.pingResult);

        hideTopology(elements);
    }, 39000);


    // ===========================================
    // 0:40 — TRACEROUTE
    // ===========================================

    schedule(() => {
        show(elements.tracerouteCard);
    }, 40000);


    // ===========================================
    // 0:45 — DESTINATION UNREACHABLE
    // ===========================================

    schedule(() => {
        hide(elements.tracerouteCard);

        show(elements.unreachableCard);
    }, 45000);


    // ===========================================
    // 0:50 — MTU / ICMP
    // ===========================================

    schedule(() => {
        hide(elements.unreachableCard);

        show(elements.mtuIcmpCard);
    }, 50000);


    // ===========================================
    // 0:54 — IPv6 PACKET TOO BIG
    // ===========================================

    schedule(() => {
        show(elements.ipv6Note);
    }, 54000);


    // ===========================================
    // 0:57 — ICMP TYPE + CODE
    // ===========================================

    schedule(() => {
        hide(elements.mtuIcmpCard);
        hide(elements.ipv6Note);

        show(elements.icmpStructure);
    }, 57000);


    // ===========================================
    // 1:01 — ICMP DOES NOT USE PORTS
    // ===========================================

    schedule(() => {
        hide(elements.icmpStructure);

        show(elements.noPortsCard);
    }, 61000);


    // ===========================================
    // 1:05 — GENERAL PROCESS
    // ===========================================

    schedule(() => {
        hide(elements.noPortsCard);

        show(elements.icmpProcess);
    }, 65000);


    // ===========================================
    // 1:08 — SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.icmpProcess);

        show(elements.icmpSummary);
    }, 68000);


    // ===========================================
    // 1:10 — FINAL CONCEPT
    // ===========================================

    schedule(() => {
        show(elements.finalConcept);
    }, 70000);
}


// ===============================================
// RESTART
// ===============================================

function restartScene() {
    resetScene();

    schedule(() => {
        playScene();
    }, 250);
}


// ===============================================
// KEYBOARD CONTROLS
//
// SPACE = START
// R = RESTART
// ===============================================

document.addEventListener(
    "keydown",
    event => {
        if (event.code === "Space") {
            event.preventDefault();
            playScene();
        }

        if (
            event.key.toLowerCase() === "r"
        ) {
            restartScene();
        }
    }
);