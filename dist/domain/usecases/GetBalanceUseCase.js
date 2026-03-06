export class GetBalanceUseCase {
    accountRepository;
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    async execute(accountId) {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error(`Account not found for ID: ${accountId}`);
        }
        return account.balance;
    }
}
