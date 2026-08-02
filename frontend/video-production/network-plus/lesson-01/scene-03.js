// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 03 — WHAT IS A NETWORK?
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

const SCENE_DURATION = 30000;

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

        laptop:
            document.getElementById("laptopDevice"),

        phone:
            document.getElementById("phoneDevice"),

        printer:
            document.getElementById("printerDevice"),

        switchDevice:
            document.getElementById("switchDevice"),

        server:
            document.getElementById("serverDevice"),

        devicesConcept:
            document.getElementById("devicesConcept"),

        connectionConcept:
            document.getElementById("connectionConcept"),

        communicationConcept:
            document.getElementById("communicationConcept"),

        equation:
            document.getElementById("networkEquation"),

        definition:
            document.getElementById("networkDefinition"),

        timeline:
            document.getElementById("timelineProgress"),

        packetOne:
            document.getElementById("packetOne"),

        packetTwo:
            document.getElementById("packetTwo"),

        packetThree:
            document.getElementById("packetThree"),

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


    // Main elements

    hide(elements.brand);
    hide(elements.title);

    hide(elements.laptop);
    hide(elements.phone);
    hide(elements.printer);
    hide(elements.switchDevice);
    hide(elements.server);

    hide(elements.devicesConcept);
    hide(elements.connectionConcept);
    hide(elements.communicationConcept);

    hide(elements.equation);
    hide(elements.definition);


    // Remove active states

    document
        .querySelectorAll(".network-device")
        .forEach(device => {

            device.classList.remove(
                "is-active"
            );

        });


    // Reset lines

    elements.lines.forEach(line => {

        line.classList.remove(
            "is-visible",
            "is-active"
        );

    });


    // Reset packets

    resetPacket(elements.packetOne);
    resetPacket(elements.packetTwo);
    resetPacket(elements.packetThree);


    // Reset timeline

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
    // 0:00 — BRAND / BACKGROUND
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
    // 0:05 — INTRODUCE DEVICES
    // ===========================================

    schedule(() => {

        show(elements.laptop);

        activateDevice(
            elements.laptop
        );

    }, 5000);


    schedule(() => {

        show(elements.phone);

    }, 5800);


    schedule(() => {

        show(elements.printer);

    }, 6600);


    schedule(() => {

        show(elements.server);

    }, 7400);


    // ===========================================
    // 0:08 — DEVICES CONCEPT
    // ===========================================

    schedule(() => {

        show(
            elements.devicesConcept
        );

    }, 8000);


    // ===========================================
    // 0:10 — NETWORK CONNECTION
    // ===========================================

    schedule(() => {

        show(
            elements.switchDevice
        );

        activateDevice(
            elements.switchDevice
        );

    }, 10000);


    schedule(() => {

        elements.lines.forEach(
            (line, index) => {

                schedule(() => {

                    line.classList.add(
                        "is-visible"
                    );

                }, index * 250);

            }
        );

    }, 11000);


    // ===========================================
    // 0:13 — CONNECTION CONCEPT
    // ===========================================

    schedule(() => {

        show(
            elements.connectionConcept
        );

    }, 13000);


    // ===========================================
    // 0:15 — COMMUNICATION
    // ===========================================

    schedule(() => {

        show(
            elements.communicationConcept
        );

        startCommunication();

    }, 15000);


    // ===========================================
    // 0:23 — EQUATION
    // ===========================================

    schedule(() => {

        show(elements.equation);

    }, 23000);


    // ===========================================
    // 0:26 — FINAL DEFINITION
    // ===========================================

    schedule(() => {

        document
            .querySelectorAll(
                ".network-device"
            )
            .forEach(device => {

                device.classList.remove(
                    "is-active"
                );

            });

        show(elements.definition);

    }, 26000);

}


// ===============================================
// COMMUNICATION SEQUENCE
// ===============================================

function startCommunication() {

    const elements =
        getElements();


    // -------------------------------------------
    // Laptop → Network
    // -------------------------------------------

    activateLine(
        "lineLaptopSwitch"
    );

    animatePacket(
        elements.packetOne,
        "lineLaptopSwitch",
        1500,
        false,
        () => {

            activateDevice(
                elements.switchDevice
            );


            // -----------------------------------
            // Network → Server
            // -----------------------------------

            activateLine(
                "lineSwitchServer"
            );

            animatePacket(
                elements.packetOne,
                "lineSwitchServer",
                1800,
                false,
                () => {

                    activateDevice(
                        elements.server
                    );

                }
            );

        }
    );


    // -------------------------------------------
    // Phone → Network
    // -------------------------------------------

    schedule(() => {

        activateLine(
            "linePhoneSwitch"
        );

        animatePacket(
            elements.packetTwo,
            "linePhoneSwitch",
            1600
        );

    }, 1000);


    // -------------------------------------------
    // Printer → Network
    // -------------------------------------------

    schedule(() => {

        activateLine(
            "linePrinterSwitch"
        );

        animatePacket(
            elements.packetThree,
            "linePrinterSwitch",
            1700
        );

    }, 2200);

}


// ===============================================
// ACTIVATE CONNECTION
// ===============================================

function activateLine(pathId) {

    document
        .querySelectorAll(".network-line")
        .forEach(line => {

            line.classList.remove(
                "is-active"
            );

        });

    const path =
        document.getElementById(pathId);

    if (path) {

        path.classList.add(
            "is-active"
        );

    }

}


// ===============================================
// MOVE PACKET
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
                requestAnimationFrame(
                    move
                );

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
        requestAnimationFrame(
            move
        );

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