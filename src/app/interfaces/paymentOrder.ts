import { Money, User } from "./";

export interface PaymentOrder {
    _id?: string;
    codeCollection?: string;
    Sender?: User;
    Receiver?: User;
    production?: boolean;
    amountTransaction?: number;
    MoneyTransaction?: Money;
    amountPay?: number;
    MoneyPay?: Money;
    Money?: Money;
    amount?: number;
    status?: string;
    paymentType?: string;
    createdAt: string;
}