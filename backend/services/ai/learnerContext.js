export function buildLearnerContext(data) {

    return {

        user: data.user || {},

        course: data.course || {},

        lesson: data.lesson || {},

        lab: data.lab || {},

        mode: data.mode || "lesson",

        progress: data.progress || {},

        question: data.question || "",

        recentCommands: data.recentCommands || [],

        strengths: data.strengths || [],

        weaknesses: data.weaknesses || [],

        hintsUsed: data.hintsUsed || 0

    };

}