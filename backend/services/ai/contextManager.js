export function buildContext(data = {}) {
    return {
        user: {
            id: data.user?.id || null,
            name: data.user?.name || "",
            certificationGoal:
                data.user?.certificationGoal || ""
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
            completedLessons:
                Number(data.completedLessons) || 0,

            completedLabs:
                Number(data.completedLabs) || 0,

            completedExams:
                Number(data.completedExams) || 0,

            progress:
                Number(data.progress) || 0,

            strengths:
                Array.isArray(data.strengths)
                    ? data.strengths
                    : [],

            weaknesses:
                Array.isArray(data.weaknesses)
                    ? data.weaknesses
                    : []
        },

        lab: {
            recentCommands:
                Array.isArray(data.recentCommands)
                    ? data.recentCommands
                    : [],

            currentDirectory:
                data.currentDirectory || "/",

            hintsUsed:
                Number(data.hintsUsed) || 0,

            completedObjectives:
                Array.isArray(
                    data.completedObjectives
                )
                    ? data.completedObjectives
                    : []
        },

        conversation: {
            id:
                data.conversationId || null,

            history:
                Array.isArray(
                    data.history
                )
                    ? data.history
                    : [],

            message:
                data.message || ""
        }
    };
}