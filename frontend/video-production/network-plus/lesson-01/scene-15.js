// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 15 — DHCP / DORA
// DISCOVER → OFFER → REQUEST → ACKNOWLEDGE
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

const SCENE_DURATION = 48000;

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

        clientIpLabel:
            document.getElementById("clientIpLabel"),

        initialState:
            document.getElementById("initialState"),

        dhcpServer:
            document.getElementById("dhcpServer"),

        addressPool:
            document.getElementById("addressPool"),

        selectedAddress:
            document.getElementById("selectedAddress"),

        discoverCard:
            document.getElementById("discoverCard"),

        offerCard:
            document.getElementById("offerCard"),

        requestCard:
            document.getElementById("requestCard"),

        ackCard:
            document.getElementById("ackCard"),

        doraProcess:
            document.getElementById("doraProcess"),

        configurationPanel:
            document.getElementById("configurationPanel"),

        leaseCard:
            document.getElementById("leaseCard"),

        successCard:
            document.getElementById("successCard"),

        dhcpSummary:
            document.getElementById("dhcpSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        discoverPath:
            document.getElementById("discoverPath"),

        offerPath:
            document.getElementById("offerPath"),

        requestPath:
            document.getElementById("requestPath"),

        ackPath:
            document.getElementById("ackPath"),

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
        .querySelectorAll(".dhcp-node")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (node) {

        node.classList.add("is-active");

    }

}


// ===============================================
// PATH CONTROLS
// ===============================================

function showPath(path) {

    if (!path) return;

    path.classList.add("is-visible");

}


function activatePath(path) {

    document
        .querySelectorAll(".dhcp-path")
        .forEach(item => {

            item.classList.remove("is-active");

        });


    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


function deactivatePaths() {

    document
        .querySelectorAll(".dhcp-path")
        .forEach(path => {

            path.classList.remove(
                "is-active"
            );

        });

}


// ===============================================
// PACKET COLOR
// ===============================================

function setPacketColor(
    packet,
    color
) {

    if (!packet) return;

    packet.style.fill = color;

    packet.style.filter =
        `drop-shadow(0 0 11px ${color})`;

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
    // HEADER
    // -------------------------------------------

    hide(elements.brand);
    hide(elements.title);


    // -------------------------------------------
    // CLIENT / SERVER
    // -------------------------------------------

    hide(elements.clientDevice);
    hide(elements.dhcpServer);

    elements.clientDevice.classList.remove(
        "is-configured"
    );

    elements.clientIpLabel.textContent =
        "IP: Not Assigned";


    // -------------------------------------------
    // INITIAL STATE / POOL
    // -------------------------------------------

    hide(elements.initialState);
    hide(elements.addressPool);

    elements.selectedAddress.classList.remove(
        "is-selected"
    );


    // -------------------------------------------
    // DORA CARDS
    // -------------------------------------------

    hide(elements.discoverCard);
    hide(elements.offerCard);
    hide(elements.requestCard);
    hide(elements.ackCard);


    // -------------------------------------------
    // PROCESS / CONFIGURATION
    // -------------------------------------------

    hide(elements.doraProcess);
    hide(elements.configurationPanel);
    hide(elements.leaseCard);
    hide(elements.successCard);


    // -------------------------------------------
    // SUMMARY
    // -------------------------------------------

    hide(elements.dhcpSummary);
    hide(elements.finalConcept);


    // -------------------------------------------
    // ACTIVE NODES
    // -------------------------------------------

    document
        .querySelectorAll(".dhcp-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // PATHS
    // -------------------------------------------

    document
        .querySelectorAll(".dhcp-path")
        .forEach(path => {

            path.classList.remove(
                "is-visible",
                "is-active"
            );

        });


    // -------------------------------------------
    // MOVING PACKET
    // -------------------------------------------

    resetMovingPacket(
        elements.movingPacket
    );

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );


    // -------------------------------------------
    // BACKGROUND
    // -------------------------------------------

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {

            glow.style.transition =
                "none";

            glow.style.opacity =
                "0";

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
// ANIMATE PACKET ALONG SVG PATH
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

            progressCallback(progress);

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
// DHCP DISCOVER
// CLIENT → SERVER
// ===============================================

function sendDiscover(elements) {

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );

    activatePath(
        elements.discoverPath
    );

    activateNode(
        elements.clientDevice
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.discoverPath,
        2400,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.dhcpServer
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.dhcpServer
            );

        }
    );

}


