// ===========================================
// AKWIRE Lab Engine v2
// Terminal Engine
// ===========================================

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

        line.innerHTML = String(text).replace(/\n/g, "<br>");

        this.terminal.appendChild(line);

        this.terminal.scrollTop =
            this.terminal.scrollHeight;

    }

    execute(command) {

        command = command.trim();

        if (!command)
            return "";

        this.history.push(command);

        this.historyIndex = this.history.length;

        const parts = command.split(" ");

        const cmd = parts[0];

        switch (cmd) {

            case "help":

                return `
Available Commands

pwd
ls
cd
cat
grep
find
history
clear
help
`;

            case "pwd":

                return this.vfs.pwd();

            case "ls":

                return this.vfs.ls();

            case "cd":

                return this.vfs.cd(parts[1]);

            case "cat":

                return this.vfs.cat(parts.slice(1).join(" "));

            case "grep": {

                const keyword = parts[1];

                const file =
                    parts.slice(2).join(" ");

                return this.vfs.grep(keyword, file);

            }

            case "find":

                return this.vfs.find(parts[1]);

            case "history":

                return this.history
                    .map((c, i) => `${i + 1}  ${c}`)
                    .join("\n");

            case "clear":

                this.terminal.innerHTML = "";

                return "";

            default:

                return `bash: ${cmd}: command not found`;

        }

    }

    previousCommand() {

        if (this.historyIndex > 0)
            this.historyIndex--;

        return this.history[this.historyIndex] || "";

    }

    nextCommand() {

        if (this.historyIndex < this.history.length)
            this.historyIndex++;

        return this.history[this.historyIndex] || "";

    }

}