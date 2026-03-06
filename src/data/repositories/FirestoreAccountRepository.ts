import { IAccountRepository } from '../../domain/usecases/GetBalanceUseCase';
import { Account } from '../../domain/entities/Account';
import { db } from '../config/firebase';
import { AccountMapper } from '../mappers/AccountMapper';
import { collection, doc, setDoc, addDoc, getDoc } from 'firebase/firestore';

export class FirestoreAccountRepository implements IAccountRepository {
    private readonly collectionName = 'accounts';

    async findById(id: string): Promise<Account | null> {
        if (!db) throw new Error('Firestore is not initialized.');

        const docRef = doc(db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;

        return AccountMapper.toDomain(docSnap.data() as any, docSnap.id);
    }

    async save(account: Account): Promise<void> {
        if (!db) throw new Error('Firestore is not initialized.');

        const collectionRef = collection(db, this.collectionName);
        const data = AccountMapper.toFirestore(account);

        if (account.id) {
            const docRef = doc(db, this.collectionName, account.id);
            await setDoc(docRef, data);
        } else {
            const docRef = await addDoc(collectionRef, data);
            Reflect.set(account, 'id', docRef.id);
        }
    }
}
