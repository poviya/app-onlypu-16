import { Post, User } from ".";

export interface  Bookmark {
    _id?: string;
    Post?: Post;
    User?: User;
    like?: true;
    updateAt?: string;
    createdAt?: string;
}