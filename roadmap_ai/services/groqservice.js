import { groq } from "../config/groq.js";

export async function askGroq(prompt) {
    try {

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert AI Career Counselor. Always return JSON when requested."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.3
        });

        return response.choices[0].message.content;

    } catch (error) {

        console.log(error);

        throw error;
    }
}
