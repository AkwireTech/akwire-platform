// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 16 — ARP / IPv4 TO MAC RESOLUTION
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

const SCENE_DURATION = 50000;

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

        sourceClient:
            document.getElementById("sourceClient"),

        addressQuestion:
            document.getElementById("addressQuestion"),

        lanSwitch:
            document.getElementById("lanSwitch"),

        hostA:
            document.getElementById("hostA"),

        targetHost:
            document.getElementById("targetHost"),

        hostC:
            document.getElementById("hostC"),

        arpRequest:
            document.getElementById("arpRequest"),

        broadcastCard:
            document.getElementById("broadcastCard"),

        ignoredHosts:
            document.getElementById("ignoredHosts"),

        targetMatch:
            document.getElementById("targetMatch"),

        arpReply:
            document.getElementById("arpReply"),

        arpTable:
            document.getElementById("arpTable"),

        arpTableEntry:
            document.getElementById("arpTableEntry"),

        resolvedAddress:
            document.getElementById("resolvedAddress"),

        ethernetFrame:
            document.getElementById("ethernetFrame"),

        deliveryResult:
            document.getElementById("deliveryResult"),

        arpProcess:
            document.getElementById("arpProcess"),

        arpSummary:
            document.getElementById("arpSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        clientSwitchPath:
            document.getElementById("clientSwitchPath"),

        hostAPath:
            document.getElementById("hostAPath"),

        targetPath:
            document.getElementById("targetPath"),

        hostCPath:
            document.getElementById("hostCPath"),

        replyPath:
            document.getElementById("replyPath"),

        framePath:
            document.getElementById("framePath"),

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
// NODE STATES
// ===============================================

function clearActiveNodes() {

    document
        .querySelectorAll(".arp-node")
        .forEach(node => {

            node.classList.remove("is-active");

        });

}


function activateNode(node) {

    clearActiveNodes();

    if (node) {

        node.classList.add("is-active");

    }

}


// ===============================================
// PATH CONTROLS
// ===============================================

function clearActivePaths() {

    document
        .querySelectorAll(".arp-path")
        .forEach(path => {

            path.classList.remove("is-active");

        });

}


function showPath(path) {

    if (!path) return;

    path.classList.add("is-visible");

}


function activatePath(path) {

    clearActivePaths();

    if (!path) return;

    path.classList.add(
        "is-visible",
        "is-active"
    );

}


// ===============================================
// PACKET
// ===============================================

function setPacketColor(packet, color) {

    if (!packet) return;

    packet.style.fill = color;

    packet.style.filter =
        `drop-shadow(0 0 11px ${color})`;

}


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

    const elements = getElements();


    // Header

    hide(elements.brand);
    hide(elements.title);


    // Network nodes

    hide(elements.sourceClient);
    hide(elements.lanSwitch);
    hide(elements.hostA);
    hide(elements.targetHost);
    hide(elements.hostC);


    // Information cards

    hide(elements.addressQuestion);
    hide(elements.arpRequest);
    hide(elements.broadcastCard);
    hide(elements.ignoredHosts);
    hide(elements.targetMatch);
    hide(elements.arpReply);
    hide(elements.arpTable);
    hide(elements.arpTableEntry);
    hide(elements.resolvedAddress);
    hide(elements.ethernetFrame);
    hide(elements.deliveryResult);
    hide(elements.arpProcess);
    hide(elements.arpSummary);
    hide(elements.finalConcept);


    // Node states

    document
        .querySelectorAll(".arp-node")
        .forEach(node => {

            node.classList.remove(
                "is-active",
                "is-broadcast",
                "is-ignored"
            );

        });


    // Paths

    document
        .querySelectorAll(".arp-path")
        .forEach(path => {

            path.classList.remove(
                "is-visible",
                "is-active"
            );

        });


    // Packet

    resetMovingPacket(
        elements.movingPacket
    );

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );


    // Background

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {

            glow.style.transition = "none";
            glow.style.opacity = "0";

        });


    // Timeline

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
            path.getPointAtLength(distance);


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

            animationFrameIds.push(frameId);

        } else {

            packet.style.opacity = "0";

            if (completeCallback) {

                completeCallback();

            }

        }

    }


    const frameId =
        requestAnimationFrame(move);

    animationFrameIds.push(frameId);

}


