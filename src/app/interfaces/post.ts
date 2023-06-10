import { PostAdCategory, PostMedia, CityZone, Country, StateCity, User, Comment } from './index';

export interface  Post {

    _id?: string;
    User?: User;

    code?: string;
    title? : string;
    slug?: string;
    address?: string;
    postalCode?: string;
    zone?: string;
    description?: string;
    age?: string;
    plan?: number;
    planAt?: number;
    expirationDate?: string; 
    publishedAt?: string;

    phonePrefix?: string;
    phone?: string;
    whatsapp?: boolean;
    telegram?: string;
    published?: boolean;
    publishedCount?: number;

    phoneClick?: number;
    whatsappClick?: number;
    telegramClick?: number;
    totalClick?: number;

    PostAdCategory?: PostAdCategory;
    Country?: Country;
    StateCity?: StateCity;
    CityZone?: CityZone;
    PostMedia?: PostMedia[];
    Comment?: Comment[];
    Bookmark?: User;
    likes?: number;
    updateAt?: string;
    createdAt?: string;
    
    credit?: number;
    comment?: boolean;

    status?: string;
    typeView?: string;
    price?: number;

    type?: string;
}
