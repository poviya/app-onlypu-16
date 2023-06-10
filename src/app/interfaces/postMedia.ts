import { Post } from "./post";
import { User } from "./user";

export interface PostMedia {
    _id?: string;
    urlSmall?: string;
    keySmall?: string;
    urlSnapshot?: string;
    keySnapshot?: string;
    typeSnapshot?: string;
    extensionSnapshot?: string;

    url?: string;
    key?: string;
    type?: string;
    extension?: string;
    
    Post?: Post;
    User?: User;
}