// ===============================================
// ARP REQUEST — CLIENT TO SWITCH
// ===============================================

function sendRequestToSwitch(elements) {

    setPacketColor(
        elements.movingPacket,
        "#f59e0b"
    );

    activatePath(
        elements.clientSwitchPath
    );

    activateNode(
        elements.sourceClient
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.clientSwitchPath,
        1800,

        progress => {

            if (progress > 0.65) {

                activateNode(
                    elements.lanSwitch
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.lanSwitch
            );

        }
    );

}


// ===============================================
// BROADCAST TO HOST A
// ===============================================

function broadcastToHostA(elements) {

    setPacketColor(
        elements.movingPacket,
        "#f59e0b"
    );

    showPath(elements.hostAPath);
    activatePath(elements.hostAPath);

    elements.hostA.classList.add(
        "is-broadcast"
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.hostAPath,
        1600,

        null,

        () => {

            elements.hostA.classList.add(
                "is-ignored"
            );

        }
    );

}


// ===============================================
// BROADCAST TO TARGET
// ===============================================

function broadcastToTarget(elements) {

    setPacketColor(
        elements.movingPacket,
        "#f59e0b"
    );

    showPath(elements.targetPath);
    activatePath(elements.targetPath);


    animatePacketAlongPath(
        elements.movingPacket,
        elements.targetPath,
        1800,

        progress => {

            if (progress > 0.65) {

                activateNode(
                    elements.targetHost
                );

            }

        },

        () => {

            activateNode(
                elements.targetHost
            );

        }
    );

}


// ===============================================
// BROADCAST TO HOST C
// ===============================================

function broadcastToHostC(elements) {

    setPacketColor(
        elements.movingPacket,
        "#f59e0b"
    );

    showPath(elements.hostCPath);
    activatePath(elements.hostCPath);

    elements.hostC.classList.add(
        "is-broadcast"
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.hostCPath,
        1600,

        null,

        () => {

            elements.hostC.classList.add(
                "is-ignored"
            );

        }
    );

}


// ===============================================
// ARP REPLY — TARGET TO CLIENT
// ===============================================

function sendArpReply(elements) {

    setPacketColor(
        elements.movingPacket,
        "#a78bfa"
    );

    activatePath(
        elements.replyPath
    );

    activateNode(
        elements.targetHost
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.replyPath,
        2600,

        progress => {

            if (progress > 0.72) {

                activateNode(
                    elements.sourceClient
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.sourceClient
            );

        }
    );

}


// ===============================================
// FINAL ETHERNET FRAME DELIVERY
// ===============================================

function deliverEthernetFrame(elements) {

    setPacketColor(
        elements.movingPacket,
        "#34d399"
    );

    activatePath(
        elements.framePath
    );

    activateNode(
        elements.sourceClient
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.framePath,
        3000,

        progress => {

            if (progress > 0.72) {

                activateNode(
                    elements.targetHost
                );

            }

        },

        () => {

            clearActivePaths();

            activateNode(
                elements.targetHost
            );

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

                glow.style.opacity = "1";

            });

    }, 300);


    // ===========================================
    // 0:02 — TITLE
    // ===========================================

    schedule(() => {

        show(elements.title);

    }, 2000);


    // ===========================================
    // 0:05 — SOURCE CLIENT
    // ===========================================

    schedule(() => {

        show(elements.sourceClient);

        activateNode(
            elements.sourceClient
        );

    }, 5000);


    // ===========================================
    // 0:07 — KNOWN IP / UNKNOWN MAC
    // ===========================================

    schedule(() => {

        show(elements.addressQuestion);

    }, 7000);


    // ===========================================
    // 0:10 — LOCAL NETWORK
    // ===========================================

    schedule(() => {

        show(elements.lanSwitch);
        show(elements.hostA);
        show(elements.targetHost);
        show(elements.hostC);

    }, 10000);


    // ===========================================
    // 0:13 — ARP REQUEST
    // ===========================================

    schedule(() => {

        show(elements.arpRequest);

        showPath(
            elements.clientSwitchPath
        );

        sendRequestToSwitch(elements);

    }, 13000);


    // ===========================================
    // 0:16 — BROADCAST EXPLANATION
    // ===========================================

    schedule(() => {

        show(elements.broadcastCard);

    }, 16000);


    // ===========================================
    // 0:18 — BROADCAST TO HOST A
    // ===========================================

    schedule(() => {

        broadcastToHostA(elements);

    }, 18000);


    // ===========================================
    // 0:20 — BROADCAST TO TARGET
    // ===========================================

    schedule(() => {

        broadcastToTarget(elements);

    }, 20000);


    // ===========================================
    // 0:22 — BROADCAST TO HOST C
    // ===========================================

    schedule(() => {

        broadcastToHostC(elements);

    }, 22000);


    // ===========================================
    // 0:24 — OTHER HOSTS IGNORE REQUEST
    // ===========================================

    schedule(() => {

        elements.hostA.classList.add(
            "is-ignored"
        );

        elements.hostC.classList.add(
            "is-ignored"
        );

        show(elements.ignoredHosts);

    }, 24000);


    // ===========================================
    // 0:26 — TARGET MATCH
    // ===========================================

    schedule(() => {

        activateNode(
            elements.targetHost
        );

        show(elements.targetMatch);

    }, 26000);


    // ===========================================
    // 0:29 — ARP REPLY
    // ===========================================

    schedule(() => {

        show(elements.arpReply);

        showPath(
            elements.replyPath
        );

        sendArpReply(elements);

    }, 29000);


    // ===========================================
    // 0:33 — CLEAN BROADCAST CARDS
    // ===========================================

    schedule(() => {

        hide(elements.arpRequest);
        hide(elements.broadcastCard);
        hide(elements.ignoredHosts);
        hide(elements.targetMatch);

        elements.hostA.classList.remove(
            "is-broadcast"
        );

        elements.hostC.classList.remove(
            "is-broadcast"
        );

    }, 33000);


    // ===========================================
    // 0:34 — ARP TABLE
    // ===========================================

    schedule(() => {

        show(elements.arpTable);

        activateNode(
            elements.sourceClient
        );

    }, 34000);


    // ===========================================
    // 0:36 — ARP TABLE ENTRY
    // ===========================================

    schedule(() => {

        show(elements.arpTableEntry);

    }, 36000);


    // ===========================================
    // 0:38 — ADDRESS RESOLVED
    // ===========================================

    schedule(() => {

        show(elements.resolvedAddress);

    }, 38000);


    // ===========================================
    // 0:40 — ETHERNET FRAME
    // ===========================================

    schedule(() => {

        hide(elements.arpReply);

        show(elements.ethernetFrame);

        showPath(
            elements.framePath
        );

    }, 40000);


    // ===========================================
    // 0:42 — FRAME DELIVERY
    // ===========================================

    schedule(() => {

        deliverEthernetFrame(elements);

    }, 42000);


    // ===========================================
    // 0:45 — DELIVERY COMPLETE
    // ===========================================

    schedule(() => {

        show(elements.deliveryResult);

        activateNode(
            elements.targetHost
        );

    }, 45000);


    // ===========================================
    // 0:46 — PROCESS
    // ===========================================

    schedule(() => {

        show(elements.arpProcess);

    }, 46000);


    // ===========================================
    // 0:47 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.arpSummary);

    }, 47000);


    // ===========================================
    // 0:48 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        clearActiveNodes();

        show(elements.finalConcept);

    }, 48000);

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