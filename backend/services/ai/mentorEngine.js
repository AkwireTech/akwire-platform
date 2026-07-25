import { askAI } from "./aiProvider.js";
import { buildPrompt } from "./promptEngine.js";
import { buildContext } from "./contextManager.js";

export async function mentor(data) {

    const context = buildContext(data);

    const prompt = buildPrompt(context);

    return await askAI(prompt);

}