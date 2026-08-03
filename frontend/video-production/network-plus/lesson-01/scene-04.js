// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 04 — LAN VS. WAN
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

        lanArea:
            document.getElementById("lanArea"),

        wanArea:
            document.getElementById("wanArea"),

        laptop:
            document.getElementById("lanLaptop"),

        phone:
            document.getElementById("lanPhone"),

        printer:
            document.getElementById("lanPrinter"),

        switchDevice:
            document.getElementById("lanSwitch"),

        router:
            document.getElementById("lanRouter"),

        siteA:
            document.getElementById("siteA"),

        siteB:
            document.getElementById("siteB"),

        siteC:
            document.getElementById("siteC"),

        wanCloud:
            document.getElementById("wanCloud"),

        lanDescription:
            document.getElementById("lanDescription"),

        wanDescription:
            document.getElementById("wanDescription"),

        comparison:
            document.getElementById("comparisonSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        timeline:
            document.getElementById("timelineProgress"),

        lanPacket:
            document.getElementById("lanPacket"),

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
    // Main scene
    // -------------------------------------------

    hide(elements.brand);
    hide(elements.title);

    hide(elements.lanArea);
    hide(elements.wanArea);


    // -------------------------------------------
    // LAN devices
    // -------------------------------------------

    hide(elements.laptop);
    hide(elements.phone);
    hide(elements.printer);
    hide(elements.switchDevice);
    hide(elements.router);


    // -------------------------------------------
    // WAN objects
    // -------------------------------------------

    hide(elements.siteA);
    hide(elements.siteB);
    hide(elements.siteC);
    hide(elements.wanCloud);


    // -------------------------------------------
    // Descriptions
    // -------------------------------------------

    hide(elements.lanDescription);
    hide(elements.wanDescription);

    hide(elements.comparison);
    hide(elements.finalConcept);


    // -------------------------------------------
    // Active states
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
    // Packets
    // -------------------------------------------

    resetPacket(
        elements.lanPacket
    );

    resetPacket(
        elements.wanPacket
    );


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
    // 0:05 — INTRODUCE LAN
    // ===========================================

    schedule(() => {

        show(elements.lanArea);

    }, 5000);


    // ===========================================
    // 0:06 — LAN DEVICES
    // ===========================================

    schedule(() => {

        show(elements.laptop);

    }, 6000);


    schedule(() => {

        show(elements.phone);

    }, 6700);


    schedule(() => {

        show(elements.printer);

    }, 7400);


    schedule(() => {

        show(elements.switchDevice);

    }, 8100);


    schedule(() => {

        show(elements.router);

    }, 8800);


    // ===========================================
    // 0:10 — LAN CONNECTIONS
    // ===========================================

    schedule(() => {

        showLine(
            "lanLaptopPath"
        );

        showLine(
            "lanPhonePath"
        );

        showLine(
            "lanPrinterPath"
        );

        showLine(
            "lanSwitchRouterPath"
        );

        show(
            elements.lanDescription
        );

    }, 10000);


    // ===========================================
    // 0:12 — LOCAL TRAFFIC
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.laptop
        );

        activateLine(
            "lanLaptopPath"
        );

        animatePacket(
            elements.lanPacket,
            "lanLaptopPath",
            1400,
            false,
            () => {

                activateDevice(
                    elements.switchDevice
                );


                activateLine(
                    "lanSwitchRouterPath"
                );


                animatePacket(
                    elements.lanPacket,
                    "lanSwitchRouterPath",
                    1400,
                    false,
                    () => {

                        activateDevice(
                            elements.router
                        );

                    }
                );

            }
        );

    }, 12000);


    // ===========================================
    // 0:15 — INTRODUCE WAN
    // ===========================================

    schedule(() => {

        show(elements.wanArea);

    }, 15000);


    // ===========================================
    // 0:16 — WAN COMPONENTS
    // ===========================================

    schedule(() => {

        show(elements.siteA);

    }, 16000);


    schedule(() => {

        show(elements.siteB);

    }, 16700);


    schedule(() => {

        show(elements.siteC);

    }, 17400);


    schedule(() => {

        show(elements.wanCloud);

    }, 18100);


    // ===========================================
    // 0:19 — WAN CONNECTIONS
    // ===========================================

    schedule(() => {

        showLine(
            "lanWanPath"
        );

        showLine(
            "wanSiteAPath"
        );

        showLine(
            "wanSiteBPath"
        );

        showLine(
            "wanSiteCPath"
        );

        show(
            elements.wanDescription
        );

    }, 19000);


    // ===========================================
    // 0:21 — LAN → WAN TRAFFIC
    // ===========================================

    schedule(() => {

        activateDevice(
            elements.router
        );

        activateLine(
            "lanWanPath"
        );

        animatePacket(
            elements.wanPacket,
            "lanWanPath",
            1600,
            false,
            () => {

                animateWANPath();

            }
        );

    }, 21000);


    // ===========================================
    // 0:27 — COMPARISON
    // ===========================================

    schedule(() => {

        clearActiveLines();

        document
            .querySelectorAll(
                ".network-device"
            )
            .forEach(device => {

                device.classList.remove(
                    "is-active"
                );

            });

        show(
            elements.comparison
        );

    }, 27000);


    // ===========================================
    // 0:29 — KEY IDEA
    // ===========================================

    schedule(() => {

        show(
            elements.finalConcept
        );

    }, 29000);

}


// ===============================================
// WAN TRAFFIC
// ===============================================

function animateWANPath() {

    const elements =
        getElements();


    // -------------------------------------------
    // WAN cloud → Site A
    // -------------------------------------------

    activateLine(
        "wanSiteAPath"
    );

    animatePacket(
        elements.wanPacket,
        "wanSiteAPath",
        1500,
        true
    );


    // -------------------------------------------
    // WAN cloud → Site B
    // -------------------------------------------

    schedule(() => {

        activateLine(
            "wanSiteBPath"
        );

        animatePacket(
            elements.wanPacket,
            "wanSiteBPath",
            1500,
            true
        );

    }, 1700);


    // -------------------------------------------
    // WAN cloud → Site C
    // -------------------------------------------

    schedule(() => {

        activateLine(
            "wanSiteCPath"
        );

        animatePacket(
            elements.wanPacket,
            "wanSiteCPath",
            1500,
            true
        );

    }, 3400);

}


// ===============================================
// SHOW CONNECTION
// ===============================================

function showLine(pathId) {

    const path =
        document.getElementById(
            pathId
        );

    if (!path) return;

    path.classList.add(
        "is-visible"
    );

}


// ===============================================
// ACTIVATE CONNECTION
// ===============================================

function activateLine(pathId) {

    clearActiveLines();

    const path =
        document.getElementById(
            pathId
        );

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


// ===============================================
// CLEAR ACTIVE CONNECTIONS
// ===============================================

function clearActiveLines() {

    document
        .querySelectorAll(
            ".network-line"
        )
        .forEach(line => {

            line.classList.remove(
                "is-active"
            );

        });

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
        document.getElementById(
            pathId
        );

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