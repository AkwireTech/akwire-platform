// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 17 — DEFAULT GATEWAY
// REMOTE DESTINATION → GATEWAY → ROUTING
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

const SCENE_DURATION = 52000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {

    return {

        brand:
            document.querySelector(".scene-brand"),

        title:
            document.querySelector(".scene-title"),

        localNetwork:
            document.getElementById("localNetwork"),

        remoteNetwork:
            document.getElementById("remoteNetwork"),

        sourceClient:
            document.getElementById("sourceClient"),

        destinationCard:
            document.getElementById("destinationCard"),

        subnetCheck:
            document.getElementById("subnetCheck"),

        notLocalResult:
            document.getElementById("notLocalResult"),

        gatewayDecision:
            document.getElementById("gatewayDecision"),

        gatewayRouter:
            document.getElementById("gatewayRouter"),

        arpResolution:
            document.getElementById("arpResolution"),

        encapsulationPanel:
            document.getElementById("encapsulationPanel"),

        addressDistinction:
            document.getElementById("addressDistinction"),

        wanCloud:
            document.getElementById("wanCloud"),

        remoteServer:
            document.getElementById("remoteServer"),

        routingCard:
            document.getElementById("routingCard"),

        deliveryResult:
            document.getElementById("deliveryResult"),

        gatewayProcess:
            document.getElementById("gatewayProcess"),

        gatewaySummary:
            document.getElementById("gatewaySummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        gatewayPath:
            document.getElementById("gatewayPath"),

        wanPath:
            document.getElementById("wanPath"),

        remotePath:
            document.getElementById("remotePath"),

        movingPacket:
            document.getElementById("movingPacket"),

        timeline:
            document.getElementById("timelineProgress")

    };

}


// ===============================================
// TIMER
// ===============================================

function schedule(callback, delay) {

    const timer =
        setTimeout(callback, delay);

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
// RESET SCENE
// ===============================================

function resetScene() {

    clearSceneTimers();

    const elements =
        getElements();


    // Header

    hide(elements.brand);
    hide(elements.title);


    // Zones

    hide(elements.localNetwork);
    hide(elements.remoteNetwork);


    // Nodes

    hide(elements.sourceClient);
    hide(elements.gatewayRouter);
    hide(elements.wanCloud);
    hide(elements.remoteServer);


    // Cards / panels

    hide(elements.destinationCard);
    hide(elements.subnetCheck);
    hide(elements.notLocalResult);
    hide(elements.gatewayDecision);
    hide(elements.arpResolution);
    hide(elements.encapsulationPanel);
    hide(elements.addressDistinction);
    hide(elements.routingCard);
    hide(elements.deliveryResult);
    hide(elements.gatewayProcess);
    hide(elements.gatewaySummary);
    hide(elements.finalConcept);


    // Node active states

    clearActiveNodes();


    // Paths

    document
        .querySelectorAll(".network-path")
        .forEach(path => {

            path.classList.remove(
                "is-visible",
                "is-active"
            );

        });


    // Packet

    resetMovingPacket(
        elements.movingPacket
    );

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );


    // Background

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {

            glow.style.transition =
                "none";

            glow.style.opacity =
                "0";

        });


    // Timeline

    elements.timeline.style.transition =
        "none";

    elements.timeline.style.width =
        "0%";

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


    packet.style.opacity =
        "1";


    function move(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const distance =
            totalLength * progress;


        const point =
            path.getPointAtLength(
                distance
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

            packet.style.opacity =
                "0";


            if (completeCallback) {

                completeCallback();

            }

        }

    }


    const frameId =
        requestAnimationFrame(move);

    animationFrameIds.push(
        frameId
    );

}


// ===============================================
// CLIENT → DEFAULT GATEWAY
// ===============================================

function sendToGateway(elements) {

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );

    activatePath(
        elements.gatewayPath
    );

    activateNode(
        elements.sourceClient
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.gatewayPath,
        2800,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.gatewayRouter
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.gatewayRouter
            );

        }
    );

}


// ===============================================
// GATEWAY → ROUTED NETWORK
// ===============================================

function routeToWan(elements) {

    setPacketColor(
        elements.movingPacket,
        "#a78bfa"
    );

    activatePath(
        elements.wanPath
    );

    activateNode(
        elements.gatewayRouter
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.wanPath,
        2600,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.wanCloud
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.wanCloud
            );

        }
    );

}


