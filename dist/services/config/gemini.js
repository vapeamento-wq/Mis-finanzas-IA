import { GoogleGenerativeAI } from '@google/generative-ai';
const initializeGemini = () => {
    // Determine the environment and find the API key appropriately:
    // Try Vite's import.meta.env first (Browser runtime), 
    // Fallback to process.env (NodeJS / Test runtime) if Vite isn't active
    const apiKey = typeof process !== 'undefined' && process.env?.GEMINI_API_KEY
        ? process.env.GEMINI_API_KEY
        : import.meta.env?.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('GEMINI_API_KEY missing. Initialization skipped (useful for pure domain tests).');
        return null;
    }
    return new GoogleGenerativeAI(apiKey);
};
export const genAI = initializeGemini();
