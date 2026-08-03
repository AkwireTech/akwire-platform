// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 14 — DNS: FROM NAMES TO IP ADDRESSES
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

const SCENE_DURATION = 44000;

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

        browserWindow:
            document.getElementById("browserWindow"),

        nameConcept:
            document.getElementById("nameConcept"),

        dnsQuery:
            document.getElementById("dnsQuery"),

        dnsServer:
            document.getElementById("dnsServer"),

        lookupPanel:
            document.getElementById("lookupPanel"),

        dnsRecord:
            document.getElementById("dnsRecord"),

        dnsResponse:
            document.getElementById("dnsResponse"),

        ipConcept:
            document.getElementById("ipConcept"),

        webServer:
            document.getElementById("webServer"),

        connectionCard:
            document.getElementById("connectionCard"),

        dnsProcess:
            document.getElementById("dnsProcess"),

        dnsSummary:
            document.getElementById("dnsSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        queryPath:
            document.getElementById("queryPath"),

        responsePath:
            document.getElementById("responsePath"),

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
        .querySelectorAll(".dns-node")
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
        .querySelectorAll(".dns-path")
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
        .querySelectorAll(".dns-path")
        .forEach(path => {

            path.classList.remove(
                "is-active"
            );

        });

}


// ===============================================
// MOVING PACKET
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
    // CLIENT / BROWSER
    // -------------------------------------------

    hide(elements.clientDevice);
    hide(elements.browserWindow);
    hide(elements.nameConcept);


    // -------------------------------------------
    // DNS
    // -------------------------------------------

    hide(elements.dnsQuery);
    hide(elements.dnsServer);
    hide(elements.lookupPanel);
    hide(elements.dnsRecord);
    hide(elements.dnsResponse);


    // -------------------------------------------
    // DESTINATION
    // -------------------------------------------

    hide(elements.ipConcept);
    hide(elements.webServer);
    hide(elements.connectionCard);


    // -------------------------------------------
    // PROCESS / SUMMARY
    // -------------------------------------------

    hide(elements.dnsProcess);
    hide(elements.dnsSummary);
    hide(elements.finalConcept);


    // -------------------------------------------
    // ACTIVE NODES
    // -------------------------------------------

    document
        .querySelectorAll(".dns-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // -------------------------------------------
    // PATHS
    // -------------------------------------------

    document
        .querySelectorAll(".dns-path")
        .forEach(path => {

            path.classList.remove(
                "is-visible",
                "is-active"
            );

        });


    // -------------------------------------------
    // PACKET
    // -------------------------------------------

    resetMovingPacket(
        elements.movingPacket
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
// DNS QUERY ANIMATION
// ===============================================

function sendDnsQuery(elements) {

    activatePath(
        elements.queryPath
    );


    activateNode(
        elements.clientDevice
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.queryPath,
        2200,

        progress => {

            if (progress > 0.65) {

                activateNode(
                    elements.dnsServer
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.dnsServer
            );

        }
    );

}


// ===============================================
// DNS RESPONSE ANIMATION
// ===============================================

function sendDnsResponse(elements) {

    activatePath(
        elements.responsePath
    );


    activateNode(
        elements.dnsServer
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.responsePath,
        2200,

        progress => {

            if (progress > 0.65) {

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
// DESTINATION CONNECTION
// ===============================================

function connectToWebServer(elements) {

    activatePath(
        elements.connectionPath
    );


    activateNode(
        elements.clientDevice
    );


    animatePacketAlongPath(
        elements.movingPacket,
        elements.connectionPath,
        3000,

        progress => {

            if (progress > 0.7) {

                activateNode(
                    elements.webServer
                );

            }

        },

        () => {

            deactivatePaths();

            activateNode(
                elements.webServer
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
    // 0:05 — CLIENT
    // ===========================================

    schedule(() => {

        show(elements.clientDevice);

        activateNode(
            elements.clientDevice
        );

    }, 5000);


    // ===========================================
    // 0:07 — BROWSER
    // ===========================================

    schedule(() => {

        show(elements.browserWindow);

    }, 7000);


    // ===========================================
    // 0:09 — DOMAIN NAME
    // ===========================================

    schedule(() => {

        show(elements.nameConcept);

    }, 9000);


    // ===========================================
    // 0:12 — DNS SERVER
    // ===========================================

    schedule(() => {

        show(elements.dnsServer);

        showPath(
            elements.queryPath
        );

    }, 12000);


    // ===========================================
    // 0:14 — DNS QUERY
    // ===========================================

    schedule(() => {

        show(elements.dnsQuery);

        sendDnsQuery(elements);

    }, 14000);


    // ===========================================
    // 0:17 — DNS LOOKUP
    // ===========================================

    schedule(() => {

        show(elements.lookupPanel);

        activateNode(
            elements.dnsServer
        );

    }, 17000);


    // ===========================================
    // 0:20 — A RECORD
    // ===========================================

    schedule(() => {

        show(elements.dnsRecord);

    }, 20000);


    // ===========================================
    // 0:23 — DNS RESPONSE
    // ===========================================

    schedule(() => {

        show(elements.dnsResponse);

        showPath(
            elements.responsePath
        );

        sendDnsResponse(elements);

    }, 23000);


    // ===========================================
    // 0:27 — IP ADDRESS LEARNED
    // ===========================================

    schedule(() => {

        show(elements.ipConcept);

        activateNode(
            elements.clientDevice
        );

    }, 27000);


    // ===========================================
    // 0:29 — DESTINATION SERVER
    // ===========================================

    schedule(() => {

        show(elements.webServer);

        showPath(
            elements.connectionPath
        );

    }, 29000);


    // ===========================================
    // 0:31 — CONNECT TO DESTINATION
    // ===========================================

    schedule(() => {

        connectToWebServer(elements);

    }, 31000);


    // ===========================================
    // 0:34 — DESTINATION FOUND
    // ===========================================

    schedule(() => {

        show(elements.connectionCard);

        activateNode(
            elements.webServer
        );

    }, 34000);


    // ===========================================
    // 0:36 — FULL DNS PROCESS
    // ===========================================

    schedule(() => {

        show(elements.dnsProcess);

    }, 36000);


    // ===========================================
    // 0:39 — SUMMARY
    // ===========================================

    schedule(() => {

        show(elements.dnsSummary);

    }, 39000);


    // ===========================================
    // 0:41 — FINAL CONCEPT
    // ===========================================

    schedule(() => {

        activateNode(null);

        show(elements.finalConcept);

    }, 41000);

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