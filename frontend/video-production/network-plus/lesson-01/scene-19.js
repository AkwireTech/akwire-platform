// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 19 — TTL AND ROUTER HOPS
// TTL DECREMENT → LOOP PREVENTION → TRACEROUTE
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

const SCENE_DURATION = 62000;

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

        client:
            document.getElementById("client"),

        router1:
            document.getElementById("router1"),

        router2:
            document.getElementById("router2"),

        router3:
            document.getElementById("router3"),

        destination:
            document.getElementById("destination"),

        initialPacket:
            document.getElementById("initialPacket"),

        ttlCounter:
            document.getElementById("ttlCounter"),

        ttlValue:
            document.getElementById("ttlValue"),

        ttlStatus:
            document.getElementById("ttlStatus"),

        hopCounter:
            document.getElementById("hopCounter"),

        hopValue:
            document.getElementById("hopValue"),

        ttlChange1:
            document.getElementById("ttlChange1"),

        ttlChange2:
            document.getElementById("ttlChange2"),

        ttlChange3:
            document.getElementById("ttlChange3"),

        deliveryResult:
            document.getElementById("deliveryResult"),

        ttlRule:
            document.getElementById("ttlRule"),

        loopTitle:
            document.getElementById("loopTitle"),

        loopRouterA:
            document.getElementById("loopRouterA"),

        loopRouterB:
            document.getElementById("loopRouterB"),

        loopCounter:
            document.getElementById("loopCounter"),

        loopTtlValue:
            document.getElementById("loopTtlValue"),

        loopStatus:
            document.getElementById("loopStatus"),

        ttlExpired:
            document.getElementById("ttlExpired"),

        loopPrevention:
            document.getElementById("loopPrevention"),

        tracerouteCard:
            document.getElementById("tracerouteCard"),

        ttlProcess:
            document.getElementById("ttlProcess"),

        ttlSummary:
            document.getElementById("ttlSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        pathClientR1:
            document.getElementById("pathClientR1"),

        pathR1R2:
            document.getElementById("pathR1R2"),

        pathR2R3:
            document.getElementById("pathR2R3"),

        pathR3Destination:
            document.getElementById("pathR3Destination"),

        loopPathAB:
            document.getElementById("loopPathAB"),

        loopPathBA:
            document.getElementById("loopPathBA"),

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
// CLEAR TIMERS / ANIMATION FRAMES
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
// TTL / HOP VALUES
// ===============================================

function updateTTL(
    elements,
    value,
    status
) {

    elements.ttlValue.textContent =
        value;

    elements.ttlStatus.textContent =
        status;

}


function updateHop(
    elements,
    value
) {

    elements.hopValue.textContent =
        value;

}


function updateLoopTTL(
    elements,
    value,
    status
) {

    elements.loopTtlValue.textContent =
        value;

    elements.loopStatus.textContent =
        status;

}


// ===============================================
// RESET
// ===============================================

function resetScene() {

    clearSceneTimers();

    const elements =
        getElements();


    // Header

    hide(elements.brand);
    hide(elements.title);


    // Normal topology

    hide(elements.client);
    hide(elements.router1);
    hide(elements.router2);
    hide(elements.router3);
    hide(elements.destination);


    // Normal routing panels

    hide(elements.initialPacket);
    hide(elements.ttlCounter);
    hide(elements.hopCounter);

    hide(elements.ttlChange1);
    hide(elements.ttlChange2);
    hide(elements.ttlChange3);

    hide(elements.deliveryResult);
    hide(elements.ttlRule);


    // Loop section

    hide(elements.loopTitle);
    hide(elements.loopRouterA);
    hide(elements.loopRouterB);
    hide(elements.loopCounter);
    hide(elements.ttlExpired);
    hide(elements.loopPrevention);


    // Traceroute / summary

    hide(elements.tracerouteCard);
    hide(elements.ttlProcess);
    hide(elements.ttlSummary);
    hide(elements.finalConcept);


    // Values

    updateTTL(
        elements,
        64,
        "Packet ready"
    );

    updateHop(
        elements,
        0
    );

    updateLoopTTL(
        elements,
        3,
        "Entering routing loop"
    );


    // Active states

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
// PATH ANIMATION
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
// NORMAL ROUTE HOP
// ===============================================

function sendHop(
    elements,
    path,
    sourceNode,
    destinationNode,
    color,
    duration = 2200
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

            if (progress > 0.72) {

                activateNode(
                    destinationNode
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                destinationNode
            );

        }
    );

}


// ===============================================
// LOOP HOP
// ===============================================

function sendLoopHop(
    elements,
    path,
    sourceNode,
    destinationNode,
    completeCallback = null
) {

    setPacketColor(
        elements.movingPacket,
        "#f87171"
    );


    activatePath(path);

    activateNode(sourceNode);


    animatePacketAlongPath(
        elements.movingPacket,
        path,
        1800,

        progress => {

            if (progress > 0.72) {

                activateNode(
                    destinationNode
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                destinationNode
            );


            if (completeCallback) {

                completeCallback();

            }

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
    // 0:05 — NORMAL TOPOLOGY
    // ===========================================

    schedule(() => {

        show(elements.client);
        show(elements.router1);
        show(elements.router2);
        show(elements.router3);
        show(elements.destination);

        activateNode(
            elements.client
        );

    }, 5000);


    // ===========================================
    // 0:08 — PACKET CREATED, TTL 64
    // ===========================================

    schedule(() => {

        show(elements.initialPacket);

    }, 8000);


    // ===========================================
    // 0:11 — TTL / HOP COUNTERS
    // ===========================================

    schedule(() => {

        hide(elements.initialPacket);

        show(elements.ttlCounter);
        show(elements.hopCounter);

        updateTTL(
            elements,
            64,
            "Leaving source host"
        );

    }, 11000);


    // ===========================================
    // 0:13 — CLIENT → ROUTER 1
    // ===========================================

    schedule(() => {

        showPath(
            elements.pathClientR1
        );

        sendHop(
            elements,
            elements.pathClientR1,
            elements.client,
            elements.router1,
            "#38bdf8"
        );

    }, 13000);


    // ===========================================
    // 0:16 — ROUTER 1: 64 → 63
    // ===========================================

    schedule(() => {

        updateTTL(
            elements,
            63,
            "Router 1 decremented TTL"
        );

        updateHop(
            elements,
            1
        );

        show(elements.ttlChange1);

        activateNode(
            elements.router1
        );

    }, 16000);


    // ===========================================
    // 0:19 — ROUTER 1 → ROUTER 2
    // ===========================================

    schedule(() => {

        sendHop(
            elements,
            elements.pathR1R2,
            elements.router1,
            elements.router2,
            "#a78bfa"
        );

    }, 19000);


    // ===========================================
    // 0:22 — ROUTER 2: 63 → 62
    // ===========================================

    schedule(() => {

        updateTTL(
            elements,
            62,
            "Router 2 decremented TTL"
        );

        updateHop(
            elements,
            2
        );

        show(elements.ttlChange2);

        activateNode(
            elements.router2
        );

    }, 22000);


    // ===========================================
    // 0:25 — ROUTER 2 → ROUTER 3
    // ===========================================

    schedule(() => {

        sendHop(
            elements,
            elements.pathR2R3,
            elements.router2,
            elements.router3,
            "#a78bfa"
        );

    }, 25000);


    // ===========================================
    // 0:28 — ROUTER 3: 62 → 61
    // ===========================================

    schedule(() => {

        updateTTL(
            elements,
            61,
            "Router 3 decremented TTL"
        );

        updateHop(
            elements,
            3
        );

        show(elements.ttlChange3);

        activateNode(
            elements.router3
        );

    }, 28000);


    // ===========================================
    // 0:31 — ROUTER 3 → DESTINATION
    // ===========================================

    schedule(() => {

        sendHop(
            elements,
            elements.pathR3Destination,
            elements.router3,
            elements.destination,
            "#34d399",
            2400
        );

    }, 31000);


    // ===========================================
    // 0:34 — DELIVERY
    // ===========================================

    schedule(() => {

        updateTTL(
            elements,
            61,
            "Destination reached"
        );

        show(elements.deliveryResult);

        activateNode(
            elements.destination
        );

    }, 34000);


    // ===========================================
    // 0:36 — TTL RULE
    // ===========================================

    schedule(() => {

        hide(elements.deliveryResult);

        show(elements.ttlRule);

    }, 36000);


    // ===========================================
    // 0:39 — CLEAR NORMAL DEMO
    // ===========================================

    schedule(() => {

        hide(elements.client);
        hide(elements.router1);
        hide(elements.router2);
        hide(elements.router3);
        hide(elements.destination);

        hide(elements.ttlCounter);
        hide(elements.hopCounter);

        hide(elements.ttlChange1);
        hide(elements.ttlChange2);
        hide(elements.ttlChange3);

        hide(elements.ttlRule);

        document
            .querySelectorAll(".network-path")
            .forEach(path => {

                path.classList.remove(
                    "is-visible",
                    "is-active"
                );

            });

        clearActiveNodes();

    }, 39000);


    // ===========================================
    // 0:40 — ROUTING LOOP INTRO
    // ===========================================

    schedule(() => {

        show(elements.loopTitle);

        show(elements.loopRouterA);
        show(elements.loopRouterB);

        show(elements.loopCounter);

        showPath(elements.loopPathAB);
        showPath(elements.loopPathBA);

        updateLoopTTL(
            elements,
            3,
            "Entering routing loop"
        );

    }, 40000);


    // ===========================================
    // 0:43 — ROUTER A → ROUTER B
    // TTL 3 → 2
    // ===========================================

    schedule(() => {

        sendLoopHop(
            elements,
            elements.loopPathAB,
            elements.loopRouterA,
            elements.loopRouterB,

            () => {

                updateLoopTTL(
                    elements,
                    2,
                    "Router B decremented TTL"
                );

            }
        );

    }, 43000);


    // ===========================================
    // 0:46 — ROUTER B → ROUTER A
    // TTL 2 → 1
    // ===========================================

    schedule(() => {

        sendLoopHop(
            elements,
            elements.loopPathBA,
            elements.loopRouterB,
            elements.loopRouterA,

            () => {

                updateLoopTTL(
                    elements,
                    1,
                    "Router A decremented TTL"
                );

            }
        );

    }, 46000);


    // ===========================================
    // 0:49 — ROUTER A → ROUTER B
    // TTL 1 → 0
    // ===========================================

    schedule(() => {

        sendLoopHop(
            elements,
            elements.loopPathAB,
            elements.loopRouterA,
            elements.loopRouterB,

            () => {

                updateLoopTTL(
                    elements,
                    0,
                    "TTL expired"
                );

            }
        );

    }, 49000);


    // ===========================================
    // 0:52 — PACKET DISCARDED
    // ===========================================

    schedule(() => {

        clearActivePaths();

        resetMovingPacket(
            elements.movingPacket
        );

        show(elements.ttlExpired);

        activateNode(
            elements.loopRouterB
        );

    }, 52000);


    // ===========================================
    // 0:54 — LOOP PREVENTION
    // ===========================================

    schedule(() => {

        hide(elements.ttlExpired);
        hide(elements.loopCounter);

        show(elements.loopPrevention);

    }, 54000);


    // ===========================================
    // 0:56 — TRACEROUTE CONNECTION
    // ===========================================

    schedule(() => {

        hide(elements.loopTitle);
        hide(elements.loopRouterA);
        hide(elements.loopRouterB);
        hide(elements.loopPrevention);

        elements.loopPathAB.classList.remove(
            "is-visible",
            "is-active"
        );

        elements.loopPathBA.classList.remove(
            "is-visible",
            "is-active"
        );

        clearActiveNodes();

        show(elements.tracerouteCard);

    }, 56000);


    // ===========================================
    // 0:58 — PROCESS STRIP
    // ===========================================

    schedule(() => {

        hide(elements.tracerouteCard);

        show(elements.ttlProcess);

    }, 58000);


    // ===========================================
    // 0:59 — SUMMARY
    // ===========================================

    schedule(() => {

        hide(elements.ttlProcess);

        show(elements.ttlSummary);

    }, 59000);


    // ===========================================
    // 1:00 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.finalConcept);

    }, 60000);

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