import { GoogleGenAI } from "@google/genai";

const testAPI = async () => {
    const key = "AIzaSyC34oL3WcLozMu7dngL8yahPzLO9-DIKic";
    console.log("Testing Gemini API...\n");

    const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash-latest',
            contents: [{ role: 'user', parts: [{ text: 'Say "API is working!" in exactly 3 words' }] }],
            config: { maxOutputTokens: 10 }
        });

        console.log("✅ SUCCESS! API is working!");
        console.log("Response:", response.text);
        console.log("\n🎉 Your Persona Lab should work now!");
        console.log("Visit: http://localhost:5173/ollie");
    } catch (error) {
        console.log("❌ FAILED!");
        console.log("Error:", error.message);

        if (error.message.includes("REFERRER_BLOCKED") || error.message.includes("403")) {
            console.log("\n🔧 FIX NEEDED:");
            console.log("1. Go to: https://aistudio.google.com/app/apikey");
            console.log("2. Edit your key");
            console.log("3. Add to allowed referrers:");
            console.log("   - http://localhost:5173/*");
            console.log("   - https://onlineeverywhere-297764705554.europe-west1.run.app/*");
            console.log("4. Save and run this test again");
        }
    }
};

testAPI();
