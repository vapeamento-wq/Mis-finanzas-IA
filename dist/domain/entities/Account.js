export class Account {
    id;
    name;
    balance;
    currency;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.balance = props.balance;
        this.currency = props.currency;
    }
    addTransaction(amount, type) {
        if (type === 'INCOME') {
            this.balance += amount;
        }
        else {
            this.balance -= amount;
        }
    }
}
