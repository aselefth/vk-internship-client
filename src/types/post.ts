import { LikeType } from "./like";

export type PostType = {
    id: string;
    post: string;
    title: string;
    userId: string;
    likes: LikeType[];
}