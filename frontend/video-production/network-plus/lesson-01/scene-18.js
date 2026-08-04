// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 18 — ROUTER FRAME REPLACEMENT
// FRAME 1 → ROUTER → FRAME 2
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

const SCENE_DURATION = 56000;

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

        segmentOne:
            document.getElementById("segmentOne"),

        segmentTwo:
            document.getElementById("segmentTwo"),

        sourceClient:
            document.getElementById("sourceClient"),

        router:
            document.getElementById("router"),

        nextHop:
            document.getElementById("nextHop"),

        incomingFrame:
            document.getElementById("incomingFrame"),

        frameRemoval:
            document.getElementById("frameRemoval"),

        packetInspection:
            document.getElementById("packetInspection"),

        routingTable:
            document.getElementById("routingTable"),

        selectedRoute:
            document.getElementById("selectedRoute"),

        routeSelected:
            document.getElementById("routeSelected"),

        ipPacket:
            document.getElementById("ipPacket"),

        outgoingFrame:
            document.getElementById("outgoingFrame"),

        addressComparison:
            document.getElementById("addressComparison"),

        forwardResult:
            document.getElementById("forwardResult"),

        routerProcess:
            document.getElementById("routerProcess"),

        routerSummary:
            document.getElementById("routerSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        natNote:
            document.getElementById("natNote"),

        incomingPath:
            document.getElementById("incomingPath"),

        outgoingPath:
            document.getElementById("outgoingPath"),

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
        .querySelectorAll(".packet-path")
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
// MOVING PACKET
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


    // Network segments

    hide(elements.segmentOne);
    hide(elements.segmentTwo);


    // Network nodes

    hide(elements.sourceClient);
    hide(elements.router);
    hide(elements.nextHop);


    // Educational panels

    hide(elements.incomingFrame);
    hide(elements.frameRemoval);
    hide(elements.packetInspection);
    hide(elements.routingTable);
    hide(elements.selectedRoute);
    hide(elements.routeSelected);
    hide(elements.ipPacket);
    hide(elements.outgoingFrame);
    hide(elements.addressComparison);
    hide(elements.forwardResult);
    hide(elements.routerProcess);
    hide(elements.routerSummary);
    hide(elements.finalConcept);
    hide(elements.natNote);


    // Active nodes

    clearActiveNodes();


    // Paths

    document
        .querySelectorAll(".packet-path")
        .forEach(path => {

            path.classList.remove(
                "is-visible",
                "is-active"
            );

        });


    // Moving packet

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
// CLIENT → ROUTER
// ===============================================

function sendIncomingFrame(elements) {

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );


    activatePath(
        elements.incomingPath
    );


    activateNode(
        elements.sourceClient
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.incomingPath,
        3000,

        progress => {

            if (progress > 0.72) {

                activateNode(
                    elements.router
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.router
            );

        }
    );

}


// ===============================================
// ROUTER → NEXT HOP
// ===============================================

function sendOutgoingFrame(elements) {

    setPacketColor(
        elements.movingPacket,
        "#34d399"
    );


    activatePath(
        elements.outgoingPath
    );


    activateNode(
        elements.router
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.outgoingPath,
        3000,

        progress => {

            if (progress > 0.72) {

                activateNode(
                    elements.nextHop
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.nextHop
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
    // 0:05 — NETWORK TOPOLOGY
    // ===========================================

    schedule(() => {

        show(elements.segmentOne);
        show(elements.segmentTwo);

        show(elements.sourceClient);
        show(elements.router);
        show(elements.nextHop);

        activateNode(
            elements.sourceClient
        );

    }, 5000);


    // ===========================================
    // 0:08 — FRAME #1
    // ===========================================

    schedule(() => {

        show(elements.incomingFrame);

    }, 8000);


    // ===========================================
    // 0:12 — SHOW INCOMING PATH
    // ===========================================

    schedule(() => {

        hide(elements.incomingFrame);

        showPath(
            elements.incomingPath
        );

    }, 12000);


    // ===========================================
    // 0:13 — FRAME ARRIVES AT ROUTER
    // ===========================================

    schedule(() => {

        sendIncomingFrame(elements);

    }, 13000);


    // ===========================================
    // 0:17 — REMOVE LAYER 2 FRAME
    // ===========================================

    schedule(() => {

        show(elements.frameRemoval);

        activateNode(
            elements.router
        );

    }, 17000);


    // ===========================================
    // 0:21 — EXAMINE DESTINATION IP
    // ===========================================

    schedule(() => {

        hide(elements.frameRemoval);

        show(elements.packetInspection);

    }, 21000);


    // ===========================================
    // 0:25 — ROUTING TABLE
    // ===========================================

    schedule(() => {

        hide(elements.packetInspection);

        show(elements.routingTable);

    }, 25000);


    // ===========================================
    // 0:28 — SELECT ROUTE
    // ===========================================

    schedule(() => {

        show(elements.selectedRoute);

    }, 28000);


    // ===========================================
    // 0:30 — ROUTE SELECTED
    // ===========================================

    schedule(() => {

        hide(elements.routingTable);

        show(elements.routeSelected);

    }, 30000);


    // ===========================================
    // 0:33 — IP PACKET PRESERVED
    // ===========================================

    schedule(() => {

        hide(elements.routeSelected);

        show(elements.ipPacket);

    }, 33000);


    // ===========================================
    // 0:37 — BUILD NEW FRAME
    // ===========================================

    schedule(() => {

        hide(elements.ipPacket);

        show(elements.outgoingFrame);

    }, 37000);


    // ===========================================
    // 0:41 — L2 VS L3 COMPARISON
    // ===========================================

    schedule(() => {

        show(elements.addressComparison);

    }, 41000);


    // ===========================================
    // 0:44 — PREPARE FOR FORWARDING
    // ===========================================

    schedule(() => {

        hide(elements.outgoingFrame);
        hide(elements.addressComparison);

        showPath(
            elements.outgoingPath
        );

        activateNode(
            elements.router
        );

    }, 44000);


    // ===========================================
    // 0:45 — FORWARD FRAME #2
    // ===========================================

    schedule(() => {

        sendOutgoingFrame(elements);

    }, 45000);


    // ===========================================
    // 0:49 — FORWARD RESULT
    // ===========================================

    schedule(() => {

        show(elements.forwardResult);

        activateNode(
            elements.nextHop
        );

    }, 49000);


    // ===========================================
    // 0:51 — ROUTER PROCESS SUMMARY
    // ===========================================

    schedule(() => {

        hide(elements.forwardResult);

        clearActiveNodes();

        show(elements.routerProcess);

    }, 51000);


    // ===========================================
    // 0:53 — FRAME SUMMARY
    // ===========================================

    schedule(() => {

        hide(elements.routerProcess);

        show(elements.routerSummary);

    }, 53000);


    // ===========================================
    // 0:54 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.finalConcept);

    }, 54000);


    // ===========================================
    // 0:55 — NAT EXCEPTION NOTE
    // ===========================================

    schedule(() => {

        hide(elements.routerSummary);

        show(elements.natNote);

    }, 55000);

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