// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 12 — PORTS AND APPLICATION SERVICES
// BROWSER → IP → TCP → PORT 443 → HTTPS
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

const SCENE_DURATION = 40000;

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

        clientDevice:
            document.getElementById("clientDevice"),

        requestCard:
            document.getElementById("requestCard"),

        ipNode:
            document.getElementById("ipNode"),

        ipExplanation:
            document.getElementById("ipExplanation"),

        transportNode:
            document.getElementById("transportNode"),

        transportExplanation:
            document.getElementById("transportExplanation"),

        portNode:
            document.getElementById("portNode"),

        portExplanation:
            document.getElementById("portExplanation"),

        serverDevice:
            document.getElementById("serverDevice"),

        servicePanel:
            document.getElementById("servicePanel"),

        sshService:
            document.getElementById("sshService"),

        dnsService:
            document.getElementById("dnsService"),

        httpService:
            document.getElementById("httpService"),

        httpsService:
            document.getElementById("httpsService"),

        socketVisual:
            document.getElementById("socketVisual"),

        deliveryResult:
            document.getElementById("deliveryResult"),

        portExamples:
            document.getElementById("portExamples"),

        finalConcept:
            document.getElementById("finalConcept"),

        connectionPath:
            document.getElementById("connectionPath"),

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
// ACTIVE NODE
// ===============================================

function activateNode(node) {

    document
        .querySelectorAll(".stage-node")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (node) {

        node.classList.add("is-active");

    }

}


// ===============================================
// ACTIVE SERVICE
// ===============================================

function activateService(service) {

    document
        .querySelectorAll(".service-row")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (service) {

        service.classList.add("is-active");

    }

}


// ===============================================
// CONNECTION PATH
// ===============================================

function showConnectionPath() {

    const path =
        document.getElementById("connectionPath");

    if (!path) return;

    path.classList.add("is-visible");

}


function activateConnectionPath() {

    const path =
        document.getElementById("connectionPath");

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


function deactivateConnectionPath() {

    const path =
        document.getElementById("connectionPath");

    if (!path) return;

    path.classList.remove("is-active");

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
    // MAIN NODES
    // -------------------------------------------

    hide(elements.clientDevice);
    hide(elements.ipNode);
    hide(elements.transportNode);
    hide(elements.portNode);
    hide(elements.serverDevice);


    document
        .querySelectorAll(".stage-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // REQUEST
    // -------------------------------------------

    hide(elements.requestCard);


    // -------------------------------------------
    // EXPLANATIONS
    // -------------------------------------------

    hide(elements.ipExplanation);
    hide(elements.transportExplanation);
    hide(elements.portExplanation);


    // -------------------------------------------
    // SERVICES
    // -------------------------------------------

    hide(elements.servicePanel);

    activateService(null);


    // -------------------------------------------
    // SOCKET / DELIVERY
    // -------------------------------------------

    hide(elements.socketVisual);
    hide(elements.deliveryResult);


    // -------------------------------------------
    // SUMMARY
    // -------------------------------------------

    hide(elements.portExamples);
    hide(elements.finalConcept);


    // -------------------------------------------
    // CONNECTION PATH
    // -------------------------------------------

    elements.connectionPath.classList.remove(
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
    // 0:05 — CLIENT / BROWSER
    // ===========================================

    schedule(() => {

        show(elements.clientDevice);

        activateNode(
            elements.clientDevice
        );

    }, 5000);


    // ===========================================
    // 0:07 — HTTPS REQUEST
    // ===========================================

    schedule(() => {

        show(elements.requestCard);

    }, 7000);


    // ===========================================
    // 0:10 — IP ADDRESS
    // ===========================================

    schedule(() => {

        show(elements.ipNode);

        activateNode(
            elements.ipNode
        );

        show(elements.ipExplanation);

        showConnectionPath();

    }, 10000);


    // ===========================================
    // 0:14 — TRANSPORT LAYER
    // ===========================================

    schedule(() => {

        show(elements.transportNode);

        activateNode(
            elements.transportNode
        );

        show(
            elements.transportExplanation
        );

    }, 14000);


    // ===========================================
    // 0:18 — PORT 443
    // ===========================================

    schedule(() => {

        show(elements.portNode);

        activateNode(
            elements.portNode
        );

        show(elements.portExplanation);

    }, 18000);


    // ===========================================
    // 0:21 — SOCKET
    // ===========================================

    schedule(() => {

        show(elements.socketVisual);

    }, 21000);


    // ===========================================
    // 0:24 — SERVER
    // ===========================================

    schedule(() => {

        show(elements.serverDevice);

        activateNode(
            elements.serverDevice
        );

    }, 24000);


    // ===========================================
    // 0:26 — AVAILABLE SERVICES
    // ===========================================

    schedule(() => {

        show(elements.servicePanel);

    }, 26000);


    // ===========================================
    // 0:28 — SELECT HTTPS SERVICE
    // ===========================================

    schedule(() => {

        activateService(
            elements.httpsService
        );

    }, 28000);


    // ===========================================
    // 0:30 — PACKET TRAVELS
    // ===========================================

    schedule(() => {

        activateConnectionPath();

        animatePacketAlongPath(
            elements.movingPacket,
            elements.connectionPath,
            3500,

            progress => {

                if (progress < 0.18) {

                    activateNode(
                        elements.clientDevice
                    );

                } else if (
                    progress < 0.42
                ) {

                    activateNode(
                        elements.ipNode
                    );

                } else if (
                    progress < 0.64
                ) {

                    activateNode(
                        elements.transportNode
                    );

                } else if (
                    progress < 0.84
                ) {

                    activateNode(
                        elements.portNode
                    );

                } else {

                    activateNode(
                        elements.serverDevice
                    );

                }

            },

            () => {

                deactivateConnectionPath();

                activateNode(
                    elements.serverDevice
                );

                activateService(
                    elements.httpsService
                );

            }
        );

    }, 30000);


    // ===========================================
    // 0:34 — DELIVERY
    // ===========================================

    schedule(() => {

        show(elements.deliveryResult);

    }, 34000);


    // ===========================================
    // 0:36 — COMMON PORTS
    // ===========================================

    schedule(() => {

        show(elements.portExamples);

    }, 36000);


    // ===========================================
    // 0:38 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        activateNode(null);

        show(elements.finalConcept);

    }, 38000);

}


// ===============================================
// ANIMATE PACKET ALONG PATH
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