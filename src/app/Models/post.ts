import { Like } from "./like";
import { User } from "./user";
import { Comment } from "./comment";

export class Post {

    id: number;

    userId: number;

    description: string;

    image: string;

    createdAt: Date;

    likes: Like[];

    comments: Comment[];

    userOwner: User;

}
