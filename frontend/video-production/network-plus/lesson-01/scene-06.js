// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 06 — DEVICE IDENTIFICATION
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

const SCENE_DURATION = 32000;

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

        switchDevice:
            document.getElementById("switchDevice"),

        destination:
            document.getElementById("destinationDevice"),

        otherDevice:
            document.getElementById("otherDevice"),

        sourceIdentity:
            document.getElementById("sourceIdentity"),

        destinationIdentity:
            document.getElementById("destinationIdentity"),

        ipConcept:
            document.getElementById("ipConcept"),

        macConcept:
            document.getElementById("macConcept"),

        addressFlow:
            document.getElementById("addressFlow"),

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
// DEVICE STATE
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
    // Header
    // -------------------------------------------

    hide(elements.brand);
    hide(elements.title);


    // -------------------------------------------
    // Devices
    // -------------------------------------------

    hide(elements.source);
    hide(elements.switchDevice);
    hide(elements.destination);
    hide(elements.otherDevice);


    // -------------------------------------------
    // Identity / concept cards
    // -------------------------------------------

    hide(elements.sourceIdentity);
    hide(elements.destinationIdentity);

    hide(elements.ipConcept);
    hide(elements.macConcept);

    hide(elements.addressFlow);
    hide(elements.finalConcept);


    // -------------------------------------------
    // Device states
    // -------------------------------------------

    document
        .querySelectorAll(".network-device")
        .forEach(device => {

            device.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // Lines
    // -------------------------------------------

    elements.lines.forEach(line => {

        line.classList.remove(
            "is-visible",
            "is-active"
        );

    });


    // -------------------------------------------
    // Packet
    // -------------------------------------------

    resetPacket(elements.packet);


    // -------------------------------------------
    // Timeline
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
    // 0:06 — SOURCE IDENTITY
    // ===========================================

    schedule(() => {

        show(
            elements.sourceIdentity
        );

    }, 6500);


    // ===========================================
    // 0:09 — IP ADDRESS CONCEPT
    // ===========================================

    schedule(() => {

        show(
            elements.ipConcept
        );

    }, 9000);


    // ===========================================
    // 0:11 — MAC ADDRESS CONCEPT
    // ===========================================

    schedule(() => {

        show(
            elements.macConcept
        );

    }, 11000);


    // ===========================================
    // 0:13 — BUILD LOCAL NETWORK
    // ===========================================

    schedule(() => {

        show(elements.switchDevice);
        show(elements.destination);
        show(elements.otherDevice);

        showLine(
            "pathLaptopSwitch"
        );

        showLine(
            "pathSwitchDesktop"
        );

        showLine(
            "pathSwitchPrinter"
        );

    }, 13000);


    // ===========================================
    // 0:16 — DESTINATION IDENTITY
    // ===========================================

    schedule(() => {

        show(
            elements.destinationIdentity
        );

        activateDevice(
            elements.destination
        );

    }, 16000);


    // ===========================================
    // 0:18 — ADDRESS FLOW
    // ===========================================

    schedule(() => {

        show(
            elements.addressFlow
        );

    }, 18000);


    // ===========================================
    // 0:20 — SOURCE → SWITCH
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.source
        );

        activateLine(
            "pathLaptopSwitch"
        );

        animatePacket(
            elements.packet,
            "pathLaptopSwitch",
            1800,
            false,
            () => {

                activateDevice(
                    elements.switchDevice
                );


                // =================================
                // SWITCH → DESTINATION
                // =================================

                activateLine(
                    "pathSwitchDesktop"
                );

                animatePacket(
                    elements.packet,
                    "pathSwitchDesktop",
                    1900,
                    false,
                    () => {

                        activateDevice(
                            elements.destination
                        );

                        clearActiveLines();

                    }
                );

            }
        );

    }, 20000);


    // ===========================================
    // 0:25 — EMPHASIZE DESTINATION
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.destination
        );

        elements
            .destinationIdentity
            .classList
            .add("is-visible");

    }, 25000);


    // ===========================================
    // 0:28 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        clearActiveLines();

        show(
            elements.finalConcept
        );

    }, 28000);

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

            packet.style.opacity =
                "0";

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