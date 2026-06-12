import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateContent = async (prompt, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error(error);

      if (i === retries - 1) throw error;

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

export { generateContent };
