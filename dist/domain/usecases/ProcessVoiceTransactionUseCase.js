import { Transaction } from '../entities/Transaction';
export class ProcessVoiceTransactionUseCase {
    voiceEngineService;
    transactionRepository;
    constructor(voiceEngineService, transactionRepository) {
        this.voiceEngineService = voiceEngineService;
        this.transactionRepository = transactionRepository;
    }
    async execute(audioBuffer, accountId) {
        // 1. Process voice to extract transaction intent data
        const voiceData = await this.voiceEngineService.processAudio(audioBuffer);
        // 2. Map and create Transaction entity
        const transaction = new Transaction({
            amount: voiceData.amount,
            type: voiceData.type,
            category: voiceData.category,
            description: voiceData.description,
            date: new Date(),
            accountId: accountId
        });
        // 3. Save to repository
        await this.transactionRepository.save(transaction);
        return transaction;
    }
}
