import { Cam } from "./cam";
import { Country } from "./country";
import { Membership } from "./membership";
import { PostMedia } from "./postMedia";
import { StateCity } from "./stateCity";


export interface AuthResponse {
    ok: boolean;
    data: {
        user?: User;
        access_token?: string;
    },
    message?: string;
}

export interface User {
    _id?: string;
    slug?: string;
    name?: string;
    email?: string;
    username?: string;
    gender?: string;
    phonePrefix?: string;
    phone?: string;
    Country?: Country;
    StateCity?: StateCity;
    bio?: string;
    webPage?: string;
    
    Cover?: PostMedia[];
    Profile?: PostMedia[];
    Membership?: Membership[];
    Cam?: Cam;
}