// ===============================================
// ROUTED NETWORK → REMOTE SERVER
// ===============================================

function routeToRemoteServer(elements) {

    setPacketColor(
        elements.movingPacket,
        "#34d399"
    );

    activatePath(
        elements.remotePath
    );

    activateNode(
        elements.wanCloud
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.remotePath,
        2400,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.remoteServer
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.remoteServer
            );

        }
    );

}


// ===============================================
// PLAY SCENE
// ===============================================

function playScene() {

    resetScene();

    const elements =
        getElements();


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

                glow.style.opacity =
                    "1";

            });

    }, 300);


    // ===========================================
    // 0:02 — TITLE
    // ===========================================

    schedule(() => {

        show(elements.title);

    }, 2000);


    // ===========================================
    // 0:05 — LOCAL NETWORK + CLIENT
    // ===========================================

    schedule(() => {

        show(elements.localNetwork);
        show(elements.sourceClient);

        activateNode(
            elements.sourceClient
        );

    }, 5000);


    // ===========================================
    // 0:08 — DESTINATION IP
    // ===========================================

    schedule(() => {

        show(elements.destinationCard);

    }, 8000);


    // ===========================================
    // 0:11 — SUBNET CHECK
    // ===========================================

    schedule(() => {

        show(elements.subnetCheck);

    }, 11000);


    // ===========================================
    // 0:15 — NOT LOCAL
    // ===========================================

    schedule(() => {

        show(elements.notLocalResult);

    }, 15000);


    // ===========================================
    // 0:18 — DEFAULT GATEWAY DECISION
    // ===========================================

    schedule(() => {

        show(elements.gatewayRouter);
        show(elements.gatewayDecision);

        activateNode(
            elements.gatewayRouter
        );

    }, 18000);


    // ===========================================
    // 0:21 — ARP GATEWAY MAC
    // ===========================================

    schedule(() => {

        hide(elements.subnetCheck);

        show(elements.arpResolution);

    }, 21000);


    // ===========================================
    // 0:25 — ENCAPSULATION
    // ===========================================

    schedule(() => {

        hide(elements.notLocalResult);
        hide(elements.gatewayDecision);
        hide(elements.arpResolution);

        show(elements.encapsulationPanel);

    }, 25000);


    // ===========================================
    // 0:29 — CRITICAL ADDRESS DISTINCTION
    // ===========================================

    schedule(() => {

        show(elements.addressDistinction);

    }, 29000);


    // ===========================================
    // 0:32 — CLEAN PANEL FOR TRANSMISSION
    // ===========================================

    schedule(() => {

        hide(elements.encapsulationPanel);
        hide(elements.addressDistinction);
        hide(elements.destinationCard);

        showPath(
            elements.gatewayPath
        );

    }, 32000);


    // ===========================================
    // 0:33 — CLIENT SENDS FRAME TO GATEWAY
    // ===========================================

    schedule(() => {

        sendToGateway(elements);

    }, 33000);


    // ===========================================
    // 0:36 — ROUTED NETWORK APPEARS
    // ===========================================

    schedule(() => {

        show(elements.wanCloud);
        show(elements.remoteNetwork);
        show(elements.remoteServer);

        show(elements.routingCard);

    }, 36000);


    // ===========================================
    // 0:38 — GATEWAY ROUTES PACKET
    // ===========================================

    schedule(() => {

        showPath(
            elements.wanPath
        );

        routeToWan(elements);

    }, 38000);


    // ===========================================
    // 0:42 — FORWARD TOWARD REMOTE HOST
    // ===========================================

    schedule(() => {

        showPath(
            elements.remotePath
        );

        routeToRemoteServer(elements);

    }, 42000);


    // ===========================================
    // 0:45 — REMOTE DELIVERY
    // ===========================================

    schedule(() => {

        activateNode(
            elements.remoteServer
        );

        show(elements.deliveryResult);

    }, 45000);


    // ===========================================
    // 0:47 — PROCESS STRIP
    // ===========================================

    schedule(() => {

        hide(elements.routingCard);

        show(elements.gatewayProcess);

    }, 47000);


    // ===========================================
    // 0:49 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.gatewaySummary);

    }, 49000);


    // ===========================================
    // 0:50 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        clearActiveNodes();

        show(elements.finalConcept);

    }, 50000);

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