// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 13 — TCP VS UDP
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

const SCENE_DURATION = 46000;

let sceneTimers = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {

    return {

        brand:
            document.querySelector(".scene-brand"),

        title:
            document.querySelector(".scene-title"),

        transportLayer:
            document.getElementById("transportLayer"),

        tcpBranch:
            document.getElementById("tcpBranch"),

        udpBranch:
            document.getElementById("udpBranch"),

        tcpPanel:
            document.getElementById("tcpPanel"),

        udpPanel:
            document.getElementById("udpPanel"),

        tcpDemo:
            document.getElementById("tcpDemo"),

        udpDemo:
            document.getElementById("udpDemo"),

        tcpPacket1:
            document.getElementById("tcpPacket1"),

        tcpPacket2:
            document.getElementById("tcpPacket2"),

        tcpPacket3:
            document.getElementById("tcpPacket3"),

        tcpAck:
            document.getElementById("tcpAck"),

        udpPacket1:
            document.getElementById("udpPacket1"),

        udpPacket2:
            document.getElementById("udpPacket2"),

        udpPacket3:
            document.getElementById("udpPacket3"),

        tcpStatus:
            document.getElementById("tcpStatus"),

        udpStatus:
            document.getElementById("udpStatus"),

        tcpLoss:
            document.getElementById("tcpLoss"),

        tcpRetransmission:
            document.getElementById("tcpRetransmission"),

        udpLoss:
            document.getElementById("udpLoss"),

        protocolDecision:
            document.getElementById("protocolDecision"),

        transportSummary:
            document.getElementById("transportSummary"),

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
// CLEAR TIMERS
// ===============================================

function clearSceneTimers() {

    sceneTimers.forEach(timer => {

        clearTimeout(timer);

    });

    sceneTimers = [];

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
// BRANCHES
// ===============================================

function showBranch(branch) {

    if (!branch) return;

    branch.classList.add("is-visible");

}


// ===============================================
// PACKET POSITION
// ===============================================

function resetPacket(packet) {

    if (!packet) return;

    packet.classList.remove(
        "is-visible",
        "is-lost"
    );

    packet.style.transition = "none";
    packet.style.left = "0px";
    packet.style.transform = "scale(1)";

}


function movePacket(
    packet,
    destination,
    duration = 900
) {

    if (!packet) return;

    packet.classList.remove("is-lost");

    packet.style.transition =
        `left ${duration}ms ease-in-out,
         opacity 0.3s ease,
         transform 0.3s ease`;

    packet.classList.add("is-visible");

    requestAnimationFrame(() => {

        packet.style.left =
            destination;

    });

}


// ===============================================
// ACKNOWLEDGMENT
// ===============================================

function resetAck(ack) {

    if (!ack) return;

    ack.classList.remove("is-visible");

    ack.style.transition = "none";

    ack.style.left =
        "calc(100% - 40px)";

}


function sendAck(ack) {

    if (!ack) return;

    ack.style.transition =
        "left 900ms ease-in-out, opacity 0.3s ease";

    ack.classList.add("is-visible");

    requestAnimationFrame(() => {

        ack.style.left = "0px";

    });

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
    // TRANSPORT
    // -------------------------------------------

    hide(elements.transportLayer);

    elements.tcpBranch.classList.remove(
        "is-visible"
    );

    elements.udpBranch.classList.remove(
        "is-visible"
    );


    // -------------------------------------------
    // PROTOCOL PANELS
    // -------------------------------------------

    hide(elements.tcpPanel);
    hide(elements.udpPanel);


    // -------------------------------------------
    // DEMOS
    // -------------------------------------------

    hide(elements.tcpDemo);
    hide(elements.udpDemo);


    // -------------------------------------------
    // TCP PACKETS
    // -------------------------------------------

    resetPacket(elements.tcpPacket1);
    resetPacket(elements.tcpPacket2);
    resetPacket(elements.tcpPacket3);

    resetAck(elements.tcpAck);


    // -------------------------------------------
    // UDP PACKETS
    // -------------------------------------------

    resetPacket(elements.udpPacket1);
    resetPacket(elements.udpPacket2);
    resetPacket(elements.udpPacket3);


    // -------------------------------------------
    // STATUS
    // -------------------------------------------

    hide(elements.tcpStatus);
    hide(elements.udpStatus);


    // -------------------------------------------
    // EVENTS
    // -------------------------------------------

    hide(elements.tcpLoss);
    hide(elements.tcpRetransmission);
    hide(elements.udpLoss);


    // -------------------------------------------
    // FINAL TEACHING ELEMENTS
    // -------------------------------------------

    hide(elements.protocolDecision);
    hide(elements.transportSummary);
    hide(elements.finalConcept);


    // -------------------------------------------
    // BACKGROUND
    // -------------------------------------------

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {

            glow.style.transition = "none";
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
// TCP DEMONSTRATION
// ===============================================

function playTcpDemo(elements) {

    // -------------------------------------------
    // SEGMENT 1
    // -------------------------------------------

    movePacket(
        elements.tcpPacket1,
        "calc(100% - 30px)",
        850
    );


    // -------------------------------------------
    // SEGMENT 2 — LOST
    // -------------------------------------------

    schedule(() => {

        movePacket(
            elements.tcpPacket2,
            "45%",
            650
        );

    }, 900);


    schedule(() => {

        elements.tcpPacket2.classList.add(
            "is-lost"
        );

        show(elements.tcpLoss);

    }, 1650);


    // -------------------------------------------
    // SEGMENT 3
    // -------------------------------------------

    schedule(() => {

        movePacket(
            elements.tcpPacket3,
            "calc(100% - 30px)",
            850
        );

    }, 2100);


    // -------------------------------------------
    // RETRANSMISSION
    // -------------------------------------------

    schedule(() => {

        show(
            elements.tcpRetransmission
        );


        elements.tcpPacket2.classList.remove(
            "is-lost"
        );

        elements.tcpPacket2.style.transition =
            "none";

        elements.tcpPacket2.style.left =
            "0px";

        elements.tcpPacket2.style.transform =
            "scale(1)";


        requestAnimationFrame(() => {

            movePacket(
                elements.tcpPacket2,
                "calc(100% - 30px)",
                900
            );

        });

    }, 3400);


    // -------------------------------------------
    // ACK
    // -------------------------------------------

    schedule(() => {

        sendAck(
            elements.tcpAck
        );

    }, 4700);


    // -------------------------------------------
    // CONFIRMED
    // -------------------------------------------

    schedule(() => {

        show(elements.tcpStatus);

    }, 5800);

}


// ===============================================
// UDP DEMONSTRATION
// ===============================================

function playUdpDemo(elements) {

    // -------------------------------------------
    // DATAGRAM 1
    // -------------------------------------------

    movePacket(
        elements.udpPacket1,
        "calc(100% - 30px)",
        650
    );


    // -------------------------------------------
    // DATAGRAM 2 — LOST
    // -------------------------------------------

    schedule(() => {

        movePacket(
            elements.udpPacket2,
            "45%",
            500
        );

    }, 500);


    schedule(() => {

        elements.udpPacket2.classList.add(
            "is-lost"
        );

        show(elements.udpLoss);

    }, 1050);


    // -------------------------------------------
    // DATAGRAM 3 CONTINUES
    // -------------------------------------------

    schedule(() => {

        movePacket(
            elements.udpPacket3,
            "calc(100% - 30px)",
            650
        );

    }, 1200);


    // -------------------------------------------
    // NO ACK
    // -------------------------------------------

    schedule(() => {

        show(elements.udpStatus);

    }, 2200);

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
    // 0:05 — TRANSPORT LAYER
    // ===========================================

    schedule(() => {

        show(elements.transportLayer);

    }, 5000);


    // ===========================================
    // 0:07 — TCP / UDP BRANCHES
    // ===========================================

    schedule(() => {

        showBranch(elements.tcpBranch);
        showBranch(elements.udpBranch);

    }, 7000);


    // ===========================================
    // 0:09 — TCP
    // ===========================================

    schedule(() => {

        show(elements.tcpPanel);

    }, 9000);


    // ===========================================
    // 0:12 — UDP
    // ===========================================

    schedule(() => {

        show(elements.udpPanel);

    }, 12000);


    // ===========================================
    // 0:17 — REMOVE STATIC PANELS
    // ===========================================

    schedule(() => {

        hide(elements.tcpPanel);
        hide(elements.udpPanel);

    }, 17000);


    // ===========================================
    // 0:18 — TCP DELIVERY DEMO
    // ===========================================

    schedule(() => {

        show(elements.tcpDemo);

        playTcpDemo(elements);

    }, 18000);


    // ===========================================
    // 0:26 — REMOVE TCP DEMO
    // ===========================================

    schedule(() => {

        hide(elements.tcpDemo);

        hide(elements.tcpLoss);

        hide(
            elements.tcpRetransmission
        );

    }, 26000);


    // ===========================================
    // 0:27 — UDP DELIVERY DEMO
    // ===========================================

    schedule(() => {

        show(elements.udpDemo);

        playUdpDemo(elements);

    }, 27000);


    // ===========================================
    // 0:32 — REMOVE UDP DEMO
    // ===========================================

    schedule(() => {

        hide(elements.udpDemo);

        hide(elements.udpLoss);

    }, 32000);


    // ===========================================
    // 0:33 — PROTOCOL DECISION
    // ===========================================

    schedule(() => {

        show(elements.protocolDecision);

    }, 33000);


    // ===========================================
    // 0:38 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.transportSummary);

    }, 38000);


    // ===========================================
    // 0:42 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        show(elements.finalConcept);

    }, 42000);

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