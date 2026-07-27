import { askAI } from "./aiProvider.js";
import { buildPrompt } from "./promptEngine.js";
import { buildContext } from "./contextManager.js";

import { LESSON_PROMPT } from "./prompts/lessonPrompt.js";
import { LAB_PROMPT } from "./prompts/labPrompt.js";
import { EXAM_PROMPT } from "./prompts/examPrompt.js";
import { CAREER_PROMPT } from "./prompts/careerPrompt.js";
import { INTERVIEW_PROMPT } from "./prompts/interviewPrompt.js";
import { COURSE_BUILDER_PROMPT } from "./prompts/courseBuilderPrompt.js";
import { ADMIN_PROMPT } from "./prompts/adminPrompt.js";

function getSystemPrompt(mode = "lesson") {
    switch (mode) {
        case "lesson":
            return LESSON_PROMPT;

        case "lab":
            return LAB_PROMPT;

        case "exam":
            return EXAM_PROMPT;

        case "career":
            return CAREER_PROMPT;

        case "interview":
            return INTERVIEW_PROMPT;

        case "course-builder":
            return COURSE_BUILDER_PROMPT;

        case "admin":
            return ADMIN_PROMPT;

        default:
            return LESSON_PROMPT;
    }
}

export async function mentor(data) {
    // Build structured context once
    const context = buildContext(data);

    // Select the correct system prompt
    const systemPrompt = getSystemPrompt(context.activity.mode);

    // Build OpenAI messages
    const messages = buildPrompt(context, systemPrompt);

    // Send to OpenAI
    return await askAI(messages);
}