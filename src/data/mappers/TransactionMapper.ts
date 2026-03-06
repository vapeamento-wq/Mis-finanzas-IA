import { Transaction } from '../../domain/entities/Transaction';

export class TransactionMapper {
    static toDomain(firestoreData: any, id: string): Transaction {
        return new Transaction({
            id: id,
            amount: firestoreData.amount,
            type: firestoreData.type,
            category: firestoreData.category,
            date: firestoreData.date.toDate(), // Convert Firestore Timestamp to JS Date
            description: firestoreData.description,
            accountId: firestoreData.accountId,
        });
    }

    static toFirestore(transaction: Transaction): any {
        return {
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            date: transaction.date, // Firestore SDK handles JS Date automatically
            description: transaction.description || null,
            accountId: transaction.accountId,
        };
    }
}
