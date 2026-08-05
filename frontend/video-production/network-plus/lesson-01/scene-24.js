// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 24 — DHCP
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("startSceneBtn")
        ?.addEventListener("click", playScene);

    document
        .getElementById("restartSceneBtn")
        ?.addEventListener("click", restartScene);
});


// ===============================================
// SETTINGS
// ===============================================

const SCENE_DURATION = 112000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {
    return {
        brand: document.querySelector(".scene-brand"),
        title: document.querySelector(".scene-title"),

        client: document.getElementById("clientNode"),
        switchNode: document.getElementById("switchNode"),
        server: document.getElementById("dhcpServerNode"),
        gateway: document.getElementById("gatewayNode"),
        remoteServer: document.getElementById("remoteServerNode"),

        clientIpLabel: document.getElementById("clientIpLabel"),

        clientStartCard: document.getElementById("clientStartCard"),
        dhcpPurposeCard: document.getElementById("dhcpPurposeCard"),
        doraProcess: document.getElementById("doraProcess"),

        discoverCard: document.getElementById("discoverCard"),
        broadcastLabel: document.getElementById("broadcastLabel"),
        switchFloodCard: document.getElementById("switchFloodCard"),

        offerCard: document.getElementById("offerCard"),
        requestCard: document.getElementById("requestCard"),
        ackCard: document.getElementById("ackCard"),

        configuredCard: document.getElementById("configuredCard"),
        leaseCard: document.getElementById("leaseCard"),
        renewalCard: document.getElementById("renewalCard"),
        portsCard: document.getElementById("portsCard"),

        broadcastBoundaryCard:
            document.getElementById("broadcastBoundaryCard"),

        relayCard: document.getElementById("relayCard"),
        relayFlowCard: document.getElementById("relayFlowCard"),

        failureCard: document.getElementById("failureCard"),
        apipaCard: document.getElementById("apipaCard"),
        apipaLimitCard: document.getElementById("apipaLimitCard"),

        doraSummary: document.getElementById("doraSummary"),
        dhcpSummary: document.getElementById("dhcpSummary"),
        finalConcept: document.getElementById("finalConcept"),

        clientSwitchPath: document.getElementById("clientSwitchPath"),
        switchServerPath: document.getElementById("switchServerPath"),
        serverReplyPath: document.getElementById("serverReplyPath"),
        clientGatewayPath: document.getElementById("clientGatewayPath"),
        relayServerPath: document.getElementById("relayServerPath"),

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
// FORWARD PATH ANIMATION
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
        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const point =
            path.getPointAtLength(
                totalLength * progress
            );

        packet.setAttribute("cx", point.x);
        packet.setAttribute("cy", point.y);

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
// REVERSE PATH ANIMATION
// ===============================================

function animatePacketReverse(
    elements,
    path,
    sourceNode,
    destinationNode,
    color,
    duration = 2200,
    completeCallback = null
) {
    if (!path) return;

    const packet = elements.movingPacket;
    const totalLength = path.getTotalLength();
    const startTime = performance.now();

    setPacketColor(packet, color);

    activatePath(path);

    if (sourceNode) {
        activateNode(sourceNode);
    }

    packet.style.opacity = "1";

    function move(currentTime) {
        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const reverseProgress =
            1 - progress;

        const point =
            path.getPointAtLength(
                totalLength * reverseProgress
            );

        packet.setAttribute("cx", point.x);
        packet.setAttribute("cy", point.y);

        if (
            destinationNode &&
            progress > 0.72
        ) {
            activateNode(destinationNode);
        }

        if (progress < 1) {
            const frameId =
                requestAnimationFrame(move);

            animationFrameIds.push(frameId);
        } else {
            packet.style.opacity = "0";

            clearActivePaths();

            if (destinationNode) {
                activateNode(destinationNode);
            }

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
    if (!path) return;

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
                activateNode(destinationNode);
            }
        },

        () => {
            clearActivePaths();

            if (destinationNode) {
                activateNode(destinationNode);
            }

            if (completeCallback) {
                completeCallback();
            }
        }
    );
}


// ===============================================
// CLEAR TEACHING CARDS
// ===============================================

function clearTeachingCards(elements) {
    hide(elements.clientStartCard);
    hide(elements.dhcpPurposeCard);
    hide(elements.doraProcess);

    hide(elements.discoverCard);
    hide(elements.broadcastLabel);
    hide(elements.switchFloodCard);

    hide(elements.offerCard);
    hide(elements.requestCard);
    hide(elements.ackCard);

    hide(elements.configuredCard);
    hide(elements.leaseCard);
    hide(elements.renewalCard);
    hide(elements.portsCard);

    hide(elements.broadcastBoundaryCard);
    hide(elements.relayCard);
    hide(elements.relayFlowCard);

    hide(elements.failureCard);
    hide(elements.apipaCard);
    hide(elements.apipaLimitCard);

    hide(elements.doraSummary);
}


// ===============================================
// RESET
// ===============================================

function resetScene() {
    clearSceneTimers();

    const elements = getElements();

    hide(elements.brand);
    hide(elements.title);

    hide(elements.client);
    hide(elements.switchNode);
    hide(elements.server);
    hide(elements.gateway);
    hide(elements.remoteServer);

    clearTeachingCards(elements);

    hide(elements.dhcpSummary);
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

    if (elements.clientIpLabel) {
        elements.clientIpLabel.textContent =
            "No IPv4 Address";
    }

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {
            glow.style.transition = "none";
            glow.style.opacity = "0";
        });

    if (elements.timeline) {
        elements.timeline.style.transition =
            "none";

        elements.timeline.style.width =
            "0%";
    }
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
        if (!elements.timeline) return;

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
    // 0:05 — CLIENT STARTS
    // ===========================================

    schedule(() => {
        show(elements.client);

        activateNode(elements.client);
    }, 5000);


    // ===========================================
    // 0:08 — MISSING CONFIGURATION
    // ===========================================

    schedule(() => {
        show(elements.clientStartCard);
    }, 8000);


    // ===========================================
    // 0:12 — DHCP PURPOSE
    // ===========================================

    schedule(() => {
        hide(elements.clientStartCard);

        show(elements.dhcpPurposeCard);
    }, 12000);


    // ===========================================
    // 0:16 — DORA OVERVIEW
    // ===========================================

    schedule(() => {
        hide(elements.dhcpPurposeCard);

        show(elements.doraProcess);
    }, 16000);


    // ===========================================
    // 0:20 — LOCAL NETWORK
    // ===========================================

    schedule(() => {
        hide(elements.doraProcess);

        show(elements.switchNode);
        show(elements.server);

        showPath(elements.clientSwitchPath);
        showPath(elements.switchServerPath);

        activateNode(elements.client);
    }, 20000);


    // ===========================================
    // 0:23 — DISCOVER
    // ===========================================

    schedule(() => {
        show(elements.discoverCard);
        show(elements.broadcastLabel);
    }, 23000);


    // ===========================================
    // 0:26 — DISCOVER TO SWITCH
    // ===========================================

    schedule(() => {
        hide(elements.discoverCard);

        sendPacket(
            elements,
            elements.clientSwitchPath,
            elements.client,
            elements.switchNode,
            "#fbbf24",
            1900
        );
    }, 26000);


    // ===========================================
    // 0:29 — SWITCH FLOODS BROADCAST
    // ===========================================

    schedule(() => {
        hide(elements.broadcastLabel);

        show(elements.switchFloodCard);

        sendPacket(
            elements,
            elements.switchServerPath,
            elements.switchNode,
            elements.server,
            "#fbbf24",
            2100
        );
    }, 29000);


    // ===========================================
    // 0:33 — DHCP OFFER
    // ===========================================

    schedule(() => {
        hide(elements.switchFloodCard);

        show(elements.offerCard);

        activateNode(elements.server);
    }, 33000);


    // ===========================================
    // 0:37 — OFFER RETURNS TO CLIENT
    // ===========================================

    schedule(() => {
        hide(elements.offerCard);

        showPath(elements.serverReplyPath);

        sendPacket(
            elements,
            elements.serverReplyPath,
            elements.server,
            elements.client,
            "#34d399",
            2500
        );
    }, 37000);


    // ===========================================
    // 0:41 — DHCP REQUEST
    // ===========================================

    schedule(() => {
        hidePath(elements.serverReplyPath);

        show(elements.requestCard);

        activateNode(elements.client);
    }, 41000);


    // ===========================================
    // 0:44 — REQUEST TO SERVER
    // ===========================================

    schedule(() => {
        hide(elements.requestCard);

        sendPacket(
            elements,
            elements.clientSwitchPath,
            elements.client,
            elements.switchNode,
            "#fbbf24",
            1500,

            () => {
                sendPacket(
                    elements,
                    elements.switchServerPath,
                    elements.switchNode,
                    elements.server,
                    "#fbbf24",
                    1700
                );
            }
        );
    }, 44000);


    // ===========================================
    // 0:48 — DHCP ACK
    // ===========================================

    schedule(() => {
        show(elements.ackCard);

        activateNode(elements.server);
    }, 48000);


    // ===========================================
    // 0:51 — ACK RETURNS
    // ===========================================

    schedule(() => {
        hide(elements.ackCard);

        showPath(elements.serverReplyPath);

        sendPacket(
            elements,
            elements.serverReplyPath,
            elements.server,
            elements.client,
            "#a78bfa",
            2500
        );
    }, 51000);


    // ===========================================
    // 0:55 — CLIENT CONFIGURED
    // ===========================================

    schedule(() => {
        hidePath(elements.serverReplyPath);

        if (elements.clientIpLabel) {
            elements.clientIpLabel.textContent =
                "192.168.1.120";
        }

        show(elements.configuredCard);

        activateNode(elements.client);
    }, 55000);


    // ===========================================
    // 1:00 — LEASE
    // ===========================================

    schedule(() => {
        hide(elements.configuredCard);

        show(elements.leaseCard);
    }, 60000);


    // ===========================================
    // 1:04 — RENEWAL
    // ===========================================

    schedule(() => {
        hide(elements.leaseCard);

        show(elements.renewalCard);

        showPath(elements.clientSwitchPath);
        showPath(elements.switchServerPath);
    }, 64000);


    // ===========================================
    // 1:08 — RENEWAL TRAFFIC
    // ===========================================

    schedule(() => {
        hide(elements.renewalCard);

        sendPacket(
            elements,
            elements.clientSwitchPath,
            elements.client,
            elements.switchNode,
            "#38bdf8",
            1400,

            () => {
                sendPacket(
                    elements,
                    elements.switchServerPath,
                    elements.switchNode,
                    elements.server,
                    "#38bdf8",
                    1600
                );
            }
        );
    }, 68000);


    // ===========================================
    // 1:12 — UDP 67 / 68
    // ===========================================

    schedule(() => {
        hide(elements.client);
        hide(elements.switchNode);
        hide(elements.server);

        hidePath(elements.clientSwitchPath);
        hidePath(elements.switchServerPath);

        show(elements.portsCard);
    }, 72000);


    // ===========================================
    // 1:17 — ROUTING BOUNDARY
    // ===========================================

    schedule(() => {
        hide(elements.portsCard);

        show(elements.client);
        show(elements.gateway);

        showPath(elements.clientGatewayPath);

        show(elements.broadcastBoundaryCard);
    }, 77000);


    // ===========================================
    // 1:21 — DHCP RELAY
    // ===========================================

    schedule(() => {
        hide(elements.broadcastBoundaryCard);

        show(elements.remoteServer);

        showPath(elements.relayServerPath);

        show(elements.relayCard);

        activateNode(elements.gateway);
    }, 81000);


    // ===========================================
    // 1:25 — RELAY FLOW
    // ===========================================

    schedule(() => {
        hide(elements.relayCard);

        show(elements.relayFlowCard);
    }, 85000);


    // ===========================================
    // 1:29 — CLIENT TO RELAY
    // ===========================================

    schedule(() => {
        hide(elements.relayFlowCard);

        sendPacket(
            elements,
            elements.clientGatewayPath,
            elements.client,
            elements.gateway,
            "#22d3ee",
            2300,

            () => {
                sendPacket(
                    elements,
                    elements.relayServerPath,
                    elements.gateway,
                    elements.remoteServer,
                    "#a78bfa",
                    2000
                );
            }
        );
    }, 89000);


    // ===========================================
    // 1:94 — DHCP FAILURE EXAMPLE
    // ===========================================

    schedule(() => {
        hide(elements.client);
        hide(elements.gateway);
        hide(elements.remoteServer);

        hidePath(elements.clientGatewayPath);
        hidePath(elements.relayServerPath);

        show(elements.failureCard);
    }, 94000);


    // ===========================================
    // 1:98 — APIPA
    // ===========================================

    schedule(() => {
        hide(elements.failureCard);

        show(elements.apipaCard);
    }, 98000);


    // ===========================================
    // 1:102 — APIPA TROUBLESHOOTING
    // ===========================================

    schedule(() => {
        hide(elements.apipaCard);

        show(elements.apipaLimitCard);
    }, 102000);


    // ===========================================
    // 1:106 — DORA SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.apipaLimitCard);

        show(elements.doraSummary);
    }, 106000);


    // ===========================================
    // 1:109 — COMPLETE FLOW
    // ===========================================

    schedule(() => {
        hide(elements.doraSummary);

        show(elements.dhcpSummary);
    }, 109000);


    // ===========================================
    // 1:112 — FINAL CONCEPT
    // ===========================================

    schedule(() => {
        show(elements.finalConcept);
    }, 112000);
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