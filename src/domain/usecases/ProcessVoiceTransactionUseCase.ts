import { Transaction } from '../entities/Transaction';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { IVoiceEngineService } from '../interfaces/IVoiceEngineService';

export class ProcessVoiceTransactionUseCase {
    constructor(
        private readonly voiceEngineService: IVoiceEngineService,
        private readonly transactionRepository: ITransactionRepository
    ) { }

    async execute(input: string, accountId: string, isAudioBase64: boolean = false): Promise<Transaction> {
        // 1. Process voice to extract transaction intent data
        const voiceData = await this.voiceEngineService.processAudio(input, isAudioBase64);

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
