import { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>;
    findById(id: string): Promise<Transaction | null>;
    findByAccountId(accountId: string): Promise<Transaction[]>;
}
