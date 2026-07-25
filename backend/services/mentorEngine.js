import { buildPrompt } from "./promptEngine.js";
import { askAI } from "./ai/aiProvider.js";

export async function mentor(context) {
    const prompt = buildPrompt(context);

    return await askAI(prompt);
}