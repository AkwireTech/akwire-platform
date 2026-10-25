
/* ===========================================
   AKWIRE Lab Engine v2
   Terminal Engine
=========================================== */

export class TerminalEngine {
    constructor(vfs, terminal) {
        this.vfs = vfs;
        this.terminal = terminal;
        this.history = [];
        this.historyIndex = 0;
    }

    print(text = "") {
        const line = document.createElement("div");
        line.className = "log-entry";

        // Display output as text rather than interpreting it as HTML.
        line.textContent = String(text);
        line.style.whiteSpace = "pre-wrap";

        this.terminal.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    parseCommand(command) {
        const args = [];
        const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g;
        let match;

        while ((match = pattern.exec(command)) !== null) {
            args.push(match[1] ?? match[2] ?? match[3]);
        }

        return args;
    }

    execute(command) {
        command = String(command || "").trim();

        if (!command) return "";

        this.history.push(command);
        this.historyIndex = this.history.length;

        const args = this.parseCommand(command);
        const cmd = args[0];
        const params = args.slice(1);

        switch (cmd) {
            case "help":
                return [
                    "Available Commands",
                    "",
                    "pwd                 Show current directory",
                    "ls [path]           List files and directories",
                    "cd <path>           Change directory",
                    "cat <file>          Display file contents",
                    "grep <word> <file>  Search file contents",
                    "find <name>         Find a file or directory",
                    "history             Show command history",
                    "clear               Clear terminal output",
                    "help                Show available commands"
                ].join("\n");

            case "pwd":
                return this.vfs.pwd();

            case "ls":
                return this.vfs.ls(params[0] || this.vfs.pwd());

            case "cd":
                return this.vfs.cd(params[0]);

            case "cat":
                return this.vfs.cat(params.join(" "));

            case "grep":
                if (params.length < 2) {
                    return "Usage: grep <keyword> <file>";
                }

                return this.vfs.grep(params[0], params.slice(1).join(" "));

            case "find":
                if (!params[0]) {
                    return "Usage: find <name>";
                }

                return this.vfs.find(params[0]);

            case "history":
                return this.history.length
                    ? this.history
                        .map((entry, index) => `${index + 1}  ${entry}`)
                        .join("\n")
                    : "No commands in history.";

            case "clear":
                if (this.terminal) {
                    this.terminal.innerHTML = "";
                }
                return "";

            default:
                return `bash: ${cmd}: command not found`;
        }
    }

    previousCommand() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
        }

        return this.history[this.historyIndex] || "";
    }

    nextCommand() {
        if (this.historyIndex < this.history.length) {
            this.historyIndex++;
        }

        return this.history[this.historyIndex] || "";
    }
}
