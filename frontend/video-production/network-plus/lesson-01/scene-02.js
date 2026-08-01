// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 02 — FOLLOW ONE REQUEST
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

const SCENE_DURATION = 30000;

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

        client:
            document.getElementById("clientDevice"),

        switchDevice:
            document.getElementById("switchDevice"),

        router:
            document.getElementById("routerDevice"),

        internet:
            document.getElementById("internetDevice"),

        server:
            document.getElementById("serverDevice"),

        requestLabel:
            document.getElementById("requestLabel"),

        responseLabel:
            document.getElementById("responseLabel"),

        processing:
            document.getElementById("processingLabel"),

        explanation:
            document.getElementById("explanationCard"),

        explanationTitle:
            document.getElementById("explanationTitle"),

        explanationText:
            document.getElementById("explanationText"),

        summary:
            document.getElementById("sceneSummary"),

        timeline:
            document.getElementById("timelineProgress"),

        requestPacket:
            document.getElementById("requestPacket"),

        responsePacket:
            document.getElementById("responsePacket"),

        lines:
            document.querySelectorAll(".network-line")

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
// CLEAR EVERYTHING
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
        .querySelectorAll(".network-node")
        .forEach(item => {

            item.classList.remove("is-active");

        });

    if (node) {

        node.classList.add("is-active");

    }

}


// ===============================================
// EXPLANATION
// ===============================================

function updateExplanation(
    title,
    text
) {

    const elements =
        getElements();

    elements.explanationTitle.textContent =
        title;

    elements.explanationText.textContent =
        text;

    show(elements.explanation);

}


// ===============================================
// RESET PACKET
// ===============================================

function resetPacket(packet) {

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


    // Hide main elements

    hide(elements.brand);
    hide(elements.title);

    hide(elements.client);
    hide(elements.switchDevice);
    hide(elements.router);
    hide(elements.internet);
    hide(elements.server);

    hide(elements.requestLabel);
    hide(elements.responseLabel);

    hide(elements.processing);

    hide(elements.explanation);

    hide(elements.summary);


    // Remove processing state

    elements.processing.classList.remove(
        "is-processing"
    );


    // Reset nodes

    document
        .querySelectorAll(".network-node")
        .forEach(node => {

            node.classList.remove(
                "is-active"
            );

        });


    // Reset lines

    elements.lines.forEach(line => {

        line.classList.remove(
            "is-visible",
            "is-active"
        );

    });


    // Reset packets

    resetPacket(
        elements.requestPacket
    );

    resetPacket(
        elements.responsePacket
    );


    // Reset timeline

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
            .querySelectorAll(
                ".background-glow"
            )
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

        show(elements.client);

        activateNode(
            elements.client
        );

        updateExplanation(
            "CLIENT",
            "The client creates a request for information."
        );

    }, 5000);


    // ===========================================
    // 0:07 — SWITCH
    // ===========================================

    schedule(() => {

        show(elements.switchDevice);

    }, 7000);


    // ===========================================
    // 0:08 — ROUTER
    // ===========================================

    schedule(() => {

        show(elements.router);

    }, 8000);


    // ===========================================
    // 0:09 — INTERNET
    // ===========================================

    schedule(() => {

        show(elements.internet);

    }, 9000);


    // ===========================================
    // 0:10 — SERVER
    // ===========================================

    schedule(() => {

        show(elements.server);

        elements.lines.forEach(line => {

            line.classList.add(
                "is-visible"
            );

        });

    }, 10000);


    // ===========================================
    // 0:11 — REQUEST
    // ===========================================

    schedule(() => {

        show(
            elements.requestLabel
        );

        updateExplanation(
            "REQUEST",
            "The request begins traveling toward the destination server."
        );

        animateRequest();

    }, 11000);


    // ===========================================
    // 0:19 — SERVER PROCESSING
    // ===========================================

    schedule(() => {

        activateNode(
            elements.server
        );

        show(
            elements.processing
        );

        elements.processing
            .classList
            .add("is-processing");

        updateExplanation(
            "SERVER",
            "The destination server receives and processes the client's request."
        );

    }, 19000);


    // ===========================================
    // 0:21 — RESPONSE
    // ===========================================

    schedule(() => {

        hide(
            elements.requestLabel
        );

        hide(
            elements.processing
        );

        elements.processing
            .classList
            .remove("is-processing");

        show(
            elements.responseLabel
        );

        updateExplanation(
            "RESPONSE",
            "The server sends a response back across the network to the client."
        );

        animateResponse();

    }, 21000);


    // ===========================================
    // 0:28 — SUMMARY
    // ===========================================

    schedule(() => {

        activateNode(
            elements.client
        );

        hide(
            elements.responseLabel
        );

        hide(
            elements.explanation
        );

        show(
            elements.summary
        );

    }, 28000);

}


