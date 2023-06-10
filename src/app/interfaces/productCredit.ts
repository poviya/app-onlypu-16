import { Country, Money } from "./index";

export interface ProductCredit {
    _id?: string;
    credit?: number;
    Money?: Money;

    price: number;
    discount: number;
    priceTotal: number;

    // CONTROL
    active: boolean;
    edit: boolean;
    delete: boolean;
    updatedAt: Date;
    createdAt: Date;

}