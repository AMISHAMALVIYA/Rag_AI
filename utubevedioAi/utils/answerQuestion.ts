import "dotenv/config";
import Groq from "groq-sdk";

let groq: Groq | null = null;

function getGroq(): Groq {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set. Check your .env file.");
    }
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

async function answerQuestion(
  question: string,
  contextChunks: string[]
): Promise<string> {
  const client = getGroq();
  const context = contextChunks.join("\n\n---\n\n");

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "Answer the user's question using ONLY the provided context from a video transcript. If the answer isn't in the context, say so.",
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
    temperature: 0.2,
    max_tokens: 500,
  });

  return response.choices[0]?.message?.content ?? "";
}

export default answerQuestion;