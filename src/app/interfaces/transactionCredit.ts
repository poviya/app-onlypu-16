import { Membership, Money, PaymentOrder, Post, ProductAdCredit, ProductCredit, User, WithdrawalMoney } from ".";

export interface TransactionCredit {
    _id?: string;
    Post?: Post;

    ProductAdCredit?: ProductAdCredit;
    type?: string;

    amountCredit?: number;

    Sender?: User;
    typeSender?: string;

    Receiver?: User;
    typeReceiver?: string;

    amount?: number;
    Money?: Money;

    creditValue?: number;
    CreditValueMoney?: Money;

    ProductCredit?: ProductCredit;

    PaymentOrder?: PaymentOrder;

    WithdrawalMoney?: WithdrawalMoney;

    Membership?: Membership;

    details?: object;

    status?: string;

    // CONTROL
    active: boolean;
    edit: boolean;
    delete: boolean;

    updatedAt: Date;
    createdAt: Date;
}
