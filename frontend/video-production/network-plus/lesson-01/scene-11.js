// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 11 — IP AND MAC ADDRESSING
// LAPTOP → SWITCH → ROUTER → SWITCH → DESKTOP
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

const SCENE_DURATION = 42000;

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

        sourceDevice:
            document.getElementById("sourceDevice"),

        sourceAddress:
            document.getElementById("sourceAddress"),

        switchDevice:
            document.getElementById("switchDevice"),

        switchDecision:
            document.getElementById("switchDecision"),

        routerDevice:
            document.getElementById("routerDevice"),

        routerDecision:
            document.getElementById("routerDecision"),

        destinationSwitch:
            document.getElementById("destinationSwitch"),

        destinationDevice:
            document.getElementById("destinationDevice"),

        destinationAddress:
            document.getElementById("destinationAddress"),

        ipConcept:
            document.getElementById("ipConcept"),

        macConcept:
            document.getElementById("macConcept"),

        packetInfo:
            document.getElementById("packetInfo"),

        nextHopMac:
            document.getElementById("nextHopMac"),

        networkBoundary:
            document.getElementById("networkBoundary"),

        addressRelationship:
            document.getElementById("addressRelationship"),

        addressSummary:
            document.getElementById("addressSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        networkPath:
            document.getElementById("networkPath"),

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
// NETWORK PATH
// ===============================================

function showNetworkPath() {

    const path =
        document.getElementById("networkPath");

    if (!path) return;

    path.classList.add("is-visible");

}


function activateNetworkPath() {

    const path =
        document.getElementById("networkPath");

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


function deactivateNetworkPath() {

    const path =
        document.getElementById("networkPath");

    if (!path) return;

    path.classList.remove("is-active");

}


// ===============================================
// NEXT-HOP MAC DISPLAY
// ===============================================

function setNextHopMac(value) {

    const element =
        document.getElementById("nextHopMac");

    if (!element) return;

    element.textContent = value;

}


// ===============================================
// RESET MOVING PACKET
// ===============================================

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


    // -------------------------------------------
    // BRAND / TITLE
    // -------------------------------------------

    hide(elements.brand);
    hide(elements.title);


    // -------------------------------------------
    // DEVICES
    // -------------------------------------------

    hide(elements.sourceDevice);
    hide(elements.switchDevice);
    hide(elements.routerDevice);
    hide(elements.destinationSwitch);
    hide(elements.destinationDevice);


    document
        .querySelectorAll(".network-device")
        .forEach(device => {

            device.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // ADDRESS CARDS
    // -------------------------------------------

    hide(elements.sourceAddress);
    hide(elements.destinationAddress);


    // -------------------------------------------
    // DECISIONS
    // -------------------------------------------

    hide(elements.switchDecision);
    hide(elements.routerDecision);


    // -------------------------------------------
    // CONCEPTS
    // -------------------------------------------

    hide(elements.ipConcept);
    hide(elements.macConcept);


    // -------------------------------------------
    // PACKET / NETWORK
    // -------------------------------------------

    hide(elements.packetInfo);
    hide(elements.networkBoundary);
    hide(elements.addressRelationship);


    setNextHopMac(
        "ROUTER MAC"
    );


    // -------------------------------------------
    // SUMMARY
    // -------------------------------------------

    hide(elements.addressSummary);
    hide(elements.finalConcept);


    // -------------------------------------------
    // PATH
    // -------------------------------------------

    elements.networkPath.classList.remove(
        "is-visible",
        "is-active"
    );


    resetMovingPacket(
        elements.movingPacket
    );


    // -------------------------------------------
    // BACKGROUND
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

        show(elements.sourceDevice);

        activateDevice(
            elements.sourceDevice
        );

    }, 5000);


    // ===========================================
    // 0:07 — SOURCE ADDRESS
    // ===========================================

    schedule(() => {

        show(elements.sourceAddress);

    }, 7000);


    // ===========================================
    // 0:09 — IP CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.ipConcept);

    }, 9000);


    // ===========================================
    // 0:11 — MAC CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.macConcept);

    }, 11000);


    // ===========================================
    // 0:13 — NETWORK DEVICES
    // ===========================================

    schedule(() => {

        show(elements.switchDevice);

        show(elements.routerDevice);

        show(elements.destinationSwitch);

        show(elements.destinationDevice);

        showNetworkPath();

    }, 13000);


    // ===========================================
    // 0:15 — NETWORK BOUNDARIES
    // ===========================================

    schedule(() => {

        show(elements.networkBoundary);

        show(elements.destinationAddress);

    }, 15000);


    // ===========================================
    // 0:17 — PACKET INFORMATION
    // ===========================================

    schedule(() => {

        show(elements.packetInfo);

        setNextHopMac(
            "ROUTER MAC"
        );

    }, 17000);


    // ===========================================
    // 0:19 — SOURCE SWITCH
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.switchDevice
        );

        show(elements.switchDecision);

    }, 19000);


    // ===========================================
    // 0:22 — ROUTER
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.routerDevice
        );

        show(elements.routerDecision);

    }, 22000);


    // ===========================================
    // 0:25 — ROUTER CHANGES LOCAL DELIVERY
    //
    // Destination IP remains the same.
    // Layer 2 destination changes for the
    // next local link.
    // ===========================================

    schedule(() => {

        setNextHopMac(
            "DESKTOP-B MAC"
        );

    }, 25000);


    // ===========================================
    // 0:27 — DESTINATION SWITCH
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.destinationSwitch
        );

    }, 27000);


    // ===========================================
    // 0:29 — DESTINATION
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.destinationDevice
        );

    }, 29000);


    // ===========================================
    // 0:31 — ADDRESS RELATIONSHIP
    // ===========================================

    schedule(() => {

        show(elements.addressRelationship);

    }, 31000);


    // ===========================================
    // 0:33 — PACKET TRAVELS ENTIRE PATH
    // ===========================================

    schedule(() => {

        activateNetworkPath();

        animatePacketAlongPath(
            elements.movingPacket,
            elements.networkPath,
            4000,
            progress => {

                // ---------------------------------
                // Highlight devices as packet moves
                // ---------------------------------

                if (progress < 0.18) {

                    activateDevice(
                        elements.sourceDevice
                    );

                } else if (
                    progress < 0.40
                ) {

                    activateDevice(
                        elements.switchDevice
                    );

                } else if (
                    progress < 0.61
                ) {

                    activateDevice(
                        elements.routerDevice
                    );

                } else if (
                    progress < 0.82
                ) {

                    activateDevice(
                        elements.destinationSwitch
                    );

                } else {

                    activateDevice(
                        elements.destinationDevice
                    );

                }

            },
            () => {

                deactivateNetworkPath();

                activateDevice(
                    elements.destinationDevice
                );

            }
        );

    }, 33000);


    // ===========================================
    // 0:37 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.addressSummary);

    }, 37000);


    // ===========================================
    // 0:40 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        activateDevice(null);

        show(elements.finalConcept);

    }, 40000);

}


// ===============================================
// ANIMATE PACKET ALONG NETWORK PATH
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

            progressCallback(
                progress
            );

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