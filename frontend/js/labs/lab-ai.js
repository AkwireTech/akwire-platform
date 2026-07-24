// ============================================
// AKWIRE LAB ENGINE v2
// AI Mentor
// ============================================

export class AIMentor {

    constructor() {

        this.lab = null;

        this.level = 0;

    }

    // --------------------------------
    // Load Current Lab
    // --------------------------------

    loadLab(lab) {

        this.lab = lab;

        this.level = 0;

    }

    // --------------------------------
    // Reset Mentor
    // --------------------------------

    reset() {

        this.level = 0;

    }

    // --------------------------------
    // Next Hint
    // --------------------------------

    nextHint() {

        if (!this.lab)
            return "No mission loaded.";

        if (!this.lab.hints || this.lab.hints.length === 0)
            return "No hints available.";

        const hint =
            this.lab.hints[
                Math.min(
                    this.level,
                    this.lab.hints.length - 1
                )
            ];

        if (this.level < this.lab.hints.length - 1)
            this.level++;

        return hint;

    }

    // --------------------------------
    // Mission Guidance
    // --------------------------------

    guidance() {

        if (!this.lab)
            return "No mission loaded.";

        const tasks = this.lab.tasks || [];

        if (tasks.length === 0)
            return "No objectives available.";

        return `Current mission has ${tasks.length} objectives. Focus on completing the current objective before moving to the next.`;

    }

    // --------------------------------
    // Analyze User Command
    // --------------------------------

    analyzeCommand(command) {

        command = command.trim().toLowerCase();

        if (!command)
            return "";

        if (command.startsWith("cat"))
            return "Reading file contents...";

        if (command.startsWith("grep"))
            return "Searching for matching text...";

        if (command.startsWith("find"))
            return "Searching the virtual filesystem...";

        if (command.startsWith("ls"))
            return "Listing directory contents...";

        if (command.startsWith("cd"))
            return "Changing working directory...";

        if (command.startsWith("pwd"))
            return "Displaying current directory...";

        return "";
    }

    // --------------------------------
    // Mission Complete Feedback
    // --------------------------------

    missionSummary(results) {

        return `
Mission Complete

Grade: ${results.grade}

Score: ${results.score}%

XP Earned: ${results.xp}

Objectives Completed:
${results.completedTasks}/${results.totalTasks}

Mission Time:
${results.elapsedSeconds} seconds
`;

    }

}