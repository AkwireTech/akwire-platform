// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 20 — MTU AND IPv4 FRAGMENTATION
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

const SCENE_DURATION = 65000;

let sceneTimers = [];
let animationFrameIds = [];


// ===============================================
// ELEMENTS
// ===============================================

function getElements() {
    return {
        brand: document.querySelector(".scene-brand"),
        title: document.querySelector(".scene-title"),

        sourceHost: document.getElementById("sourceHost"),
        router: document.getElementById("router"),
        networkCloud: document.getElementById("networkCloud"),
        destinationHost: document.getElementById("destinationHost"),

        originalPacket: document.getElementById("originalPacket"),
        mtuCard: document.getElementById("mtuCard"),
        sizeComparison: document.getElementById("sizeComparison"),
        tooLarge: document.getElementById("tooLarge"),
        fragmentDecision: document.getElementById("fragmentDecision"),
        fragmentPanel: document.getElementById("fragmentPanel"),
        fragmentNote: document.getElementById("fragmentNote"),
        fragmentTransit: document.getElementById("fragmentTransit"),
        reassemblyCard: document.getElementById("reassemblyCard"),
        deliveryResult: document.getElementById("deliveryResult"),

        dfCard: document.getElementById("dfCard"),
        pmtudCard: document.getElementById("pmtudCard"),
        mtuMssCard: document.getElementById("mtuMssCard"),
        mtuProcess: document.getElementById("mtuProcess"),

        mtuSummary: document.getElementById("mtuSummary"),
        finalConcept: document.getElementById("finalConcept"),

        sourcePath: document.getElementById("sourcePath"),
        networkPath: document.getElementById("networkPath"),
        destinationPath: document.getElementById("destinationPath"),

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
// PATH STATES
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
// PACKET PATH ANIMATION
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

        const progress = Math.min(
            elapsed / duration,
            1
        );

        const point = path.getPointAtLength(
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

    const frameId =
        requestAnimationFrame(move);

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
    setPacketColor(
        elements.movingPacket,
        color
    );

    activatePath(path);
    activateNode(sourceNode);

    animatePacketAlongPath(
        elements.movingPacket,
        path,
        duration,

        progress => {
            if (progress > 0.72) {
                activateNode(destinationNode);
            }
        },

        () => {
            clearActivePaths();
            activateNode(destinationNode);

            if (completeCallback) {
                completeCallback();
            }
        }
    );
}


// ===============================================
// RESET
// ===============================================

function resetScene() {
    clearSceneTimers();

    const elements = getElements();

    hide(elements.brand);
    hide(elements.title);

    hide(elements.sourceHost);
    hide(elements.router);
    hide(elements.networkCloud);
    hide(elements.destinationHost);

    hide(elements.originalPacket);
    hide(elements.mtuCard);
    hide(elements.sizeComparison);
    hide(elements.tooLarge);
    hide(elements.fragmentDecision);
    hide(elements.fragmentPanel);
    hide(elements.fragmentNote);
    hide(elements.fragmentTransit);
    hide(elements.reassemblyCard);
    hide(elements.deliveryResult);

    hide(elements.dfCard);
    hide(elements.pmtudCard);
    hide(elements.mtuMssCard);
    hide(elements.mtuProcess);

    hide(elements.mtuSummary);
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

    resetMovingPacket(
        elements.movingPacket
    );

    setPacketColor(
        elements.movingPacket,
        "#38bdf8"
    );

    document
        .querySelectorAll(".background-glow")
        .forEach(glow => {
            glow.style.transition = "none";
            glow.style.opacity = "0";
        });

    elements.timeline.style.transition = "none";
    elements.timeline.style.width = "0%";
}


// ===============================================
// PLAY
// ===============================================

function playScene() {
    resetScene();

    const elements = getElements();


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
    // 0:05 — NETWORK TOPOLOGY
    // ===========================================

    schedule(() => {
        show(elements.sourceHost);
        show(elements.router);
        show(elements.networkCloud);
        show(elements.destinationHost);

        showPath(elements.sourcePath);
        showPath(elements.networkPath);
        showPath(elements.destinationPath);

        activateNode(elements.sourceHost);
    }, 5000);


    // ===========================================
    // 0:08 — ORIGINAL 2000-BYTE PACKET
    // ===========================================

    schedule(() => {
        show(elements.originalPacket);
    }, 8000);


    // ===========================================
    // 0:11 — SOURCE → ROUTER
    // ===========================================

    schedule(() => {
        hide(elements.originalPacket);

        sendPacket(
            elements,
            elements.sourcePath,
            elements.sourceHost,
            elements.router,
            "#38bdf8",
            2400
        );
    }, 11000);


    // ===========================================
    // 0:14 — ROUTER CHECKS OUTGOING MTU
    // ===========================================

    schedule(() => {
        show(elements.mtuCard);
        activateNode(elements.router);
    }, 14000);


    // ===========================================
    // 0:17 — COMPARE 2000 > 1500
    // ===========================================

    schedule(() => {
        hide(elements.mtuCard);
        show(elements.sizeComparison);
    }, 17000);


    // ===========================================
    // 0:20 — PACKET TOO LARGE
    // ===========================================

    schedule(() => {
        hide(elements.sizeComparison);
        show(elements.tooLarge);
    }, 20000);


    // ===========================================
    // 0:23 — IPv4 FRAGMENTATION DECISION
    // ===========================================

    schedule(() => {
        hide(elements.tooLarge);
        show(elements.fragmentDecision);
    }, 23000);


    // ===========================================
    // 0:26 — SHOW FRAGMENTS
    // ===========================================

    schedule(() => {
        hide(elements.fragmentDecision);
        show(elements.fragmentPanel);
    }, 26000);


    // ===========================================
    // 0:30 — EACH FRAGMENT HAS IPv4 HEADER
    // ===========================================

    schedule(() => {
        show(elements.fragmentNote);
    }, 30000);


    // ===========================================
    // 0:33 — PREPARE FRAGMENTS FOR TRANSIT
    // ===========================================

    schedule(() => {
        hide(elements.fragmentPanel);
        hide(elements.fragmentNote);

        show(elements.fragmentTransit);

        activateNode(elements.router);
    }, 33000);


    // ===========================================
    // 0:35 — FRAGMENT 1 CROSSES NETWORK
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.networkPath,
            elements.router,
            elements.networkCloud,
            "#a78bfa",
            2200
        );
    }, 35000);


    // ===========================================
    // 0:38 — FRAGMENT 2 CROSSES NETWORK
    // ===========================================

    schedule(() => {
        sendPacket(
            elements,
            elements.networkPath,
            elements.router,
            elements.networkCloud,
            "#c4b5fd",
            2200
        );
    }, 38000);


    // ===========================================
    // 0:41 — FRAGMENTS → DESTINATION
    // ===========================================

    schedule(() => {
        hide(elements.fragmentTransit);

        sendPacket(
            elements,
            elements.destinationPath,
            elements.networkCloud,
            elements.destinationHost,
            "#34d399",
            2400
        );
    }, 41000);


    // ===========================================
    // 0:44 — REASSEMBLY
    // ===========================================

    schedule(() => {
        show(elements.reassemblyCard);
        activateNode(elements.destinationHost);
    }, 44000);


    // ===========================================
    // 0:47 — DELIVERY COMPLETE
    // ===========================================

    schedule(() => {
        hide(elements.reassemblyCard);
        show(elements.deliveryResult);
    }, 47000);


    // ===========================================
    // 0:49 — CLEAR MAIN DEMO
    // ===========================================

    schedule(() => {
        hide(elements.deliveryResult);

        hide(elements.sourceHost);
        hide(elements.router);
        hide(elements.networkCloud);
        hide(elements.destinationHost);

        clearActiveNodes();

        document
            .querySelectorAll(".network-path")
            .forEach(path => {
                path.classList.remove(
                    "is-visible",
                    "is-active"
                );
            });
    }, 49000);


    // ===========================================
    // 0:50 — DF FLAG
    // ===========================================

    schedule(() => {
        show(elements.dfCard);
    }, 50000);


    // ===========================================
    // 0:54 — PATH MTU DISCOVERY
    // ===========================================

    schedule(() => {
        hide(elements.dfCard);
        show(elements.pmtudCard);
    }, 54000);


    // ===========================================
    // 0:57 — MTU VS MSS
    // ===========================================

    schedule(() => {
        hide(elements.pmtudCard);
        show(elements.mtuMssCard);
    }, 57000);


    // ===========================================
    // 1:00 — PROCESS
    // ===========================================

    schedule(() => {
        hide(elements.mtuMssCard);
        show(elements.mtuProcess);
    }, 60000);


    // ===========================================
    // 1:02 — SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.mtuProcess);
        show(elements.mtuSummary);
    }, 62000);


    // ===========================================
    // 1:03 — FINAL CONCEPT
    // ===========================================

    schedule(() => {
        show(elements.finalConcept);
    }, 63000);
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