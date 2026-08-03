// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 07 — DEVICES NEED RULES TO COMMUNICATE
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

const SCENE_DURATION = 34000;

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

        source:
            document.getElementById("sourceDevice"),

        protocol:
            document.getElementById("protocolEngine"),

        destination:
            document.getElementById("destinationDevice"),

        ruleFormat:
            document.getElementById("ruleFormat"),

        ruleAddress:
            document.getElementById("ruleAddress"),

        ruleDelivery:
            document.getElementById("ruleDelivery"),

        rawMessage:
            document.getElementById("rawMessage"),

        protocolMessage:
            document.getElementById("protocolMessage"),

        deliverySuccess:
            document.getElementById("deliverySuccess"),

        protocolExamples:
            document.getElementById("protocolExamples"),

        finalConcept:
            document.getElementById("finalConcept"),

        timeline:
            document.getElementById("timelineProgress"),

        packet:
            document.getElementById("dataPacket"),

        lines:
            document.querySelectorAll(".network-line")

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
// ACTIVE DEVICE
// ===============================================

function activateDevice(device) {

    document
        .querySelectorAll(".network-device")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (device) {

        device.classList.add("is-active");

    }

}


// ===============================================
// CONNECTION HELPERS
// ===============================================

function showLine(pathId) {

    const path =
        document.getElementById(pathId);

    if (!path) return;

    path.classList.add("is-visible");

}


function clearActiveLines() {

    document
        .querySelectorAll(".network-line")
        .forEach(line => {

            line.classList.remove("is-active");

        });

}


function activateLine(pathId) {

    clearActiveLines();

    const path =
        document.getElementById(pathId);

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


// ===============================================
// RESET PACKET
// ===============================================

function resetPacket(packet) {

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


    // -------------------------------------------
    // HEADER
    // -------------------------------------------

    hide(elements.brand);
    hide(elements.title);


    // -------------------------------------------
    // MAIN DEVICES
    // -------------------------------------------

    hide(elements.source);
    hide(elements.protocol);
    hide(elements.destination);


    // -------------------------------------------
    // PROTOCOL RULES
    // -------------------------------------------

    hide(elements.ruleFormat);
    hide(elements.ruleAddress);
    hide(elements.ruleDelivery);


    // -------------------------------------------
    // MESSAGE CARDS
    // -------------------------------------------

    hide(elements.rawMessage);
    hide(elements.protocolMessage);
    hide(elements.deliverySuccess);


    // -------------------------------------------
    // BOTTOM CONTENT
    // -------------------------------------------

    hide(elements.protocolExamples);
    hide(elements.finalConcept);


    // -------------------------------------------
    // PROTOCOL ENGINE
    // -------------------------------------------

    elements.protocol.classList.remove(
        "is-running"
    );


    // -------------------------------------------
    // DEVICES
    // -------------------------------------------

    document
        .querySelectorAll(".network-device")
        .forEach(device => {

            device.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // CONNECTIONS
    // -------------------------------------------

    elements.lines.forEach(line => {

        line.classList.remove(
            "is-visible",
            "is-active"
        );

    });


    // -------------------------------------------
    // PACKET
    // -------------------------------------------

    resetPacket(elements.packet);


    // -------------------------------------------
    // BACKGROUND GLOWS
    // -------------------------------------------

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {

            glow.style.opacity = "0";

        });


    // -------------------------------------------
    // TIMELINE
    // -------------------------------------------

    elements.timeline.style.transition =
        "none";

    elements.timeline.style.width =
        "0%";

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
    // 0:05 — SOURCE DEVICE
    // ===========================================

    schedule(() => {

        show(elements.source);

        activateDevice(
            elements.source
        );

    }, 5000);


    // ===========================================
    // 0:07 — RAW APPLICATION MESSAGE
    // ===========================================

    schedule(() => {

        show(elements.rawMessage);

    }, 7000);


    // ===========================================
    // 0:09 — PROTOCOL ENGINE
    // ===========================================

    schedule(() => {

        show(elements.protocol);

        elements.protocol.classList.add(
            "is-running"
        );

        showLine(
            "pathSourceProtocol"
        );

    }, 9000);


    // ===========================================
    // 0:11 — RULE 1: FORMAT
    // ===========================================

    schedule(() => {

        show(elements.ruleFormat);

    }, 11000);


    // ===========================================
    // 0:13 — RULE 2: ADDRESSING
    // ===========================================

    schedule(() => {

        show(elements.ruleAddress);

    }, 13000);


    // ===========================================
    // 0:15 — RULE 3: DELIVERY
    // ===========================================

    schedule(() => {

        show(elements.ruleDelivery);

    }, 15000);


    // ===========================================
    // 0:17 — SOURCE → PROTOCOL
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.source
        );

        activateLine(
            "pathSourceProtocol"
        );

        animatePacket(
            elements.packet,
            "pathSourceProtocol",
            1800,
            false,
            () => {

                clearActiveLines();

            }
        );

    }, 17000);


    // ===========================================
    // 0:20 — PROTOCOL-FORMATTED DATA
    // ===========================================

    schedule(() => {

        show(elements.protocolMessage);

    }, 20000);


    // ===========================================
    // 0:22 — DESTINATION APPEARS
    // ===========================================

    schedule(() => {

        show(elements.destination);

        showLine(
            "pathProtocolDestination"
        );

    }, 22000);


    // ===========================================
    // 0:24 — PROTOCOL → DESTINATION
    // ===========================================

    schedule(() => {

        activateLine(
            "pathProtocolDestination"
        );

        animatePacket(
            elements.packet,
            "pathProtocolDestination",
            1900,
            false,
            () => {

                activateDevice(
                    elements.destination
                );

                clearActiveLines();

            }
        );

    }, 24000);


    // ===========================================
    // 0:27 — SUCCESS
    // ===========================================

    schedule(() => {

        show(
            elements.deliverySuccess
        );

    }, 27000);


    // ===========================================
    // 0:29 — PROTOCOL EXAMPLES
    // ===========================================

    schedule(() => {

        show(
            elements.protocolExamples
        );

    }, 29000);


    // ===========================================
    // 0:31 — KEY IDEA
    // ===========================================

    schedule(() => {

        show(
            elements.finalConcept
        );

    }, 31000);

}


// ===============================================
// MOVE PACKET ON SVG PATH
// ===============================================

function animatePacket(
    packet,
    pathId,
    duration,
    reverse = false,
    callback = null
) {

    const path =
        document.getElementById(pathId);

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


        let distance =
            totalLength * progress;


        if (reverse) {

            distance =
                totalLength - distance;

        }


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


        if (progress < 1) {

            const frameId =
                requestAnimationFrame(move);

            animationFrameIds.push(
                frameId
            );

        } else {

            packet.style.opacity = "0";

            if (callback) {

                callback();

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

        if (
            event.code === "Space"
        ) {

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