// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 01 — NETWORKS ARE EVERYWHERE
// Duration: 25 seconds
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    const startButton =
        document.getElementById("startSceneBtn");

    const restartButton =
        document.getElementById("restartSceneBtn");

    startButton.addEventListener(
        "click",
        playScene
    );

    restartButton.addEventListener(
        "click",
        restartScene
    );

});


// ===============================================
// SCENE SETTINGS
// ===============================================

const SCENE_DURATION = 25000;

let sceneTimers = [];


// ===============================================
// ELEMENTS
// ===============================================

function getSceneElements() {

    return {

        brand:
            document.querySelector(".scene-brand"),

        title:
            document.querySelector(".scene-title"),

        laptop:
            document.getElementById("laptopDevice"),

        phone:
            document.getElementById("phoneDevice"),

        wifi:
            document.getElementById("wifiDevice"),

        printer:
            document.getElementById("printerDevice"),

        cloud:
            document.getElementById("cloudDevice"),

        server:
            document.getElementById("serverDevice"),

        definition:
            document.getElementById("networkDefinition"),

        question:
            document.getElementById("sceneQuestion"),

        timeline:
            document.getElementById("timelineProgress"),

        lines:
            document.querySelectorAll(".network-line"),

        packetOne:
            document.getElementById("packetOne"),

        packetTwo:
            document.getElementById("packetTwo"),

        packetThree:
            document.getElementById("packetThree")

    };

}


// ===============================================
// TIMER HELPER
// ===============================================

function schedule(callback, delay) {

    const timer =
        setTimeout(callback, delay);

    sceneTimers.push(timer);

}


// ===============================================
// CLEAR TIMERS
// ===============================================

function clearSceneTimers() {

    sceneTimers.forEach(timer => {

        clearTimeout(timer);

    });

    sceneTimers = [];

}


// ===============================================
// SHOW ELEMENT
// ===============================================

function show(element) {

    if (!element) {
        return;
    }

    element.classList.add("is-visible");

}


// ===============================================
// HIDE ELEMENT
// ===============================================

function hide(element) {

    if (!element) {
        return;
    }

    element.classList.remove("is-visible");

}


// ===============================================
// RESET PACKET
// ===============================================

function resetPacket(packet) {

    if (!packet) {
        return;
    }

    packet.style.opacity = "0";
    packet.style.transform = "";

}


// ===============================================
// RESET SCENE
// ===============================================

function resetScene() {

    clearSceneTimers();

    const elements =
        getSceneElements();

    hide(elements.brand);
    hide(elements.title);

    hide(elements.laptop);
    hide(elements.phone);
    hide(elements.wifi);
    hide(elements.printer);
    hide(elements.cloud);
    hide(elements.server);

    hide(elements.definition);
    hide(elements.question);

    elements.lines.forEach(line => {

        hide(line);

    });

    resetPacket(elements.packetOne);
    resetPacket(elements.packetTwo);
    resetPacket(elements.packetThree);

    elements.timeline.style.transition = "none";
    elements.timeline.style.width = "0%";

}


// ===============================================
// PLAY SCENE
// ===============================================

function playScene() {

    resetScene();

    const elements =
        getSceneElements();


    // -------------------------------------------
    // TIMELINE
    // -------------------------------------------

    requestAnimationFrame(() => {

        elements.timeline.style.transition =
            `width ${SCENE_DURATION}ms linear`;

        elements.timeline.style.width =
            "100%";

    });


    // -------------------------------------------
    // 0:00 — BACKGROUND / BRAND
    // -------------------------------------------

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

    }, 400);


    // -------------------------------------------
    // 0:03 — TITLE
    // -------------------------------------------

    schedule(() => {

        show(elements.title);

    }, 3000);


    // -------------------------------------------
    // 0:06 — LAPTOP
    // -------------------------------------------

    schedule(() => {

        show(elements.laptop);

    }, 6000);


    // -------------------------------------------
    // 0:09 — NETWORK DEFINITION
    // -------------------------------------------

    schedule(() => {

        show(elements.definition);

    }, 9000);


    // -------------------------------------------
    // 0:10 — PHONE
    // -------------------------------------------

    schedule(() => {

        show(elements.phone);

    }, 10000);


    // -------------------------------------------
    // 0:11 — WIFI
    // -------------------------------------------

    schedule(() => {

        show(elements.wifi);

    }, 11000);


    // -------------------------------------------
    // 0:12 — PRINTER
    // -------------------------------------------

    schedule(() => {

        show(elements.printer);

    }, 12000);


    // -------------------------------------------
    // 0:14 — CLOUD
    // -------------------------------------------

    schedule(() => {

        show(elements.cloud);

    }, 14000);


    // -------------------------------------------
    // 0:15 — SERVER
    // -------------------------------------------

    schedule(() => {

        show(elements.server);

    }, 15000);


    // -------------------------------------------
    // 0:18 — NETWORK CONNECTIONS
    // -------------------------------------------

    schedule(() => {

        elements.lines.forEach(
            (line, index) => {

                schedule(() => {

                    show(line);

                }, index * 180);

            }
        );

    }, 18000);


    // -------------------------------------------
    // 0:20 — PACKET MOTION
    // -------------------------------------------

    schedule(() => {

        startPacketAnimations();

    }, 20000);


    // -------------------------------------------
    // 0:22 — FINAL QUESTION
    // -------------------------------------------

    schedule(() => {

        show(elements.question);

    }, 22000);

}


// ===============================================
// RESTART SCENE
// ===============================================

function restartScene() {

    resetScene();

    schedule(() => {

        playScene();

    }, 250);

}


// ===============================================
// PACKET ANIMATIONS
// ===============================================

function startPacketAnimations() {

    animatePacket(
        "packetOne",
        "lineLaptopWifi",
        1800
    );

    schedule(() => {

        animatePacket(
            "packetTwo",
            "lineWifiCloud",
            1800
        );

    }, 550);

    schedule(() => {

        animatePacket(
            "packetThree",
            "lineWifiServer",
            2100
        );

    }, 1000);

}


// ===============================================
// MOVE PACKET ALONG SVG PATH
// ===============================================

function animatePacket(
    packetId,
    pathId,
    duration
) {

    const packet =
        document.getElementById(packetId);

    const path =
        document.getElementById(pathId);

    if (!packet || !path) {
        return;
    }

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

        if (progress < 1) {

            requestAnimationFrame(move);

        } else {

            packet.style.opacity = "0";

        }

    }

    requestAnimationFrame(move);

}


// ===============================================
// OPTIONAL KEYBOARD CONTROL
// SPACE = PLAY
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