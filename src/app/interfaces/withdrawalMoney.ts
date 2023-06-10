import { Country, Money } from "./index";

export interface WithdrawalMoney {
    _id?: string;
   
    // CONTROL
    active: boolean;
    edit: boolean;
    delete: boolean;
    updatedAt: Date;
    createdAt: Date;

}