// ===============================================
// REQUEST ANIMATION
// ===============================================

function animateRequest() {

    const elements =
        getElements();

    const route = [

        {
            path: "pathClientSwitch",
            node: elements.switchDevice,
            title: "SWITCH",
            text:
                "The switch forwards the traffic across the local network."
        },

        {
            path: "pathSwitchRouter",
            node: elements.router,
            title: "ROUTER",
            text:
                "The router determines where the traffic should go next."
        },

        {
            path: "pathRouterInternet",
            node: elements.internet,
            title: "INTERNET",
            text:
                "The request travels across other interconnected networks."
        },

        {
            path: "pathInternetServer",
            node: elements.server,
            title: "SERVER",
            text:
                "The request reaches its destination server."
        }

    ];

    animateRoute(
        elements.requestPacket,
        route,
        1800,
        0
    );

}


// ===============================================
// RESPONSE ANIMATION
// ===============================================

function animateResponse() {

    const elements =
        getElements();

    const route = [

        {
            path: "pathInternetServer",
            node: elements.internet,
            title: "INTERNET",
            text:
                "The response begins traveling back toward the client."
        },

        {
            path: "pathRouterInternet",
            node: elements.router,
            title: "ROUTER",
            text:
                "The returning traffic passes through the router."
        },

        {
            path: "pathSwitchRouter",
            node: elements.switchDevice,
            title: "SWITCH",
            text:
                "The switch forwards the response to the correct local device."
        },

        {
            path: "pathClientSwitch",
            node: elements.client,
            title: "CLIENT",
            text:
                "The response reaches the client that originally made the request."
        }

    ];

    animateRoute(
        elements.responsePacket,
        route,
        1500,
        0,
        true
    );

}


// ===============================================
// ROUTE ANIMATION
// ===============================================

function animateRoute(
    packet,
    route,
    duration,
    index,
    reverse = false
) {

    if (
        !packet ||
        index >= route.length
    ) {

        if (packet) {

            packet.style.opacity =
                "0";

        }

        return;
    }


    const segment =
        route[index];

    const path =
        document.getElementById(
            segment.path
        );

    if (!path) return;


    // Activate current line

    document
        .querySelectorAll(".network-line")
        .forEach(line => {

            line.classList.remove(
                "is-active"
            );

        });

    path.classList.add(
        "is-active"
    );


    movePacketOnPath(
        packet,
        path,
        duration,
        reverse,
        () => {

            activateNode(
                segment.node
            );

            updateExplanation(
                segment.title,
                segment.text
            );

            animateRoute(
                packet,
                route,
                duration,
                index + 1,
                reverse
            );

        }
    );

}


// ===============================================
// MOVE PACKET ON SVG PATH
// ===============================================

function movePacketOnPath(
    packet,
    path,
    duration,
    reverse,
    callback
) {

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


        let distance =
            totalLength * progress;


        if (reverse) {

            distance =
                totalLength -
                distance;

        }


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

            const id =
                requestAnimationFrame(
                    move
                );

            animationFrameIds.push(
                id
            );

        } else {

            if (callback) {

                callback();

            }

        }

    }


    const id =
        requestAnimationFrame(
            move
        );

    animationFrameIds.push(
        id
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