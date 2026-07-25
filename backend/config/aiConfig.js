import dotenv from "dotenv";

dotenv.config();

export default {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    temperature: 0.3,
    maxTokens: 1000
};