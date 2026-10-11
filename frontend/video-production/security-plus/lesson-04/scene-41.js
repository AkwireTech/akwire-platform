document.addEventListener("DOMContentLoaded", () => {
    const SCENE_DURATION = 126000;

    const timeline = document.querySelector("#timelineProgress");
    const startButton = document.querySelector("#startSceneBtn");
    const restartButton = document.querySelector("#restartSceneBtn");

    let timers = [];
    let sceneStarted = false;

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    function schedule(callback, delay) {
        const timer = setTimeout(callback, delay);
        timers.push(timer);
    }

    function clearTimers() {
        timers.forEach(timer => clearTimeout(timer));
        timers = [];
    }

    function show(selector) {
        const element = $(selector);

        if (!element) return;

        element.classList.add("is-visible");
    }

    function hide(selector) {
        const element = $(selector);

        if (!element) return;

        element.classList.remove("is-visible", "is-active");
    }

    function activate(selector) {
        const element = $(selector);

        if (!element) return;

        element.classList.add("is-active");
    }

    const contentElements = [
        "#maintenanceIntro",
        "#maintenanceTriggers",
        "#maintenanceInventory",
        "#updateWorkflow",
        "#maintenanceResponsibilities",
        "#maintenanceTesting",
        "#examMemory",
        "#sceneSummary",
        "#finalConcept"
    ];

    function hideContent() {
        contentElements.forEach(hide);
    }

    function showOnly(selector) {
        hideContent();
        show(selector);
    }

    function clearActiveStates() {
        $$(".is-active").forEach(element => {
            element.classList.remove("is-active");
        });
    }

    function startTimeline() {
        if (!timeline) return;

        timeline.style.transition = "none";
        timeline.style.width = "0%";

        void timeline.offsetWidth;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                timeline.style.transition =
                    `width ${SCENE_DURATION}ms linear`;

                timeline.style.width = "100%";
            });
        });
    }

    function resetScene() {
        clearTimers();

        sceneStarted = false;

        hideContent();
        clearActiveStates();

        const brand = $(".scene-brand");
        const title = $(".scene-title");

        if (brand) {
            brand.classList.remove("is-visible");
        }

        if (title) {
            title.classList.remove("is-visible");
        }

        $$(".background-glow").forEach(element => {
            element.classList.remove("is-visible");
        });

        if (timeline) {
            timeline.style.transition = "none";
            timeline.style.width = "0%";
        }
    }

    function beginScene() {
        resetScene();

        sceneStarted = true;

        startTimeline();

        // Background and opening
        schedule(() => {
            $$(".background-glow").forEach(element => {
                element.classList.add("is-visible");
            });
        }, 100);

        schedule(() => {
            show(".scene-brand");
        }, 300);

        schedule(() => {
            show(".scene-title");
        }, 700);

        // ACT 01: Introduction
        schedule(() => {
            showOnly("#maintenanceIntro");
        }, 1500);

        // ACT 02: Maintenance triggers
        schedule(() => {
            showOnly("#maintenanceTriggers");
        }, 10500);

        schedule(() => activate("#triggerSchedule"), 10800);
        schedule(() => activate("#triggerTechnology"), 11300);
        schedule(() => activate("#triggerPeople"), 11800);
        schedule(() => activate("#triggerBusiness"), 12300);
        schedule(() => activate("#triggerReminder"), 13200);

        // ACT 03: Information to review
        schedule(() => {
            showOnly("#maintenanceInventory");
        }, 22000);

        schedule(() => activate("#inventoryContacts"), 22300);
        schedule(() => activate(".inventory-arrow:nth-of-type(2)"), 22800);
        schedule(() => activate("#inventorySystems"), 23200);
        schedule(() => activate(".inventory-arrow:nth-of-type(4)"), 23800);
        schedule(() => activate("#inventoryProcedures"), 24200);
        schedule(() => activate(".inventory-arrow:nth-of-type(6)"), 24800);
        schedule(() => activate("#inventoryPriorities"), 25300);

        // ACT 04: Controlled update workflow
        schedule(() => {
            showOnly("#updateWorkflow");
        }, 36500);

        schedule(() => activate("#updateIdentify"), 36800);
        schedule(() => activate(".update-arrow:nth-of-type(2)"), 37300);
        schedule(() => activate("#updateRevise"), 37700);
        schedule(() => activate(".update-arrow:nth-of-type(4)"), 38300);
        schedule(() => activate("#updateApprove"), 38700);
        schedule(() => activate(".update-arrow:nth-of-type(6)"), 39300);
        schedule(() => activate("#updatePublish"), 39700);
        schedule(() => activate("#updateControlNote"), 40800);

        // ACT 05: Responsibilities
        schedule(() => {
            showOnly("#maintenanceResponsibilities");
        }, 51500);

        schedule(() => activate("#roleOwner"), 51800);
        schedule(() => activate("#roleTechnical"), 53300);
        schedule(() => activate("#roleLeadership"), 54800);
        schedule(() => activate("#roleResponders"), 56300);

        // ACT 06: Testing and validation
        schedule(() => {
            showOnly("#maintenanceTesting");
        }, 66500);

        schedule(() => activate("#retestReview"), 66800);
        schedule(() => activate("#retestExercise"), 67300);
        schedule(() => activate("#retestMeasure"), 67800);
        schedule(() => activate("#retestDocument"), 68300);
        schedule(() => activate("#retestWarning"), 69500);

        // ACT 07: Exam memory
        schedule(() => {
            showOnly("#examMemory");
        }, 81000);

        // ACT 08: Summary
        schedule(() => {
            showOnly("#sceneSummary");

            $$("#sceneSummary .summary-grid > div").forEach((item, index) => {
                schedule(() => {
                    item.classList.add("is-active");
                }, index * 450);
            });
        }, 95000);

        // ACT 09: Final concept
        schedule(() => {
            showOnly("#finalConcept");
        }, 108000);

        // Scene completion
        schedule(() => {
            if (timeline) {
                timeline.style.transition = "none";
                timeline.style.width = "100%";
            }

            sceneStarted = false;
        }, 124000);
    }

    if (startButton) {
        startButton.addEventListener("click", () => {
            if (sceneStarted) return;

            beginScene();
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            beginScene();
        });
    }

    resetScene();
});