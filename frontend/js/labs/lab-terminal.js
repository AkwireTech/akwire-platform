
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
        if (!this.terminal) return;

        const line = document.createElement("div");
        line.className = "log-entry";
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
                    "grep [-i] <word> <file>  Search file contents",
                    "find <name>         Find a file or directory",
                    "nmap -sv <target>   Simulated service scan",
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

            case "grep": {
                let ignoreCase = false;
                let searchParams = [...params];

                if (searchParams[0] === "-i") {
                    ignoreCase = true;
                    searchParams.shift();
                }

                if (searchParams.length < 2) {
                    return "Usage: grep [-i] <keyword> <file>";
                }

                const keyword = searchParams.shift();
                const filename = searchParams.join(" ");
                const content = this.vfs.cat(filename);

                if (
                    content.startsWith("cat:") ||
                    content.startsWith("Usage:")
                ) {
                    return content;
                }

                const lines = content.split("\n");
                const matches = lines.filter(line =>
                    ignoreCase
                        ? line.toLowerCase().includes(keyword.toLowerCase())
                        : line.includes(keyword)
                );

                return matches.length
                    ? matches.join("\n")
                    : "No matches found.";
            }

            case "find":
                if (!params[0]) {
                    return "Usage: find <name>";
                }

                return this.vfs.find(params[0]);

            case "nmap": {
                const target = params[params.length - 1];

                if (!params.includes("-sv") || !target) {
                    return "Usage: nmap -sv <target>";
                }

                // Simulated scan for this training lab only.
                if (target === "localhost") {
                    return [
                        "Starting simulated service scan...",
                        "Target: localhost",
                        "",
                        "PORT   STATE SERVICE",
                        "21/tcp open  ftp",
                        "22/tcp open  ssh",
                        "",
                        "Scan complete."
                    ].join("\n");
                }

                return `Simulated scan: no scan data configured for ${target}.`;
            }

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
