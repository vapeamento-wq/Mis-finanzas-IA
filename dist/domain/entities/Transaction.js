export class Transaction {
    id;
    amount;
    type;
    category;
    date;
    description;
    accountId;
    constructor(props) {
        this.id = props.id;
        this.amount = props.amount;
        this.type = props.type;
        this.category = props.category;
        this.date = props.date;
        this.description = props.description;
        this.accountId = props.accountId;
        this.validate();
    }
    validate() {
        if (this.amount <= 0) {
            throw new Error('Transaction amount must be greater than zero.');
        }
    }
}
