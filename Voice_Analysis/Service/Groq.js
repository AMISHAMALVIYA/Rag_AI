import { ChatGroq }  from '@langchain/groq' ;

export const generateAnswer = async (question, context) => {
  // Connect to the free Llama-3 model tier on Groq cloud
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    modelName: "llama3-8b-8192", 
    temperature: 0.1,
  });

  const prompt = `You are a professional voice assistant. Answer the user's question clearly, concisely, and fluidly based only on the context provided. If you do not know the answer, explicitly state that you don't know.

Context:
${context}

Question: ${question}
Answer:`;

  const response = await llm.invoke(prompt);
  return response.content;
};


