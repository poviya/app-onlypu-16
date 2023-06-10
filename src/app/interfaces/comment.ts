import { User } from "./user";

export interface Comment {
    _id?: string;
    User?: User;
    text? : string;
    active?: boolean;
    edit?: boolean;
    updateAt?: string;
    createdAt?: string;
}

