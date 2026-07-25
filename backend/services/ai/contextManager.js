export function buildContext(data) {
    return {
        user: {
            id: data.user?.id || null,
            name: data.user?.name || "",
            certificationGoal: data.user?.certificationGoal || ""
        },

        activity: {
            mode: data.mode || "lesson",
            course: data.course || "",
            module: data.module || "",
            lesson: data.lesson || "",
            lab: data.lab || "",
            objective: data.objective || ""
        },

        learning: {
            completedLessons: data.completedLessons || 0,
            completedLabs: data.completedLabs || 0,
            completedExams: data.completedExams || 0,
            progress: data.progress || 0,
            strengths: data.strengths || [],
            weaknesses: data.weaknesses || []
        },

        lab: {
            recentCommands: data.recentCommands || [],
            currentDirectory: data.currentDirectory || "/",
            hintsUsed: data.hintsUsed || 0,
            completedObjectives: data.completedObjectives || []
        },

        conversation: {
            message: data.message || ""
        }
    };
}