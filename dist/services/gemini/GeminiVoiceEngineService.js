import { genAI } from '../config/gemini';
export class GeminiVoiceEngineService {
    modelName = 'gemini-2.5-flash';
    systemInstruction = `
Eres un asistente experto en finanzas personales. 
Tu única tarea es extraer datos financieros a partir de una frase coloquial informal de los usuarios.
Debes devolver estrictamente un JSON válido y nada más, sin formato Markdown ni explicaciones adicionales, usando el siguiente esquema:
{
  "amount": number, // El monto mencionado (positivo siempre)
  "category": string, // Identifica la categoría de gasto o ingreso a partir del texto (ej: "Comida", "Transporte", "Sueldo")
  "type": "INCOME" | "EXPENSE", // "INCOME" si es un ingreso, "EXPENSE" si es un gasto
  "description": string // Breve resumen de la transacción o el contexto
}
Asegúrate de deducir inteligentemente si es ingreso o gasto por el contexto (ej: "Gasté", "Me cobraron", "Pagué" -> EXPENSE | "Me pagaron", "Cobré", "Recibí" -> INCOME).
`;
    async processAudio(audioBufferOrText) {
        if (!genAI) {
            throw new Error('Gemini API is not initialized. Please set GEMINI_API_KEY.');
        }
        const model = genAI.getGenerativeModel({
            model: this.modelName,
            systemInstruction: this.systemInstruction,
        });
        try {
            // For this phase, we handle the case where it's a string (text prompt). 
            // If it's a buffer (actual audio), we'll encode it as inline data for Gemini later.
            if (typeof audioBufferOrText === 'string') {
                const result = await model.generateContent(audioBufferOrText);
                const responseText = result.response.text().trim();
                // Remove markdown formatting if Gemini still included it by mistake
                const cleanJsonString = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                const data = JSON.parse(cleanJsonString);
                return data;
            }
            else {
                // Here we'll configure proper base64 inline audio passing for Gemini multimodel
                const audioData = {
                    inlineData: {
                        data: audioBufferOrText.toString("base64"),
                        mimeType: "audio/mp3", // Change as needed by user input
                    },
                };
                const result = await model.generateContent([
                    { text: "Extrae los datos financieros de este audio." },
                    audioData
                ]);
                const responseText = result.response.text().trim();
                const cleanJsonString = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                return JSON.parse(cleanJsonString);
            }
        }
        catch (error) {
            console.error('Error processing voice/text with Gemini:', error);
            throw new Error('Voice extraction failed.');
        }
    }
}
