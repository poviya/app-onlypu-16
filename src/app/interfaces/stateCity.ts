import { Country, CountryState } from "./index";

export interface StateCity {

    _id?: string;
    name? : string;
    slug?: string;
    Country?: Country;
    CountryState?: CountryState;
    updateAt?: string;
    createdAt?: string;

}

