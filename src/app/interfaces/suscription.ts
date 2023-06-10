import { Cam } from "./cam";
import { Membership } from "./membership";
import { StateCity } from "./stateCity";
import { User } from "./user";

export interface Suscription {

    _id?: string;
    User? : User;
    Join?: User;
    type?: string;
    expirationDate?: number;
    expired: boolean;
    updateAt?: string;
    createdAt?: string;
}

