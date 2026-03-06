import { useState } from 'react';
import { useServices } from '../context/ServicesContext';
export function useVoiceEngine() {
    const { voiceEngineService } = useServices();
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedData, setExtractedData] = useState(null);
    const [error, setError] = useState(null);
    // Fallback to text if Web Speech API is not supported or for manual entry
    const processText = async (text) => {
        setIsProcessing(true);
        setError(null);
        try {
            const data = await voiceEngineService.processAudio(text);
            setExtractedData(data);
        }
        catch (err) {
            console.error(err);
            setError(err.message || 'Error al procesar el texto con Gemini');
        }
        finally {
            setIsProcessing(false);
        }
    };
    const startListening = () => {
        // Advanced feature: Speech recognition implementation
        // For MVP we can just use prompt() to mock voice input, or hook up actual Web Speech Recognition
        // Web Speech API:
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            // Fallback for browsers that don't support it
            const promptText = prompt("Tu navegador no soporta voz nativa. Escribe el gasto/ingreso:", "Me compré un café por 5 dólares");
            if (promptText) {
                processText(promptText);
            }
            return;
        }
        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'es-ES';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.onstart = () => {
                setIsListening(true);
                setError(null);
            };
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                processText(transcript);
            };
            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                if (event.error === 'not-allowed') {
                    const promptText = prompt("Permiso de micrófono denegado. Escribe el gasto/ingreso:", "");
                    if (promptText)
                        processText(promptText);
                }
                else {
                    setError('No se pudo reconocer la voz.');
                }
            };
            recognition.onend = () => {
                setIsListening(false);
            };
            recognition.start();
        }
        catch (error) {
            console.error("Failed to start speech recognition", error);
            setIsListening(false);
            setError("Error al iniciar el micrófono.");
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
