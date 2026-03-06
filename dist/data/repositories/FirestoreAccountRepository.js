import { db } from '../config/firebase';
import { AccountMapper } from '../mappers/AccountMapper';
export class FirestoreAccountRepository {
    collectionName = 'accounts';
    async findById(id) {
        if (!db)
            throw new Error('Firestore is not initialized.');
        const doc = await db.collection(this.collectionName).doc(id).get();
        if (!doc.exists)
            return null;
        return AccountMapper.toDomain(doc.data(), doc.id);
    }
    async save(account) {
        if (!db)
            throw new Error('Firestore is not initialized.');
        const collectionRef = db.collection(this.collectionName);
        const data = AccountMapper.toFirestore(account);
        if (account.id) {
            await collectionRef.doc(account.id).set(data);
        }
        else {
            const docRef = await collectionRef.add(data);
            Reflect.set(account, 'id', docRef.id);
        }
    }
}
