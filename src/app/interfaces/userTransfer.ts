import { Money, User } from ".";

export interface UserTransfer {
    _id?: string;
    User: User;
    Money: Money;
    type?: string;
    status?: string; 
    details?: any;
    updateAt?: string;
    createdAt?: string;
}