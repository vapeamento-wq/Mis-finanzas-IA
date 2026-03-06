export interface IAccountRepository {
    findById(id: string): Promise<any | null>;
}

export class GetBalanceUseCase {
    constructor(private readonly accountRepository: IAccountRepository) { }

    async execute(accountId: string): Promise<number> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error(`Account not found for ID: ${accountId}`);
        }
        return account.balance;
    }
}
