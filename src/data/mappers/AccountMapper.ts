import { Account } from '../../domain/entities/Account';

export class AccountMapper {
    static toDomain(firestoreData: any, id: string): Account {
        return new Account({
            id: id,
            name: firestoreData.name,
            balance: firestoreData.balance,
            currency: firestoreData.currency
        });
    }

    static toFirestore(account: Account): any {
        return {
            name: account.name,
            balance: account.balance,
            currency: account.currency
        };
    }
}
