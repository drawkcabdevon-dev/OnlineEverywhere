
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const listModels = async () => {
    const key = process.env.VITE_GEMINI_API_KEY;
    if (!key) {
        console.error("No API key found");
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
