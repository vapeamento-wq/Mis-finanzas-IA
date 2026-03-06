import { Account } from '../../domain/entities/Account';
export class AccountMapper {
    static toDomain(firestoreData, id) {
        return new Account({
            id: id,
            name: firestoreData.name,
            balance: firestoreData.balance,
            currency: firestoreData.currency
        });
    }
    static toFirestore(account) {
        return {
            name: account.name,
            balance: account.balance,
            currency: account.currency
        };
    }
}
