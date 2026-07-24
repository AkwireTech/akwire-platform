// ============================================
// AKWIRE LAB ENGINE v2
// Virtual File System
// ============================================

export class VirtualFileSystem {

    constructor() {

        this.currentPath = "/home/analyst";

        this.fs = {};

    }

    // ----------------------------------------
    // Load a filesystem for the current lab
    // ----------------------------------------

    load(filesystem) {

        this.fs = filesystem;
        this.currentPath = "/home/analyst";

    }

    // ----------------------------------------
    // Current Working Directory
    // ----------------------------------------

    pwd() {

        return this.currentPath;

    }

    // ----------------------------------------
    // Resolve Current Directory Object
    // ----------------------------------------

    getCurrentDirectory() {

        const parts = this.currentPath
            .split("/")
            .filter(Boolean);

        let node = this.fs;

        for (const part of parts) {

            if (!node[part])
                return null;

            node = node[part];

        }

        return node;

    }

    // ----------------------------------------
    // List Files
    // ----------------------------------------

    ls() {

        const dir = this.getCurrentDirectory();

        if (!dir)
            return "Directory not found.";

        return Object.keys(dir).join("    ");

    }

    // ----------------------------------------
    // Change Directory
    // ----------------------------------------

    cd(folder) {

        if (!folder)
            return this.currentPath;

        if (folder === "..") {

            const parts = this.currentPath
                .split("/")
                .filter(Boolean);

            if (parts.length > 1)
                parts.pop();

            this.currentPath = "/" + parts.join("/");

            return this.currentPath;

        }

        const dir = this.getCurrentDirectory();

        if (!dir[folder]) {

            return `cd: ${folder}: No such directory`;

        }

        if (typeof dir[folder] === "string") {

            return `cd: ${folder}: Not a directory`;

        }

        this.currentPath += "/" + folder;

        return this.currentPath;

    }

    // ----------------------------------------
    // Read File
    // ----------------------------------------

    cat(file) {

        const dir = this.getCurrentDirectory();

        if (!dir[file])
            return `cat: ${file}: No such file`;

        if (typeof dir[file] !== "string")
            return `cat: ${file}: Is a directory`;

        return dir[file];

    }

    // ----------------------------------------
    // Search File
    // ----------------------------------------

    grep(keyword, file) {

        const text = this.cat(file);

        if (text.startsWith("cat:"))
            return text;

        const lines = text
            .split("\n")
            .filter(line =>
                line.toLowerCase()
                .includes(keyword.toLowerCase())
            );

        return lines.length
            ? lines.join("\n")
            : "No matches.";

    }

    // ----------------------------------------
    // Recursive Find
    // ----------------------------------------

    find(name) {

        const results = [];

        function search(node, path) {

            Object.keys(node).forEach(key => {

                const nextPath = path + "/" + key;

                if (key === name)
                    results.push(nextPath);

                if (typeof node[key] === "object") {

                    search(node[key], nextPath);

                }

            });

        }

        search(this.fs, "");

        return results.length
            ? results.join("\n")
            : "No files found.";

    }

}