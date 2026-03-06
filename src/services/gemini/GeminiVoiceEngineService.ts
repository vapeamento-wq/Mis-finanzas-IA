import { IVoiceEngineService, ProcessedVoiceData } from '../../domain/interfaces/IVoiceEngineService';
import { genAI } from '../config/gemini';

export class GeminiVoiceEngineService implements IVoiceEngineService {
    private readonly modelName = 'gemini-2.5-flash';

    private readonly systemInstruction = `
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

    async processAudio(input: string, isAudioBase64: boolean = false): Promise<ProcessedVoiceData> {
        if (!genAI) {
            throw new Error('Gemini API is not initialized. Please set GEMINI_API_KEY.');
        }

        const model = genAI.getGenerativeModel({
            model: this.modelName,
            systemInstruction: this.systemInstruction,
        });

        try {
            if (!isAudioBase64) {
                const result = await model.generateContent(input);
                const responseText = result.response.text().trim();
                const cleanJsonString = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                return JSON.parse(cleanJsonString) as ProcessedVoiceData;
            } else {
                let actualMimeType = "audio/mp3";
                let base64Data = input;

                // Attempt to parse standard Data URI -> data:audio/mp4;base64,AAAA...
                const match = input.match(/^data:(.*?);base64,(.*)$/);
                if (match && match.length === 3) {
                    actualMimeType = match[1];
                    base64Data = match[2];
                }

                const audioData = {
                    inlineData: {
                        data: base64Data,
                        mimeType: actualMimeType,
                    },
                };
                const result = await model.generateContent([
                    { text: "Extrae los datos financieros escuchando el siguiente audio." },
                    audioData
                ]);

                const responseText = result.response.text().trim();
                const cleanJsonString = responseText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
                return JSON.parse(cleanJsonString) as ProcessedVoiceData;
            }
        } catch (error) {
            console.error('Error processing voice/text with Gemini:', error);
            throw new Error('Voice extraction failed.');
        }
    }
}
