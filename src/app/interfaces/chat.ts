import { User } from "./user";

export interface Chat {
    UserOne: User;
    UserTwo: User;
    lastMessage: string;
    lastMessageAt: Date;
}