// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 08 — NETWORK COMMUNICATION IN LAYERS
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

        applicationDevice:
            document.getElementById("applicationDevice"),

        originalMessage:
            document.getElementById("originalMessage"),

        applicationLayer:
            document.getElementById("applicationLayer"),

        transportLayer:
            document.getElementById("transportLayer"),

        networkLayer:
            document.getElementById("networkLayer"),

        dataLinkLayer:
            document.getElementById("dataLinkLayer"),

        physicalLayer:
            document.getElementById("physicalLayer"),

        movingData:
            document.getElementById("movingData"),

        encapsulationCard:
            document.getElementById("encapsulationCard"),

        physicalTransmission:
            document.getElementById("physicalTransmission"),

        layerRole:
            document.getElementById("layerRole"),

        flowSummary:
            document.getElementById("flowSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

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
// ACTIVE LAYER
// ===============================================

function activateLayer(layer) {

    document
        .querySelectorAll(".network-layer")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (layer) {

        layer.classList.add("is-active");

    }

}


// ===============================================
// MOVE DATA TO A LAYER
// ===============================================

function moveDataToLayer(layer) {

    const elements =
        getElements();

    if (
        !elements.movingData ||
        !layer
    ) {
        return;
    }


    const stage =
        document.querySelector(".layer-stage");

    if (!stage) return;


    const stageRect =
        stage.getBoundingClientRect();

    const layerRect =
        layer.getBoundingClientRect();


    /*
        Convert screen coordinates back into
        the fixed 1200 × 500 stage coordinates.

        This keeps the animation correct even
        when the whole stage is scaled by CSS.
    */

    const scaleX =
        stageRect.width / 1200;

    const scaleY =
        stageRect.height / 500;


    const layerCenterY =
        (
            layerRect.top -
            stageRect.top +
            layerRect.height / 2
        ) / scaleY;


    const layerRight =
        (
            layerRect.right -
            stageRect.left
        ) / scaleX;


    elements.movingData.style.transition =
        "left 0.8s ease, top 0.8s ease";

    elements.movingData.style.left =
        `${layerRight + 48}px`;

    elements.movingData.style.top =
        `${layerCenterY}px`;

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
    // SOURCE
    // -------------------------------------------

    hide(elements.applicationDevice);
    hide(elements.originalMessage);


    // -------------------------------------------
    // LAYERS
    // -------------------------------------------

    hide(elements.applicationLayer);
    hide(elements.transportLayer);
    hide(elements.networkLayer);
    hide(elements.dataLinkLayer);
    hide(elements.physicalLayer);


    document
        .querySelectorAll(".network-layer")
        .forEach(layer => {

            layer.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // DATA
    // -------------------------------------------

    hide(elements.movingData);

    elements.movingData.style.transition =
        "none";

    elements.movingData.style.left =
        "805px";

    elements.movingData.style.top =
        "115px";


    // -------------------------------------------
    // EXPLANATIONS
    // -------------------------------------------

    hide(elements.encapsulationCard);
    hide(elements.physicalTransmission);
    hide(elements.layerRole);

    hide(elements.flowSummary);
    hide(elements.finalConcept);


    elements
        .physicalTransmission
        .classList
        .remove("is-transmitting");


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

        show(
            elements.applicationDevice
        );

    }, 5000);


    // ===========================================
    // 0:06 — ORIGINAL APPLICATION DATA
    // ===========================================

    schedule(() => {

        show(
            elements.originalMessage
        );

    }, 6500);


    // ===========================================
    // 0:08 — WHY LAYERS?
    // ===========================================

    schedule(() => {

        show(
            elements.layerRole
        );

    }, 8000);


    // ===========================================
    // 0:10 — APPLICATION LAYER
    // ===========================================

    schedule(() => {

        show(
            elements.applicationLayer
        );

        activateLayer(
            elements.applicationLayer
        );

    }, 10000);


    // ===========================================
    // 0:12 — TRANSPORT LAYER
    // ===========================================

    schedule(() => {

        show(
            elements.transportLayer
        );

        activateLayer(
            elements.transportLayer
        );

    }, 12000);


    // ===========================================
    // 0:14 — NETWORK LAYER
    // ===========================================

    schedule(() => {

        show(
            elements.networkLayer
        );

        activateLayer(
            elements.networkLayer
        );

    }, 14000);


    // ===========================================
    // 0:16 — DATA LINK LAYER
    // ===========================================

    schedule(() => {

        show(
            elements.dataLinkLayer
        );

        activateLayer(
            elements.dataLinkLayer
        );

    }, 16000);


    // ===========================================
    // 0:18 — PHYSICAL LAYER
    // ===========================================

    schedule(() => {

        show(
            elements.physicalLayer
        );

        activateLayer(
            elements.physicalLayer
        );

    }, 18000);


    // ===========================================
    // 0:20 — SHOW MOVING DATA
    // ===========================================

    schedule(() => {

        show(
            elements.movingData
        );

        activateLayer(
            elements.applicationLayer
        );

        moveDataToLayer(
            elements.applicationLayer
        );

    }, 20000);


    // ===========================================
    // 0:21.5 — DATA → TRANSPORT
    // ===========================================

    schedule(() => {

        activateLayer(
            elements.transportLayer
        );

        moveDataToLayer(
            elements.transportLayer
        );

    }, 21500);


    // ===========================================
    // 0:23 — DATA → NETWORK
    // ===========================================

    schedule(() => {

        activateLayer(
            elements.networkLayer
        );

        moveDataToLayer(
            elements.networkLayer
        );

    }, 23000);


    // ===========================================
    // 0:24.5 — DATA → DATA LINK
    // ===========================================

    schedule(() => {

        activateLayer(
            elements.dataLinkLayer
        );

        moveDataToLayer(
            elements.dataLinkLayer
        );

    }, 24500);


    // ===========================================
    // 0:26 — DATA → PHYSICAL
    // ===========================================

    schedule(() => {

        activateLayer(
            elements.physicalLayer
        );

        moveDataToLayer(
            elements.physicalLayer
        );

    }, 26000);


    // ===========================================
    // 0:27 — ENCAPSULATION
    // ===========================================

    schedule(() => {

        show(
            elements.encapsulationCard
        );

    }, 27000);


    // ===========================================
    // 0:29 — PHYSICAL TRANSMISSION
    // ===========================================

    schedule(() => {

        hide(
            elements.movingData
        );

        show(
            elements.physicalTransmission
        );

        elements
            .physicalTransmission
            .classList
            .add("is-transmitting");

    }, 29000);


    // ===========================================
    // 0:32 — FLOW SUMMARY
    // ===========================================

    schedule(() => {

        activateLayer(null);

        show(
            elements.flowSummary
        );

    }, 32000);


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