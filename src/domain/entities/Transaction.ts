export type TransactionType = 'INCOME' | 'EXPENSE';

export interface TransactionProps {
  id?: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
  description?: string;
  accountId: string;
}

export class Transaction {
  public readonly id?: string;
  public amount: number;
  public type: TransactionType;
  public category: string;
  public date: Date;
  public description?: string;
  public accountId: string;

  constructor(props: TransactionProps) {
    this.id = props.id;
    this.amount = props.amount;
    this.type = props.type;
    this.category = props.category;
    this.date = props.date;
    this.description = props.description;
    this.accountId = props.accountId;
    
    this.validate();
  }

  private validate(): void {
    if (this.amount <= 0) {
      throw new Error('Transaction amount must be greater than zero.');
    }
  }
}
