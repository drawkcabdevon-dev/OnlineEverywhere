
import { GoogleGenAI } from "@google/genai";

const listModels = async () => {
    const key = process.env.VITE_GEMINI_API_KEY;
    if (!key) {
        console.error("No API key found in VITE_GEMINI_API_KEY environment variable");
        return;
    }
    const ai = new GoogleGenAI({ apiKey: key });
    try {
        const models = await ai.models.list();
        console.log("Available Models:");
        console.log(JSON.stringify(models, null, 2));
    } catch (e) {
        console.error("Error listing models:", e);
    }
};

listModels();
