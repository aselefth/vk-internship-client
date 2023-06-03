import { UserType } from "./user";

export type PostType = {
    id: string;
    post: string;
    userId: string;
    likedBy: UserType[];
    createdAt: string;
    filePath: string;
}
