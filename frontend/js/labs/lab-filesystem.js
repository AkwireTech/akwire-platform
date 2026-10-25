
/* ============================================
   AKWIRE LAB ENGINE v2
   Virtual File System
============================================ */

export class VirtualFileSystem {
    constructor() {
        this.currentPath = "/home/analyst";
        this.fs = {};
    }

    load(filesystem) {
        this.fs = filesystem || {};
        this.currentPath = "/home/analyst";
    }

    normalizePath(path) {
        if (!path || path === ".") {
            return this.currentPath;
        }

        const parts = path.startsWith("/")
            ? []
            : this.currentPath.split("/").filter(Boolean);

        const requestedParts = path.split("/").filter(Boolean);

        for (const part of requestedParts) {
            if (part === ".") continue;

            if (part === "..") {
                parts.pop();
            } else {
                parts.push(part);
            }
        }

        return "/" + parts.join("/");
    }

    getNode(path = this.currentPath) {
        const normalized = this.normalizePath(path);
        const parts = normalized.split("/").filter(Boolean);

        let node = this.fs;

        for (const part of parts) {
            if (
                node === null ||
                typeof node !== "object" ||
                !Object.prototype.hasOwnProperty.call(node, part)
            ) {
                return null;
            }

            node = node[part];
        }

        return node;
    }

    pwd() {
        return this.currentPath;
    }

    getCurrentDirectory() {
        return this.getNode(this.currentPath);
    }

    ls(path = this.currentPath) {
        const target = this.getNode(path);

        if (target === null) {
            return `ls: cannot access '${path}': No such file or directory`;
        }

        if (typeof target === "string") {
            return `ls: ${path}: Not a directory`;
        }

        const entries = Object.keys(target);

        return entries.length
            ? entries.join("    ")
            : "Directory is empty.";
    }

    cd(folder) {
        if (!folder || folder === ".") {
            return this.currentPath;
        }

        const targetPath = this.normalizePath(folder);
        const target = this.getNode(targetPath);

        if (target === null) {
            return `cd: ${folder}: No such directory`;
        }

        if (typeof target === "string") {
            return `cd: ${folder}: Not a directory`;
        }

        this.currentPath = targetPath;
        return this.currentPath;
    }

    cat(file) {
        if (!file) {
            return "cat: missing file operand";
        }

        const targetPath = this.normalizePath(file);
        const target = this.getNode(targetPath);

        if (target === null) {
            return `cat: ${file}: No such file or directory`;
        }

        if (typeof target !== "string") {
            return `cat: ${file}: Is a directory`;
        }

        return target;
    }

    grep(keyword, file) {
        if (!keyword || !file) {
            return "Usage: grep <keyword> <file>";
        }

        const content = this.cat(file);

        if (
            content.startsWith("cat:") ||
            content.startsWith("Usage:")
        ) {
            return content;
        }

        const matches = content
            .split("\n")
            .filter(line =>
                line.toLowerCase().includes(keyword.toLowerCase())
            );

        return matches.length
            ? matches.join("\n")
            : "No matches found.";
    }

    find(name, startPath = "/") {
        if (!name) {
            return "Usage: find <name>";
        }

        const results = [];
        const startNode = this.getNode(startPath);

        if (startNode === null || typeof startNode !== "object") {
            return `find: '${startPath}': No such directory`;
        }

        const normalizedStart = this.normalizePath(startPath);

        const search = (node, currentPath) => {
            if (!node || typeof node !== "object") {
                return;
            }

            for (const key of Object.keys(node)) {
                const nextPath =
                    currentPath === "/"
                        ? `/${key}`
                        : `${currentPath}/${key}`;

                if (key === name) {
                    results.push(nextPath);
                }

                if (typeof node[key] === "object" && node[key] !== null) {
                    search(node[key], nextPath);
                }
            }
        };

        search(startNode, normalizedStart);

        return results.length
            ? results.join("\n")
            : `find: '${name}': No matching files found`;
    }
}
