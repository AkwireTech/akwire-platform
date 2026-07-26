export function buildPrompt(context, systemPrompt) {
    return [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: JSON.stringify(context, null, 2)
        }
    ];
}