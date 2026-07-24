// ============================================
// AKWIRE LAB ENGINE v2
// Command History Manager
// ============================================

export class CommandHistory {

    constructor(maxSize = 100) {

        this.commands = [];
        this.index = 0;
        this.maxSize = maxSize;

    }

    // ----------------------------
    // Add Command
    // ----------------------------

    add(command) {

        command = command.trim();

        if (!command) return;

        // Prevent duplicate consecutive commands
        if (this.commands[this.commands.length - 1] === command)
            return;

        this.commands.push(command);

        if (this.commands.length > this.maxSize) {

            this.commands.shift();

        }

        this.index = this.commands.length;

    }

    // ----------------------------
    // Previous Command (Arrow Up)
    // ----------------------------

    previous() {

        if (this.commands.length === 0)
            return "";

        if (this.index > 0)
            this.index--;

        return this.commands[this.index];

    }

    // ----------------------------
    // Next Command (Arrow Down)
    // ----------------------------

    next() {

        if (this.commands.length === 0)
            return "";

        if (this.index < this.commands.length)
            this.index++;

        if (this.index >= this.commands.length)
            return "";

        return this.commands[this.index];

    }

    // ----------------------------
    // Clear History
    // ----------------------------

    clear() {

        this.commands = [];
        this.index = 0;

    }

    // ----------------------------
    // Return All Commands
    // ----------------------------

    list() {

        return this.commands
            .map((cmd, i) => `${i + 1}  ${cmd}`)
            .join("\n");

    }

    // ----------------------------
    // Total Commands
    // ----------------------------

    count() {

        return this.commands.length;

    }

}