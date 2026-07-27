export function buildPrompt(
    context,
    systemPrompt
) {
    const messages = [];

    messages.push({
        role: "system",
        content: systemPrompt
    });

    if (
        context.conversation.history &&
        context.conversation.history.length
    ) {
        context.conversation.history.forEach(
            (message) => {
                messages.push({
                    role: message.role,
                    content: message.content
                });
            }
        );
    }

    const studentContext = `
===========================
STUDENT PROFILE
===========================

Name:
${context.user.name || "Student"}

Certification Goal:
${context.user.certificationGoal || "Not specified"}

===========================
CURRENT ACTIVITY
===========================

Mode:
${context.activity.mode}

Course:
${context.activity.course}

Module:
${context.activity.module}

Lesson:
${context.activity.lesson}

Lab:
${context.activity.lab}

Objective:
${context.activity.objective}

===========================
LEARNING PROGRESS
===========================

Overall Progress:
${context.learning.progress}%

Completed Lessons:
${context.learning.completedLessons}

Completed Labs:
${context.learning.completedLabs}

Completed Exams:
${context.learning.completedExams}

Strengths:
${
context.learning.strengths.length
? context.learning.strengths.join(", ")
: "Unknown"
}

Weaknesses:
${
context.learning.weaknesses.length
? context.learning.weaknesses.join(", ")
: "Unknown"
}

===========================
LAB CONTEXT
===========================

Current Directory:
${context.lab.currentDirectory}

Recent Commands:
${
context.lab.recentCommands.length
? context.lab.recentCommands.join("\n")
: "None"
}

Hints Used:
${context.lab.hintsUsed}

Completed Objectives:
${
context.lab.completedObjectives.length
? context.lab.completedObjectives.join(", ")
: "None"
}
`;

    messages.push({
        role: "user",
        content: studentContext
    });

    messages.push({
        role: "user",
        content:
            context.conversation.message
    });

    return messages;
}