import { Post } from "./post";
import { User } from "./user";

export class Comment {

    id: number;

    userId: number;

    post: Post;

    comment: string;

    createdAt: Date;
    
    userOwner: User;

}
