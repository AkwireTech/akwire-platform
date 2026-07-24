// ============================================
// AKWIRE LAB ENGINE v2
// Utility Functions
// ============================================

export const LabUtils = {

    // ----------------------------------------
    // Delay Helper
    // ----------------------------------------

    sleep(ms) {

        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );

    },

    // ----------------------------------------
    // Normalize Command
    // ----------------------------------------

    normalizeCommand(command) {

        return command
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();

    },

    // ----------------------------------------
    // Format Terminal Output
    // ----------------------------------------

    formatOutput(text) {

        if (text === null || text === undefined)
            return "";

        return String(text)
            .replace(/\n/g, "<br>");

    },

    // ----------------------------------------
    // Create Terminal Line
    // ----------------------------------------

    createLine(text, className = "log-entry") {

        const div = document.createElement("div");

        div.className = className;

        div.innerHTML = this.formatOutput(text);

        return div;

    },

    // ----------------------------------------
    // Random Integer
    // ----------------------------------------

    randomInt(min, max) {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;

    },

    // ----------------------------------------
    // Format Time
    // ----------------------------------------

    formatTime(seconds) {

        const mins = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${mins}:${String(secs).padStart(2, "0")}`;

    },

    // ----------------------------------------
    // Deep Clone Object
    // ----------------------------------------

    clone(obj) {

        return JSON.parse(JSON.stringify(obj));

    },

    // ----------------------------------------
    // Generate Simple ID
    // ----------------------------------------

    generateId(prefix = "id") {

        return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    },

    // ----------------------------------------
    // Safe HTML
    // ----------------------------------------

    escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

};