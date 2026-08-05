// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 25 — NTP
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("startSceneBtn")
        ?.addEventListener("click", playScene);

    document
        .getElementById("restartSceneBtn")
        ?.addEventListener("click", restartScene);
});


// ===============================================
// SETTINGS
// ===============================================

const SCENE_DURATION = 122000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {
    return {
        brand: document.querySelector(".scene-brand"),
        title: document.querySelector(".scene-title"),

        client: document.getElementById("clientNode"),
        server: document.getElementById("ntpServerNode"),
        referenceClock: document.getElementById("referenceClockNode"),
        stratum1: document.getElementById("stratum1Node"),
        stratum3: document.getElementById("stratum3Node"),
        internalServer: document.getElementById("internalServerNode"),

        clientClockLabel: document.getElementById("clientClockLabel"),
        clientClockStatus: document.getElementById("clientClockStatus"),

        clockDriftCard: document.getElementById("clockDriftCard"),
        ntpPurposeCard: document.getElementById("ntpPurposeCard"),

        timeRequestCard: document.getElementById("timeRequestCard"),
        timeResponseCard: document.getElementById("timeResponseCard"),
        timeCalculationCard: document.getElementById("timeCalculationCard"),
        synchronizedCard: document.getElementById("synchronizedCard"),

        udp123Card: document.getElementById("udp123Card"),

        stratumIntroCard: document.getElementById("stratumIntroCard"),
        stratumCard: document.getElementById("stratumCard"),
        stratumDistanceCard: document.getElementById("stratumDistanceCard"),

        externalNtpCard: document.getElementById("externalNtpCard"),
        internalNtpCard: document.getElementById("internalNtpCard"),

        logProblemCard: document.getElementById("logProblemCard"),
        logCorrelationCard: document.getElementById("logCorrelationCard"),
        authenticationCard: document.getElementById("authenticationCard"),
        certificateCard: document.getElementById("certificateCard"),
        troubleshootingCard: document.getElementById("troubleshootingCard"),
        securityCard: document.getElementById("securityCard"),

        importanceSummary: document.getElementById("importanceSummary"),
        ntpFlowSummary: document.getElementById("ntpFlowSummary"),

        ntpSummary: document.getElementById("ntpSummary"),
        finalConcept: document.getElementById("finalConcept"),

        clientServerPath: document.getElementById("clientServerPath"),
        serverClientPath: document.getElementById("serverClientPath"),

        referenceStratum1Path:
            document.getElementById("referenceStratum1Path"),

        stratum1Stratum2Path:
            document.getElementById("stratum1Stratum2Path"),

        stratum2Stratum3Path:
            document.getElementById("stratum2Stratum3Path"),

        internalNtpPath:
            document.getElementById("internalNtpPath"),

        movingPacket: document.getElementById("movingPacket"),
        timeline: document.getElementById("timelineProgress")
    };
}


// ===============================================
// TIMER
// ===============================================

function schedule(callback, delay) {
    const timer = setTimeout(callback, delay);
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

    animationFrameIds.forEach(id => {
        cancelAnimationFrame(id);
    });

    animationFrameIds = [];
}


// ===============================================
// SHOW / HIDE
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

