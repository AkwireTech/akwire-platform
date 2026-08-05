// ===============================================
// AKWIRE NETWORK+ VIDEO PRODUCTION
// SCENE 23 — DNS
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

const SCENE_DURATION = 96000;

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
        resolver: document.getElementById("resolverNode"),
        root: document.getElementById("rootNode"),
        tld: document.getElementById("tldNode"),
        authoritative: document.getElementById("authoritativeNode"),
        webServer: document.getElementById("webServerNode"),

        browserRequestCard:
            document.getElementById("browserRequestCard"),

        dnsPurposeCard:
            document.getElementById("dnsPurposeCard"),

        localCacheCard:
            document.getElementById("localCacheCard"),

        cacheMissCard:
            document.getElementById("cacheMissCard"),

        clientQueryCard:
            document.getElementById("clientQueryCard"),

        recursiveLabel:
            document.getElementById("recursiveLabel"),

        resolverRoleCard:
            document.getElementById("resolverRoleCard"),

        rootQueryCard:
            document.getElementById("rootQueryCard"),

        rootReferralCard:
            document.getElementById("rootReferralCard"),

        tldQueryCard:
            document.getElementById("tldQueryCard"),

        tldReferralCard:
            document.getElementById("tldReferralCard"),

        authoritativeQueryCard:
            document.getElementById("authoritativeQueryCard"),

        dnsAnswerCard:
            document.getElementById("dnsAnswerCard"),

        recordTypesCard:
            document.getElementById("recordTypesCard"),

        resolverResponseCard:
            document.getElementById("resolverResponseCard"),

        cacheUpdatedCard:
            document.getElementById("cacheUpdatedCard"),

        ttlCard:
            document.getElementById("ttlCard"),

        cacheHitCard:
            document.getElementById("cacheHitCard"),

        connectCard:
            document.getElementById("connectCard"),

        port53Card:
            document.getElementById("port53Card"),

        queryTypesCard:
            document.getElementById("queryTypesCard"),

        dnsHierarchy:
            document.getElementById("dnsHierarchy"),

        dnsSummary:
            document.getElementById("dnsSummary"),

        finalConcept:
            document.getElementById("finalConcept"),

        clientResolverPath:
            document.getElementById("clientResolverPath"),

        resolverRootPath:
            document.getElementById("resolverRootPath"),

        resolverTldPath:
            document.getElementById("resolverTldPath"),

        resolverAuthoritativePath:
            document.getElementById("resolverAuthoritativePath"),

        clientWebPath:
            document.getElementById("clientWebPath"),

        resolverClientReplyPath:
            document.getElementById("resolverClientReplyPath"),

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

        const point =
            path.getPointAtLength(
                totalLength * progress
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
// SEND QUERY / RESPONSE
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
// REVERSE PATH PACKET
// ===============================================

function animatePacketReverse(
    elements,
    path,
    sourceNode,
    destinationNode,
    color,
    duration = 2200,
    completeCallback = null
) {
    if (!path) return;

    const packet =
        elements.movingPacket;

    const totalLength =
        path.getTotalLength();

    const startTime =
        performance.now();

    setPacketColor(packet, color);

    activatePath(path);

    if (sourceNode) {
        activateNode(sourceNode);
    }

    packet.style.opacity = "1";

    function move(currentTime) {
        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const reverseProgress =
            1 - progress;

        const point =
            path.getPointAtLength(
                totalLength *
                reverseProgress
            );

        packet.setAttribute(
            "cx",
            point.x
        );

        packet.setAttribute(
            "cy",
            point.y
        );

        if (
            destinationNode &&
            progress > 0.72
        ) {
            activateNode(destinationNode);
        }

        if (progress < 1) {
            const frameId =
                requestAnimationFrame(move);

            animationFrameIds.push(frameId);
        } else {
            packet.style.opacity = "0";

            clearActivePaths();

            if (destinationNode) {
                activateNode(destinationNode);
            }

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
// CLEAR TEACHING CARDS
// ===============================================

function clearTeachingCards(elements) {
    hide(elements.browserRequestCard);
    hide(elements.dnsPurposeCard);
    hide(elements.localCacheCard);
    hide(elements.cacheMissCard);
    hide(elements.clientQueryCard);
    hide(elements.recursiveLabel);
    hide(elements.resolverRoleCard);
    hide(elements.rootQueryCard);
    hide(elements.rootReferralCard);
    hide(elements.tldQueryCard);
    hide(elements.tldReferralCard);
    hide(elements.authoritativeQueryCard);
    hide(elements.dnsAnswerCard);
    hide(elements.recordTypesCard);
    hide(elements.resolverResponseCard);
    hide(elements.cacheUpdatedCard);
    hide(elements.ttlCard);
    hide(elements.cacheHitCard);
    hide(elements.connectCard);
    hide(elements.port53Card);
    hide(elements.queryTypesCard);
    hide(elements.dnsHierarchy);
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
    hide(elements.resolver);
    hide(elements.root);
    hide(elements.tld);
    hide(elements.authoritative);
    hide(elements.webServer);

    clearTeachingCards(elements);

    hide(elements.dnsSummary);
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

    if (elements.timeline) {
        elements.timeline.style.transition =
            "none";

        elements.timeline.style.width =
            "0%";
    }
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
        if (!elements.timeline) return;

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
    // 0:05 — CLIENT
    // ===========================================

    schedule(() => {
        show(elements.client);

        activateNode(elements.client);
    }, 5000);


    // ===========================================
    // 0:08 — USER ENTERS DOMAIN
    // ===========================================

    schedule(() => {
        show(elements.browserRequestCard);
    }, 8000);


    // ===========================================
    // 0:11 — DNS PURPOSE
    // ===========================================

    schedule(() => {
        hide(elements.browserRequestCard);

        show(elements.dnsPurposeCard);
    }, 11000);


    // ===========================================
    // 0:14 — LOCAL CACHE CHECK
    // ===========================================

    schedule(() => {
        hide(elements.dnsPurposeCard);

        show(elements.localCacheCard);
    }, 14000);


    // ===========================================
    // 0:17 — CACHE MISS
    // ===========================================

    schedule(() => {
        hide(elements.localCacheCard);

        show(elements.cacheMissCard);
    }, 17000);


    // ===========================================
    // 0:20 — SHOW RESOLVER
    // ===========================================

    schedule(() => {
        hide(elements.cacheMissCard);

        show(elements.resolver);

        showPath(
            elements.clientResolverPath
        );

        show(elements.clientQueryCard);
        show(elements.recursiveLabel);
    }, 20000);


    // ===========================================
    // 0:23 — CLIENT SENDS QUERY
    // ===========================================

    schedule(() => {
        hide(elements.clientQueryCard);

        sendPacket(
            elements,
            elements.clientResolverPath,
            elements.client,
            elements.resolver,
            "#38bdf8",
            2200
        );
    }, 23000);


    // ===========================================
    // 0:26 — RESOLVER ROLE
    // ===========================================

    schedule(() => {
        hide(elements.recursiveLabel);

        show(elements.resolverRoleCard);

        activateNode(elements.resolver);
    }, 26000);


    // ===========================================
    // 0:29 — SHOW DNS HIERARCHY
    // ===========================================

    schedule(() => {
        hide(elements.resolverRoleCard);

        show(elements.root);
        show(elements.tld);
        show(elements.authoritative);

        showPath(elements.resolverRootPath);
        showPath(elements.resolverTldPath);
        showPath(elements.resolverAuthoritativePath);
    }, 29000);


    // ===========================================
    // 0:32 — QUERY ROOT
    // ===========================================

    schedule(() => {
        show(elements.rootQueryCard);

        sendPacket(
            elements,
            elements.resolverRootPath,
            elements.resolver,
            elements.root,
            "#a78bfa",
            2200
        );
    }, 32000);


    // ===========================================
    // 0:36 — ROOT REFERRAL
    // ===========================================

    schedule(() => {
        hide(elements.rootQueryCard);

        show(elements.rootReferralCard);

        animatePacketReverse(
            elements,
            elements.resolverRootPath,
            elements.root,
            elements.resolver,
            "#a78bfa",
            2000
        );
    }, 36000);


    // ===========================================
    // 0:40 — QUERY TLD
    // ===========================================

    schedule(() => {
        hide(elements.rootReferralCard);

        show(elements.tldQueryCard);

        sendPacket(
            elements,
            elements.resolverTldPath,
            elements.resolver,
            elements.tld,
            "#fbbf24",
            2200
        );
    }, 40000);


    // ===========================================
    // 0:44 — TLD REFERRAL
    // ===========================================

    schedule(() => {
        hide(elements.tldQueryCard);

        show(elements.tldReferralCard);

        animatePacketReverse(
            elements,
            elements.resolverTldPath,
            elements.tld,
            elements.resolver,
            "#fbbf24",
            2000
        );
    }, 44000);


    // ===========================================
    // 0:48 — AUTHORITATIVE QUERY
    // ===========================================

    schedule(() => {
        hide(elements.tldReferralCard);

        show(elements.authoritativeQueryCard);

        sendPacket(
            elements,
            elements.resolverAuthoritativePath,
            elements.resolver,
            elements.authoritative,
            "#34d399",
            2300
        );
    }, 48000);


    // ===========================================
    // 0:52 — AUTHORITATIVE ANSWER
    // ===========================================

    schedule(() => {
        hide(elements.authoritativeQueryCard);

        show(elements.dnsAnswerCard);

        activateNode(
            elements.authoritative
        );
    }, 52000);


    // ===========================================
    // 0:56 — A VS AAAA
    // ===========================================

    schedule(() => {
        hide(elements.dnsAnswerCard);

        show(elements.recordTypesCard);
    }, 56000);


    // ===========================================
    // 1:00 — ANSWER BACK TO RESOLVER
    // ===========================================

    schedule(() => {
        hide(elements.recordTypesCard);

        animatePacketReverse(
            elements,
            elements.resolverAuthoritativePath,
            elements.authoritative,
            elements.resolver,
            "#34d399",
            2300
        );
    }, 60000);


    // ===========================================
    // 1:04 — RESOLVER RETURNS ANSWER
    // ===========================================

    schedule(() => {
        show(elements.resolverResponseCard);

        showPath(
            elements.resolverClientReplyPath
        );

        sendPacket(
            elements,
            elements.resolverClientReplyPath,
            elements.resolver,
            elements.client,
            "#34d399",
            2300
        );
    }, 64000);


    // ===========================================
    // 1:08 — CACHE ANSWER
    // ===========================================

    schedule(() => {
        hide(elements.resolverResponseCard);

        hidePath(
            elements.resolverClientReplyPath
        );

        show(elements.cacheUpdatedCard);

        activateNode(elements.client);
    }, 68000);


    // ===========================================
    // 1:12 — TTL
    // ===========================================

    schedule(() => {
        hide(elements.cacheUpdatedCard);

        show(elements.ttlCard);
    }, 72000);


    // ===========================================
    // 1:16 — CACHE HIT BENEFIT
    // ===========================================

    schedule(() => {
        hide(elements.ttlCard);

        show(elements.cacheHitCard);
    }, 76000);


    // ===========================================
    // 1:20 — CONNECT TO SERVER
    // ===========================================

    schedule(() => {
        hide(elements.cacheHitCard);

        hide(elements.root);
        hide(elements.tld);
        hide(elements.authoritative);

        hidePath(
            elements.resolverRootPath
        );

        hidePath(
            elements.resolverTldPath
        );

        hidePath(
            elements.resolverAuthoritativePath
        );

        show(elements.webServer);

        showPath(
            elements.clientWebPath
        );

        show(elements.connectCard);
    }, 80000);


    // ===========================================
    // 1:23 — CLIENT CONTACTS WEB SERVER
    // ===========================================

    schedule(() => {
        hide(elements.connectCard);

        sendPacket(
            elements,
            elements.clientWebPath,
            elements.client,
            elements.webServer,
            "#22d3ee",
            2800
        );
    }, 83000);


    // ===========================================
    // 1:87 — PORT 53
    // ===========================================

    schedule(() => {
        hide(elements.webServer);

        hide(elements.resolver);
        hide(elements.client);

        hidePath(
            elements.clientResolverPath
        );

        hidePath(
            elements.clientWebPath
        );

        show(elements.port53Card);
    }, 87000);


    // ===========================================
    // 1:90 — RECURSIVE VS ITERATIVE
    // ===========================================

    schedule(() => {
        hide(elements.port53Card);

        show(elements.queryTypesCard);
    }, 90000);


    // ===========================================
    // 1:93 — HIERARCHY
    // ===========================================

    schedule(() => {
        hide(elements.queryTypesCard);

        show(elements.dnsHierarchy);
    }, 93000);


    // ===========================================
    // FINAL SUMMARY
    // ===========================================

    schedule(() => {
        hide(elements.dnsHierarchy);

        show(elements.dnsSummary);
    }, 96000);


    // ===========================================
    // FINAL KEY IDEA
    // ===========================================

    schedule(() => {
        show(elements.finalConcept);
    }, 98500);
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