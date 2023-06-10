import { Country } from "./country";

export interface CountryState {

    _id?: string;
    name? : string;
    slug?: string;
    Country?: Country;
    updateAt?: string;
    createdAt?: string;

}

