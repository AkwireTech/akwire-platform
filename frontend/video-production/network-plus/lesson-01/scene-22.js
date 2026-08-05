// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 22 — ARP
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

const SCENE_DURATION = 78000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {
    return {
        brand: document.querySelector(".scene-brand"),
        title: document.querySelector(".scene-title"),

        hostA: document.getElementById("hostA"),
        switchNode: document.getElementById("switchNode"),
        hostB: document.getElementById("hostB"),
        hostC: document.getElementById("hostC"),
        gateway: document.getElementById("gateway"),
        internet: document.getElementById("internet"),

        destinationCard: document.getElementById("destinationCard"),
        arpCacheCard: document.getElementById("arpCacheCard"),
        cacheMiss: document.getElementById("cacheMiss"),
        arpRequestCard: document.getElementById("arpRequestCard"),
        broadcastLabel: document.getElementById("broadcastLabel"),
        switchFloodCard: document.getElementById("switchFloodCard"),
        hostCheckCard: document.getElementById("hostCheckCard"),
        arpReplyCard: document.getElementById("arpReplyCard"),
        cacheUpdatedCard: document.getElementById("cacheUpdatedCard"),
        ethernetFrameCard: document.getElementById("ethernetFrameCard"),
        localSummary: document.getElementById("localSummary"),

        remoteDestinationCard: document.getElementById("remoteDestinationCard"),
        remoteDecisionCard: document.getElementById("remoteDecisionCard"),
        wrongArpCard: document.getElementById("wrongArpCard"),
        gatewayArpCard: document.getElementById("gatewayArpCard"),
        gatewayMapping: document.getElementById("gatewayMapping"),
        remoteFrameCard: document.getElementById("remoteFrameCard"),

        arpBoundaryCard: document.getElementById("arpBoundaryCard"),
        ipv6Card: document.getElementById("ipv6Card"),
        arpProcess: document.getElementById("arpProcess"),

        arpSummary: document.getElementById("arpSummary"),
        finalConcept: document.getElementById("finalConcept"),

        hostASwitchPath: document.getElementById("hostASwitchPath"),
        switchHostBPath: document.getElementById("switchHostBPath"),
        switchHostCPath: document.getElementById("switchHostCPath"),
        switchGatewayPath: document.getElementById("switchGatewayPath"),
        gatewayInternetPath: document.getElementById("gatewayInternetPath"),
        arpReplyPath: document.getElementById("arpReplyPath"),
        gatewayReplyPath: document.getElementById("gatewayReplyPath"),

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
// CLEAR TIMERS / ANIMATIONS
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

    const totalLength =
        path.getTotalLength();

    const startTime =
        performance.now();

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

            animationFrameIds.push(
                frameId
            );
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

    if (sourceNode) {
        activateNode(sourceNode);
    }

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

    hide(elements.hostA);
    hide(elements.switchNode);
    hide(elements.hostB);
    hide(elements.hostC);
    hide(elements.gateway);
    hide(elements.internet);

    hide(elements.destinationCard);
    hide(elements.arpCacheCard);
    hide(elements.cacheMiss);
    hide(elements.arpRequestCard);
    hide(elements.broadcastLabel);
    hide(elements.switchFloodCard);
    hide(elements.hostCheckCard);
    hide(elements.arpReplyCard);
    hide(elements.cacheUpdatedCard);
    hide(elements.ethernetFrameCard);
    hide(elements.localSummary);

    hide(elements.remoteDestinationCard);
    hide(elements.remoteDecisionCard);
    hide(elements.wrongArpCard);
    hide(elements.gatewayArpCard);
    hide(elements.gatewayMapping);
    hide(elements.remoteFrameCard);

    hide(elements.arpBoundaryCard);
    hide(elements.ipv6Card);
    hide(elements.arpProcess);

    hide(elements.arpSummary);
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
// CLEAR LOCAL TEACHING CARDS
// ===============================================

function clearLocalCards(elements) {
    hide(elements.destinationCard);
    hide(elements.arpCacheCard);
    hide(elements.cacheMiss);
    hide(elements.arpRequestCard);
    hide(elements.broadcastLabel);
    hide(elements.switchFloodCard);
    hide(elements.hostCheckCard);
    hide(elements.arpReplyCard);
    hide(elements.cacheUpdatedCard);
    hide(elements.ethernetFrameCard);
    hide(elements.localSummary);
}


// ===============================================
// CLEAR REMOTE TEACHING CARDS
// ===============================================

function clearRemoteCards(elements) {
    hide(elements.remoteDestinationCard);
    hide(elements.remoteDecisionCard);
    hide(elements.wrongArpCard);
    hide(elements.gatewayArpCard);
    hide(elements.gatewayMapping);
    hide(elements.remoteFrameCard);
}


// ===============================================
// PLAY
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
    // 0:05 — LOCAL LAN
    // ===========================================

    schedule(() => {
        show(elements.hostA);
        show(elements.switchNode);
        show(elements.hostB);
        show(elements.hostC);

        showPath(
            elements.hostASwitchPath
        );

        showPath(
            elements.switchHostBPath
        );

        showPath(
            elements.switchHostCPath
        );

        activateNode(
            elements.hostA
        );
    }, 5000);


    // ===========================================
    // 0:08 — DESTINATION KNOWN
    // ===========================================

    schedule(() => {
        show(elements.destinationCard);
    }, 8000);


    // ===========================================
    // 0:11 — CHECK ARP CACHE
    // ===========================================

    schedule(() => {
        hide(elements.destinationCard);

        show(elements.arpCacheCard);
    }, 11000);


    // ===========================================
    // 0:14 — CACHE MISS
    // ===========================================

    schedule(() => {
        hide(elements.arpCacheCard);

        show(elements.cacheMiss);
    }, 14000);


    // ===========================================
    // 0:17 — CREATE ARP REQUEST
    // ===========================================

    schedule(() => {
        hide(elements.cacheMiss);

        show(elements.arpRequestCard);
    }, 17000);


    // ===========================================
    // 0:20 — HOST A SENDS BROADCAST TO SWITCH
    // ===========================================

    schedule(() => {
        hide(elements.arpRequestCard);

        show(elements.broadcastLabel);

        sendPacket(
            elements,
            elements.hostASwitchPath,
            elements.hostA,
            elements.switchNode,
            "#fbbf24",
            2200
        );
    }, 20000);


    // ===========================================
    // 0:23 — SWITCH FLOODS BROADCAST
    // ===========================================

    schedule(() => {
        hide(elements.broadcastLabel);

        show(elements.switchFloodCard);

        activateNode(
            elements.switchNode
        );

        activatePath(
            elements.switchHostBPath
        );

        showPath(
            elements.switchHostCPath
        );
    }, 23000);


    // ===========================================
    // 0:25 — FLOOD COPY TO HOST B
    // ===========================================

    schedule(() => {
        hide(elements.switchFloodCard);

        sendPacket(
            elements,
            elements.switchHostBPath,
            elements.switchNode,
            elements.hostB,
            "#fbbf24",
            1900
        );
    }, 25000);


    // ===========================================
    // 0:27 — FLOOD COPY TO HOST C
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.switchHostCPath,
            elements.switchNode,
            elements.hostC,
            "#fbbf24",
            1900
        );
    }, 27000);


    // ===========================================
    // 0:30 — HOSTS INSPECT REQUEST
    // ===========================================

    schedule(() => {
        show(elements.hostCheckCard);

        clearActiveNodes();
    }, 30000);


    // ===========================================
    // 0:33 — HOST B ARP REPLY
    // ===========================================

    schedule(() => {
        hide(elements.hostCheckCard);

        show(elements.arpReplyCard);

        activateNode(
            elements.hostB
        );
    }, 33000);


    // ===========================================
    // 0:36 — UNICAST REPLY TO HOST A
    // ===========================================

    schedule(() => {
        hide(elements.arpReplyCard);

        showPath(
            elements.arpReplyPath
        );

        sendPacket(
            elements,
            elements.arpReplyPath,
            elements.hostB,
            elements.hostA,
            "#34d399",
            2500
        );
    }, 36000);


    // ===========================================
    // 0:40 — CACHE UPDATED
    // ===========================================

    schedule(() => {
        hidePath(
            elements.arpReplyPath
        );

        show(elements.cacheUpdatedCard);
    }, 40000);


    // ===========================================
    // 0:43 — BUILD ETHERNET FRAME
    // ===========================================

    schedule(() => {
        hide(elements.cacheUpdatedCard);

        show(elements.ethernetFrameCard);
    }, 43000);


    // ===========================================
    // 0:46 — FRAME DELIVERY
    // ===========================================

    schedule(() => {
        hide(elements.ethernetFrameCard);

        sendPacket(
            elements,
            elements.hostASwitchPath,
            elements.hostA,
            elements.switchNode,
            "#38bdf8",
            1700,

            () => {
                sendPacket(
                    elements,
                    elements.switchHostBPath,
                    elements.switchNode,
                    elements.hostB,
                    "#34d399",
                    1700
                );
            }
        );
    }, 46000);


    // ===========================================
    // 0:50 — LOCAL RULE
    // ===========================================

    schedule(() => {
        show(elements.localSummary);

        activateNode(
            elements.hostB
        );
    }, 50000);


    // ===========================================
    // 0:53 — PREPARE REMOTE EXAMPLE
    // ===========================================

    schedule(() => {
        clearLocalCards(elements);

        hide(elements.hostB);
        hide(elements.hostC);

        hidePath(
            elements.switchHostBPath
        );

        hidePath(
            elements.switchHostCPath
        );

        show(elements.gateway);
        show(elements.internet);

        showPath(
            elements.switchGatewayPath
        );

        showPath(
            elements.gatewayInternetPath
        );

        activateNode(
            elements.hostA
        );
    }, 53000);


    // ===========================================
    // 0:55 — REMOTE DESTINATION
    // ===========================================

    schedule(() => {
        show(
            elements.remoteDestinationCard
        );
    }, 55000);


    // ===========================================
    // 0:58 — ROUTING DECISION
    // ===========================================

    schedule(() => {
        hide(
            elements.remoteDestinationCard
        );

        show(
            elements.remoteDecisionCard
        );
    }, 58000);


    // ===========================================
    // 1:01 — DO NOT ARP FOR REMOTE SERVER
    // ===========================================

    schedule(() => {
        hide(
            elements.remoteDecisionCard
        );

        show(elements.wrongArpCard);
    }, 61000);


    // ===========================================
    // 1:04 — ARP FOR DEFAULT GATEWAY
    // ===========================================

    schedule(() => {
        hide(elements.wrongArpCard);

        show(elements.gatewayArpCard);

        activateNode(
            elements.hostA
        );
    }, 64000);


    // ===========================================
    // 1:07 — GATEWAY ARP REQUEST
    // ===========================================

    schedule(() => {
        hide(elements.gatewayArpCard);

        sendPacket(
            elements,
            elements.hostASwitchPath,
            elements.hostA,
            elements.switchNode,
            "#fbbf24",
            1500,

            () => {
                sendPacket(
                    elements,
                    elements.switchGatewayPath,
                    elements.switchNode,
                    elements.gateway,
                    "#fbbf24",
                    1900
                );
            }
        );
    }, 67000);


    // ===========================================
    // 1:11 — GATEWAY REPLIES
    // ===========================================

    schedule(() => {
        showPath(
            elements.gatewayReplyPath
        );

        sendPacket(
            elements,
            elements.gatewayReplyPath,
            elements.gateway,
            elements.hostA,
            "#fbbf24",
            2300
        );
    }, 71000);


    // ===========================================
    // 1:14 — GATEWAY MAPPING
    // ===========================================

    schedule(() => {
        hidePath(
            elements.gatewayReplyPath
        );

        show(elements.gatewayMapping);
    }, 74000);


    // ===========================================
    // 1:17 — REMOTE FRAME
    // ===========================================

    schedule(() => {
        hide(elements.gatewayMapping);

        show(elements.remoteFrameCard);
    }, 77000);


    // ===========================================
    // EXTEND TIMELINE FOR FINAL TEACHING
    // These appear immediately after remote frame
    // during the final seconds.
    // ===========================================

    schedule(() => {
        hide(elements.remoteFrameCard);

        show(elements.arpBoundaryCard);
    }, 80500);


    schedule(() => {
        hide(elements.arpBoundaryCard);

        show(elements.ipv6Card);
    }, 84000);


    schedule(() => {
        hide(elements.ipv6Card);

        clearRemoteCards(elements);

        hide(elements.hostA);
        hide(elements.switchNode);
        hide(elements.gateway);
        hide(elements.internet);

        hidePath(
            elements.hostASwitchPath
        );

        hidePath(
            elements.switchGatewayPath
        );

        hidePath(
            elements.gatewayInternetPath
        );

        show(elements.arpProcess);
    }, 87000);


    schedule(() => {
        hide(elements.arpProcess);

        show(elements.arpSummary);
    }, 90000);


    schedule(() => {
        show(elements.finalConcept);
    }, 92000);
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