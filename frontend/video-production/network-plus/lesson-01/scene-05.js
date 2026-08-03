// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 05 — NETWORK DEVICES HAVE DIFFERENT JOBS
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

        endDeviceGroup:
            document.getElementById("endDeviceGroup"),

        laptop:
            document.getElementById("laptopDevice"),

        printer:
            document.getElementById("printerDevice"),

        phone:
            document.getElementById("phoneDevice"),

        switchDevice:
            document.getElementById("switchDevice"),

        router:
            document.getElementById("routerDevice"),

        otherNetworks:
            document.getElementById("otherNetworks"),

        switchRole:
            document.getElementById("switchRole"),

        routerRole:
            document.getElementById("routerRole"),

        trafficSummary:
            document.getElementById("trafficSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        timeline:
            document.getElementById("timelineProgress"),

        localPacket:
            document.getElementById("localPacket"),

        routingPacket:
            document.getElementById("routingPacket"),

        wanPacket:
            document.getElementById("wanPacket"),

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


    hide(elements.brand);
    hide(elements.title);

    hide(elements.endDeviceGroup);

    hide(elements.laptop);
    hide(elements.printer);
    hide(elements.phone);

    hide(elements.switchDevice);
    hide(elements.router);

    hide(elements.otherNetworks);

    hide(elements.switchRole);
    hide(elements.routerRole);

    hide(elements.trafficSummary);
    hide(elements.finalConcept);


    document
        .querySelectorAll(".network-device")
        .forEach(device => {

            device.classList.remove(
                "is-active"
            );

        });


    elements.lines.forEach(line => {

        line.classList.remove(
            "is-visible",
            "is-active"
        );

    });


    resetPacket(elements.localPacket);
    resetPacket(elements.routingPacket);
    resetPacket(elements.wanPacket);


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
    // 0:05 — END DEVICE GROUP
    // ===========================================

    schedule(() => {

        show(elements.endDeviceGroup);

    }, 5000);


    // ===========================================
    // 0:06 — END DEVICES
    // ===========================================

    schedule(() => {

        show(elements.laptop);

    }, 6000);


    schedule(() => {

        show(elements.printer);

    }, 6700);


    schedule(() => {

        show(elements.phone);

    }, 7400);


    // ===========================================
    // 0:09 — SWITCH
    // ===========================================

    schedule(() => {

        show(elements.switchDevice);

        showLine("pathLaptopSwitch");
        showLine("pathPrinterSwitch");
        showLine("pathPhoneSwitch");

        show(elements.switchRole);

    }, 9000);


    // ===========================================
    // 0:11 — LAPTOP → SWITCH
    // ===========================================

    schedule(() => {

        activateDevice(elements.laptop);

        activateLine("pathLaptopSwitch");

        animatePacket(
            elements.localPacket,
            "pathLaptopSwitch",
            1600,
            false,
            () => {

                activateDevice(
                    elements.switchDevice
                );

            }
        );

    }, 11000);


    // ===========================================
    // 0:14 — PRINTER → SWITCH
    // ===========================================

    schedule(() => {

        activateDevice(elements.printer);

        activateLine("pathPrinterSwitch");

        animatePacket(
            elements.localPacket,
            "pathPrinterSwitch",
            1500,
            false,
            () => {

                activateDevice(
                    elements.switchDevice
                );

            }
        );

    }, 14000);


    // ===========================================
    // 0:17 — ROUTER
    // ===========================================

    schedule(() => {

        show(elements.router);

        showLine("pathSwitchRouter");

        show(elements.routerRole);

    }, 17000);


    // ===========================================
    // 0:19 — SWITCH → ROUTER
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.switchDevice
        );

        activateLine(
            "pathSwitchRouter"
        );

        animatePacket(
            elements.routingPacket,
            "pathSwitchRouter",
            1800,
            false,
            () => {

                activateDevice(
                    elements.router
                );

            }
        );

    }, 19000);


    // ===========================================
    // 0:22 — OTHER NETWORKS
    // ===========================================

    schedule(() => {

        show(elements.otherNetworks);

        showLine("pathRouterCloud");

    }, 22000);


    // ===========================================
    // 0:23 — ROUTER → OTHER NETWORK
    // ===========================================

    schedule(() => {

        activateDevice(elements.router);

        activateLine("pathRouterCloud");

        animatePacket(
            elements.wanPacket,
            "pathRouterCloud",
            1900,
            false,
            () => {

                clearActiveLines();

                elements.router.classList.remove(
                    "is-active"
                );

            }
        );

    }, 23000);


    // ===========================================
    // 0:27 — COMPLETE TRAFFIC FLOW
    // ===========================================

    schedule(() => {

        show(elements.trafficSummary);

    }, 27000);


    // ===========================================
    // 0:29 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.finalConcept);

    }, 29000);

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