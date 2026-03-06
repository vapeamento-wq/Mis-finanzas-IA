export interface ProcessedVoiceData {
    amount: number;
    category: string;
    type: 'INCOME' | 'EXPENSE';
    description?: string;
}

export interface IVoiceEngineService {
    processAudio(input: string, isAudioBase64?: boolean): Promise<ProcessedVoiceData>;
}