function clearActiveNodes() {
    document
        .querySelectorAll(".network-node")
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
// PATHS
// ===============================================

function clearActivePaths() {
    document
        .querySelectorAll(".network-path")
        .forEach(path => {
            path.classList.remove("is-active");
        });
}

function showPath(path) {
    if (!path) return;
    path.classList.add("is-visible");
}

function hidePath(path) {
    if (!path) return;

    path.classList.remove(
        "is-visible",
        "is-active"
    );
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
// PACKET ANIMATION
// ===============================================

function animatePacketAlongPath(
    packet,
    path,
    duration,
    progressCallback = null,
    completeCallback = null
) {
    if (!packet || !path) return;

    const totalLength = path.getTotalLength();
    const startTime = performance.now();

    packet.style.opacity = "1";

    function move(currentTime) {
        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const point =
            path.getPointAtLength(
                totalLength * progress
            );

        packet.setAttribute("cx", point.x);
        packet.setAttribute("cy", point.y);

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

    const frameId = requestAnimationFrame(move);
    animationFrameIds.push(frameId);
}


// ===============================================
// SEND PACKET
// ===============================================

function sendPacket(
    elements,
    path,
    sourceNode,
    destinationNode,
    color,
    duration = 2200,
    completeCallback = null
) {
    if (!path) return;

    setPacketColor(
        elements.movingPacket,
        color
    );

    activatePath(path);

    if (sourceNode) {
        activateNode(sourceNode);
    }

    animatePacketAlongPath(
        elements.movingPacket,
        path,
        duration,

        progress => {
            if (
                destinationNode &&
                progress > 0.72
            ) {
                activateNode(destinationNode);
            }
        },

        () => {
            clearActivePaths();

            if (destinationNode) {
                activateNode(destinationNode);
            }

            if (completeCallback) {
                completeCallback();
            }
        }
    );
}


// ===============================================
// CLEAR CARDS
// ===============================================

function clearTeachingCards(elements) {
    hide(elements.clockDriftCard);
    hide(elements.ntpPurposeCard);

    hide(elements.timeRequestCard);
    hide(elements.timeResponseCard);
    hide(elements.timeCalculationCard);
    hide(elements.synchronizedCard);

    hide(elements.udp123Card);

    hide(elements.stratumIntroCard);
    hide(elements.stratumCard);
    hide(elements.stratumDistanceCard);

    hide(elements.externalNtpCard);
    hide(elements.internalNtpCard);

    hide(elements.logProblemCard);
    hide(elements.logCorrelationCard);
    hide(elements.authenticationCard);
    hide(elements.certificateCard);
    hide(elements.troubleshootingCard);
    hide(elements.securityCard);

    hide(elements.importanceSummary);
    hide(elements.ntpFlowSummary);
}


// ===============================================
// RESET
// ===============================================

function resetScene() {
    clearSceneTimers();

    const elements = getElements();

    hide(elements.brand);
    hide(elements.title);

    hide(elements.client);
    hide(elements.server);
    hide(elements.referenceClock);
    hide(elements.stratum1);
    hide(elements.stratum3);
    hide(elements.internalServer);

    clearTeachingCards(elements);

    hide(elements.ntpSummary);
    hide(elements.finalConcept);

    clearActiveNodes();

    document
        .querySelectorAll(".network-path")
        .forEach(path => {
            path.classList.remove(
                "is-visible",
                "is-active"
            );
        });

    resetMovingPacket(elements.movingPacket);

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );

    if (elements.clientClockLabel) {
        elements.clientClockLabel.textContent =
            "10:42:17";
    }

    if (elements.clientClockStatus) {
        elements.clientClockStatus.textContent =
            "Clock Drifting";
    }

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {
            glow.style.transition = "none";
            glow.style.opacity = "0";
        });

    if (elements.timeline) {
        elements.timeline.style.transition = "none";
        elements.timeline.style.width = "0%";
    }
}


// ===============================================
// PLAY SCENE
// ===============================================

function playScene() {
    resetScene();

    const elements = getElements();


    // ===========================================
    // TIMELINE
    // ===========================================

    requestAnimationFrame(() => {
        if (!elements.timeline) return;

        elements.timeline.style.transition =
            `width ${SCENE_DURATION}ms linear`;

        elements.timeline.style.width = "100%";
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
    // 0:05 — CLIENT CLOCK
    // ===========================================

    schedule(() => {
        show(elements.client);
        activateNode(elements.client);
    }, 5000);


    // ===========================================
    // 0:08 — CLOCK DRIFT
    // ===========================================

    schedule(() => {
        show(elements.clockDriftCard);
    }, 8000);


    // ===========================================
    // 0:13 — NTP PURPOSE
    // ===========================================

    schedule(() => {
        hide(elements.clockDriftCard);
        show(elements.ntpPurposeCard);
    }, 13000);


    // ===========================================
    // 0:17 — NTP SERVER
    // ===========================================

    schedule(() => {
        hide(elements.ntpPurposeCard);

        show(elements.server);
        showPath(elements.clientServerPath);
        showPath(elements.serverClientPath);
    }, 17000);


    // ===========================================
    // 0:20 — REQUEST
    // ===========================================

    schedule(() => {
        show(elements.timeRequestCard);
        activateNode(elements.client);
    }, 20000);


    // ===========================================
    // 0:24 — REQUEST PACKET
    // ===========================================

    schedule(() => {
        hide(elements.timeRequestCard);

        sendPacket(
            elements,
            elements.clientServerPath,
            elements.client,
            elements.server,
            "#38bdf8",
            2400
        );
    }, 24000);


    // ===========================================
    // 0:28 — SERVER RESPONSE
    // ===========================================

    schedule(() => {
        show(elements.timeResponseCard);
        activateNode(elements.server);
    }, 28000);


    // ===========================================
    // 0:32 — RESPONSE PACKET
    // ===========================================

    schedule(() => {
        hide(elements.timeResponseCard);

        sendPacket(
            elements,
            elements.serverClientPath,
            elements.server,
            elements.client,
            "#34d399",
            2400
        );
    }, 32000);


    // ===========================================
    // 0:36 — TIME CALCULATION
    // ===========================================

    schedule(() => {
        show(elements.timeCalculationCard);
        activateNode(elements.client);
    }, 36000);


    // ===========================================
    // 0:41 — CLOCK CORRECTED
    // ===========================================

    schedule(() => {
        hide(elements.timeCalculationCard);

        if (elements.clientClockLabel) {
            elements.clientClockLabel.textContent =
                "10:42:30";
        }

        if (elements.clientClockStatus) {
            elements.clientClockStatus.textContent =
                "Synchronized";
        }

        show(elements.synchronizedCard);
    }, 41000);


    // ===========================================
    // 0:45 — UDP 123
    // ===========================================

    schedule(() => {
        hide(elements.synchronizedCard);

        hide(elements.client);
        hide(elements.server);

        hidePath(elements.clientServerPath);
        hidePath(elements.serverClientPath);

        show(elements.udp123Card);
    }, 45000);


    // ===========================================
    // 0:50 — STRATUM INTRO
    // ===========================================

    schedule(() => {
        hide(elements.udp123Card);

        show(elements.stratumIntroCard);
    }, 50000);


    // ===========================================
    // 0:54 — STRATUM FLOW
    // ===========================================

    schedule(() => {
        hide(elements.stratumIntroCard);

        show(elements.stratumCard);
    }, 54000);


    // ===========================================
    // 0:58 — BUILD HIERARCHY
    // ===========================================

    schedule(() => {
        hide(elements.stratumCard);

        show(elements.referenceClock);
        show(elements.stratum1);
        show(elements.server);
        show(elements.stratum3);

        showPath(elements.referenceStratum1Path);
        showPath(elements.stratum1Stratum2Path);
        showPath(elements.stratum2Stratum3Path);

        activateNode(elements.referenceClock);
    }, 58000);


    // ===========================================
    // 1:02 — REFERENCE → STRATUM 1
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.referenceStratum1Path,
            elements.referenceClock,
            elements.stratum1,
            "#fbbf24",
            1800
        );
    }, 62000);


    // ===========================================
    // 1:05 — STRATUM 1 → STRATUM 2
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.stratum1Stratum2Path,
            elements.stratum1,
            elements.server,
            "#a78bfa",
            1800
        );
    }, 65000);


    // ===========================================
    // 1:08 — STRATUM 2 → STRATUM 3
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.stratum2Stratum3Path,
            elements.server,
            elements.stratum3,
            "#22d3ee",
            1800
        );
    }, 68000);


    // ===========================================
    // 1:71 — STRATUM MEANING
    // ===========================================

    schedule(() => {
        hide(elements.referenceClock);
        hide(elements.stratum1);
        hide(elements.server);
        hide(elements.stratum3);

        hidePath(elements.referenceStratum1Path);
        hidePath(elements.stratum1Stratum2Path);
        hidePath(elements.stratum2Stratum3Path);

        show(elements.stratumDistanceCard);
    }, 71000);


    // ===========================================
    // 1:76 — EXTERNAL NTP
    // ===========================================

    schedule(() => {
        hide(elements.stratumDistanceCard);

        show(elements.externalNtpCard);
    }, 76000);


    // ===========================================
    // 1:80 — INTERNAL NTP
    // ===========================================

    schedule(() => {
        hide(elements.externalNtpCard);

        show(elements.server);
        show(elements.internalServer);

        showPath(elements.internalNtpPath);

        show(elements.internalNtpCard);
    }, 80000);


    // ===========================================
    // 1:84 — INTERNAL TIME DISTRIBUTION
    // ===========================================

    schedule(() => {
        hide(elements.internalNtpCard);

        sendPacket(
            elements,
            elements.internalNtpPath,
            elements.server,
            elements.internalServer,
            "#34d399",
            2200
        );
    }, 84000);


    // ===========================================
    // 1:88 — LOG PROBLEM
    // ===========================================

    schedule(() => {
        hide(elements.server);
        hide(elements.internalServer);

        hidePath(elements.internalNtpPath);

        show(elements.logProblemCard);
    }, 88000);


    // ===========================================
    // 1:93 — LOG CORRELATION
    // ===========================================

    schedule(() => {
        hide(elements.logProblemCard);

        show(elements.logCorrelationCard);
    }, 93000);


    // ===========================================
    // 1:97 — AUTHENTICATION
    // ===========================================

    schedule(() => {
        hide(elements.logCorrelationCard);

        show(elements.authenticationCard);
    }, 97000);


    // ===========================================
    // 1:101 — CERTIFICATES
    // ===========================================

    schedule(() => {
        hide(elements.authenticationCard);

        show(elements.certificateCard);
    }, 101000);


    // ===========================================
    // 1:105 — TROUBLESHOOTING
    // ===========================================

    schedule(() => {
        hide(elements.certificateCard);

        show(elements.troubleshootingCard);
    }, 105000);


    // ===========================================
    // 1:109 — SECURITY
    // ===========================================

    schedule(() => {
        hide(elements.troubleshootingCard);

        show(elements.securityCard);
    }, 109000);


    // ===========================================
    // 1:113 — IMPORTANCE SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.securityCard);

        show(elements.importanceSummary);
    }, 113000);


    // ===========================================
    // 1:116 — NTP FLOW SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.importanceSummary);

        show(elements.ntpFlowSummary);
    }, 116000);


    // ===========================================
    // 1:119 — FINAL SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.ntpFlowSummary);

        show(elements.ntpSummary);
    }, 119000);


    // ===========================================
    // 2:02 — FINAL CONCEPT
    // ===========================================

    schedule(() => {
        show(elements.finalConcept);
    }, 122000);
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

        if (event.key.toLowerCase() === "r") {
            restartScene();
        }
    }
);