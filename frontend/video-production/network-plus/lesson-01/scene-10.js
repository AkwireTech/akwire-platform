// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 10 — DECAPSULATION
// BITS → FRAME → PACKET → SEGMENT → DATA
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

const SCENE_DURATION = 38000;

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

        bitsNode:
            document.getElementById("bitsNode"),

        frameNode:
            document.getElementById("frameNode"),

        packetNode:
            document.getElementById("packetNode"),

        segmentNode:
            document.getElementById("segmentNode"),

        dataNode:
            document.getElementById("dataNode"),

        receivedFrame:
            document.getElementById("receivedFrame"),

        ethernetRemoval:
            document.getElementById("ethernetRemoval"),

        ipRemoval:
            document.getElementById("ipRemoval"),

        transportRemoval:
            document.getElementById("transportRemoval"),

        dataTransformation:
            document.getElementById("dataTransformation"),

        transformEthernet:
            document.getElementById("transformEthernet"),

        transformIp:
            document.getElementById("transformIp"),

        transformTransport:
            document.getElementById("transformTransport"),

        transformPayload:
            document.getElementById("transformPayload"),

        deliveredData:
            document.getElementById("deliveredData"),

        destinationDevice:
            document.getElementById("destinationDevice"),

        processExplanation:
            document.getElementById("processExplanation"),

        processSummary:
            document.getElementById("processSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        processLine:
            document.getElementById("decapsulationPath"),

        processPacket:
            document.getElementById("processPacket"),

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
// ACTIVE NODE
// ===============================================

function activateNode(node) {

    document
        .querySelectorAll(".decapsulation-node")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (node) {

        node.classList.add("is-active");

    }

}


// ===============================================
// PROCESS LINE
// ===============================================

function showProcessLine() {

    const line =
        document.getElementById("decapsulationPath");

    if (!line) return;

    line.classList.add("is-visible");

}


function activateProcessLine() {

    const line =
        document.getElementById("decapsulationPath");

    if (!line) return;

    line.classList.add(
        "is-visible",
        "is-active"
    );

}


function deactivateProcessLine() {

    const line =
        document.getElementById("decapsulationPath");

    if (!line) return;

    line.classList.remove("is-active");

}


// ===============================================
// REMOVE HEADER VISUALLY
// ===============================================

function removeHeader(element) {

    if (!element) return;

    element.classList.add("is-removed");

}


// ===============================================
// RESTORE HEADER
// ===============================================

function restoreHeader(element) {

    if (!element) return;

    element.classList.remove("is-removed");

}


// ===============================================
// RESET PROCESS PACKET
// ===============================================

function resetProcessPacket(packet) {

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
    // NODES
    // -------------------------------------------

    hide(elements.bitsNode);
    hide(elements.frameNode);
    hide(elements.packetNode);
    hide(elements.segmentNode);
    hide(elements.dataNode);


    document
        .querySelectorAll(".decapsulation-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // FRAME / TRANSFORMATION
    // -------------------------------------------

    hide(elements.receivedFrame);
    hide(elements.dataTransformation);

    restoreHeader(
        elements.transformEthernet
    );

    restoreHeader(
        elements.transformIp
    );

    restoreHeader(
        elements.transformTransport
    );

    restoreHeader(
        elements.transformPayload
    );


    // -------------------------------------------
    // REMOVAL CARDS
    // -------------------------------------------

    hide(elements.ethernetRemoval);
    hide(elements.ipRemoval);
    hide(elements.transportRemoval);


    // -------------------------------------------
    // DESTINATION
    // -------------------------------------------

    hide(elements.deliveredData);
    hide(elements.destinationDevice);


    // -------------------------------------------
    // EXPLANATIONS
    // -------------------------------------------

    hide(elements.processExplanation);
    hide(elements.processSummary);
    hide(elements.finalConcept);


    // -------------------------------------------
    // PROCESS PATH
    // -------------------------------------------

    elements.processLine.classList.remove(
        "is-visible",
        "is-active"
    );


    resetProcessPacket(
        elements.processPacket
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
    // 0:05 — RECEIVED FRAME
    // ===========================================

    schedule(() => {

        show(elements.receivedFrame);

        show(elements.processExplanation);

    }, 5000);


    // ===========================================
    // 0:07 — PHYSICAL / BITS
    // ===========================================

    schedule(() => {

        show(elements.bitsNode);

        activateNode(elements.bitsNode);

        showProcessLine();

    }, 7000);


    // ===========================================
    // 0:09 — TRANSFORMATION VISUAL
    // ===========================================

    schedule(() => {

        show(elements.dataTransformation);

    }, 9000);


    // ===========================================
    // 0:11 — DATA LINK / FRAME
    // ===========================================

    schedule(() => {

        show(elements.frameNode);

        activateNode(elements.frameNode);

    }, 11000);


    // ===========================================
    // 0:13 — REMOVE ETHERNET
    // ===========================================

    schedule(() => {

        show(elements.ethernetRemoval);

        removeHeader(
            elements.transformEthernet
        );

    }, 13000);


    // ===========================================
    // 0:16 — NETWORK / PACKET
    // ===========================================

    schedule(() => {

        show(elements.packetNode);

        activateNode(elements.packetNode);

    }, 16000);


    // ===========================================
    // 0:18 — REMOVE IP
    // ===========================================

    schedule(() => {

        show(elements.ipRemoval);

        removeHeader(
            elements.transformIp
        );

    }, 18000);


    // ===========================================
    // 0:21 — TRANSPORT / SEGMENT
    // ===========================================

    schedule(() => {

        show(elements.segmentNode);

        activateNode(elements.segmentNode);

    }, 21000);


    // ===========================================
    // 0:23 — REMOVE TRANSPORT HEADER
    // ===========================================

    schedule(() => {

        show(elements.transportRemoval);

        removeHeader(
            elements.transformTransport
        );

    }, 23000);


    // ===========================================
    // 0:26 — APPLICATION / DATA
    // ===========================================

    schedule(() => {

        show(elements.dataNode);

        activateNode(elements.dataNode);

    }, 26000);


    // ===========================================
    // 0:28 — DELIVER ORIGINAL DATA
    // ===========================================

    schedule(() => {

        show(elements.deliveredData);

    }, 28000);


    // ===========================================
    // 0:30 — DESTINATION DEVICE
    // ===========================================

    schedule(() => {

        show(elements.destinationDevice);

    }, 30000);


    // ===========================================
    // 0:31 — TRAVEL THROUGH RECEIVING STACK
    // ===========================================

    schedule(() => {

        activateProcessLine();

        animateProcessPacket(
            elements.processPacket,
            elements.processLine,
            2800,
            () => {

                deactivateProcessLine();

                activateNode(null);

            }
        );

    }, 31000);


    // ===========================================
    // 0:34 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.processSummary);

    }, 34000);


    // ===========================================
    // 0:36 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.finalConcept);

    }, 36000);

}


// ===============================================
// ANIMATE PACKET ALONG PATH
// ===============================================

function animateProcessPacket(
    packet,
    path,
    duration,
    callback = null
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