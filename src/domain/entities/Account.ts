export interface AccountProps {
    id?: string;
    name: string;
    balance: number;
    currency: string;
}

export class Account {
    public readonly id?: string;
    public name: string;
    public balance: number;
    public currency: string;

    constructor(props: AccountProps) {
        this.id = props.id;
        this.name = props.name;
        this.balance = props.balance;
        this.currency = props.currency;
    }

    public addTransaction(amount: number, type: 'INCOME' | 'EXPENSE'): void {
        if (type === 'INCOME') {
            this.balance += amount;
        } else {
            this.balance -= amount;
        }
    }
}
