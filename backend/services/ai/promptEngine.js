import { SYSTEM_PROMPT } from "./systemPrompt.js";

export function buildPrompt(context) {

    return [

        {
            role: "system",
            content: SYSTEM_PROMPT
        },

        {
            role: "user",
            content: JSON.stringify(context, null, 2)
        }

    ];

}