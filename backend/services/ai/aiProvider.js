import OpenAI from "openai";
import config from "../../config/aiConfig.js";

const client = new OpenAI({
    apiKey: config.apiKey
});

export async function askAI(messages) {
    const response = await client.chat.completions.create({
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        messages
    });

    return response.choices[0].message.content;
}