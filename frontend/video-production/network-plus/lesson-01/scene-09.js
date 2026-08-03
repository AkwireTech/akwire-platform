// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 09 — ENCAPSULATION
// DATA → SEGMENT → PACKET → FRAME → BITS
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

const SCENE_DURATION = 36000;

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

        applicationData:
            document.getElementById("applicationData"),

        segmentNode:
            document.getElementById("segmentNode"),

        packetNode:
            document.getElementById("packetNode"),

        frameNode:
            document.getElementById("frameNode"),

        bitsNode:
            document.getElementById("bitsNode"),

        dataObject:
            document.getElementById("dataObject"),

        transportHeader:
            document.getElementById("transportHeader"),

        ipHeader:
            document.getElementById("ipHeader"),

        ethernetHeader:
            document.getElementById("ethernetHeader"),

        encapsulatedData:
            document.getElementById("encapsulatedData"),

        bitStream:
            document.getElementById("bitStream"),

        processExplanation:
            document.getElementById("processExplanation"),

        pduSummary:
            document.getElementById("pduSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        processLine:
            document.getElementById("encapsulationPath"),

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
// ACTIVE NODE
// ===============================================

function activateNode(node) {

    document
        .querySelectorAll(".encapsulation-node")
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
        document.getElementById("encapsulationPath");

    if (!line) return;

    line.classList.add("is-visible");

}


function activateProcessLine() {

    const line =
        document.getElementById("encapsulationPath");

    if (!line) return;

    line.classList.add(
        "is-visible",
        "is-active"
    );

}


function deactivateProcessLine() {

    const line =
        document.getElementById("encapsulationPath");

    if (!line) return;

    line.classList.remove("is-active");

}


// ===============================================
// DATA OBJECT LABEL
// ===============================================

function updateDataObject(label, value) {

    const dataObject =
        document.getElementById("dataObject");

    if (!dataObject) return;


    const labelElement =
        dataObject.querySelector(".data-label");

    const valueElement =
        dataObject.querySelector("strong");


    if (labelElement) {

        labelElement.textContent = label;

    }


    if (valueElement) {

        valueElement.textContent = value;

    }

}


// ===============================================
// MOVE DATA OBJECT
// ===============================================

function moveDataObject(x, y) {

    const dataObject =
        document.getElementById("dataObject");

    if (!dataObject) return;


    dataObject.style.transition =
        "left 0.8s ease, top 0.8s ease";

    dataObject.style.left =
        `${x}px`;

    dataObject.style.top =
        `${y}px`;

}


// ===============================================
// RESET SVG PACKET
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
    // PROCESS NODES
    // -------------------------------------------

    hide(elements.applicationData);
    hide(elements.segmentNode);
    hide(elements.packetNode);
    hide(elements.frameNode);
    hide(elements.bitsNode);


    document
        .querySelectorAll(".encapsulation-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // DATA OBJECT
    // -------------------------------------------

    hide(elements.dataObject);

    elements.dataObject.style.transition =
        "none";

    elements.dataObject.style.left =
        "180px";

    elements.dataObject.style.top =
        "355px";

    updateDataObject(
        "DATA",
        "HELLO"
    );


    // -------------------------------------------
    // HEADER EXPLANATIONS
    // -------------------------------------------

    hide(elements.transportHeader);
    hide(elements.ipHeader);
    hide(elements.ethernetHeader);


    // -------------------------------------------
    // FINAL DATA VISUALS
    // -------------------------------------------

    hide(elements.encapsulatedData);
    hide(elements.bitStream);
    hide(elements.processExplanation);

    hide(elements.pduSummary);
    hide(elements.finalConcept);


    elements.bitStream.classList.remove(
        "is-transmitting"
    );


    // -------------------------------------------
    // PROCESS LINE
    // -------------------------------------------

    elements.processLine.classList.remove(
        "is-visible",
        "is-active"
    );


    // -------------------------------------------
    // SVG PACKET
    // -------------------------------------------

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
    // 0:05 — APPLICATION DATA
    // ===========================================

    schedule(() => {

        show(
            elements.applicationData
        );

        activateNode(
            elements.applicationData
        );

        show(
            elements.dataObject
        );

    }, 5000);


    // ===========================================
    // 0:07 — SHOW PROCESS PATH
    // ===========================================

    schedule(() => {

        showProcessLine();

    }, 7000);


    // ===========================================
    // 0:09 — TRANSPORT / SEGMENT
    // ===========================================

    schedule(() => {

        show(
            elements.segmentNode
        );

        activateNode(
            elements.segmentNode
        );

        show(
            elements.transportHeader
        );

        updateDataObject(
            "SEGMENT",
            "TCP + DATA"
        );

        moveDataObject(
            390,
            355
        );

    }, 9000);


    // ===========================================
    // 0:13 — NETWORK / PACKET
    // ===========================================

    schedule(() => {

        show(
            elements.packetNode
        );

        activateNode(
            elements.packetNode
        );

        show(
            elements.ipHeader
        );

        updateDataObject(
            "PACKET",
            "IP + TCP + DATA"
        );

        moveDataObject(
            570,
            355
        );

    }, 13000);


    // ===========================================
    // 0:17 — DATA LINK / FRAME
    // ===========================================

    schedule(() => {

        show(
            elements.frameNode
        );

        activateNode(
            elements.frameNode
        );

        show(
            elements.ethernetHeader
        );

        updateDataObject(
            "FRAME",
            "ETH + IP + TCP + DATA"
        );

        moveDataObject(
            750,
            355
        );

    }, 17000);


    // ===========================================
    // 0:21 — SHOW COMPLETE ENCAPSULATION
    // ===========================================

    schedule(() => {

        show(
            elements.encapsulatedData
        );

        show(
            elements.processExplanation
        );

    }, 21000);


    // ===========================================
    // 0:23 — PHYSICAL / BITS
    // ===========================================

    schedule(() => {

        show(
            elements.bitsNode
        );

        activateNode(
            elements.bitsNode
        );

        updateDataObject(
            "BITS",
            "10110010"
        );

        moveDataObject(
            940,
            355
        );

    }, 23000);


    // ===========================================
    // 0:25 — BIT STREAM
    // ===========================================

    schedule(() => {

        hide(
            elements.dataObject
        );

        show(
            elements.bitStream
        );

        elements
            .bitStream
            .classList
            .add("is-transmitting");

    }, 25000);


    // ===========================================
    // 0:27 — PACKET TRAVELS PROCESS PATH
    // ===========================================

    schedule(() => {

        activateProcessLine();

        animateProcessPacket(
            elements.processPacket,
            elements.processLine,
            3200,
            () => {

                deactivateProcessLine();

            }
        );

    }, 27000);


    // ===========================================
    // 0:31 — PDU SUMMARY
    // ===========================================

    schedule(() => {

        activateNode(null);

        show(
            elements.pduSummary
        );

    }, 31000);


    // ===========================================
    // 0:34 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(
            elements.finalConcept
        );

    }, 34000);

}


// ===============================================
// ANIMATE PACKET ALONG PROCESS PATH
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