import { useState } from 'react';
import { useServices } from '../context/ServicesContext';
import { ProcessedVoiceData } from '../../domain/interfaces/IVoiceEngineService';

export function useVoiceEngine() {
    const { voiceEngineService } = useServices();
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState<ProcessedVoiceData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fallback to text if Web Speech API is not supported or for manual entry
    const processText = async (text: string) => {
        setIsProcessing(true);
        setError(null);
        try {
            const data = await voiceEngineService.processAudio(text);
            setExtractedData(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al procesar el texto con Gemini');
        } finally {
            setIsProcessing(false);
        }
    };

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks: BlobPart[] = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", async () => {
                const actualMimeType = mediaRecorder.mimeType || 'audio/webm';
                const audioBlob = new Blob(audioChunks, { type: actualMimeType });

                // Convert blob to Base64
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    // Send the FULL data URI (includes mimeType)
                    const base64data = reader.result as string;

                    setIsProcessing(true);
                    setError(null);
                    try {
                        const data = await voiceEngineService.processAudio(base64data, true);
                        setExtractedData(data);
                    } catch (err: any) {
                        console.error(err);
                        setError(err.message || 'Error al procesar el audio con Gemini');
                    } finally {
                        setIsProcessing(false);
                    }
                };

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            });

            mediaRecorder.start();
            setIsListening(true);
            setError(null);

            // Automatically stop recording after 4 seconds for Friction Zero
            setTimeout(() => {
                if (mediaRecorder.state !== 'inactive') {
                    mediaRecorder.stop();
                    setIsListening(false);
                }
            }, 4000);

        } catch (error: any) {
            console.error("Microphone access denied or error:", error);
            setIsListening(false);

            // Fallback manual
            const promptText = prompt("No se pudo acceder al micrófono. Escribe el gasto/ingreso manualmente:", "");
            if (promptText) processText(promptText);
        }
    };

    const resetData = () => {
        setExtractedData(null);
        setError(null);
    };

    return {
        isListening,
        isProcessing,
        extractedData,
        error,
        startListening,
        processText,
        resetData
    };
}
