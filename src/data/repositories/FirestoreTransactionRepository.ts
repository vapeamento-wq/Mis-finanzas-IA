import { ITransactionRepository } from '../../domain/interfaces/ITransactionRepository';
import { Transaction } from '../../domain/entities/Transaction';
import { db } from '../config/firebase';
import { TransactionMapper } from '../mappers/TransactionMapper';
import { collection, doc, setDoc, addDoc, getDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export class FirestoreTransactionRepository implements ITransactionRepository {
    private readonly collectionName = 'transactions';

    async save(transaction: Transaction): Promise<void> {
        if (!db) throw new Error('Firestore is not initialized.');

        const collectionRef = collection(db, this.collectionName);
        const data = TransactionMapper.toFirestore(transaction);

        if (transaction.id) {
            const docRef = doc(db, this.collectionName, transaction.id);
            await setDoc(docRef, data);
        } else {
            const docRef = await addDoc(collectionRef, data);
            // We can't mutate the readonly id of the pure entity easily without setter or redesign,
            // but for this standard approach, we usually pass the id string back or accept it as string.
            // In our domain Entity we marked `id` as strictly readonly via the constructor.
            // To maintain purity, the repository just saves it.
            Reflect.set(transaction, 'id', docRef.id);
        }
    }

    async findById(id: string): Promise<Transaction | null> {
        if (!db) throw new Error('Firestore is not initialized.');

        const docRef = doc(db, this.collectionName, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        return TransactionMapper.toDomain(docSnap.data() as any, docSnap.id);
    }

    async findByAccountId(accountId: string): Promise<Transaction[]> {
        if (!db) throw new Error('Firestore is not initialized.');

        const collectionRef = collection(db, this.collectionName);
        const q = query(
            collectionRef,
            where('accountId', '==', accountId),
            orderBy('date', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docSnap => TransactionMapper.toDomain(docSnap.data() as any, docSnap.id));
    }
}