// ===============================================
// DHCP OFFER
// SERVER → CLIENT
// ===============================================

function sendOffer(elements) {

    setPacketColor(
        elements.movingPacket,
        "#a78bfa"
    );

    activatePath(
        elements.offerPath
    );

    activateNode(
        elements.dhcpServer
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.offerPath,
        2400,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.clientDevice
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.clientDevice
            );

        }
    );

}


// ===============================================
// DHCP REQUEST
// CLIENT → SERVER
// ===============================================

function sendRequest(elements) {

    setPacketColor(
        elements.movingPacket,
        "#f59e0b"
    );

    activatePath(
        elements.requestPath
    );

    activateNode(
        elements.clientDevice
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.requestPath,
        2400,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.dhcpServer
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.dhcpServer
            );

        }
    );

}


// ===============================================
// DHCP ACKNOWLEDGE
// SERVER → CLIENT
// ===============================================

function sendAcknowledge(elements) {

    setPacketColor(
        elements.movingPacket,
        "#34d399"
    );

    activatePath(
        elements.ackPath
    );

    activateNode(
        elements.dhcpServer
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.ackPath,
        2400,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.clientDevice
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.clientDevice
            );

            elements.clientDevice.classList.add(
                "is-configured"
            );

            elements.clientIpLabel.textContent =
                "IP: 192.168.1.102";

        }
    );

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
    // 0:05 — NEW CLIENT
    // ===========================================

    schedule(() => {

        show(elements.clientDevice);

        activateNode(
            elements.clientDevice
        );

    }, 5000);


    // ===========================================
    // 0:07 — NO IP CONFIGURATION
    // ===========================================

    schedule(() => {

        show(elements.initialState);

    }, 7000);


    // ===========================================
    // 0:09 — DHCP SERVER
    // ===========================================

    schedule(() => {

        show(elements.dhcpServer);

    }, 9000);


    // ===========================================
    // 0:11 — DORA OVERVIEW
    // ===========================================

    schedule(() => {

        show(elements.doraProcess);

    }, 11000);


    // ===========================================
    // 0:13 — DISCOVER
    // ===========================================

    schedule(() => {

        show(elements.discoverCard);

        showPath(
            elements.discoverPath
        );

        sendDiscover(elements);

    }, 13000);


    // ===========================================
    // 0:17 — ADDRESS POOL
    // ===========================================

    schedule(() => {

        show(elements.addressPool);

        elements.selectedAddress.classList.add(
            "is-selected"
        );

        activateNode(
            elements.dhcpServer
        );

    }, 17000);


    // ===========================================
    // 0:19 — OFFER
    // ===========================================

    schedule(() => {

        show(elements.offerCard);

        showPath(
            elements.offerPath
        );

        sendOffer(elements);

    }, 19000);


    // ===========================================
    // 0:24 — REQUEST
    // ===========================================

    schedule(() => {

        show(elements.requestCard);

        showPath(
            elements.requestPath
        );

        sendRequest(elements);

    }, 24000);


    // ===========================================
    // 0:29 — ACKNOWLEDGE
    // ===========================================

    schedule(() => {

        show(elements.ackCard);

        showPath(
            elements.ackPath
        );

        sendAcknowledge(elements);

    }, 29000);


    // ===========================================
    // 0:33 — REMOVE DORA MESSAGE CARDS
    // ===========================================

    schedule(() => {

        hide(elements.discoverCard);
        hide(elements.offerCard);
        hide(elements.requestCard);
        hide(elements.ackCard);

        hide(elements.initialState);

    }, 33000);


    // ===========================================
    // 0:34 — CLIENT CONFIGURATION
    // ===========================================

    schedule(() => {

        elements.clientDevice.classList.add(
            "is-configured"
        );

        elements.clientIpLabel.textContent =
            "IP: 192.168.1.102";

        activateNode(
            elements.clientDevice
        );

        show(elements.configurationPanel);

    }, 34000);


    // ===========================================
    // 0:38 — DHCP LEASE
    // ===========================================

    schedule(() => {

        show(elements.leaseCard);

    }, 38000);


    // ===========================================
    // 0:40 — CLIENT READY
    // ===========================================

    schedule(() => {

        show(elements.successCard);

    }, 40000);


    // ===========================================
    // 0:42 — DORA SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.dhcpSummary);

    }, 42000);


    // ===========================================
    // 0:45 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        activateNode(null);

        show(elements.finalConcept);

    }, 45000);

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
